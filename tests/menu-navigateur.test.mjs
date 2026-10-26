// Test — Le menu de l'en-tête dans un vrai navigateur (registre/0101).
// tests/menu.test.mjs lit le HTML : les trois entrées, leurs liens, la page
// active. Ici, Chromium calcule la mise en page, sur chaque page du site :
// - à 375 px (téléphone) : le menu est replié, le bouton « Menu » visible,
//   les entrées cachées, rien ne déborde de l'écran ; ouvert par le bouton,
//   les trois entrées sont visibles, dans l'ordre, dans l'écran ;
// - à 1280 px : pas de bouton, les trois entrées visibles, dans l'ordre, sur
//   une seule ligne.
// Le site construit est servi par un petit serveur node:http local ; Chromium
// est lancé sans fenêtre (npx playwright install chromium), en mouvement
// réduit. Les deux largeurs tournent en parallèle.

import { describe, test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize, sep } from 'node:path';
import { chromium } from 'playwright';
import { DIST, exigerDist, pagesHtml, liste } from './outils.mjs';

const MARGE = 1; // px admis hors de l'écran (arrondis)

/** Les libellés attendus, dans l'ordre (registre/0101). */
const LIBELLES = { fr: ['Projets', 'Mon métier', 'À propos'], en: ['Projects', 'My job', 'About'] };

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

/** Sert DIST sur 127.0.0.1, port libre. « /x/ » sert x/index.html. */
function servir() {
  const racine = normalize(DIST + sep);
  const serveur = http.createServer((req, res) => {
    let fichier;
    try {
      fichier = normalize(join(DIST, decodeURIComponent(new URL(req.url, 'http://local').pathname)));
    } catch {
      return res.writeHead(400).end();
    }
    if (!fichier.startsWith(racine) && fichier !== normalize(DIST)) return res.writeHead(403).end();
    if (existsSync(fichier) && statSync(fichier).isDirectory()) fichier = join(fichier, 'index.html');
    if (!existsSync(fichier)) return res.writeHead(404).end();
    res.writeHead(200, { 'content-type': TYPES[extname(fichier).toLowerCase()] ?? 'application/octet-stream' });
    res.end(readFileSync(fichier));
  });
  return new Promise((ok) => serveur.listen(0, '127.0.0.1', () => ok(serveur)));
}

const url = (rel) => '/' + rel.replace(/(^|\/)index\.html$/, '$1');

/** L'état du menu, mesuré dans la page. */
function mesurer(marge) {
  const vw = document.documentElement.clientWidth;
  const entete = document.querySelector('header.en-tete');
  const bouton = entete?.querySelector('button.menu');
  const visible = (e) => !!e && e.checkVisibility({ opacityProperty: true, visibilityProperty: true });
  const entrees = [...(entete?.querySelectorAll('nav a') ?? [])].map((a) => {
    const r = a.getBoundingClientRect();
    return {
      texte: a.textContent.replace(/\s+/g, ' ').trim(),
      visible: visible(a) && r.width > 0 && r.height > 0,
      left: r.left,
      right: r.right,
      top: r.top,
      bottom: r.bottom,
    };
  });
  // Ce qui sort de l'écran dans l'en-tête, et la page qui défile en largeur.
  const sortants = [];
  for (const e of entete?.querySelectorAll('*') ?? []) {
    if (!visible(e)) continue;
    const r = e.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (r.left < -marge || r.right > vw + marge) {
      const nom = e.tagName.toLowerCase() + [...e.classList].filter((c) => !c.startsWith('astro-')).map((c) => '.' + c).join('');
      sortants.push(`${nom} (${Math.round(r.left)} → ${Math.round(r.right)} px)`);
    }
  }
  return {
    lang: document.documentElement.lang,
    vw,
    defile: document.documentElement.scrollWidth - vw,
    bouton: bouton ? { visible: visible(bouton), expanded: bouton.getAttribute('aria-expanded') } : null,
    entrees,
    sortants,
  };
}

/** Les fautes communes : libellés et ordre, entrées visibles, débordement. */
function fautesCommunes(m, ici, { axe }) {
  const fautes = [];
  const attendu = LIBELLES[m.lang];
  if (!attendu) return [`${ici} : <html lang="${m.lang}"> inattendu`];
  const textes = m.entrees.map((e) => e.texte);
  if (textes.join(' · ') !== attendu.join(' · '))
    fautes.push(`${ici} : entrées « ${textes.join(' · ')} », attendu « ${attendu.join(' · ')} »`);
  const cachees = m.entrees.filter((e) => !e.visible).map((e) => e.texte);
  if (cachees.length) fautes.push(`${ici} : entrée(s) non visible(s) : ${cachees.join(', ')}`);
  // L'ordre à l'écran : de gauche à droite sur une ligne, de haut en bas en colonne.
  for (let i = 1; i < m.entrees.length; i++) {
    const a = m.entrees[i - 1],
      b = m.entrees[i];
    const ok = axe === 'ligne' ? b.left >= a.right - MARGE : b.top >= a.bottom - MARGE;
    if (!ok) fautes.push(`${ici} : « ${b.texte} » n'est pas après « ${a.texte} » à l'écran (${axe})`);
  }
  if (m.defile > MARGE) fautes.push(`${ici} : la page défile en largeur de ${m.defile} px`);
  for (const s of m.sortants) fautes.push(`${ici} : sort de l'écran : ${s}`);
  return fautes;
}

let navigateur, serveur, origine;

before(async () => {
  exigerDist();
  serveur = await servir();
  origine = `http://127.0.0.1:${serveur.address().port}`;
  navigateur = await chromium.launch();
});

after(async () => {
  await navigateur?.close();
  await new Promise((ok) => (serveur ? serveur.close(ok) : ok()));
});

const nouvellePage = async (viewport, toucher) => {
  const ctx = await navigateur.newContext({ viewport, hasTouch: toucher, isMobile: toucher, reducedMotion: 'reduce' });
  return { ctx, page: await ctx.newPage() };
};

const echec = (fautes) =>
  `${fautes.length} faute(s) :\n${liste(fautes)}\nRegarder : src/components/EnTete.astro (styles et script du menu replié).`;

describe('menu dans un navigateur', { concurrency: true }, () => {
  test('menu (navigateur) : 375 × 812, fermé sans débordement, ouvert avec les trois entrées dans l’ordre', async (t) => {
    const { ctx, page } = await nouvellePage({ width: 375, height: 812 }, true);
    const fautes = [];
    let n = 0;
    for (const rel of pagesHtml()) {
      const lieu = url(rel);
      await page.goto(origine + lieu);
      n++;
      // Fermé : le bouton se voit, les entrées non, rien ne déborde.
      const ferme = await page.evaluate(mesurer, MARGE);
      const ici = `${lieu} · 375 px · fermé`;
      if (!ferme.bouton?.visible) fautes.push(`${ici} : le bouton « Menu » n'est pas visible`);
      else if (ferme.bouton.expanded !== 'false')
        fautes.push(`${ici} : le bouton porte aria-expanded="${ferme.bouton.expanded}", attendu "false"`);
      const vues = ferme.entrees.filter((e) => e.visible).map((e) => e.texte);
      if (vues.length) fautes.push(`${ici} : entrée(s) visible(s) menu fermé : ${vues.join(', ')}`);
      if (ferme.entrees.length !== 3) fautes.push(`${ici} : ${ferme.entrees.length} entrée(s) dans le menu, attendu 3`);
      if (ferme.defile > MARGE) fautes.push(`${ici} : la page défile en largeur de ${ferme.defile} px`);
      for (const s of ferme.sortants) fautes.push(`${ici} : sort de l'écran : ${s}`);
      if (!ferme.bouton?.visible) continue;
      // Ouvert : les trois entrées, visibles, de haut en bas, dans l'écran.
      await page.tap('header.en-tete button.menu');
      const ouvert = await page.evaluate(mesurer, MARGE);
      const la = `${lieu} · 375 px · ouvert`;
      if (ouvert.bouton.expanded !== 'true')
        fautes.push(`${la} : le bouton porte aria-expanded="${ouvert.bouton.expanded}", attendu "true"`);
      fautes.push(...fautesCommunes(ouvert, la, { axe: 'colonne' }));
    }
    await ctx.close();
    t.diagnostic(`375 px : ${n} pages, ${fautes.length} en échec`);
    assert.ok(n > 0, `Aucune page sous ${DIST} : le test passerait à vide.`);
    assert.equal(fautes.length, 0, echec(fautes));
  });

  test('menu (navigateur) : 1280 × 800, les trois entrées sur une ligne, dans l’ordre', async (t) => {
    const { ctx, page } = await nouvellePage({ width: 1280, height: 800 }, false);
    const fautes = [];
    let n = 0;
    for (const rel of pagesHtml()) {
      const lieu = url(rel);
      await page.goto(origine + lieu);
      n++;
      const m = await page.evaluate(mesurer, MARGE);
      const ici = `${lieu} · 1280 px`;
      if (m.bouton?.visible) fautes.push(`${ici} : le bouton « Menu » est visible, attendu caché à cette largeur`);
      fautes.push(...fautesCommunes(m, ici, { axe: 'ligne' }));
      // Sur une ligne : toutes les entrées partagent la même bande verticale.
      const hauts = m.entrees.map((e) => Math.round(e.top));
      if (hauts.length && Math.max(...hauts) - Math.min(...hauts) > MARGE)
        fautes.push(`${ici} : les entrées sont sur plusieurs lignes (hauts : ${hauts.join(', ')} px)`);
    }
    await ctx.close();
    t.diagnostic(`1280 px : ${n} pages, ${fautes.length} en échec`);
    assert.ok(n > 0, `Aucune page sous ${DIST} : le test passerait à vide.`);
    assert.equal(fautes.length, 0, echec(fautes));
  });
});

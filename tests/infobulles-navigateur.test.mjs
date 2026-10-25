// Test — Chaque infobulle s'ouvre et se voit, dans un vrai navigateur
// (registre/0097). tests/infobulles.test.mjs (registre/0088) lit le HTML :
// une bulle par terme, la bonne définition. Ici, Chromium calcule la mise en
// page : la bulle ouverte doit être visible, dans l'écran, coupée par aucun
// ancêtre et couverte par aucun élément.
//
// Deux sortes de bulles :
// - le site (src/components/infobulles/, src/styles/infobulles.css) : un
//   <button class="terme" popovertarget> et son <span popover>. Il s'ouvre au
//   clic, au clavier (Entrée) et au toucher ; pas au survol.
// - les présentations de usecase/ : un pseudo-élément ::after sur
//   [data-info] et .capsule[data-precision], montré au survol et au focus
//   clavier (:focus-visible). Chaque vue est ouverte par son ancre #<id>, puis
//   ses dévoilements sont parcourus (Précédent à l'intérieur de la vue,
//   boutons aria-pressed="false" : « afficher plus », onglets).
//
// Une bulle cachée dans un <details> fermé (« Pour aller plus loin ») est
// testée après l'ouverture du <details>, par un clic sur son <summary>.
//
// Le site construit est servi par un petit serveur node:http local ; Chromium
// est lancé sans fenêtre (npx playwright install chromium), en mouvement
// réduit (prefers-reduced-motion: reduce, que le site et la présentation
// respectent) : les états finaux sont les mêmes, sans attendre les fondus.
// Les sept passes tournent en parallèle.

import { describe, test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize, sep } from 'node:path';
import { chromium } from 'playwright';
import { DIST, exigerDist, pagesHtml, fichiersDuSite, estHorsGabarit, liste } from './outils.mjs';

const MARGE = 2; // px admis hors de l'écran ou hors d'un ancêtre
const OPACITE_MIN = 0.9; // opacité effective en dessous de laquelle la bulle ne se lit pas
const ATTENTE_ACTION = 2000; // ms : un déclencheur qui ne reçoit pas l'action en ce temps échoue

const SITE = [
  { nom: '375 × 812', viewport: { width: 375, height: 812 }, toucher: true, modes: ['toucher'] },
  { nom: '768 × 1024', viewport: { width: 768, height: 1024 }, modes: ['clic', 'clavier'] },
  { nom: '1280 × 800', viewport: { width: 1280, height: 800 }, modes: ['clic', 'clavier'] },
  { nom: '1280 × 800 sombre', viewport: { width: 1280, height: 800 }, sombre: true, modes: ['clic', 'clavier'] },
];
const PRESENTATION = [
  { nom: '1280 × 720', viewport: { width: 1280, height: 720 }, modes: ['survol', 'clavier'] },
  { nom: '1600 × 900', viewport: { width: 1600, height: 900 }, modes: ['survol', 'clavier'] },
  { nom: '1280 × 720 sombre', viewport: { width: 1280, height: 720 }, sombre: true, modes: ['survol', 'clavier'] },
];

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

/** Sert DIST sur 127.0.0.1, port libre. « /x/ » sert x/index.html. */
function servir() {
  const racine = normalize(DIST + sep);
  const serveur = http.createServer((req, res) => {
    let chemin;
    try {
      chemin = decodeURIComponent(new URL(req.url, 'http://local').pathname);
    } catch {
      res.writeHead(400).end();
      return;
    }
    let fichier = normalize(join(DIST, chemin));
    if (!fichier.startsWith(racine) && fichier !== normalize(DIST)) {
      res.writeHead(403).end();
      return;
    }
    if (existsSync(fichier) && statSync(fichier).isDirectory()) fichier = join(fichier, 'index.html');
    if (!existsSync(fichier)) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, { 'content-type': TYPES[extname(fichier).toLowerCase()] ?? 'application/octet-stream' });
    res.end(readFileSync(fichier));
  });
  return new Promise((ok) => serveur.listen(0, '127.0.0.1', () => ok(serveur)));
}

const url = (rel) => '/' + rel.replace(/(^|\/)index\.html$/, '$1');

/** Attend la fin des transitions et animations finies en cours (au plus ~1,5 s). */
const attendre = (page) =>
  page.evaluate(async () => {
    const debut = performance.now();
    for (;;) {
      const encours = document
        .getAnimations()
        .filter((a) => a.playState === 'running' && a.effect?.getComputedTiming().endTime !== Infinity);
      if (!encours.length || performance.now() - debut > 1500) break;
      await Promise.race([
        Promise.all(encours.map((a) => a.finished.catch(() => {}))),
        new Promise((r) => setTimeout(r, 1500)),
      ]);
    }
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  });

/**
 * La vérification, dans la page. cible : l'élément marqué data-test-cible
 * (le bouton .terme du site, ou l'hôte du ::after de la présentation).
 * rectPseudo : la boîte du ::after, mesurée par le protocole de Chromium.
 * Rend { ouverte, fautes: [{ raison, conseil }] }.
 */
function verifierDansLaPage({ rectPseudo, marge, opaciteMin }) {
  const decrire = (el) => {
    if (!el) return 'rien';
    let s = el.tagName.toLowerCase();
    if (el.id) s += '#' + el.id;
    const cl = [...el.classList].filter((c) => !c.startsWith('astro-')).slice(0, 3);
    if (cl.length) s += '.' + cl.join('.');
    // Sans id ni classe, le parent dit où le chercher.
    if (!el.id && !cl.length && el.parentElement && el.parentElement !== document.body)
      s += ` dans ${decrire(el.parentElement)}`;
    return s;
  };
  const cible = document.querySelector('[data-test-cible]');
  const pseudo = !!rectPseudo;
  const fautes = [];
  const faute = (raison, conseil) => fautes.push({ raison, conseil });

  let bulle, style, rect;
  if (pseudo) {
    bulle = cible;
    style = getComputedStyle(cible, '::after');
    rect = rectPseudo;
  } else {
    bulle = document.getElementById(cible.getAttribute('popovertarget'));
    if (!bulle)
      return {
        ouverte: false,
        fautes: [
          {
            raison: `aucune bulle #${cible.getAttribute('popovertarget')}`,
            conseil: 'le popovertarget du bouton (marquer.ts)',
          },
        ],
      };
    style = getComputedStyle(bulle);
    rect = bulle.getBoundingClientRect();
  }
  const ouverte = pseudo
    ? parseFloat(style.opacity) > 0 && style.content !== 'none' && style.content !== 'normal'
    : bulle.matches(':popover-open');
  if (!ouverte) return { ouverte, fautes };

  // Visible : display, visibility, opacité effective, taille.
  if (style.display === 'none') faute('display: none sur la bulle', 'les règles qui cachent la bulle');
  if (style.visibility !== 'visible')
    faute(`visibility: ${style.visibility} sur la bulle`, 'la visibility de la bulle ou de ses ancêtres');
  let opacite = parseFloat(style.opacity);
  const attenuants = [];
  // Une bulle du top layer (popover) ne subit pas l'opacité de ses ancêtres.
  if (pseudo)
    for (let a = cible; a; a = a.parentElement) {
      const o = parseFloat(getComputedStyle(a).opacity);
      if (o < 1) {
        opacite *= o;
        attenuants.push(`${decrire(a)} (${o})`);
      }
    }
  if (opacite < opaciteMin)
    faute(
      `opacité effective ${opacite.toFixed(2)}` + (attenuants.length ? `, atténuée par ${attenuants.join(', ')}` : ''),
      "l'opacité de la bulle" + (attenuants.length ? ' et de ces ancêtres' : ''),
    );
  if (rect.width < 1 || rect.height < 1) {
    faute(
      `taille nulle (${Math.round(rect.width)} × ${Math.round(rect.height)})`,
      'le contenu et la largeur de la bulle',
    );
    return { ouverte, fautes };
  }

  // Dans l'écran.
  const vw = document.documentElement.clientWidth,
    vh = window.innerHeight;
  const depasse = [];
  if (rect.left < -marge) depasse.push(`à gauche de ${Math.round(-rect.left)} px`);
  if (rect.right > vw + marge) depasse.push(`à droite de ${Math.round(rect.right - vw)} px`);
  if (rect.top < -marge) depasse.push(`en haut de ${Math.round(-rect.top)} px`);
  if (rect.bottom > vh + marge) depasse.push(`en bas de ${Math.round(rect.bottom - vh)} px`);
  if (depasse.length)
    faute(
      `sort de l'écran (${depasse.join(', ')})`,
      pseudo
        ? 'le placement du ::after (data-cote, data-vert, placerInfobulle)'
        : 'le placement de .infobulle (src/styles/infobulles.css)',
    );

  // Coupée par un ancêtre : seuls ceux de la chaîne des blocs conteneurs
  // coupent (un ancêtre non positionné ne coupe pas un absolu). Une bulle du
  // top layer n'a pas d'ancêtre qui la coupe.
  if (pseudo) {
    let position = style.position;
    for (let a = cible; a && a !== document.body && a !== document.documentElement; a = a.parentElement) {
      const s = getComputedStyle(a);
      const cree =
        s.transform !== 'none' ||
        s.filter !== 'none' ||
        s.perspective !== 'none' ||
        /paint|layout|strict|content/.test(s.contain);
      const contient = position === 'fixed' ? cree : position === 'absolute' ? cree || s.position !== 'static' : true;
      if (!contient) continue;
      if (s.overflowX !== 'visible' || s.overflowY !== 'visible') {
        const r = a.getBoundingClientRect();
        const horsX = s.overflowX !== 'visible' && (rect.left < r.left - marge || rect.right > r.right + marge);
        const horsY = s.overflowY !== 'visible' && (rect.top < r.top - marge || rect.bottom > r.bottom + marge);
        if (horsX || horsY)
          faute(
            `coupée par ${decrire(a)} (overflow: ${s.overflowX} ${s.overflowY})`,
            `l'overflow de ${decrire(a)}, ou le placement de la bulle`,
          );
      }
      position = s.position === 'absolute' || s.position === 'fixed' ? s.position : 'normal';
    }
  }

  // Couverte : le centre et les quatre coins intérieurs doivent toucher la bulle.
  const retrait = 4;
  const points = [
    ['centre', rect.left + rect.width / 2, rect.top + rect.height / 2],
    ['coin haut gauche', rect.left + retrait, rect.top + retrait],
    ['coin haut droit', rect.right - retrait, rect.top + retrait],
    ['coin bas gauche', rect.left + retrait, rect.bottom - retrait],
    ['coin bas droit', rect.right - retrait, rect.bottom - retrait],
  ];
  // Le ::after porte pointer-events: none : on le rend touchable le temps du test.
  const touchable = document.createElement('style');
  touchable.textContent = '[data-test-cible]::after { pointer-events: auto !important; }';
  if (pseudo) document.head.appendChild(touchable);
  const couvreurs = new Map();
  for (const [nom, x, y] of points) {
    if (x < 0 || y < 0 || x >= vw || y >= vh) continue; // hors écran : déjà dit
    const touche = document.elementFromPoint(x, y);
    const ok = touche && (bulle === touche || bulle.contains(touche));
    if (!ok) {
      const d = decrire(touche);
      couvreurs.set(d, [...(couvreurs.get(d) ?? []), nom]);
    }
  }
  touchable.remove();
  for (const [d, noms] of couvreurs)
    faute(`couverte par ${d} (${noms.join(', ')})`, `le z-index ou la position de ${d}`);

  return { ouverte, fautes };
}

/** La boîte du ::after de l'élément marqué data-test-cible, par le protocole de Chromium. */
async function rectDuAfter(cdp) {
  const { root } = await cdp.send('DOM.getDocument', { depth: 0 });
  const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: '[data-test-cible]' });
  if (!nodeId) return null;
  const { node } = await cdp.send('DOM.describeNode', { nodeId, depth: 0 });
  const apres = (node.pseudoElements ?? []).find((p) => p.pseudoType === 'after');
  if (!apres) return null;
  try {
    const { model } = await cdp.send('DOM.getBoxModel', { backendNodeId: apres.backendNodeId });
    const xs = model.border.filter((_, i) => i % 2 === 0),
      ys = model.border.filter((_, i) => i % 2 === 1);
    const left = Math.min(...xs),
      top = Math.min(...ys),
      right = Math.max(...xs),
      bottom = Math.max(...ys);
    return { left, top, right, bottom, width: right - left, height: bottom - top };
  } catch {
    return { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 }; // pas de boîte : display: none
  }
}

const premiereLigne = (e) => String(e?.message ?? e).split('\n')[0];

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

const contexte = (passe) =>
  navigateur.newContext({
    viewport: passe.viewport,
    hasTouch: !!passe.toucher,
    isMobile: !!passe.toucher,
    colorScheme: passe.sombre ? 'dark' : 'light',
    reducedMotion: 'reduce',
  });

const resume = (passe, n, cas, debut, fautes) =>
  `${passe.nom} : ${n} bulles, ${cas} cas, ${((Date.now() - debut) / 1000).toFixed(1)} s, ${fautes.length} en échec`;

const echec = (fautes) =>
  `${fautes.length} bulle(s) masquée(s) ou fermée(s) :\n${liste(fautes)}\n` +
  "Chaque ligne : page ou vue · largeur · mode d'ouverture · « terme » : ce qui ne va pas. Regarder : où chercher.";

async function passeSite(t, passe) {
  const debut = Date.now();
  const ctx = await contexte(passe);
  const page = await ctx.newPage();
  const fautes = [];
  let bulles = 0,
    cas = 0;
  for (const rel of pagesHtml()) {
    const lieu = url(rel);
    await page.goto(origine + lieu);
    await attendre(page);
    const termes = await page.$$('button.terme[popovertarget]');
    bulles += termes.length;
    for (const bouton of termes) {
      const terme = (await bouton.textContent()).trim();
      // Dévoilement : les <details> fermés qui la contiennent, du plus extérieur au plus intérieur.
      const ouverts = [];
      for (let n = 0; n < 5; n++) {
        const resume = (
          await bouton.evaluateHandle((b) => {
            let d = null;
            for (let a = b.parentElement; a; a = a.parentElement) if (a.tagName === 'DETAILS' && !a.open) d = a;
            return d?.querySelector(':scope > summary') ?? null;
          })
        ).asElement();
        if (!resume) break;
        ouverts.push((await resume.textContent()).replace(/\s+/g, ' ').trim());
        await resume.click({ timeout: ATTENTE_ACTION }).catch(() => {});
        await attendre(page);
      }
      const dans = ouverts.length ? ` (dans « ${ouverts.join(' » › « ')} » ouvert)` : '';
      for (const mode of passe.modes) {
        cas++;
        const ici = `${lieu}${dans} · ${passe.nom} · ${mode} · « ${terme} »`;
        try {
          if (mode === 'toucher') await bouton.tap({ timeout: ATTENTE_ACTION });
          else if (mode === 'clic') await bouton.click({ timeout: ATTENTE_ACTION });
          else {
            await bouton.focus();
            await page.keyboard.press('Enter');
          }
        } catch (e) {
          fautes.push(
            `${ici} : le bouton ne reçoit pas l'action (${premiereLigne(e)}). Regarder : ce qui le recouvre ou le cache.`,
          );
          continue;
        }
        await attendre(page);
        await bouton.evaluate((b) => b.setAttribute('data-test-cible', ''));
        const r = await page.evaluate(verifierDansLaPage, { rectPseudo: null, marge: MARGE, opaciteMin: OPACITE_MIN });
        if (!r.ouverte)
          fautes.push(
            `${ici} : la bulle ne s'ouvre pas. Regarder : le popovertarget du bouton (src/components/infobulles/marquer.ts).`,
          );
        for (const f of r.fautes) fautes.push(`${ici} : ${f.raison}. Regarder : ${f.conseil}.`);
        await page.keyboard.press('Escape');
        await page.evaluate(() => {
          const c = document.querySelector('[data-test-cible]');
          c?.removeAttribute('data-test-cible');
          document.querySelectorAll(':popover-open').forEach((p) => p.hidePopover());
          document.activeElement?.blur?.();
        });
      }
    }
  }
  await ctx.close();
  t.diagnostic(resume(passe, bulles, cas, debut, fautes));
  assert.ok(
    bulles > 0,
    `Aucune bulle trouvée sur les ${pagesHtml().length} pages du site (${passe.nom}) : le test passerait à vide. Regarder : button.terme[popovertarget] dans le HTML construit.`,
  );
  assert.equal(fautes.length, 0, echec(fautes));
}

const presentations = () => fichiersDuSite().filter((f) => estHorsGabarit(f) && f.endsWith('.html'));

async function passePresentation(t, passe) {
  const debut = Date.now();
  const ctx = await contexte(passe);
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('DOM.enable');
  const fautes = [];
  const vues = new Set();
  const distinctes = new Set();
  let cas = 0;

  for (const rel of presentations()) {
    const adresse = origine + url(rel);
    await page.goto(adresse);
    // Les vues : T.vues si la présentation en a, sinon la page entière.
    const ids = await page.evaluate(() =>
      typeof T !== 'undefined' && Array.isArray(T.vues) ? T.vues.map((v) => v.id) : [null],
    );
    for (const id of ids) {
      // Une ancre neuve à chaque vue, chargée à neuf (la requête force le rechargement).
      await page.goto(id ? `${adresse}?vue=${encodeURIComponent(id)}#${id}` : adresse);
      await page.evaluate(() => document.fonts?.ready);
      await page.waitForTimeout(100);
      await attendre(page);
      const lieuVue = id ? `${url(rel)}#${id}` : url(rel);
      const vus = new Set();

      const tester = async (etape) => {
        const hotes = await page.$$('[data-info], .capsule[data-precision]');
        for (const hote of hotes) {
          const info = await hote.evaluate((e) => {
            const r = e.getBoundingClientRect();
            const visible =
              e.checkVisibility({ opacityProperty: true, visibilityProperty: true }) && r.width > 0 && r.height > 0;
            return {
              visible,
              cle: e.textContent.replace(/\s+/g, ' ').trim() + '|' + (e.dataset.info ?? e.dataset.precision ?? ''),
              terme: e.textContent.replace(/\s+/g, ' ').trim().slice(0, 50),
            };
          });
          if (!info.visible || vus.has(info.cle)) continue;
          vus.add(info.cle);
          distinctes.add(rel + '|' + info.cle);
          const lieu = lieuVue + (etape ? ` (${etape})` : '');
          for (const mode of passe.modes) {
            cas++;
            const ici = `${lieu} · ${passe.nom} · ${mode} · « ${info.terme} »`;
            try {
              if (mode === 'survol') await hote.hover({ timeout: ATTENTE_ACTION });
              else {
                await page.mouse.move(0, 0);
                await page.keyboard.press('Shift'); // dernière interaction au clavier : :focus-visible
                await hote.focus();
              }
            } catch (e) {
              fautes.push(
                `${ici} : le déclencheur ne reçoit pas l'action (${premiereLigne(e)}). Regarder : ce qui le recouvre ou le cache.`,
              );
              continue;
            }
            await attendre(page);
            await hote.evaluate((e) => e.setAttribute('data-test-cible', ''));
            if (mode === 'clavier' && !(await hote.evaluate((e) => e.matches(':focus-visible'))))
              fautes.push(
                `${ici} : le focus clavier ne déclenche pas :focus-visible. Regarder : le tabindex de l'élément.`,
              );
            const rect = await rectDuAfter(cdp);
            const r = rect
              ? await page.evaluate(verifierDansLaPage, { rectPseudo: rect, marge: MARGE, opaciteMin: OPACITE_MIN })
              : { ouverte: false, fautes: [] };
            if (!r.ouverte)
              fautes.push(
                `${ici} : la bulle ne s'ouvre pas (::after absent ou d'opacité 0). Regarder : les règles :hover et :focus-visible du ::after.`,
              );
            for (const f of r.fautes) fautes.push(`${ici} : ${f.raison}. Regarder : ${f.conseil}.`);
            await page.evaluate(() => {
              document.querySelector('[data-test-cible]')?.removeAttribute('data-test-cible');
              document.activeElement?.blur?.();
            });
            await page.mouse.move(0, 0);
          }
        }
      };

      await tester('');
      // Dévoilements à l'intérieur de la vue : on remonte les états un à un.
      const reveals = id ? await page.evaluate((i) => T.vues.find((v) => v.id === i)?.reveals ?? 0, id) : 0;
      for (let k = reveals - 1; k >= 1; k--) {
        await page.evaluate(() => document.activeElement?.blur?.());
        await page.keyboard.press('ArrowLeft');
        await page.waitForTimeout(100);
        await attendre(page);
        await tester(`dévoilement ${k} sur ${reveals}`);
      }
      // Boutons qui dévoilent sans changer de vue : « afficher plus », onglets.
      const boutons = await page.$$('.vue.active button[aria-pressed="false"], button.plus[aria-pressed="false"]');
      for (const b of boutons) {
        const ok = await b.evaluate(
          (e) =>
            e.getAttribute('aria-pressed') === 'false' &&
            e.checkVisibility({ opacityProperty: true, visibilityProperty: true }),
        );
        if (!ok) continue;
        const nom = (await b.textContent()).replace(/\s+/g, ' ').trim();
        try {
          await b.click({ timeout: ATTENTE_ACTION });
        } catch {
          continue;
        }
        await page.waitForTimeout(100);
        await attendre(page);
        await tester(`après « ${nom} »`);
      }
      if (vus.size) vues.add(lieuVue);
    }
  }
  await ctx.close();
  t.diagnostic(resume(passe, distinctes.size, cas, debut, fautes) + `, ${vues.size} vues avec des bulles`);
  assert.ok(presentations().length > 0, `Aucune présentation sous ${DIST}/usecase/ : le test passerait à vide.`);
  assert.ok(
    distinctes.size > 0,
    `Aucune bulle trouvée dans les présentations (${passe.nom}) : le test passerait à vide. Regarder : [data-info] et .capsule[data-precision], et la navigation par #<id>.`,
  );
  assert.equal(fautes.length, 0, echec(fautes));
}

describe('infobulles dans un navigateur', { concurrency: true }, () => {
  for (const passe of SITE) test(`infobulles (navigateur) : site, ${passe.nom}`, (t) => passeSite(t, passe));
  for (const passe of PRESENTATION)
    test(`infobulles (navigateur) : présentations, ${passe.nom}`, (t) => passePresentation(t, passe));
});

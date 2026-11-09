// Test — la phrase d'accroche (registre/0115) : le <h1> des deux accueils dit
// ce que Jean apporte ; l'ancienne phrase, une méthode en quatre verbes, quitte
// les accueils et le texte alternatif des aperçus (og:image:alt) pour ouvrir
// le paragraphe sur l'IA de « À propos », FR et EN, dans sa forme courte
// (tri de Jean du relevé, 2026-11-09).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { exigerDist, fichierDePage, pagesHtml, balises, elements, sansCode, lire, liste } from './outils.mjs';

/** Ce qui fait foi, par langue (registre/0115, spec du 2026-11-09). */
const PHRASE = {
  fr: {
    accueil: '/',
    apropos: '/a-propos/',
    nouvelle: 'Je concentre l’effort là où il rapporte le plus.',
    ancienne: 'je pose des hypothèses',
    methode: 'J’écoute, je pose des hypothèses, je teste, puis je construis.',
    ancienneMethode: 'je construis là où ça compte',
    ia: 'J’utilise l’IA',
  },
  en: {
    accueil: '/en/',
    apropos: '/en/about/',
    nouvelle: 'I focus my effort where it pays off most.',
    ancienne: 'I form hypotheses',
    methode: 'I listen, form hypotheses, test, then build.',
    ancienneMethode: 'I build where it counts',
    ia: 'I use AI when it meets a specific need',
  },
};

/** L'espace insécable sous ses formes possibles dans le HTML brut : U+00A0, &nbsp;, &#160;, &#xA0;. */
const INSECABLE = /\u00a0|&nbsp;|&#160;|&#x0*a0;/i;

const ENTITES = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ', rsquo: '’', lsquo: '‘', laquo: '«', raquo: '»' };
/** Entités décodées, blancs (insécables U+00A0 et U+202F compris) réduits à une espace. */
const net = (s) =>
  s
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (e, c) =>
      c[0] === '#'
        ? String.fromCodePoint(c[1].toLowerCase() === 'x' ? parseInt(c.slice(2), 16) : parseInt(c.slice(1), 10))
        : (ENTITES[c.toLowerCase()] ?? e),
    )
    .replace(/[\s\u00a0\u202f]+/g, ' ')
    .trim();

const lirePage = (chemin) => {
  const fichier = fichierDePage(chemin);
  assert.ok(existsSync(fichier), `La page ${chemin} manque : ${fichier} n'existe pas.`);
  return readFileSync(fichier, 'utf8');
};

/** Le texte d'un élément : <br> → espace, autres balises ôtées sans espace, puis net(). */
const texteDe = (html, el) =>
  net(
    sansCode(html)
      .slice(el.debut, el.fin ?? undefined)
      .replace(/^<[^>]*>/, '')
      .replace(/<\/[^>]*>$/, '')
      .replace(/<br\b[^>]*>/gi, ' ')
      .replace(/<[^>]*>/g, ''),
  );

const contient = (texte, cherche) => texte.toLowerCase().includes(cherche.toLowerCase());

for (const [lang, p] of Object.entries(PHRASE)) {
  // ─── 1 et 2 : le <h1> de l'accueil ──────────────────────────────────────
  test(`accroche : le <h1> de ${p.accueil} est « ${p.nouvelle} »`, () => {
    exigerDist();
    const html = lirePage(p.accueil);
    const h1 = elements(html).filter((e) => e.nom === 'h1');
    assert.equal(h1.length, 1, `${p.accueil} : un seul <h1> attendu, ${h1.length} trouvé(s)`);
    assert.equal(texteDe(html, h1[0]), p.nouvelle, `${p.accueil} : le <h1> ne porte pas la nouvelle phrase`);
  });

  // ─── 3 : l'ancienne phrase a quitté l'accueil ───────────────────────────
  test(`accroche : l'ancienne phrase (« ${p.ancienne} ») n'apparaît plus sur ${p.accueil}`, () => {
    exigerDist();
    const texte = net(lirePage(p.accueil));
    assert.ok(!contient(texte, p.ancienne), `${p.accueil} contient encore « ${p.ancienne} »`);
  });

  // ─── 5 et 6 : la méthode ouvre le paragraphe sur l'IA d'« À propos » ────
  test(`accroche : ${p.apropos} porte la méthode, avant « ${p.ia} », dans le même paragraphe`, () => {
    exigerDist();
    const html = lirePage(p.apropos);
    const paragraphes = elements(html)
      .filter((e) => e.nom === 'p')
      .map((e) => texteDe(html, e));
    const ia = paragraphes.filter((t) => t.includes(p.ia));
    assert.equal(ia.length, 1, `${p.apropos} : un seul paragraphe avec « ${p.ia} » attendu, ${ia.length} trouvé(s)`);
    const t = ia[0];
    const iMethode = t.indexOf(p.methode);
    assert.ok(iMethode >= 0, `${p.apropos} : le paragraphe sur l'IA ne porte pas la méthode.\n  paragraphe : « ${t} »`);
    assert.ok(iMethode < t.indexOf(p.ia), `${p.apropos} : la méthode vient après « ${p.ia} ».\n  paragraphe : « ${t} »`);
  });

  test(`accroche : l'ancienne méthode (« ${p.ancienneMethode} ») n'apparaît plus sur ${p.apropos}`, () => {
    exigerDist();
    const texte = net(lirePage(p.apropos));
    assert.ok(!contient(texte, p.ancienneMethode), `${p.apropos} contient encore « ${p.ancienneMethode} »`);
  });
}

// ─── Typographie : « là » et « où » liés par une insécable dans le <h1> FR ─
// Sur le HTML brut, sans normalisation : net() ramènerait l'insécable à une espace.
test('accroche : dans le <h1> de /, « là » et « où » sont liés par une espace insécable', () => {
  exigerDist();
  const html = lirePage('/');
  const h1 = elements(html).filter((e) => e.nom === 'h1');
  assert.equal(h1.length, 1, `/ : un seul <h1> attendu, ${h1.length} trouvé(s)`);
  const brut = sansCode(html).slice(h1[0].debut, h1[0].fin ?? undefined);
  const lien = brut.match(/là(\s|&nbsp;|&#160;|&#x0*a0;)+où/i);
  assert.ok(lien, `/ : « là où » introuvable dans le <h1> brut : ${JSON.stringify(brut)}`);
  assert.ok(
    INSECABLE.test(lien[0]) && !/[ \t\r\n]/.test(lien[0]),
    `/ : « là » et « où » ne sont pas liés par une insécable seule : ${JSON.stringify(lien[0])}`,
  );
});

// ─── 4 : og:image:alt sur toutes les pages, dans la langue de la page ─────
test('accroche : sur chaque page, og:image:alt porte la nouvelle phrase de sa langue, pas l’ancienne', () => {
  exigerDist();
  const pages = pagesHtml();
  assert.ok(pages.length > 0, 'Aucune page HTML construite.');
  const fautes = [];
  for (const rel of pages) {
    const html = lire(rel);
    const lang = balises(html, 'html')[0]?.attrs.lang;
    const p = PHRASE[lang];
    if (!p) {
      fautes.push(`${rel} : <html lang="${lang}"> inattendu`);
      continue;
    }
    const metas = balises(html, 'meta').filter(({ attrs }) => attrs.property === 'og:image:alt');
    if (metas.length !== 1) {
      fautes.push(`${rel} : ${metas.length} <meta property="og:image:alt">, un attendu`);
      continue;
    }
    const alt = net(metas[0].attrs.content ?? '');
    if (!alt.includes(p.nouvelle)) fautes.push(`${rel} (${lang}) : og:image:alt sans « ${p.nouvelle} » : « ${alt} »`);
    if (contient(alt, p.ancienne)) fautes.push(`${rel} (${lang}) : og:image:alt porte encore « ${p.ancienne} »`);
  }
  assert.equal(fautes.length, 0, `og:image:alt :\n${liste(fautes)}`);
});

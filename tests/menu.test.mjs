// Test — Le menu de l'en-tête (registre/0101) : « Projets · Mon métier ·
// À propos », en anglais « Projects · My job · About », sur chaque page
// construite, chaque entrée vers la page de la langue de la page ; et la page
// active marquée par aria-current, sur l'entrée de cette page et elle seule.
// Ce qui fait foi est la spec du registre, pas src/i18n/textes.ts : si le
// texte du menu change là-bas, ce test doit le voir. La largeur (téléphone,
// bureau) se mesure dans un navigateur : tests/menu-navigateur.test.mjs.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PAGES, exigerDist, pagesHtml, lire, elements, liste } from './outils.mjs';

/** Le menu attendu, par langue : [libellé, href], dans l'ordre (registre/0101). */
const MENU = {
  fr: [
    ['Projets', '/#projets'],
    ['Mon métier', '/mon-metier/'],
    ['À propos', '/a-propos/'],
  ],
  en: [
    ['Projects', '/en/#projets'],
    ['My job', '/en/my-job/'],
    ['About', '/en/about/'],
  ],
};

/** La page de chaque entrée qui en a une : l'entrée active y porte aria-current. */
const ACTIVE = {
  '/mon-metier/': 'Mon métier',
  '/en/my-job/': 'My job',
  '/a-propos/': 'À propos',
  '/en/about/': 'About',
};

/** Le chemin servi d'un fichier de dist : 'en/about/index.html' → '/en/about/'. */
const servi = (rel) => '/' + rel.replace(/(^|\/)index\.html$/, '$1');

/** La langue de la page, et les liens du menu : [{ texte, href, courant }]. */
function lireMenu(html) {
  const tous = elements(html);
  const racine = tous.find((e) => e.nom === 'html');
  const entete = tous.find((e) => e.nom === 'header' && e.classes.includes('en-tete'));
  const nav = tous.find((e) => e.nom === 'nav' && e.ancetres.includes(entete));
  const liens = nav ? tous.filter((e) => e.nom === 'a' && e.ancetres.includes(nav)) : [];
  const marque = tous.find((e) => e.nom === 'a' && e.classes.includes('marque') && e.ancetres.includes(entete));
  return {
    lang: racine?.attrs.lang,
    trouve: !!nav,
    marque,
    liens: liens.map((a) => ({ texte: a.texte(), href: a.attrs.href, courant: a.attrs['aria-current'] })),
  };
}

const pages = () => pagesHtml().map((rel) => ({ rel, chemin: servi(rel) }));

test('menu : les pages lues couvrent toutes les jumelles (le test ne passe pas à vide)', () => {
  exigerDist();
  const vues = new Set(pages().map((p) => p.chemin));
  const manquantes = PAGES.map((p) => p.chemin).filter((c) => !vues.has(c));
  assert.equal(manquantes.length, 0, `Pages attendues absentes de dist :\n${liste(manquantes)}`);
});

test('menu : sur chaque page, trois entrées dans l’ordre, chacune vers la page de la langue de la page', () => {
  exigerDist();
  const fautes = [];
  for (const { rel, chemin } of pages()) {
    const { lang, trouve, liens } = lireMenu(lire(rel));
    const attendu = MENU[lang];
    if (!attendu) {
      fautes.push(`${chemin} : <html lang="${lang ?? ''}"> inattendu, le menu ne peut pas être comparé`);
      continue;
    }
    if (!trouve) {
      fautes.push(`${chemin} : aucun <nav> dans l'en-tête (header.en-tete)`);
      continue;
    }
    const vus = liens.map((l) => `${l.texte} → ${l.href}`).join(' · ');
    const voulus = attendu.map(([t, h]) => `${t} → ${h}`).join(' · ');
    if (vus !== voulus) fautes.push(`${chemin} (${lang}) : menu « ${vus} », attendu « ${voulus} »`);
  }
  assert.equal(fautes.length, 0, `Menu faux :\n${liste(fautes)}\nRegarder : src/components/EnTete.astro, src/i18n/textes.ts.`);
});

test('menu : la page active porte aria-current sur son entrée, et elle seule', () => {
  exigerDist();
  const fautes = [];
  let controles = 0;
  for (const { rel, chemin } of pages()) {
    const { trouve, liens, marque } = lireMenu(lire(rel));
    if (!trouve) continue; // dit par le test précédent
    const active = ACTIVE[chemin] ?? null;
    const courants = liens.filter((l) => l.courant !== undefined);
    if (active) {
      controles++;
      const noms = courants.map((l) => `${l.texte} (aria-current="${l.courant}")`).join(', ') || 'aucune';
      if (courants.length !== 1 || courants[0].texte !== active || courants[0].courant !== 'page')
        fautes.push(`${chemin} : entrée(s) marquée(s) ${noms}, attendu « ${active} » seule, avec aria-current="page"`);
      if (marque && 'aria-current' in marque.attrs)
        fautes.push(`${chemin} : le logo porte aussi aria-current, attendu sur « ${active} » seule`);
    } else {
      // Ailleurs (accueil, projets, 404), aucune entrée du menu n'est active.
      for (const l of courants) fautes.push(`${chemin} : « ${l.texte} » porte aria-current alors que ce n'est pas sa page`);
    }
  }
  assert.equal(controles, Object.keys(ACTIVE).length, `Seules ${controles} pages actives trouvées sur ${Object.keys(ACTIVE).length}.`);
  assert.equal(fautes.length, 0, `Page active mal marquée :\n${liste(fautes)}\nRegarder : aria-current dans src/components/EnTete.astro.`);
});

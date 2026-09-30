// Test 8 — Les projets (registre/0069, 0070) : l'ordre de l'accueil, « la
// hauteur d'abord », le lien « Projet suivant » qui suit cet ordre en boucle,
// et les trois schémas de la page fusion.
// Les scènes des cartes 01 et 02 ne sont pas testées ici : un autre chantier
// les anime.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, exigerDist, fichierDePage, sansCode, attributs, liste } from './outils.mjs';

/** L'ordre de l'accueil, qui fait foi : page et nom de chaque projet, par langue. */
const ORDRE = [
  { fr: ['/projets/fusion-plateformes/', 'Fusion des plateformes'], en: ['/en/projects/platform-merger/', 'Platform merger'] },
  { fr: ['/projets/mises-en-situation/', 'Mises en situation orales'], en: ['/en/projects/speaking-practice/', 'Speaking role-plays'] },
  { fr: ['/projets/uservoice/', 'UserVoice'], en: ['/en/projects/uservoice/', 'UserVoice'] },
  { fr: ['/projets/audit-contenu/', 'Audit contenu'], en: ['/en/projects/content-audit/', 'Content audit'] },
  { fr: ['/projets/matrice-competences/', 'Matrice de compétences'], en: ['/en/projects/skills-matrix/', 'Skills matrix'] },
];
const ACCUEIL = { fr: '/', en: '/en/' };
const SUIVANT = { fr: 'Projet suivant', en: 'Next project' };

const lirePage = (chemin) => {
  const fichier = fichierDePage(chemin);
  assert.ok(existsSync(fichier), `La page ${chemin} manque : ${fichier} n'existe pas.`);
  return readFileSync(fichier, 'utf8');
};

/** Texte visible d'un fragment HTML : balises retirées, blancs réduits. */
const texte = (fragment) => fragment.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const ATTRS = `((?:[^>"']|"[^"]*"|'[^']*')*)`;

/** Les liens <a>…</a> d'un HTML, dans l'ordre : { index, attrs, texte }. */
const liens = (html) =>
  [...sansCode(html).matchAll(new RegExp(`<a(?=[\\s>])${ATTRS}>([\\s\\S]*?)<\\/a\\s*>`, 'gi'))].map((m) => ({
    index: m.index,
    attrs: attributs(m[1]),
    texte: texte(m[2]),
  }));

const aLaClasse = (attrs, classe) => (attrs.class ?? '').split(/\s+/).includes(classe);

for (const langue of ['fr', 'en']) {
  const accueil = ACCUEIL[langue];
  const attendu = ORDRE.map((p) => p[langue]);

  test(`accueil : ${accueil} présente les cinq projets dans l'ordre, une seule flèche entre UserVoice et Audit contenu`, () => {
    exigerDist();
    const html = sansCode(lirePage(accueil));
    // Une carte : un lien de classe « parcelle » (Parcelle.astro).
    const cartes = liens(html).filter(({ attrs }) => aLaClasse(attrs, 'parcelle'));
    const fautes = [];

    const hrefs = cartes.map(({ attrs }) => attrs.href);
    const hrefsAttendus = attendu.map(([href]) => href);
    if (JSON.stringify(hrefs) !== JSON.stringify(hrefsAttendus))
      fautes.push(`${cartes.length} carte(s), dans l'ordre ${JSON.stringify(hrefs)} : attendu ${JSON.stringify(hrefsAttendus)}`);
    for (const [href, nom] of attendu) {
      const carte = cartes.find(({ attrs }) => attrs.href === href);
      if (carte && !carte.texte.includes(nom))
        fautes.push(`la carte vers ${href} ne porte pas le nom « ${nom} » (texte : « ${carte.texte.slice(0, 80)} »)`);
    }

    const fleches = [...html.matchAll(new RegExp(`<[a-zA-Z][\\w:-]*(?=[\\s/>])${ATTRS}>`, 'g'))]
      .filter((m) => aLaClasse(attributs(m[1]), 'fleche'))
      .map((m) => m.index);
    if (fleches.length !== 1) fautes.push(`${fleches.length} flèche(s) (class="fleche") : attendu exactement une`);
    else {
      const position = (href) => cartes.find(({ attrs }) => attrs.href === href)?.index ?? -1;
      const avant = position(attendu[2][0]);
      const apres = position(attendu[3][0]);
      if (!(avant >= 0 && apres >= 0 && avant < fleches[0] && fleches[0] < apres))
        fautes.push(`la flèche n'est pas entre la carte ${attendu[2][1]} et la carte ${attendu[3][1]}`);
    }

    assert.equal(fautes.length, 0, `Accueil ${accueil} :\n${liste(fautes)}`);
  });

  test(`projet suivant : chaque page projet en ${langue.toUpperCase()} renvoie à la suivante de l'accueil, en boucle`, () => {
    exigerDist();
    const fautes = [];
    attendu.forEach(([page], i) => {
      const [cible, nom] = attendu[(i + 1) % attendu.length];
      const suivants = liens(lirePage(page)).filter((l) => l.texte.startsWith(SUIVANT[langue]));
      if (suivants.length !== 1) {
        fautes.push(`${page} : ${suivants.length} lien(s) « ${SUIVANT[langue]} » : attendu exactement un`);
        return;
      }
      const [{ attrs, texte: libelle }] = suivants;
      if (attrs.href !== cible) fautes.push(`${page} : le projet suivant mène à "${attrs.href ?? ''}" : attendu ${cible}`);
      if (!libelle.includes(nom)) fautes.push(`${page} : le libellé « ${libelle} » ne nomme pas « ${nom} »`);
    });
    assert.equal(fautes.length, 0, `Projet suivant (${langue}) :\n${liste(fautes)}`);
  });
}

/**
 * Les <picture> placées dans une <figure> : pour chacune, ses <source>, ses
 * <img>, et pour chaque <img> le nombre de liens <a> ouverts autour d'elle.
 */
function imagesDeFigures(html) {
  const re = new RegExp(`<(\\/?)(a|figure|picture|source|img)(?=[\\s/>])${ATTRS}>`, 'gi');
  const profondeur = { a: 0, figure: 0, picture: 0 };
  const groupes = [];
  let courant = null;
  for (const m of sansCode(html).matchAll(re)) {
    const fermante = m[1] === '/';
    const nom = m[2].toLowerCase();
    const attrs = attributs(m[3]);
    if (nom in profondeur) {
      profondeur[nom] = Math.max(0, profondeur[nom] + (fermante ? -1 : 1));
      if (nom === 'picture' && !fermante && profondeur.figure > 0)
        groupes.push((courant = { sources: [], imgs: [] }));
      if (nom === 'picture' && fermante) courant = null;
    } else if (courant && !fermante) {
      if (nom === 'source') courant.sources.push(attrs);
      else courant.imgs.push({ attrs, dansUnLien: profondeur.a > 0 });
    }
  }
  return groupes;
}

/** Les URL d'un srcset (« a.svg 1x, b.svg 2x » → [a.svg, b.svg]). */
const urlsDeSrcset = (srcset) =>
  srcset
    .split(',')
    .map((c) => c.trim().split(/\s+/)[0])
    .filter(Boolean);

const MEDIA_LARGE = '(min-width: 48.5rem)';

for (const page of ['/projets/fusion-plateformes/', '/en/projects/platform-merger/']) {
  test(`fusion : ${page} a trois figure picture, source large, img à alt non vide hors lien, SVG présents`, () => {
    exigerDist();
    const groupes = imagesDeFigures(lirePage(page));
    const fautes = [];
    if (groupes.length !== 3) fautes.push(`${groupes.length} <figure><picture> : attendu exactement trois`);

    groupes.forEach(({ sources, imgs }, i) => {
      const ou = `figure ${i + 1}`;
      if (!sources.some((s) => s.media === MEDIA_LARGE))
        fautes.push(`${ou} : aucune <source media="${MEDIA_LARGE}">`);
      if (imgs.length !== 1) fautes.push(`${ou} : ${imgs.length} <img> : attendu exactement une`);
      for (const { attrs, dansUnLien } of imgs) {
        if (!(attrs.alt ?? '').trim()) fautes.push(`${ou} : <img src="${attrs.src ?? ''}"> à alt vide ou absent`);
        if (dansUnLien) fautes.push(`${ou} : <img src="${attrs.src ?? ''}"> est dans un lien <a>`);
      }
      const urls = [
        ...sources.flatMap((s) => urlsDeSrcset(s.srcset ?? '')),
        ...imgs.map(({ attrs }) => attrs.src ?? ''),
      ];
      for (const url of urls) {
        const cheminSite = url.split(/[?#]/)[0];
        if (!cheminSite.startsWith('/') || cheminSite.startsWith('//')) {
          fautes.push(`${ou} : "${url}" n'est pas un chemin du site`);
          continue;
        }
        if (!cheminSite.endsWith('.svg')) fautes.push(`${ou} : "${url}" n'est pas un SVG`);
        const disque = join(DIST, ...decodeURIComponent(cheminSite).split('/').filter(Boolean));
        if (!existsSync(disque)) fautes.push(`${ou} : "${url}" introuvable dans le build (${disque})`);
      }
    });

    assert.equal(fautes.length, 0, `Page ${page} :\n${liste(fautes)}`);
  });
}

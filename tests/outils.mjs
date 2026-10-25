// Outils partagés par les tests du site construit (registre/0021).
// Aucune dépendance : node:fs, node:path, expressions régulières simples.
// Ce fichier n'est pas un test (il ne finit pas en .test.mjs).

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

/** Racine du dépôt (le dossier parent de tests/). */
export const RACINE = fileURLToPath(new URL('..', import.meta.url));

/** Le site construit : variable DIST, relative à la racine du dépôt (défaut : dist). */
export const DIST = resolve(RACINE, process.env.DIST || 'dist');

/**
 * Les dix-huit pages et leurs jumelles, qui font foi (brief 2a, matrice :
 * registre/0061, projets 4 et 5 : registre/0070, tableau de bord client :
 * registre/0090).
 */
export const JUMELLES = [
  { fr: '/', en: '/en/' },
  { fr: '/projets/uservoice/', en: '/en/projects/uservoice/' },
  { fr: '/projets/analyse-nps/', en: '/en/projects/nps-analysis/' },
  { fr: '/projets/audit-contenu/', en: '/en/projects/content-audit/' },
  { fr: '/projets/matrice-competences/', en: '/en/projects/skills-matrix/' },
  { fr: '/projets/fusion-plateformes/', en: '/en/projects/platform-merger/' },
  { fr: '/projets/mises-en-situation/', en: '/en/projects/speaking-practice/' },
  { fr: '/projets/tableau-de-bord-client/', en: '/en/projects/client-dashboard/' },
  { fr: '/a-propos/', en: '/en/about/' },
];

/** Les dix-huit pages à plat : { chemin, lang, jumelle, langJumelle }. */
export const PAGES = JUMELLES.flatMap(({ fr, en }) => [
  { chemin: fr, lang: 'fr', jumelle: en, langJumelle: 'en' },
  { chemin: en, lang: 'en', jumelle: fr, langJumelle: 'fr' },
]);

/** Le seul lien sortant attendu. */
export const LIENS_SORTANTS_PERMIS = ['https://www.linkedin.com/in/jean-perrier-b01b3281/'];

/** Échoue en clair si le site n'est pas construit. */
export function exigerDist() {
  assert.ok(
    existsSync(join(DIST, 'index.html')),
    `Site construit introuvable : ${join(DIST, 'index.html')} n'existe pas. ` +
      'Lance « npm run build » (ou « npx astro build --outDir X » puis DIST=X npm test).',
  );
}

/** Chemin disque de l'index.html d'une page ('/projets/uservoice/' → dist/projets/uservoice/index.html). */
export function fichierDePage(chemin) {
  return join(DIST, ...chemin.split('/').filter(Boolean), 'index.html');
}

/**
 * Tous les fichiers de DIST, en chemins relatifs à DIST avec des « / »,
 * hors de labo/ (pages d'essai, ignorées dans tous les tests).
 */
export function fichiersDuSite() {
  const sortie = [];
  const parcourir = (dossier) => {
    for (const nom of readdirSync(dossier)) {
      const complet = join(dossier, nom);
      const rel = relative(DIST, complet).split('\\').join('/');
      if (rel === 'labo' || rel.startsWith('labo/')) continue;
      if (statSync(complet).isDirectory()) parcourir(complet);
      else sortie.push(rel);
    }
  };
  if (existsSync(DIST)) parcourir(DIST);
  return sortie.sort();
}

export const lire = (rel) => readFileSync(join(DIST, rel), 'utf8');

/**
 * Les présentations autonomes (registre/0092) : des fichiers HTML copiés tels
 * quels depuis public/usecase/, hors du gabarit du site (ni pied, ni jumelle,
 * ni relief). Les tests du gabarit ne les voient pas : pagesHtml() les écarte,
 * ici et nulle part ailleurs. Les tests qui doivent les couvrir (tiers) passent
 * { horsGabarit: true } ; confidentialité les couvre par fichiersDuSite().
 */
export const HORS_GABARIT = 'usecase/';
export const estHorsGabarit = (rel) => rel.startsWith(HORS_GABARIT);

export const pagesHtml = ({ horsGabarit = false } = {}) =>
  fichiersDuSite().filter((f) => f.endsWith('.html') && (horsGabarit || !estHorsGabarit(f)));
export const feuillesCss = () => fichiersDuSite().filter((f) => f.endsWith('.css'));
export const scriptsJs = () => fichiersDuSite().filter((f) => /\.(m?js|cjs)$/.test(f));

/**
 * Le HTML sans commentaires, et sans le contenu des <script> et <style>
 * (les balises ouvrantes restent, avec leurs attributs). À utiliser pour
 * chercher des balises sans se laisser tromper par du code.
 */
export function sansCode(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/(<script\b(?:[^>"']|"[^"]*"|'[^']*')*>)[\s\S]*?<\/script\s*>/gi, '$1</script>')
    .replace(/(<style\b(?:[^>"']|"[^"]*"|'[^']*')*>)[\s\S]*?<\/style\s*>/gi, '$1</style>');
}

/** Contenus bruts des éléments <nom>…</nom> (pour <style> et <script>). */
export function contenus(html, nom) {
  const re = new RegExp(`<${nom}\\b(?:[^>"']|"[^"]*"|'[^']*')*>([\\s\\S]*?)<\\/${nom}\\s*>`, 'gi');
  return [...html.replace(/<!--[\s\S]*?-->/g, '').matchAll(re)].map((m) => m[1]);
}

const ENTITES = { '&amp;': '&', '&quot;': '"', '&#39;': "'", '&#x27;': "'", '&lt;': '<', '&gt;': '>' };
const decoder = (v) => v.replace(/&(?:amp|quot|#39|#x27|lt|gt);/g, (e) => ENTITES[e]);

/** Attributs d'une balise, noms en minuscules. Attribut sans valeur → ''. */
export function attributs(chaine) {
  const sortie = {};
  const re = /([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const m of chaine.matchAll(re)) {
    const nom = m[1].toLowerCase();
    if (!(nom in sortie)) sortie[nom] = decoder(m[2] ?? m[3] ?? m[4] ?? '');
  }
  return sortie;
}

/**
 * Balises ouvrantes d'un nom donné (ou toutes si nom = null) :
 * [{ nom, attrs }]. Travaille sur sansCode(html).
 */
export function balises(html, nom = null) {
  const motif = nom ? nom : '[a-zA-Z][\\w:-]*';
  const re = new RegExp(`<(${motif})(?=[\\s/>])((?:[^>"']|"[^"]*"|'[^']*')*)>`, 'gi');
  return [...sansCode(html).matchAll(re)].map((m) => ({
    nom: m[1].toLowerCase(),
    attrs: attributs(m[2]),
  }));
}

/** Origine du site déclarée dans astro.config.mjs (champ site), ou null. */
export const ORIGINE_DU_SITE = (() => {
  try {
    const conf = readFileSync(join(RACINE, 'astro.config.mjs'), 'utf8');
    const m = conf.match(/\bsite\s*:\s*['"`]([^'"`]+)['"`]/);
    return m ? new URL(m[1]).origin : null;
  } catch {
    return null;
  }
})();

/**
 * Vrai si l'URL pointe vers un autre domaine : elle a une autorité
 * (« https:// », « // », etc.) et son origine n'est pas celle du site.
 * Les chemins relatifs, « data: », « mailto: », « # » ne sont pas tiers.
 */
export function estTiers(url) {
  const u = url.trim();
  if (!/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(u)) return false;
  try {
    const origine = new URL(u, 'https://site.invalid').origin;
    return origine !== ORIGINE_DU_SITE;
  } catch {
    return true;
  }
}

/** Formate une liste de fautes pour un message d'échec lisible. */
export const liste = (fautes) => fautes.map((f) => `  - ${f}`).join('\n');

const VIDES = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

/**
 * Les éléments d'un HTML (sur sansCode), dans l'ordre :
 * [{ nom, attrs, classes, parent, ancetres (le plus proche d'abord), precedent
 *    (le frère élément d'avant), rang (1 pour le premier enfant), debut, fin, texte() }].
 * Pas de fermeture implicite : suffisant pour le HTML qu'Astro produit.
 */
export function elements(html) {
  const source = sansCode(html);
  const re = /<(\/?)([a-zA-Z][\w:-]*)(?=[\s/>])((?:[^>"']|"[^"]*"|'[^']*')*)>/g;
  const tous = [];
  const pile = [];
  const dernier = new Map(); // parent → son dernier enfant élément vu
  for (const m of source.matchAll(re)) {
    const nom = m[2].toLowerCase();
    if (m[1]) {
      const k = pile.map((e) => e.nom).lastIndexOf(nom);
      if (k >= 0) for (const e of pile.splice(k)) e.fin = m.index + m[0].length;
      continue;
    }
    const attrs = attributs(m[3]);
    const parent = pile.at(-1) ?? null;
    const precedent = dernier.get(parent) ?? null;
    const el = {
      nom,
      attrs,
      classes: (attrs.class ?? '').split(/\s+/).filter(Boolean),
      parent,
      ancetres: [...pile].reverse(),
      precedent,
      rang: precedent ? precedent.rang + 1 : 1,
      debut: m.index,
      fin: null,
      texte: () => source.slice(el.debut, el.fin ?? undefined).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(),
    };
    tous.push(el);
    dernier.set(parent, el);
    if (VIDES.has(nom) || /\/\s*$/.test(m[3])) el.fin = m.index + m[0].length;
    else pile.push(el);
  }
  return tous;
}

// Test 12 — Les infobulles sur les termes du métier produit (registre/0088).
// L'attendu se lit dans redaction/lexique.md, qui fait foi : les termes,
// leurs pages, leurs définitions FR et EN. Le test vérifie le site construit :
// une bulle par terme, sur la première occurrence, au bon endroit, avec la
// définition du lexique mot pour mot, sans script, avec ses replis CSS.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import {
  RACINE, DIST, PAGES, exigerDist, fichierDePage, sansCode, contenus, attributs, balises,
  feuillesCss, lire, liste,
} from './outils.mjs';

// ─── Le lexique, lu dans redaction/lexique.md ─────────────────────────────

const LEXIQUE_MD = readFileSync(join(RACINE, 'redaction', 'lexique.md'), 'utf8');

/** Les noms de pages de la colonne « Pages » du lexique, et leurs chemins. */
const NOMS_DE_PAGES = {
  Matrice: { fr: '/projets/matrice-competences/', en: '/en/projects/skills-matrix/' },
  'Mises en situation': { fr: '/projets/mises-en-situation/', en: '/en/projects/speaking-practice/' },
  Audit: { fr: '/projets/audit-contenu/', en: '/en/projects/content-audit/' },
  Fusion: { fr: '/projets/fusion-plateformes/', en: '/en/projects/platform-merger/' },
  'Tableau de bord client': { fr: '/projets/tableau-de-bord-client/', en: '/en/projects/client-dashboard/' },
  'À propos': { fr: '/a-propos/', en: '/en/about/' },
  'Mon métier': { fr: '/mon-metier/', en: '/en/my-job/' },
};

/**
 * Les termes dont le texte anglais diffère de la colonne « Terme » : la note
 * du lexique (« À vérifier à l'intégration ») les donne entre guillemets.
 */
const VARIANTES_EN = { 'lead développeur': 'lead developer', 'scale-up SaaS B2B': 'B2B SaaS scale-up' };

/** Le tableau du lexique : [{ terme, pages: [{ nom, langues }], fr, en }], « — » = absente. */
const LIGNES = (() => {
  const lignes = LEXIQUE_MD.split(/\r?\n/).filter((l) => l.startsWith('|'));
  assert.ok(lignes.length > 2, 'redaction/lexique.md : tableau des termes introuvable.');
  assert.match(lignes[0], /^\|\s*Terme\s*\|\s*Pages\s*\|\s*FR\s*\|\s*EN\s*\|/, 'lexique : en-tête du tableau inattendu');
  return lignes.slice(2).map((l) => {
    const [terme, pages, fr, en] = l.split('|').slice(1, -1).map((c) => c.trim());
    const absente = (d) => (d === '—' || d === '' ? null : d);
    return {
      terme,
      fr: absente(fr),
      en: absente(en),
      pages: pages.split(',').map((p) => {
        const m = p.trim().match(/^(.*?)\s*(?:\((FR|EN) seul\))?$/);
        return { nom: m[1], langues: m[2] ? [m[2].toLowerCase()] : ['fr', 'en'] };
      }),
    };
  });
})();

const echapperRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Le motif d'un terme : ses mots séparés par un blanc quelconque, singulier ou pluriel. */
function motifDe(terme) {
  const mots = terme.split(/\s+/);
  const dernier = mots.pop();
  const formes = new Set([dernier]);
  if (/ies$/i.test(dernier)) formes.add(dernier.replace(/ies$/i, 'y'));
  else if (/s$/i.test(dernier)) formes.add(dernier.slice(0, -1));
  else formes.add(/y$/i.test(dernier) ? dernier.replace(/y$/i, 'ies') : `${dernier}s`);
  const fin = `(?:${[...formes].map(echapperRe).join('|')})`;
  return [...mots.map(echapperRe), fin].join('[\\s\\u00a0]+');
}

/** Les termes d'une langue : { terme, definition, motif (source), seul (RegExp entière) }. */
const termesDe = (langue) =>
  LIGNES.filter((l) => l[langue]).map((l) => {
    const terme = langue === 'en' ? (VARIANTES_EN[l.terme] ?? l.terme) : l.terme;
    const motif = motifDe(terme);
    return { cle: l.terme, terme, definition: l[langue], motif, seul: new RegExp(`^(?:${motif})$`, 'iu') };
  });

const TERMES = { fr: termesDe('fr'), en: termesDe('en') };

/** Toutes les occurrences des termes d'une langue dans un texte, mots entiers. */
const chercheur = (langue) =>
  new RegExp(`(?<![\\p{L}\\p{N}])(?:${TERMES[langue].map((t) => `(?:${t.motif})`).join('|')})(?![\\p{L}\\p{N}])`, 'giu');
const termeDuMot = (mot, langue) => TERMES[langue].find((t) => t.seul.test(normaliser(mot)));

/** Les bulles attendues par page : chemin → [terme]. */
const ATTENDU = new Map();
for (const ligne of LIGNES)
  for (const { nom, langues } of ligne.pages) {
    const chemins = NOMS_DE_PAGES[nom];
    assert.ok(chemins, `lexique : page « ${nom} » inconnue du test (terme « ${ligne.terme} »)`);
    for (const langue of langues) {
      if (!ligne[langue]) continue;
      const terme = TERMES[langue].find((t) => t.cle === ligne.terme);
      ATTENDU.set(chemins[langue], [...(ATTENDU.get(chemins[langue]) ?? []), terme]);
    }
  }

/** Toutes les pages du site, 404 comprise : { chemin, lang, fichier }. */
const TOUTES = [
  ...PAGES.map(({ chemin, lang }) => ({ chemin, lang, fichier: fichierDePage(chemin) })),
  { chemin: '/404.html', lang: 'fr', fichier: join(DIST, '404.html') },
];
const AVEC = TOUTES.filter((p) => ATTENDU.has(p.chemin));
const SANS = TOUTES.filter((p) => !ATTENDU.has(p.chemin));

// ─── Lecture du HTML ──────────────────────────────────────────────────────

const ENTITES = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: '\u00a0', rsquo: '’', lsquo: '‘' };
const decoder = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (e, c) =>
    c[0] === '#'
      ? String.fromCodePoint(c[1].toLowerCase() === 'x' ? parseInt(c.slice(2), 16) : parseInt(c.slice(1), 10))
      : (ENTITES[c.toLowerCase()] ?? e),
  );
/** Blancs (insécables compris) réduits à une espace, bords retirés. */
const normaliser = (s) => s.replace(/[\s\u00a0]+/g, ' ').trim();
/** Texte d'un fragment : balises retirées, entités décodées, blancs réduits. */
const texte = (fragment) => normaliser(decoder(fragment.replace(/<[^>]*>/g, '')));
const classes = (attrs) => (attrs.class ?? '').split(/\s+/).filter(Boolean);

const BALISE = /(<!--[\s\S]*?-->|<(?:[^>"']|"[^"]*"|'[^']*')*>)/;
const NOM = /^<(\/?)([a-z][a-z0-9-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>$/i;

/**
 * Découpe un HTML en balises et en textes, dans l'ordre, en tenant le compte
 * des éléments ouverts (pour les noms de `suivis`) et de la bulle en cours.
 * Rend [{ genre: 'balise'|'texte', brut, nom, ferme, attrs, ouverts, dansBulle }].
 */
function jetons(html, suivis) {
  const ouverts = Object.fromEntries([...suivis].map((n) => [n, 0]));
  let bulle = 0;
  const sortie = [];
  for (const brut of sansCode(html).split(BALISE)) {
    if (!brut) continue;
    const m = brut.startsWith('<') ? NOM.exec(brut) : null;
    if (!brut.startsWith('<') || !m) {
      if (!brut.startsWith('<'))
        sortie.push({ genre: 'texte', brut, ouverts: { ...ouverts }, dansBulle: bulle > 0 });
      continue;
    }
    const nom = m[2].toLowerCase();
    const ferme = m[1] === '/';
    const attrs = ferme ? {} : attributs(m[3]);
    sortie.push({ genre: 'balise', brut, nom, ferme, attrs, ouverts: { ...ouverts }, dansBulle: bulle > 0 });
    if (brut.endsWith('/>')) continue;
    if (suivis.has(nom)) ouverts[nom] = Math.max(0, ouverts[nom] + (ferme ? -1 : 1));
    if (nom === 'span') {
      if (bulle > 0) bulle += ferme ? -1 : 1;
      else if (!ferme && classes(attrs).includes('infobulle')) bulle = 1;
    }
  }
  return sortie;
}

/** Les éléments dont l'ouvrante satisfait `filtre` : [{ nom, attrs, interieur, debut, fin }]. */
function elements(html, filtre) {
  const source = sansCode(html);
  const re = /<(\/?)([a-z][a-z0-9-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/gi;
  const ouvrantes = [...source.matchAll(re)];
  const sortie = [];
  ouvrantes.forEach((m, i) => {
    if (m[1] || m[0].endsWith('/>')) return;
    const nom = m[2].toLowerCase();
    const attrs = attributs(m[3]);
    if (!filtre(nom, attrs)) return;
    let profondeur = 1;
    for (const n of ouvrantes.slice(i + 1)) {
      if (n[2].toLowerCase() !== nom || n[0].endsWith('/>')) continue;
      profondeur += n[1] ? -1 : 1;
      if (profondeur === 0) {
        const debut = m.index + m[0].length;
        sortie.push({ nom, attrs, interieur: source.slice(debut, n.index), debut: m.index, fin: n.index + n[0].length });
        return;
      }
    }
    sortie.push({ nom, attrs, interieur: source.slice(m.index + m[0].length), debut: m.index, fin: source.length });
  });
  return sortie;
}

/** Les boutons .terme d'une page : { attrs, mot, suite } (suite : ce qui suit </button>). */
function boutons(html) {
  const source = sansCode(html);
  const re = /<button(?=[\s>])((?:[^>"']|"[^"]*"|'[^']*')*)>([\s\S]*?)<\/button\s*>/gi;
  return [...source.matchAll(re)]
    .map((m) => ({ attrs: attributs(m[1]), mot: texte(m[2]), suite: source.slice(m.index + m[0].length) }))
    .filter(({ attrs }) => classes(attrs).includes('terme'));
}

/** Les bulles d'une page : les span.infobulle. */
const bulles = (html) => elements(html, (nom, attrs) => nom === 'span' && classes(attrs).includes('infobulle'));

/** Le HTML sans ses bulles, chaque bouton .terme remplacé par son mot. */
function sansBulles(html) {
  let source = sansCode(html);
  for (const b of bulles(source).reverse()) source = source.slice(0, b.debut) + source.slice(b.fin);
  return source.replace(
    /<button(?=[\s>])((?:[^>"']|"[^"]*"|'[^']*')*)>([\s\S]*?)<\/button\s*>/gi,
    (tout, attrs, mot) => (classes(attributs(attrs)).includes('terme') ? mot : tout),
  );
}

const lirePage = ({ chemin, fichier }) => {
  assert.ok(existsSync(fichier), `La page ${chemin} manque : ${fichier} n'existe pas.`);
  return readFileSync(fichier, 'utf8');
};

/**
 * Les fichiers source d'une page : pour un projet, son Markdown et
 * src/contenu/projets.ts (les compétences du cadre, dont « Discovery ») ;
 * sinon la page Mon métier ou la page À propos.
 */
function sourcesDe(chemin, langue) {
  if (/\/(projets|projects)\//.test(chemin)) {
    const slug = chemin.split('/').filter(Boolean).pop();
    return [join(RACINE, 'src', 'contenu', 'projets', langue, `${slug}.md`), join(RACINE, 'src', 'contenu', 'projets.ts')];
  }
  if (chemin === NOMS_DE_PAGES['Mon métier'][langue])
    return [join(RACINE, 'src', 'pages', ...(langue === 'en' ? ['en', 'my-job.astro'] : ['mon-metier.astro']))];
  return [join(RACINE, 'src', 'pages', ...(langue === 'en' ? ['en', 'about.astro'] : ['a-propos.astro']))];
}

// Où un terme reste du texte (le texte de ces éléments n'est jamais marqué).
const HORS_JEU = new Set([
  'head', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'summary', 'label', 'figure', 'figcaption',
  'svg', 'code', 'pre', 'textarea', 'select', 'title', 'template', 'script', 'style',
]);
// Où un bouton .terme ne doit jamais se trouver (point 5).
const INTERDITS = ['head', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'summary', 'figure', 'figcaption'];

// ─── Le lexique lui-même ──────────────────────────────────────────────────

test('infobulles : le lexique se lit (douze termes, des définitions sans point final, les variantes EN citées)', () => {
  const fautes = [];
  if (LIGNES.length !== 12) fautes.push(`${LIGNES.length} terme(s) lus dans le tableau : attendu 12`);
  for (const l of LIGNES)
    for (const langue of ['fr', 'en']) if (l[langue]?.endsWith('.')) fautes.push(`« ${l.terme} » (${langue}) finit par un point`);
  for (const v of Object.values(VARIANTES_EN))
    if (!LEXIQUE_MD.includes(`« ${v} »`)) fautes.push(`variante EN « ${v} » absente de la note du lexique`);
  if (ATTENDU.size !== 14) fautes.push(`${ATTENDU.size} page(s) à bulles : attendu 14 (sept paires FR/EN)`);
  assert.equal(fautes.length, 0, `Lexique :\n${liste(fautes)}`);
});

// ─── 1, 6, 7. Les pages à bulles ──────────────────────────────────────────

for (const page of AVEC) {
  const attendus = ATTENDU.get(page.chemin);

  test(`infobulles : ${page.chemin} porte une bulle pour ${attendus.map((t) => t.terme).join(', ')}, sur la première occurrence`, () => {
    exigerDist();
    const html = lirePage(page);
    const fautes = [];

    // Une bulle par terme attendu, aucune autre.
    const vus = boutons(html).map((b) => ({ ...b, t: termeDuMot(b.mot, page.lang) }));
    for (const b of vus) if (!b.t) fautes.push(`bouton « ${b.mot} » : aucun terme du lexique (${page.lang}) ne lui correspond`);
    const obtenus = vus.filter((b) => b.t).map((b) => b.t.cle);
    for (const t of attendus) {
      const n = obtenus.filter((c) => c === t.cle).length;
      if (n !== 1) fautes.push(`« ${t.terme} » : ${n} bulle(s), attendu 1`);
    }
    for (const c of new Set(obtenus))
      if (!attendus.some((t) => t.cle === c)) fautes.push(`« ${c} » : bulle inattendue (le lexique ne la prévoit pas sur cette page)`);

    // La première occurrence porte la bulle ; les suivantes restent du texte.
    const premier = new Map();
    const motif = chercheur(page.lang);
    let dansTerme = false;
    for (const j of jetons(html, HORS_JEU)) {
      if (j.dansBulle) continue;
      if (j.genre === 'balise') {
        if (j.nom === 'button') dansTerme = !j.ferme && classes(j.attrs).includes('terme');
        continue;
      }
      // Le mot d'un bouton .terme compte pour une bulle ; tout autre texte hors jeu ne compte pas.
      const horsJeu = Object.values(j.ouverts).some((n) => n > 0);
      for (const m of decoder(j.brut).matchAll(motif)) {
        const t = termeDuMot(m[0], page.lang);
        if (!t || premier.has(t.cle)) continue;
        if (dansTerme) premier.set(t.cle, { bulle: true, mot: m[0] });
        else if (!horsJeu) premier.set(t.cle, { bulle: false, mot: m[0], contexte: normaliser(decoder(j.brut)).slice(0, 80) });
      }
    }
    for (const t of attendus) {
      const p = premier.get(t.cle);
      if (p && !p.bulle) fautes.push(`« ${t.terme} » : première occurrence sans bulle (« ${p.mot} », dans « ${p.contexte} »)`);
    }
    assert.equal(fautes.length, 0, `${page.chemin} :\n${liste(fautes)}`);
  });

  test(`infobulles : ${page.chemin}, le texte de chaque bulle est la définition du lexique (${page.lang}), le point final à part`, () => {
    exigerDist();
    const html = lirePage(page);
    const fautes = [];
    const parId = new Map(bulles(html).map((b) => [b.attrs.id, b]));
    for (const { attrs, mot } of boutons(html)) {
      const t = termeDuMot(mot, page.lang);
      if (!t) continue; // signalé par le test précédent
      const bulle = parId.get(attrs.popovertarget);
      if (!bulle) {
        fautes.push(`« ${mot} » : bulle ${attrs.popovertarget} introuvable`);
        continue;
      }
      const decrit = (attrs['aria-describedby'] ?? '').split(/\s+/).filter(Boolean);
      const cibles = elements(bulle.interieur, (n, a) => decrit.includes(a.id));
      if (cibles.length !== 1) fautes.push(`« ${mot} » : la description (${decrit.join(' ')}) n'est pas un élément de la bulle`);
      else if (texte(cibles[0].interieur) !== t.definition)
        fautes.push(`« ${t.terme} » : bulle « ${texte(cibles[0].interieur)} », lexique « ${t.definition} »`);
      const fins = elements(bulle.interieur, (n, a) => classes(a).includes('infobulle__fin'));
      if (fins.length !== 1 || texte(fins[0].interieur) !== '.')
        fautes.push(`« ${t.terme} » : le point final n'est pas dans un unique .infobulle__fin`);
      if (!texte(bulle.interieur).endsWith(`${t.definition}.`))
        fautes.push(`« ${t.terme} » : la bulle ne finit pas par la définition suivie du point`);
      const tete = elements(bulle.interieur, (n) => n === 'strong')[0];
      if (!tete || texte(tete.interieur).toLowerCase() !== t.terme.toLowerCase())
        fautes.push(`« ${t.terme} » : le terme en gras de la bulle est « ${tete ? texte(tete.interieur) : '(absent)'} »`);
    }
    assert.equal(fautes.length, 0, `${page.chemin} :\n${liste(fautes)}`);
  });

  test(`infobulles : ${page.chemin}, le mot de chaque bouton est celui du texte source (casse et pluriel)`, () => {
    exigerDist();
    const html = lirePage(page);
    const fichiers = sourcesDe(page.chemin, page.lang);
    for (const f of fichiers) assert.ok(existsSync(f), `Source de ${page.chemin} introuvable : ${f}`);
    const source = fichiers.map((f) => normaliser(readFileSync(f, 'utf8').replace(/&nbsp;/g, ' '))).join('\n');
    const fautes = [];
    for (const { mot } of boutons(html)) {
      const re = new RegExp(`(?<![\\p{L}\\p{N}])${echapperRe(normaliser(mot))}(?![\\p{L}\\p{N}])`, 'u');
      if (!re.test(source))
        fautes.push(`« ${mot} » n'est pas écrit ainsi dans ${fichiers.map((f) => relative(RACINE, f)).join(' ni ')}`);
    }
    assert.equal(fautes.length, 0, `${page.chemin} :\n${liste(fautes)}`);
  });
}

// ─── 2. Les pages sans bulle ──────────────────────────────────────────────

test(`infobulles : aucune bulle sur ${SANS.map((p) => p.chemin).join(', ')}`, () => {
  exigerDist();
  const fautes = [];
  for (const page of SANS) {
    const html = lirePage(page);
    const n = boutons(html).length + bulles(html).length + balises(html).filter(({ attrs }) => 'popover' in attrs).length;
    if (n) fautes.push(`${page.chemin} : ${n} bouton(s) .terme, bulle(s) ou popover`);
  }
  assert.equal(fautes.length, 0, `Bulles inattendues :\n${liste(fautes)}`);
});

// ─── 3, 4, 5. Le balisage, sur toutes les pages ───────────────────────────

for (const page of TOUTES) {
  test(`infobulles : ${page.chemin}, chaque bouton .terme est relié à sa bulle, qui le suit immédiatement`, () => {
    exigerDist();
    const html = lirePage(page);
    const fautes = [];
    const ids = new Set(balises(html).map(({ attrs }) => attrs.id).filter(Boolean));
    const lesBoutons = boutons(html);
    for (const { attrs, mot, suite } of lesBoutons) {
      if (attrs.type !== 'button') fautes.push(`« ${mot} » : type="${attrs.type ?? ''}", attendu type="button"`);
      const cible = attrs.popovertarget;
      if (!cible) fautes.push(`« ${mot} » : pas de popovertarget`);
      const voisin = suite.match(/^\s*<span(?=[\s>])((?:[^>"']|"[^"]*"|'[^']*')*)>/i);
      const a = voisin ? attributs(voisin[1]) : null;
      if (!a || !classes(a).includes('infobulle') || !('popover' in a) || a.id !== cible)
        fautes.push(`« ${mot} » : n'est pas suivi immédiatement du span.infobulle[popover] id="${cible}"`);
      const decrit = (attrs['aria-describedby'] ?? '').split(/\s+/).filter(Boolean);
      if (!decrit.length) fautes.push(`« ${mot} » : pas d'aria-describedby`);
      for (const id of decrit) if (!ids.has(id)) fautes.push(`« ${mot} » : aria-describedby="${id}" ne désigne aucun id de la page`);
    }
    const nBulles = bulles(html).length;
    if (nBulles !== lesBoutons.length) fautes.push(`${lesBoutons.length} bouton(s) .terme pour ${nBulles} span.infobulle`);
    assert.equal(fautes.length, 0, `${page.chemin} :\n${liste(fautes)}`);
  });

  test(`infobulles : ${page.chemin}, les ids infobulle-* sont uniques`, () => {
    exigerDist();
    const ids = balises(lirePage(page)).map(({ attrs }) => attrs.id).filter((id) => id?.startsWith('infobulle-'));
    const doublons = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
    assert.equal(doublons.length, 0, `${page.chemin} : ids en double :\n${liste(doublons)}`);
  });

  test(`infobulles : ${page.chemin}, aucun bouton .terme dans <head>, un titre, un lien, un <summary>, une figure ni un attribut`, () => {
    exigerDist();
    const html = lirePage(page);
    const fautes = [];
    for (const j of jetons(html, new Set(INTERDITS))) {
      if (j.genre !== 'balise' || j.ferme) continue;
      if (j.nom === 'button' && classes(j.attrs).includes('terme')) {
        const dans = INTERDITS.filter((n) => j.ouverts[n] > 0);
        if (dans.length) fautes.push(`bouton .terme dans <${dans.join('>, <')}>`);
      }
      for (const [nom, valeur] of Object.entries(j.attrs))
        if (/<|popovertarget|class=["']?terme/i.test(valeur)) fautes.push(`<${j.nom} ${nom}="${valeur.slice(0, 60)}…"> : balisage dans un attribut`);
    }
    // Un bouton glissé dans un attribut casserait le découpage : on le cherche aussi dans le brut des balises.
    for (const m of sansCode(html).matchAll(/="[^"]*<button\b[^"]*"/gi)) fautes.push(`bouton dans un attribut : ${m[0].slice(0, 60)}…`);
    const tete = contenus(html, 'head').join('');
    if (/class=["']?terme|infobulle/.test(tete.replace(/<style\b[\s\S]*?<\/style>/gi, '')))
      fautes.push('le <head> contient une bulle');
    assert.equal(fautes.length, 0, `${page.chemin} :\n${liste(fautes)}`);
  });
}

// ─── 8. La parenthèse du Design Sprint ────────────────────────────────────

for (const chemin of Object.values(NOMS_DE_PAGES['Mises en situation'])) {
  test(`infobulles : ${chemin} n'explique plus le Design Sprint entre parenthèses (la bulle le fait)`, () => {
    exigerDist();
    const html = lirePage({ chemin, fichier: fichierDePage(chemin) });
    const fautes = [];
    const tout = normaliser(decoder(html)).replace(/[’']/g, "'");
    const horsBulles = normaliser(decoder(sansBulles(html))).replace(/[’']/g, "'");
    for (const phrase of ["quelques jours d'ateliers", 'a few days of workshops']) {
      if (horsBulles.toLowerCase().includes(phrase)) fautes.push(`« ${phrase} » reste dans la page, hors de la bulle`);
      if (new RegExp(`\\(\\s*${phrase}`, 'i').test(tout)) fautes.push(`« (${phrase} » : la parenthèse est toujours là`);
    }
    assert.equal(fautes.length, 0, `${chemin} :\n${liste(fautes)}`);
  });
}

// ─── 9. Le CSS, et pas de script ──────────────────────────────────────────

test('infobulles : le CSS construit porte .terme, .infobulle et les replis (sans popover, ancrage CSS)', () => {
  exigerDist();
  const css = [
    ...feuillesCss().map(lire),
    ...TOUTES.filter((p) => existsSync(p.fichier)).flatMap((p) => contenus(readFileSync(p.fichier, 'utf8'), 'style')),
  ].join('\n');
  const fautes = [];
  if (!/\.terme\b/.test(css)) fautes.push('aucune règle .terme');
  if (!/\.infobulle\b/.test(css)) fautes.push('aucune règle .infobulle');
  if (!/@supports\s+not\s+selector\(\s*:popover-open\s*\)/i.test(css)) fautes.push('pas de repli @supports not selector(:popover-open)');
  if (!/@supports[^{]*anchor-name/i.test(css)) fautes.push("pas de bloc @supports sur l'ancrage CSS (anchor-name)");
  assert.equal(fautes.length, 0, `CSS :\n${liste(fautes)}`);
});

test("infobulles : aucun <script> n'est ajouté par les bulles", () => {
  exigerDist();
  const signature = ({ attrs, code }) => attrs.src ?? normaliser(code);
  const scripts = (html) => {
    const ouvrantes = balises(html, 'script');
    return contenus(html, 'script').map((code, i) => ({ attrs: ouvrantes[i]?.attrs ?? {}, code }));
  };
  const fautes = [];
  // Un script des pages à bulles doit exister à l'identique sur une page sans bulle.
  const connus = new Set(SANS.flatMap((p) => scripts(lirePage(p)).map(signature)));
  for (const page of AVEC)
    for (const s of scripts(lirePage(page)))
      if (!connus.has(signature(s))) fautes.push(`${page.chemin} : script propre aux pages à bulles (${signature(s).slice(0, 80)}…)`);
  // Et aucun script, en ligne ou en fichier, ne touche aux bulles.
  const codes = [
    ...TOUTES.filter((p) => existsSync(p.fichier)).flatMap((p) => scripts(readFileSync(p.fichier, 'utf8')).map((s) => [p.chemin, s.code])),
    ...readdirSync(join(DIST, '_astro')).filter((f) => /\.m?js$/.test(f)).map((f) => [f, readFileSync(join(DIST, '_astro', f), 'utf8')]),
  ];
  for (const [ou, code] of codes)
    if (/infobulle|popovertarget|\.terme\b|showPopover|togglePopover/.test(code)) fautes.push(`${ou} : un script manipule les bulles`);
  assert.equal(fautes.length, 0, `Scripts :\n${liste(fautes)}`);
});

// ─── 10. La maquette du labo ne part pas en ligne ─────────────────────────

test('infobulles : rien de labo/infobulles dans le site construit', () => {
  exigerDist();
  const fautes = [];
  const parcourir = (dossier) => {
    for (const nom of readdirSync(dossier)) {
      const complet = join(dossier, nom);
      const rel = relative(DIST, complet).split('\\').join('/');
      if (/labo\/infobulles/i.test(`${rel}/`)) fautes.push(`fichier ou dossier ${rel}`);
      if (statSync(complet).isDirectory()) parcourir(complet);
      else if (/\.(html|css|m?js|xml|txt|json|svg)$/i.test(nom) && /labo\/infobulles/i.test(readFileSync(complet, 'utf8')))
        fautes.push(`${rel} cite labo/infobulles`);
    }
  };
  parcourir(DIST);
  assert.equal(fautes.length, 0, `La maquette a fuité :\n${liste(fautes)}`);
});

// Test — « Mon métier en clair » (registre/0094) : la page /mon-metier/ et sa
// jumelle /en/my-job/, et la ligne-lien qui y mène depuis chaque accueil.
// Ce que la page doit être se lit dans le registre : un titre, quatre
// sections dans l'ordre, les liens vers les quatre projets cités et vers
// « À propos », la bulle « discovery ». Les jumelles et les bulles ont leurs
// tests généraux (jumelles, infobulles) ; ici, ce qui protège cette page-là.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { DIST, exigerDist, fichierDePage, fichiersDuSite, sansCode, balises, elements, lire, liste } from './outils.mjs';

/** Ce qui fait foi, par langue (registre/0094, tri de Jean du 2026-10-25). */
const PAGE = {
  fr: {
    chemin: '/mon-metier/',
    jumelle: '/en/my-job/',
    accueil: '/',
    ligne: 'Mon métier et mes points forts, en clair (2 min)',
    h1: 'Mon métier en clair',
    h2: ['Le métier en trois phrases', 'Je dirige mon équipe', 'Je travaille avec les autres équipes', 'Trois points forts'],
    liens: {
      'Matrice de compétences': '/projets/matrice-competences/',
      'Tableau de bord client': '/projets/tableau-de-bord-client/',
      'Mises en situation orales': '/projets/mises-en-situation/',
      'Audit contenu': '/projets/audit-contenu/',
      'À propos': '/a-propos/',
    },
    // La bulle « discovery », à l'endroit où le texte l'emploie, et sa définition (redaction/lexique.md).
    discovery: { avant: 'projets de', apres: ', je choisis' },
    definition: 'le travail d’écouter les utilisateurs et de tester des idées avant de décider quoi construire',
  },
  en: {
    chemin: '/en/my-job/',
    jumelle: '/mon-metier/',
    accueil: '/en/',
    ligne: 'My job and my strengths, in plain English (2 min)',
    h1: 'My job in plain English',
    h2: ['The job in three sentences', 'I lead my team', 'I work with the other teams', 'Three strengths'],
    liens: {
      'Skills matrix': '/en/projects/skills-matrix/',
      'Client dashboard': '/en/projects/client-dashboard/',
      'Speaking role-plays': '/en/projects/speaking-practice/',
      'Content audit': '/en/projects/content-audit/',
      About: '/en/about/',
    },
    discovery: { avant: 'On their', apres: 'projects, I decide' },
    definition: 'the work of talking to users and testing ideas before deciding what to build',
  },
};

const ENTITES = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ', rsquo: '’', lsquo: '‘' };
/** Entités décodées, blancs (insécables compris) réduits à une espace. */
const net = (s) =>
  s
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (e, c) =>
      c[0] === '#'
        ? String.fromCodePoint(c[1].toLowerCase() === 'x' ? parseInt(c.slice(2), 16) : parseInt(c.slice(1), 10))
        : (ENTITES[c.toLowerCase()] ?? e),
    )
    .replace(/[\s ]+/g, ' ')
    .trim();

const lirePage = (chemin) => {
  const fichier = fichierDePage(chemin);
  assert.ok(existsSync(fichier), `La page ${chemin} manque : ${fichier} n'existe pas.`);
  return readFileSync(fichier, 'utf8');
};

/** Le chemin d'un href interne ('/en/about/#x' → '/en/about/'), ou null s'il sort du site. */
const cheminDe = (href) => {
  if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(href) || /^(?:mailto|tel):/i.test(href)) return null;
  return new URL(href, 'https://site.invalid').pathname;
};
const construite = (chemin) => existsSync(fichierDePage(chemin));

for (const [lang, p] of Object.entries(PAGE)) {
  // ─── La page et sa jumelle ──────────────────────────────────────────────

  test(`mon métier : ${p.chemin} est construite, en lang="${lang}", et répond à sa jumelle ${p.jumelle}`, () => {
    exigerDist();
    const html = lirePage(p.chemin);
    const autre = lang === 'fr' ? 'en' : 'fr';
    const fautes = [];
    if (balises(html, 'html')[0]?.attrs.lang !== lang) fautes.push(`<html lang> : attendu "${lang}"`);
    if (!construite(p.jumelle)) fautes.push(`la jumelle ${p.jumelle} n'est pas construite`);
    const bascules = balises(html, 'a').filter((b) => 'hreflang' in b.attrs);
    if (!bascules.some(({ attrs }) => attrs.href === p.jumelle && attrs.hreflang === autre))
      fautes.push(`aucune bascule <a href="${p.jumelle}" hreflang="${autre}">`);
    const alternates = balises(html, 'link').filter(({ attrs }) => /\balternate\b/i.test(attrs.rel ?? ''));
    for (const [l, cible] of [[lang, p.chemin], [autre, p.jumelle]])
      if (!alternates.some(({ attrs }) => attrs.hreflang === l && new URL(attrs.href ?? '', 'https://site.invalid').pathname === cible))
        fautes.push(`aucun <link rel="alternate" hreflang="${l}"> vers ${cible}`);
    // La jumelle renvoie ici.
    if (construite(p.jumelle)) {
      const retour = balises(lirePage(p.jumelle), 'a').filter((b) => 'hreflang' in b.attrs);
      if (!retour.some(({ attrs }) => attrs.href === p.chemin && attrs.hreflang === lang))
        fautes.push(`${p.jumelle} ne bascule pas vers ${p.chemin}`);
    }
    assert.equal(fautes.length, 0, `${p.chemin} :\n${liste(fautes)}`);
  });

  test(`mon métier : ${p.chemin} figure au plan du site`, () => {
    exigerDist();
    const plans = fichiersDuSite().filter((f) => /(^|\/)sitemap[^/]*\.xml$/.test(f));
    assert.ok(plans.length > 0, `Aucun sitemap*.xml dans ${DIST} : lance le build complet.`);
    const locs = plans.flatMap((f) => [...lire(f).matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => new URL(m[1]).pathname));
    assert.ok(locs.includes(p.chemin), `${p.chemin} absente de ${plans.join(', ')}`);
  });

  // ─── La ligne-lien de l'accueil ─────────────────────────────────────────

  test(`mon métier : l'accueil ${p.accueil} porte, juste après le sous-titre, la ligne-lien « ${p.ligne} » vers ${p.chemin}`, () => {
    exigerDist();
    const tous = elements(lirePage(p.accueil));
    const fautes = [];
    const lignes = tous.filter((e) => e.classes.includes('accroche__lien'));
    if (lignes.length !== 1) fautes.push(`${lignes.length} élément(s) .accroche__lien, attendu 1`);
    const ligne = lignes[0];
    if (ligne) {
      if (ligne.nom !== 'p') fautes.push(`.accroche__lien est un <${ligne.nom}>, attendu un <p> (une ligne, pas un bloc)`);
      const avant = ligne.precedent;
      if (!avant?.classes.includes('accroche__sous-titre'))
        fautes.push(`l'élément d'avant est <${avant?.nom ?? '(aucun)'} class="${avant?.classes.join(' ') ?? ''}">, attendu le sous-titre .accroche__sous-titre`);
      const liens = tous.filter((e) => e.nom === 'a' && e.ancetres.includes(ligne));
      if (liens.length !== 1) fautes.push(`${liens.length} lien(s) dans la ligne, attendu 1`);
      const [a] = liens;
      if (a) {
        if (a.attrs.href !== p.chemin) fautes.push(`le lien mène à "${a.attrs.href}", attendu "${p.chemin}" (la page de sa langue)`);
        if (!construite(cheminDe(a.attrs.href ?? '') ?? '')) fautes.push(`la cible ${a.attrs.href} n'est pas une page construite`);
        if (net(a.texte()) !== p.ligne) fautes.push(`texte du lien « ${net(a.texte())} », attendu « ${p.ligne} »`);
      }
      if (net(ligne.texte()) !== p.ligne) fautes.push(`la ligne porte autre chose que son lien : « ${net(ligne.texte())} »`);
    }
    assert.equal(fautes.length, 0, `Accueil ${p.accueil} :\n${liste(fautes)}`);
  });

  // ─── Le contenu de la page ──────────────────────────────────────────────

  test(`mon métier : ${p.chemin} a un h1 « ${p.h1} » et quatre h2, dans l'ordre`, () => {
    exigerDist();
    const tous = elements(lirePage(p.chemin));
    const h1 = tous.filter((e) => e.nom === 'h1').map((e) => net(e.texte()));
    const h2 = tous.filter((e) => e.nom === 'h2').map((e) => net(e.texte()));
    const fautes = [];
    if (h1.length !== 1 || h1[0] !== p.h1) fautes.push(`h1 : ${JSON.stringify(h1)}, attendu ["${p.h1}"]`);
    if (JSON.stringify(h2) !== JSON.stringify(p.h2)) fautes.push(`h2 : ${JSON.stringify(h2)}, attendu ${JSON.stringify(p.h2)}`);
    assert.equal(fautes.length, 0, `${p.chemin} :\n${liste(fautes)}`);
  });

  test(`mon métier : ${p.chemin} renvoie vers les quatre projets et « À propos » de sa langue, et chaque lien du texte mène à une page construite`, () => {
    exigerDist();
    const tous = elements(lirePage(p.chemin));
    const article = tous.find((e) => e.nom === 'article');
    assert.ok(article, `${p.chemin} : aucun <article>`);
    const liens = tous.filter((e) => e.nom === 'a' && e.ancetres.includes(article));
    const cibles = new Set(liens.map((a) => cheminDe(a.attrs.href ?? '')).filter(Boolean));
    const fautes = [];
    for (const [nom, cible] of Object.entries(p.liens)) if (!cibles.has(cible)) fautes.push(`aucun lien vers ${nom} (${cible})`);
    for (const a of liens) {
      const c = cheminDe(a.attrs.href ?? '');
      if (c === null) continue; // LinkedIn : le lien sortant permis, tenu par tiers.test.mjs
      if (!construite(c)) fautes.push(`« ${net(a.texte())} » mène à ${a.attrs.href}, qui n'est pas une page construite`);
      else if (lang === 'fr' ? c.startsWith('/en/') : !c.startsWith('/en/'))
        fautes.push(`« ${net(a.texte())} » mène à ${c}, une page de l'autre langue`);
    }
    assert.equal(fautes.length, 0, `${p.chemin} :\n${liste(fautes)}`);
  });

  test(`mon métier : ${p.chemin} porte la bulle « discovery », avec sa définition (${lang})`, () => {
    exigerDist();
    const html = lirePage(p.chemin);
    const source = sansCode(html);
    const tous = elements(html);
    const fautes = [];
    const boutons = tous.filter((e) => e.nom === 'button' && e.classes.includes('terme') && e.attrs.popovertarget === 'infobulle-discovery');
    if (boutons.length !== 1) fautes.push(`${boutons.length} bouton(s) .terme vers infobulle-discovery, attendu 1`);
    const [b] = boutons;
    if (b) {
      if (net(b.texte()) !== 'discovery') fautes.push(`le bouton porte « ${net(b.texte())} », attendu « discovery »`);
      const avant = net(source.slice(Math.max(0, b.debut - 200), b.debut).replace(/<[^>]*>/g, ' '));
      if (!avant.endsWith(p.discovery.avant)) fautes.push(`la bulle n'est pas sur « ${p.discovery.avant} discovery » (avant : « …${avant.slice(-40)} »)`);
      const bulle = tous.find((e) => e.attrs.id === 'infobulle-discovery');
      if (!bulle?.classes.includes('infobulle') || !('popover' in bulle.attrs)) fautes.push('pas de span.infobulle[popover] id="infobulle-discovery"');
      const apres = net(source.slice(bulle?.fin ?? b.fin, (bulle?.fin ?? b.fin) + 200).replace(/<[^>]*>/g, ' '));
      if (!apres.startsWith(p.discovery.apres)) fautes.push(`après la bulle : « ${apres.slice(0, 40)}… », attendu « ${p.discovery.apres}… »`);
      const def = tous.find((e) => e.attrs.id === 'infobulle-discovery-texte');
      if (!def || net(def.texte()) !== p.definition) fautes.push(`définition « ${def ? net(def.texte()) : '(absente)'} », attendu « ${p.definition} »`);
    }
    assert.equal(fautes.length, 0, `${p.chemin} :\n${liste(fautes)}`);
  });
}

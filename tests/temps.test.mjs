// Test 0117 — Les trois temps titrés des pages projet (registre/0117, Spec,
// critères A, B et C) : la synthèse ne pose plus trois phrases nues
// (synthese__phrases) mais une liste de définitions <dl class="synthese__temps">,
// trois <dt> titrés dans la langue de la page, chacun suivi d'un <dd> qui
// reprend la phrase de l'en-tête Markdown (probleme, action, resultat).
//
// Les infobulles (registre/0088) : le composant Infobulles pose, sur la
// première occurrence d'un terme du lexique, un <button class="terme"> qui
// garde le mot, suivi d'un <span class="infobulle" popover> qui porte la
// définition. Pour comparer au Markdown, on garde le mot du bouton et on
// retire la bulle entière (le <span class="infobulle"> et tout son contenu).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { DIST, RACINE, JUMELLES, exigerDist, fichierDePage, sansCode, elements, fichiersDuSite, lire, liste } from './outils.mjs';

/** Les titres des trois temps, dans l'ordre du schéma, au texte exact (apostrophe ’). */
const TITRES = {
  fr: ['Point de départ', 'Ce que j’ai fait', 'L’impact'],
  en: ['Starting point', 'What I did', 'Impact'],
};
/** Les champs de l'en-tête Markdown, dans le même ordre. */
const CHAMPS = ['probleme', 'action', 'resultat'];

/** Les quatorze pages projet : celles de JUMELLES sous /projets/ ou /projects/. */
const PAGES_PROJET = JUMELLES.flatMap(({ fr, en }) => [
  { chemin: fr, langue: 'fr' },
  { chemin: en, langue: 'en' },
]).filter(({ chemin }) => /\/(?:projets|projects)\//.test(chemin));

const ENTITES = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ' };

/** Décode les entités HTML courantes et numériques. */
const decoder = (s) =>
  s.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (e, nom) => {
    if (nom[0] === '#') {
      const code = nom[1] === 'x' || nom[1] === 'X' ? parseInt(nom.slice(2), 16) : parseInt(nom.slice(1), 10);
      return String.fromCodePoint(code);
    }
    return ENTITES[nom.toLowerCase()] ?? e;
  });

/** Blancs resserrés : toute suite de blancs (insécables compris) devient une espace. */
const resserrer = (s) => s.replace(/\s+/g, ' ').trim();

/**
 * Retire d'un fragment HTML chaque bulle d'infobulle : le <span> dont la
 * classe contient le jeton « infobulle », jusqu'à sa fermeture (spans
 * imbriqués compris). Le <button class="terme"> et son mot restent.
 */
function retirerBulles(fragment) {
  const re = /<(\/?)span\b((?:[^>"']|"[^"]*"|'[^']*')*)>/gi;
  let sortie = '';
  let curseur = 0;
  let profondeur = 0; // > 0 : on est dans une bulle
  for (const m of fragment.matchAll(re)) {
    const fermante = m[1] === '/';
    if (profondeur === 0) {
      if (fermante) continue;
      const classe = /\bclass\s*=\s*(?:"([^"]*)"|'([^']*)')/i.exec(m[2]);
      const jetons = (classe ? (classe[1] ?? classe[2]) : '').split(/\s+/);
      if (!jetons.includes('infobulle')) continue;
      sortie += fragment.slice(curseur, m.index);
      profondeur = 1;
    } else if (fermante) {
      profondeur -= 1;
      if (profondeur === 0) curseur = m.index + m[0].length;
    } else {
      profondeur += 1;
    }
  }
  if (profondeur > 0) return sortie; // bulle non fermée : on coupe tout ce qui suit
  return sortie + fragment.slice(curseur);
}

/** Texte comparable d'un fragment HTML : bulles retirées, balises ôtées, entités décodées, blancs resserrés. */
const texteComparable = (fragment) => resserrer(decoder(retirerBulles(fragment).replace(/<[^>]*>/g, '')));

/** Une valeur scalaire YAML sur une ligne : entre guillemets doubles, simples, ou nue. */
function valeurYaml(brut) {
  const v = brut.trim();
  if (v.startsWith('"')) return JSON.parse(v);
  if (v.startsWith("'")) return v.slice(1, -1).replace(/''/g, "'");
  return v;
}

/** L'en-tête utile d'un fichier Markdown de projet : { fichier, titre, langue, cle, synthese }. */
function enTete(fichier) {
  const source = readFileSync(fichier, 'utf8').replace(/\r\n/g, '\n');
  const m = /^---\n([\s\S]*?)\n---/.exec(source);
  assert.ok(m, `${fichier} : pas d'en-tête Markdown (--- … ---).`);
  const lignes = m[1].split('\n');
  const racine = (cle) => {
    const l = lignes.find((x) => x.startsWith(`${cle}:`));
    return l === undefined ? undefined : valeurYaml(l.slice(cle.length + 1));
  };
  const synthese = {};
  const i = lignes.findIndex((x) => /^synthese:\s*$/.test(x));
  if (i >= 0) {
    for (const l of lignes.slice(i + 1)) {
      const champ = /^\s+([a-z]+):\s*(.*)$/.exec(l);
      if (!champ) break;
      synthese[champ[1]] = valeurYaml(champ[2]);
    }
  }
  return { fichier: relative(RACINE, fichier).split('\\').join('/'), titre: racine('titre'), langue: racine('langue'), cle: racine('cle'), synthese };
}

/** Tous les en-têtes Markdown des projets, par langue de dossier. */
const DOSSIER_CONTENU = join(RACINE, 'src', 'contenu', 'projets');
const EN_TETES = ['fr', 'en'].flatMap((langue) => {
  const dossier = join(DOSSIER_CONTENU, langue);
  if (!existsSync(dossier)) return [];
  return readdirSync(dossier)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ ...enTete(join(dossier, f)), dossierLangue: langue }));
});

const lirePage = (chemin) => {
  const fichier = fichierDePage(chemin);
  assert.ok(existsSync(fichier), `La page ${chemin} manque : ${fichier} n'existe pas.`);
  return readFileSync(fichier, 'utf8');
};

/** Le texte du <h1> d'une page (hors infobulles : un titre n'en reçoit pas). */
const titreDePage = (html) => {
  const h1 = elements(html).find((e) => e.nom === 'h1');
  return h1 ? resserrer(decoder(h1.texte())) : null;
};

/** L'en-tête Markdown d'une page : même langue, titre égal au <h1>. */
function enTeteDePage(chemin, langue, html) {
  const titre = titreDePage(html);
  assert.ok(titre, `${chemin} : pas de <h1>, impossible de retrouver son fichier Markdown.`);
  const candidats = EN_TETES.filter(
    (e) => e.langue === langue && e.dossierLangue === langue && resserrer(e.titre ?? '') === titre,
  );
  assert.equal(
    candidats.length,
    1,
    `${chemin} : ${candidats.length} fichier(s) Markdown dans src/contenu/projets/${langue}/ ont pour titre « ${titre} » (attendu : un seul).`,
  );
  return candidats[0];
}

/** Les <dl class="synthese__temps"> d'une page, avec leurs éléments. */
function temps(html) {
  const tous = elements(html);
  const dls = tous.filter((e) => e.nom === 'dl' && e.classes.includes('synthese__temps'));
  return { tous, dls };
}

/** Les <dt> d'un <dl>, et pour chacun le <dd> qui le suit (frère élément suivant), ou null. */
function paires(tous, dl) {
  const dedans = tous.filter((e) => e.ancetres.includes(dl));
  const dts = dedans.filter((e) => e.nom === 'dt');
  return dts.map((dt) => ({ dt, dd: dedans.find((e) => e.precedent === dt) ?? null }));
}

test('les quatorze pages projet sont prises dans JUMELLES', () => {
  assert.equal(
    PAGES_PROJET.length,
    14,
    `Attendu 14 pages projet (7 FR, 7 EN) dans JUMELLES, trouvé ${PAGES_PROJET.length} :\n${liste(PAGES_PROJET.map((p) => p.chemin))}`,
  );
});

test('chaque page projet retrouve son en-tête Markdown (titre = <h1>, même langue), avec ses trois phrases', () => {
  exigerDist();
  const fautes = [];
  for (const { chemin, langue } of PAGES_PROJET) {
    try {
      const { fichier, synthese } = enTeteDePage(chemin, langue, lirePage(chemin));
      for (const champ of CHAMPS)
        if (!synthese[champ]) fautes.push(`${chemin} : ${fichier} n'a pas de synthese.${champ} lisible.`);
    } catch (e) {
      fautes.push(e.message);
    }
  }
  assert.equal(fautes.length, 0, `En-têtes Markdown introuvables ou incomplets :\n${liste(fautes)}`);
});

for (const { chemin, langue } of PAGES_PROJET) {
  const titres = TITRES[langue];

  test(`A. ${chemin} : un seul dl.synthese__temps dans la synthèse, trois dt « ${titres.join(' », « ')} » dans l'ordre, chacun suivi d'un dd non vide`, () => {
    exigerDist();
    const html = lirePage(chemin);
    const { tous, dls } = temps(html);
    assert.equal(
      dls.length,
      1,
      `${chemin} : ${dls.length} <dl class="synthese__temps"> (attendu : exactement un). ` +
        'La synthèse doit poser ses trois temps titrés dans une liste de définitions.',
    );
    const dl = dls[0];
    assert.ok(
      dl.ancetres.some((e) => e.classes.includes('synthese')),
      `${chemin} : le <dl class="synthese__temps"> n'est pas dans la synthèse (élément de classe « synthese »).`,
    );
    const lus = paires(tous, dl);
    const fautes = [];
    if (lus.length !== 3) fautes.push(`${lus.length} <dt> dans le dl (attendu : 3).`);
    titres.forEach((attendu, i) => {
      const p = lus[i];
      if (!p) return fautes.push(`temps ${i + 1} : pas de <dt> « ${attendu} ».`);
      const lu = resserrer(decoder(p.dt.texte()));
      if (lu !== attendu) fautes.push(`temps ${i + 1} : <dt> « ${lu} », attendu « ${attendu} ».`);
      if (!p.dd) fautes.push(`temps ${i + 1} (« ${attendu} ») : le <dt> n'est pas suivi d'un <dd>.`);
      else if (!resserrer(decoder(p.dd.texte()))) fautes.push(`temps ${i + 1} (« ${attendu} ») : le <dd> est vide.`);
    });
    assert.equal(fautes.length, 0, `${chemin} : les trois temps titrés sont incomplets :\n${liste(fautes)}`);
  });

  test(`B. ${chemin} : chaque dd reprend la phrase de l'en-tête Markdown (${CHAMPS.join(', ')})`, () => {
    exigerDist();
    const html = lirePage(chemin);
    const { fichier, synthese } = enTeteDePage(chemin, langue, html);
    const { tous, dls } = temps(html);
    assert.equal(
      dls.length,
      1,
      `${chemin} : ${dls.length} <dl class="synthese__temps"> (attendu : exactement un), ` +
        `rien à comparer aux phrases de ${fichier}.`,
    );
    const source = sansCode(html);
    const lus = paires(tous, dls[0]);
    const fautes = [];
    CHAMPS.forEach((champ, i) => {
      const attendu = resserrer(synthese[champ] ?? '');
      const p = lus[i];
      if (!p || !p.dd) return fautes.push(`synthese.${champ} : pas de <dd> au temps ${i + 1}.`);
      const lu = texteComparable(source.slice(p.dd.debut, p.dd.fin ?? undefined));
      if (lu !== attendu) fautes.push(`synthese.${champ} :\n      lu      « ${lu} »\n      attendu « ${attendu} »`);
    });
    assert.equal(fautes.length, 0, `${chemin} : les <dd> ne reprennent pas les phrases de ${fichier} :\n${liste(fautes)}`);
  });
}

test('C. plus aucun « synthese__phrases » dans le site construit (HTML, CSS, JS)', () => {
  exigerDist();
  const fautes = fichiersDuSite()
    .filter((f) => /\.(?:html|css|m?js|cjs)$/.test(f))
    .filter((f) => lire(f).includes('synthese__phrases'));
  assert.equal(
    fautes.length,
    0,
    `${fautes.length} fichier(s) de ${DIST} contiennent encore « synthese__phrases » (le bloc doit devenir dl.synthese__temps) :\n${liste(fautes)}`,
  );
});

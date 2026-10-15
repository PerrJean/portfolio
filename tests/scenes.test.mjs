// Test 14 —Les scènes des cartes (Scene.astro, registre/0058, 0062, 0069,
// 0085, 0090), toutes variantes au même régime :
//  - aucune variante orpheline : chaque variante de Scene a son composant,
//    importé et rendu ; chaque composant Scene*.astro est une variante ;
//    chaque scène de carte sert une carte et figure au labo ; l'ancienne
//    variante « misesEnSituation » n'est plus une scène (registre/0090) ;
//  - sur l'accueil construit, une scène par carte, décorative (aria-hidden,
//    focusable="false", rien de focalisable dedans) ;
//  - chaque carte ne s'anime qu'au survol, au focus ou sous `.regarde`, et
//    seulement sous (prefers-reduced-motion: no-preference) ; un repli
//    (reduce) coupe toute animation de la scène ;
//  - les couleurs passent par les classes de jetons (Scene.astro), jamais
//    par une couleur écrite dans une scène ou dans poses.ts.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { RACINE, exigerDist, fichierDePage, elements, liste, pagesHtml, lire } from './outils.mjs';
import { cssDePage, valeur } from './css.mjs';

const SCENE = join(RACINE, 'src', 'components', 'scene');
const source = (...p) => readFileSync(join(RACINE, ...p), 'utf8');
const SCENE_ASTRO = source('src', 'components', 'scene', 'Scene.astro');
const PROJETS_TS = source('src', 'contenu', 'projets.ts');
const LABO = source('src', 'labo', 'scene.astro');
const ANCIENNE = 'misesEnSituation';
const DECLENCHEURS = ['.parcelle:hover', '.parcelle:focus-within', '.parcelle.regarde'];

/** Les membres d'une union de littéraux (« 'a' | 'b' »). */
const union = (texte) => [...texte.matchAll(/'([^']+)'/g)].map((m) => m[1]);
const VARIANTES = union(/variante\s*:\s*([^;]+);/.exec(SCENE_ASTRO)?.[1] ?? '');
const SCENES_DE_CARTE = union(/type\s+SceneDeCarte\s*=\s*([^;]+);/.exec(PROJETS_TS)?.[1] ?? '').filter((s) => s !== 'aucune');
const SCENES_DES_PROJETS = [...PROJETS_TS.matchAll(/^\s*scene\s*:\s*'([^']+)'/gm)].map((m) => m[1]).filter((s) => s !== 'aucune');
const CARTES = VARIANTES.filter((v) => v !== 'entete');
const composant = (v) => `Scene${v[0].toUpperCase()}${v.slice(1)}`;

test('scènes : aucune variante orpheline, aucune trace de l\'ancienne variante « misesEnSituation »', () => {
  const fautes = [];
  if (VARIANTES.length === 0) fautes.push('Scene.astro : union « variante » introuvable');
  for (const v of VARIANTES) {
    const c = composant(v);
    if (!existsSync(join(SCENE, `${c}.astro`))) fautes.push(`variante « ${v} » : ${c}.astro absent`);
    if (!new RegExp(`import\\s+${c}\\s+from\\s+'\\./${c}\\.astro'`).test(SCENE_ASTRO)) fautes.push(`variante « ${v} » : ${c} non importé dans Scene.astro`);
    if (!new RegExp(`variante\\s*===\\s*'${v}'\\s*&&\\s*<${c}\\s*/>`).test(SCENE_ASTRO)) fautes.push(`variante « ${v} » : ${c} non rendu dans Scene.astro`);
    if (!LABO.includes(`variante="${v}"`)) fautes.push(`variante « ${v} » : absente de la page labo (src/labo/scene.astro)`);
  }
  for (const f of readdirSync(SCENE).filter((f) => /^Scene.+\.astro$/.test(f))) {
    const v = f.slice(5, 6).toLowerCase() + f.slice(6, -6);
    if (!VARIANTES.includes(v)) fautes.push(`${f} : composant sans variante dans Scene.astro`);
  }
  for (const s of SCENES_DE_CARTE) if (!VARIANTES.includes(s)) fautes.push(`SceneDeCarte « ${s} » : pas une variante de Scene`);
  for (const v of CARTES) {
    if (!SCENES_DE_CARTE.includes(v)) fautes.push(`variante « ${v} » : absente du type SceneDeCarte`);
    if (!SCENES_DES_PROJETS.includes(v)) fautes.push(`variante « ${v} » : aucune carte ne la porte (PROJETS)`);
  }
  if (VARIANTES.includes(ANCIENNE)) fautes.push(`« ${ANCIENNE} » est encore une variante de Scene`);
  if (SCENES_DE_CARTE.includes(ANCIENNE)) fautes.push(`« ${ANCIENNE} » est encore un SceneDeCarte`);
  if (SCENES_DES_PROJETS.includes(ANCIENNE)) fautes.push(`une carte porte encore la scène « ${ANCIENNE} »`);
  if (existsSync(join(SCENE, `${composant(ANCIENNE)}.astro`))) fautes.push(`${composant(ANCIENNE)}.astro existe encore`);
  if (/SceneMisesEnSituation|misesEnSituation/.test(SCENE_ASTRO)) fautes.push(`Scene.astro cite encore « ${ANCIENNE} »`);
  if (LABO.includes(`variante="${ANCIENNE}"`)) fautes.push(`la page labo montre encore « ${ANCIENNE} »`);
  assert.equal(fautes.length, 0, `Variantes de Scene :\n${liste(fautes)}`);
});

test('scènes : le site construit ne porte aucune scène « misesEnSituation »', () => {
  exigerDist();
  const fautes = pagesHtml().filter((f) => /scene--misesEnSituation/.test(lire(f)));
  assert.equal(fautes.length, 0, `Pages avec scene--${ANCIENNE} :\n${liste(fautes)}`);
});

for (const accueil of ['/', '/en/']) {
  test(`scènes : ${accueil} montre une scène par carte, décorative (aria-hidden, focusable="false", rien de focalisable dedans)`, () => {
    exigerDist();
    const els = elements(readFileSync(fichierDePage(accueil), 'utf8'));
    const fautes = [];
    const scenes = els.filter((e) => e.nom === 'svg' && e.classes.includes('scene') && !e.classes.includes('scene--entete'));
    const vues = scenes.map((s) => s.classes.find((c) => c.startsWith('scene--'))?.slice(7));
    if (JSON.stringify([...vues].sort()) !== JSON.stringify([...SCENES_DES_PROJETS].sort()))
      fautes.push(`scènes de carte ${JSON.stringify(vues)} : attendu ${JSON.stringify(SCENES_DES_PROJETS)}`);
    for (const [i, s] of scenes.entries()) {
      const ou = `scene--${vues[i]}`;
      if (!s.ancetres.some((a) => a.classes.includes('parcelle'))) fautes.push(`${ou} : hors d'une .parcelle`);
      if (s.attrs['aria-hidden'] !== 'true') fautes.push(`${ou} : aria-hidden="${s.attrs['aria-hidden']}", attendu "true"`);
      if (s.attrs.focusable !== 'false') fautes.push(`${ou} : focusable="${s.attrs.focusable}", attendu "false"`);
      const dedans = els.filter((e) => e.ancetres.includes(s));
      for (const e of dedans.filter((e) => e.nom === 'a' || 'tabindex' in e.attrs || e.nom === 'title' || e.nom === 'text'))
        fautes.push(`${ou} : <${e.nom}> dans un dessin décoratif`);
    }
    assert.equal(fautes.length, 0, `Scènes de ${accueil} :\n${liste(fautes)}`);
  });
}

test('scènes : chaque carte ne s\'anime qu\'au survol, au focus ou sous .regarde, sous (prefers-reduced-motion: no-preference), et le mouvement réduit coupe tout', () => {
  exigerDist();
  const css = cssDePage('index.html');
  const fautes = [];
  const anime = (r) => [valeur(r, 'animation'), valeur(r, 'animation-name')].some((v) => v && !/^none\b/.test(v));
  const REDUIT = /prefers-reduced-motion\s*:\s*reduce/;
  const SANS_PREF = /prefers-reduced-motion\s*:\s*no-preference/;
  for (const v of CARTES) {
    const cle = `.scene--${v}`;
    const regles = css.filter((r) => anime(r) && r.selecteurs.some((s) => s.includes(cle)));
    if (regles.length === 0) fautes.push(`${v} : aucune animation`);
    for (const r of regles) {
      const sels = r.selecteurs.filter((s) => s.includes(cle));
      if (!r.medias.some((m) => SANS_PREF.test(m))) fautes.push(`${v} : « ${r.bruts.join(',')} » s'anime hors de (prefers-reduced-motion: no-preference)`);
      for (const s of sels) if (!DECLENCHEURS.some((d) => s.includes(d))) fautes.push(`${v} : « ${s} » s'anime sans survol, focus ni .regarde`);
      for (const d of DECLENCHEURS) if (!sels.some((s) => s.includes(d))) fautes.push(`${v} : « ${r.bruts.join(',')} » ne joue pas sous ${d}`);
    }
    const coupe = css.some(
      (r) => r.medias.some((m) => REDUIT.test(m)) &&
        /^none\b/.test(valeur(r, 'animation') ?? '') &&
        r.selecteurs.some((s) => s === '.scene *' || s === `${cle} *`),
    );
    if (!coupe) fautes.push(`${v} : aucune règle (prefers-reduced-motion: reduce) ne coupe ses animations`);
  }
  assert.equal(fautes.length, 0, `Déclenchement des scènes :\n${liste(fautes)}`);
});

test('scènes : aucune couleur écrite dans les scènes ni dans poses.ts, seulement les classes de jetons', () => {
  const COULEUR = /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|oklch|lab|lch)\(|\b(?:fill|stroke|color|stop-color)\s*[=:]\s*["']?(?!none|var\(|currentcolor|transparent|inherit)[a-z]/i;
  const fautes = [];
  const fichiers = readdirSync(SCENE).filter((f) => (/\.astro$/.test(f) && f !== 'Scene.astro') || f === 'poses.ts');
  for (const f of fichiers) {
    readFileSync(join(SCENE, f), 'utf8')
      .split('\n')
      .forEach((ligne, i) => {
        const code = ligne.replace(/\/\/.*$|^\s*\*.*$|<!--.*?-->/g, '');
        const m = COULEUR.exec(code);
        if (m) fautes.push(`${f}:${i + 1} : « ${m[0]} »`);
      });
  }
  assert.equal(fautes.length, 0, `Couleurs hors jetons :\n${liste(fautes)}`);
});

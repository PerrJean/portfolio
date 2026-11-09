// Les schémas des pages projet, dans le style du schéma d'Audit contenu
// (chaine-audit.css) : au trait, cadres à angles droits à l'encre, liaisons
// et flèches en ardoise, fond ivoire, l'ambre seule lumière. Deux
// dispositions : « large » pour la colonne de texte (736 px) et « etroit »
// pour le téléphone (350 px : 390 moins les gouttières de 1,25 rem). Texte à
// 16 px en large, 15 px en étroit, tracé en chemins depuis la police du site
// (police.mjs) : le SVG ne charge rien.
// Sert à fusion/planche.mjs et atelier-pilotage/planche.mjs.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { police, couper } from './police.mjs';
import { ecrirePlanche } from './planche.mjs';
import { C, feuille } from './svg.mjs';

const STYLE = feuille(['fe', 'fs']);
export const P = { 400: police(400), 700: police(700) };

/** Les deux dispositions : largeur, corps du texte, du titre de section. */
export const MODES = {
  large: { W: 736, T: 16, H: 17 },
  etroit: { W: 350, T: 15, H: 16 },
};

// ---------------------------------------------------------------------------
// Les briques : texte en chemins, cadres, flèches.

export const f = (v) => +v.toFixed(2);
export const largeur = (t, taille, g = 400) => P[g].largeur(t, taille);

/** Une ligne, ligne de base en y ; ancre start, middle ou end. */
export function ligne(t, x, y, taille, g = 400, ancre = 'start') {
  const l = largeur(t, taille, g);
  const x0 = ancre === 'middle' ? x - l / 2 : ancre === 'end' ? x - l : x;
  return P[g].chemin(t, f(x0), f(y), taille, 0, 'fe');
}

/** Un bloc coupé à `max` px, haut du bloc en `haut`. Rend { svg, h, l, n }.
 *  Signale sur la sortie d'erreur une ligne qui déborde (un mot trop long). */
export function bloc(t, x, haut, max, taille, g = 400, ancre = 'start', interligne = 1.3) {
  const lignes = couper(t, max, (s) => largeur(s, taille, g), true);
  for (const l of lignes) if (largeur(l, taille, g) > max + 0.5) console.warn(`DÉBORDE (${f(max)} px) : ${l}`);
  const lh = interligne * taille;
  const svg = lignes
    .map((l, i) => ligne(l, x, haut + i * lh + (lh - 1.3 * taille) / 2 + 0.984 * taille, taille, g, ancre))
    .join('');
  return { svg, h: lignes.length * lh, l: Math.max(...lignes.map((l) => largeur(l, taille, g))), n: lignes.length };
}

/** Un bloc centré verticalement dans [y, y + h]. */
export const blocCentre = (t, x, y, h, max, taille, g, ancre) => {
  const essai = bloc(t, x, 0, max, taille, g, ancre);
  // Le centre optique : les capitales, pas la boîte (léger décalage vers le bas).
  return bloc(t, x, y + (h - essai.h) / 2 + 0.04 * taille, max, taille, g, ancre).svg;
};

/** Un cadre à angles droits, le trait de cinq façons. */
export function cadre(x, y, w, h, trait = 'continu', fond = C.ivoire) {
  const r = (e, a = '') =>
    `<rect x="${f(x + e)}" y="${f(y + e)}" width="${f(w - 2 * e)}" height="${f(h - 2 * e)}" ${a}/>`;
  switch (trait) {
    case 'continu':
      return r(0.75, `fill="${fond}" stroke="${C.encre}" stroke-width="1.5"`);
    case 'epais':
      return r(1.6, `fill="${fond}" stroke="${C.encre}" stroke-width="3.2"`);
    case 'double':
      return r(0.6, `fill="${fond}" stroke="${C.encre}" stroke-width="1.2"`) + r(4.4, `fill="none" stroke="${C.encre}" stroke-width="1.2"`);
    case 'pointille':
      return r(1, `fill="${fond}" stroke="${C.encre}" stroke-width="2" stroke-dasharray="0.1 5" stroke-linecap="round"`);
    case 'fin':
      return r(0.5, `fill="${fond}" stroke="${C.encre}" stroke-width="1"`);
  }
  throw new Error(trait);
}

/** Le bout d'une flèche (le chevron de chaine-audit), pointe en (x, y). */
export const bout = (x, y, angle) =>
  `<path transform="translate(${f(x)} ${f(y)}) rotate(${angle})" d="M-5.5,-5L0,0L-5.5,5" fill="none" stroke="${C.ardoise}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`;
/** Une liaison en ardoise ; `fin` s'écrit juste avant la fermeture « /> ». */
export const trace = (d, fin = '') =>
  `<path d="${d}" fill="none" stroke="${C.ardoise}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"${fin}/>`;
export const flecheH = (x1, x2, y) => trace(`M${f(x1)},${f(y)}H${f(x2)}`) + bout(x2, y, 0);
export const flecheV = (x, y1, y2) => trace(`M${f(x)},${f(y1)}V${f(y2)}`) + bout(x, y2, 90);

/** Le fichier SVG d'un schéma, son texte accessible en <title> et aria-label. */
const svg = (W, H, titre, corps) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${f(H)}" width="${W}" height="${Math.ceil(H)}" role="img" aria-label="${titre.replace(/"/g, '&quot;')}">` +
  `<title>${titre}</title>${STYLE}<rect width="${W}" height="${f(H)}" fill="${C.ivoire}"/>${corps}</svg>\n`;

// ---------------------------------------------------------------------------
// Les fichiers, puis la planche.

/** La planche d'une langue : chaque schéma en large à gauche, en étroit à
 *  droite dans un cadre de téléphone de 390 px. */
async function planche(rendus, noms, langue, sortie) {
  const M = 24, GAP = 48, CADRE = 390, GOUT = 20, LEG = 15;
  const WL = MODES.large.W;
  const LARGEUR = M + WL + GAP + CADRE + M;
  const legende = (t, x, y) => P[400].chemin(t, x, y, LEG, 0, 'fs');
  let s = '', yL = M, yE = M;
  s += legende(langue === 'fr' ? 'Grand écran, 736 px (colonne de texte)' : 'Wide, 736 px', M, yL + 12);
  s += legende(langue === 'fr' ? 'Téléphone, 390 px (350 px de dessin)' : 'Phone, 390 px', M + WL + GAP, yE + 12);
  yL += 30; yE += 30;
  const yE0 = yE;
  yE += GOUT;
  for (const nom of noms) {
    const l = rendus[`${nom}.large.${langue}`], e = rendus[`${nom}.etroit.${langue}`];
    s += `<g transform="translate(${M} ${f(yL)})">${l.corps}</g>`;
    yL += l.h + 28;
    s += `<line x1="${M}" y1="${f(yL - 14)}" x2="${M + WL}" y2="${f(yL - 14)}" stroke="${C.dalle}" stroke-width="1.5"/>`;
    s += `<g transform="translate(${M + WL + GAP + GOUT} ${f(yE)})">${e.corps}</g>`;
    yE += e.h + 36;
  }
  const H = Math.ceil(Math.max(yL, yE) + M);
  const telephone = `<rect x="${M + WL + GAP}" y="${yE0}" width="${CADRE}" height="${f(yE - yE0 - 16)}" fill="none" stroke="${C.dalle}" stroke-width="2"/>`;
  await ecrirePlanche(sortie, telephone + s, H, { largeur: LARGEUR, style: STYLE });
  console.log(`${sortie} ${LARGEUR} × ${H}`);
}

/** Écrit dans `ici` chaque schéma ({ nom: dessin(textes, mode) → { corps, h } })
 *  en FR et EN, large (<nom>.<langue>.svg) et étroit (<nom>.etroit.<langue>.svg),
 *  puis planche.png (FR) ; la planche EN dans le dossier passé en argument. */
export async function produire(ici, schemas, textes) {
  const rendus = {};
  for (const langue of ['fr', 'en']) {
    for (const [nom, dessin] of Object.entries(schemas)) {
      for (const mode of ['large', 'etroit']) {
        const { corps, h } = dessin(textes[langue], mode);
        const texte = svg(MODES[mode].W, h, textes[langue].titres[nom], corps);
        writeFileSync(join(ici, `${nom}${mode === 'etroit' ? '.etroit' : ''}.${langue}.svg`), texte);
        rendus[`${nom}.${mode}.${langue}`] = { corps, h };
      }
    }
  }
  const noms = Object.keys(schemas);
  await planche(rendus, noms, 'fr', join(ici, 'planche.png'));
  // Contrôle de l'anglais, hors livrable : node planche.mjs <dossier>
  if (process.argv[2]) await planche(rendus, noms, 'en', join(process.argv[2], 'planche.en.png'));
  for (const [k, v] of Object.entries(rendus)) console.log(`${k} : hauteur ${Math.ceil(v.h)}`);
}

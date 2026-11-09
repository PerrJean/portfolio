// La planche PNG de travail des scènes : cases à la moitié de 1280 px,
// légendes numérotées, case des poses, découpage en temps, scènes aux
// largeurs de carte, écriture du PNG par sharp. Le texte est tracé en
// chemins depuis la police du site (police.mjs).

import sharp from 'sharp';
import { police } from './police.mjs';
import { C, L, STYLE, r2 } from './svg.mjs';

export const P8 = police(800), P4 = police(400);
/** Marge, largeur de la planche, place d'une légende. */
export const M = 20, LARG = 2 * M + 1280, LEG = 34;
/** Une case : la moitié de 1280 px, la scène à l'échelle K. */
export const CASE = (1280 - M) / 2, K = CASE / L, H_CASE = 160 * K;
/** La hauteur d'un rang de cases, légende comprise. */
export const RANG = H_CASE + LEG + 12;
/** Les largeurs de carte du site, en px. */
const LARGEURS_CARTE = [480, 384, 335];

/** Le numéro en gras, puis le texte, en ardoise. */
export const legende = (n, t, x, y) => P8.chemin(`${n}`, x, y, 15, 0, 'fs') + P4.chemin(t, x + 16, y, 15, 0, 'fs');
export const petit = (t, x, y, taille = 13, p = P4) => p.chemin(t, x, y, taille, 0, 'fs');
export const cadre = (x, y, l, h) => `<rect x="${x}" y="${y}" width="${l}" height="${h}" fill="${C.ivoire}" stroke="${C.dalle}" stroke-width="2"/>`;
/** Une scène (repère de Scene.astro) posée en (x, y), à l'échelle k. */
export const scene = (corps, x, y, k) => `<g transform="translate(${x} ${y + 140 * k}) scale(${k})">${corps}</g>`;

/** Une case : le cadre, son contenu, sa légende numérotée dessous. */
export const encadre = (x, y, contenu, n, t) => cadre(x, y, CASE, H_CASE) + contenu + legende(n, t, x, y + H_CASE + 22);

/** Des scènes deux par case de large, à partir de y : [nom, légende] ;
 *  numérotées à partir de `premier`. */
export const grille = (cases, y, cartes, premier = 1) =>
  cases
    .map(([nom, t], i) => {
      const x = M + (i % 2) * (CASE + M), yc = y + Math.floor(i / 2) * RANG;
      return encadre(x, yc, scene(cartes[nom], x, yc, K), premier + i, t);
    })
    .join('');

/** La case des poses : les poses sur leur ligne de pied, leurs noms en bas
 *  ([nom, x dans le repère de la scène]). */
export const casePoses = (x, y, dessin, noms, n, t) =>
  encadre(x, y, scene(dessin, x, y, K) + noms.map(([nm, xn]) => petit(nm, x + xn * K, y + H_CASE - 10)).join(''), n, t);

/** Une barre des temps : un bloc par durée (le bloc `ambre` en ambre), sa
 *  durée dedans, le total au bout. `echelle` : la durée de toute la barre. */
export function barre(x0, yBarre, yTexte, durees, { echelle = durees.reduce((s, ms) => s + ms, 0), total = echelle, ambre = durees.length - 1 } = {}) {
  const lp = CASE - 32 - 64;
  let t = 0, s = '';
  durees.forEach((ms, i) => {
    const xa = x0 + (t / echelle) * lp, l = (ms / echelle) * lp;
    s += `<rect x="${r2(xa)}" y="${yBarre}" width="${r2(l - 3)}" height="16" rx="2" fill="${i === ambre ? C.ambre : i % 2 ? C.dalle : '#ECE7DE'}" stroke="${C.ardoise}" stroke-width="1"/>`;
    s += petit(`${ms}`, xa + 4, yTexte, 11);
    t += ms;
  });
  return s + petit(`${total} ms`, x0 + (t / echelle) * lp + 6, yTexte, 11);
}

/** Le découpage d'une scène dans une case en (x, y) : un titre, la barre des
 *  temps ([nom, texte, ms, …]), une ligne par temps, des notes. */
export function decoupage(x, y, { titre, temps, ambre, colonne = 70, texte = ([, t, ms]) => `${t} : ${ms} ms`, notes = [] }) {
  const x0 = x + 16;
  let d = petit(titre, x0, y + 30, 14, P8);
  d += barre(x0, y + 48, y + 60, temps.map((t) => t[2]), { ambre });
  let yl = y + 96;
  for (const t of temps) { d += petit(t[0], x0, yl, 13, P8) + petit(texte(t), x0 + colonne, yl, 13); yl += 20; }
  notes.forEach((note, i) => (d += petit(note, x0, yl + (6 + 16 * i), 12)));
  return d;
}

/** Des scènes aux largeurs de carte, taille réelle, une rangée chacune :
 *  [corps, libellé]. Rend le SVG et le y sous la dernière rangée. */
export function auxLargeurs(liste, y, n) {
  let s = '';
  for (const [corps, nom] of liste) {
    let x = M;
    const hMax = (160 / L) * 480;
    for (const w of LARGEURS_CARTE) {
      const k = w / L;
      s += cadre(x, y, w, 160 * k) + scene(corps, x, y, k);
      x += w + 20;
    }
    s += legende(n++, `${nom} aux largeurs de carte : 480, 384 et 335 px, taille réelle.`, M, y + hMax + 22);
    y += hMax + LEG + 12;
  }
  return { corps: s, y };
}

/** Écrit la planche en PNG : fond ivoire, le corps, des calques composés
 *  par-dessus (texte de Pango) s'il y en a. */
export async function ecrirePlanche(chemin, corps, hauteur, { largeur = LARG, style = STYLE, calques } = {}) {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${largeur}" height="${hauteur}">${style}` +
    `<rect width="${largeur}" height="${hauteur}" fill="${C.ivoire}"/>${corps}</svg>`;
  let image = sharp(Buffer.from(svg));
  if (calques) image = image.composite(calques);
  await image.png({ compressionLevel: 9 }).toFile(chemin);
}

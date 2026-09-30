// Les images clés de la scène « Mises en situation » (registre/0069), carte
// du projet « mises en situation orales par IA » : images fixes, aucune
// animation. Une seule scène, un board et des post-it (le Design Sprint).
// Deuxième version, sur les retours de Jean : Jean ne donne pas d'ordres, il
// est un participant (il a cadré l'atelier avant, avec l'animateur) ; il est
// au board avec les deux autres, au repos comme à la fin. Et aucun bras levé
// au-dessus de l'épaule : un bras qui montre reste à l'horizontale ou plus bas.
//  1. repos : le board, quatre colonnes, a peu de post-it ; le PM au bord
//     gauche du board, tourné vers lui ; Jean devant le board, entre la
//     première et la deuxième colonne, colle un post-it en bas de la deuxième
//     (le bras 45° sous l'horizontale) ; la product designer au bord droit, tournée
//     vers le board ;
//  2. fin : le board s'est rempli colonne après colonne, en entonnoir
//     (4, 4, 2, 1) ; un seul post-it ambre, dans la dernière colonne, à
//     mi-hauteur (le pari retenu), un petit signe de bulle dessus (l'oral) ;
//     la designer vient de le coller à deux mains (bras-tendus) ; le PM a la
//     main au bord du board ; Jean a baissé le bras et regarde le board.
// Produit repos.svg et fin.svg, dans le repère de Scene.astro
// (0 -140 426.667 160), mêmes classes, et planche.png.
// Relançable : node ops/images/mises-en-situation-scene/planche.mjs.
// Sans paquet ajouté : sharp ; le texte en chemins (../accueil/police.mjs).
//
// Aucune pose nouvelle : debout, bras-tendus et montre (poses.ts), montre
// avec d'autres cibles, toutes à l'horizontale ou plus bas (le bras avant
// droit, 32,2, vers la cible) : le post-it de Jean, le bord du board pour le PM.
// Les objets nouveaux (objets de planche) : le board (un cadre au trait, trois
// séparations ardoise, deux pieds écartés comme ceux du tréteau), le post-it
// (un carré au trait de 13), le post-it retenu (aplat ambre, bulle au trait).

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { POSES, LUNETTES, montre } from '../../../src/components/scene/poses.ts';
import { police } from '../accueil/police.mjs';

const ICI = fileURLToPath(new URL('./', import.meta.url));
const C = { ivoire: '#FEFAF2', encre: '#2A1F1A', ambre: '#F2A33A', orange: '#B54E19', ardoise: '#5E7488', dalle: '#D9D4CC' };
const STYLE =
  `<style>.fe{fill:${C.encre}}.se{stroke:${C.encre}}.fi{fill:${C.ivoire}}.si{stroke:${C.ivoire}}` +
  `.sa{stroke:${C.ardoise}}.so{stroke:${C.orange}}.fa{fill:${C.ambre}}.fd{fill:${C.dalle}}.fs{fill:${C.ardoise}}</style>`;
const L = 426.667;
const r2 = (v) => Math.round(v * 10) / 10;
const LONG_BRAS = Math.hypot(28, 16); // 32,2, celui de bras-tendus et de montre
const EP_AV = [1, -89];

// ---------------------------------------------------------------------------
// Les places et le board.

const BW = 156, HAUT = -130, BAS = -46, COL = BW / 4;
const PI = 13, RANGS = [-123, -104, -85, -66]; // côté du post-it, haut de chaque rang
const Y_RETENU = -82; // le post-it ambre, plus bas que le premier rang : les mains de bras-tendus (y -73 et -76) dessus
// Le PM : sa main, à la fin, touche le bord gauche du board à y = -80 (entre
// deux post-it, sans en cacher aucun). L'ensemble est centré dans la carte.
const PM_BOARD = Math.round(1 + Math.sqrt(LONG_BRAS ** 2 - 9 ** 2) + 1); // du PM au board
const MAINS_D = 30; // de la designer au centre du post-it ambre (mains de bras-tendus à 29 et 31)
const LARGEUR = 12 + PM_BOARD + COL * 3.5 + MAINS_D + 12;
const PM_X = Math.round((L - LARGEUR) / 2 + 12), BX = PM_X + PM_BOARD;
// Jean devant le board, entre les post-it de la première colonne (jusqu'à
// COL/2 + 6,5) et ceux de la deuxième (dès 1,5 COL - 6,5) : sa tête et son
// buste (-9 à 11) passent dans l'écart.
const J_X = BX + COL - 3;
const D_X = BX + COL * 3.5 + MAINS_D;

const postit = (col, y, retenu = false) => {
  const x = BX + COL * (col + 0.5) - PI / 2;
  let d = `<rect class="${retenu ? 'fa' : 'fi'} se" x="${r2(x)}" y="${y}" width="${PI}" height="${PI}" rx="1" stroke-width="1.5"/>`;
  // La bulle : un petit ovale au trait et sa queue, pour dire « oral ».
  if (retenu) {
    const cx = x + PI / 2 - 1, cy = y + PI / 2 - 1;
    d += `<path class="se" d="M${r2(cx - 3.6)},${r2(cy)} a3.6,2.6 0 1 1 2.2,2.4 l-2.4,1.8 l0.6,-2.6 Z" fill="none" stroke-width="1.1" stroke-linejoin="round"/>`;
  }
  return `<g class="postit c${col + 1}">${d}</g>`;
};
const BOARD =
  '<g class="board">' +
  [[20, 11], [BW - 20, BW - 11]].map(([h, b]) => `<line class="se" x1="${r2(BX + h)}" y1="${BAS}" x2="${r2(BX + b)}" y2="-1" stroke-width="4" stroke-linecap="round"/>`).join('') +
  `<rect class="fi se" x="${BX}" y="${HAUT}" width="${BW}" height="${BAS - HAUT}" rx="1.5" stroke-width="2.5"/>` +
  [1, 2, 3].map((i) => `<line class="sa" x1="${r2(BX + i * COL)}" y1="${HAUT + 5}" x2="${r2(BX + i * COL)}" y2="${BAS - 5}" stroke-width="1.2"/>`).join('') +
  '</g>';
// Au repos : deux dans la première colonne, deux dans la deuxième (celui du
// bas, Jean le colle). À la fin : 4, 4, 2 et l'ambre (on diverge, puis on
// converge).
const REPOS_POSTIT = [[0, 0], [0, 1], [1, 0], [1, 3]];
const FIN_POSTIT = [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1]];
const postits = (liste) => liste.map(([c, r]) => postit(c, RANGS[r])).join('');
const SOL = `<line class="se" x1="0" y1="0" x2="${L}" y2="0" stroke-width="1.5"/>`;

// ---------------------------------------------------------------------------
// Les personnages.

const perso = (dessin, x, { jean = false, miroir = false, classe = '' } = {}) => {
  const d = dessin.replace('{L}', jean ? LUNETTES : '');
  return `<g transform="translate(${r2(x)} 0)"><g class="${classe}"${miroir ? ' transform="scale(-1 1)"' : ''}>${d}</g></g>`;
};
// La cible d'un personnage, du repère de la scène à celui de la pose.
const locale = ([x, y], px) => [x - px, y];
// Jean colle son post-it : la main sur le haut du post-it du bas, deuxième
// colonne, le bras 45° sous l'horizontale (il passe au-dessus du post-it, qui
// reste entier) ; le PM : le bord gauche du board, à y = -80.
const CIBLE_J = [BX + COL * 1.5, RANGS[3]];
const CIBLE_PM = [BX, -80];
const JEAN_COLLE = montre(locale(CIBLE_J, J_X));
const PM_MONTRE = montre(locale(CIBLE_PM, PM_X));
// L'angle d'un bras qui montre, en degrés sous l'horizontale (> 0 : plus bas).
const angle = (c, px) => r2((Math.atan2(c[1] - EP_AV[1], c[0] - px - EP_AV[0]) * 180) / Math.PI);

const CARTES = {
  repos:
    SOL + BOARD + postits(REPOS_POSTIT) +
    perso(POSES.debout, PM_X, { classe: 'pm-debout' }) +
    perso(JEAN_COLLE, J_X, { jean: true, classe: 'j-colle' }) +
    perso(POSES.debout, D_X, { miroir: true, classe: 'd-debout' }),
  fin:
    SOL + BOARD + postits(FIN_POSTIT) + postit(3, Y_RETENU, true) +
    perso(PM_MONTRE, PM_X, { classe: 'pm-montre' }) +
    perso(POSES.debout, J_X, { jean: true, classe: 'j-debout' }) +
    perso(POSES['bras-tendus'], D_X, { miroir: true, classe: 'd-colle' }),
};
const fichier = (corps) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -140 ${L} 160" width="${L}" height="160">${STYLE}${corps}</svg>\n`;
for (const [nom, corps] of Object.entries(CARTES)) writeFileSync(join(ICI, `${nom}.svg`), fichier(corps));

// ---------------------------------------------------------------------------
// La planche : repos et fin ; les poses et le découpage proposé ; puis la fin
// et le repos aux largeurs de carte (480, 384, 335 px), taille réelle.

const P8 = police(800), P4 = police(400);
const M = 20, LARG = 2 * M + 1280, LEG = 34;
const CASE = (1280 - M) / 2, K = CASE / L, H_CASE = 160 * K;
const legende = (n, t, x, y) => P8.chemin(`${n}`, x, y, 15, 0, 'fs') + P4.chemin(t, x + 16, y, 15, 0, 'fs');
const petit = (t, x, y, taille = 13, p = P4) => p.chemin(t, x, y, taille, 0, 'fs');
const cadre = (x, y, l, h) => `<rect x="${x}" y="${y}" width="${l}" height="${h}" fill="${C.ivoire}" stroke="${C.dalle}" stroke-width="2"/>`;
const scene = (corps, x, y, k) => `<g transform="translate(${x} ${y + 140 * k}) scale(${k})">${corps}</g>`;

// Case 3 : les poses sur leur ligne de pied, et le post-it retenu en grand.
const POSES_CASE =
  `<line class="se" x1="6" y1="0" x2="${L - 6}" y2="0" stroke-width="1.5"/>` +
  perso(POSES.debout, 40, { jean: true }) +
  perso(JEAN_COLLE, 110, { jean: true }) +
  perso(PM_MONTRE, 190) +
  perso(POSES['bras-tendus'], 280, { miroir: true }) +
  `<g transform="translate(372 -70) scale(3) translate(${r2(-(BX + COL * 3.5))} ${-Y_RETENU - PI / 2})">${postit(3, Y_RETENU, true)}</g>`;
const NOMS = [
  ['debout', 22],
  [`montre ${angle(CIBLE_J, J_X)}° (Jean)`, 78],
  [`montre ${angle(CIBLE_PM, PM_X)}° (PM)`, 160],
  ['bras-tendus', 240],
  ['post-it retenu, × 3', 334],
];

const TEMPS = [
  ['col. 1', 'deux post-it de plus', 150],
  ['col. 2', 'deux de plus ; Jean baisse le bras, regarde', 150],
  ['col. 3', 'deux post-it ; le PM, la main au board', 150],
  ['col. 4', 'la designer tend les bras, le post-it ambre', 150],
];
function decoupage(x, y) {
  const total = TEMPS.reduce((s, t) => s + t[2], 0);
  let d = petit(`Découpage proposé : ${total} ms, une colonne par temps`, x + 16, y + 30, 14, P8);
  const x0 = x + 16, lp = CASE - 32 - 64;
  let t = 0;
  TEMPS.forEach(([, , ms], i) => {
    const xa = x0 + (t / total) * lp, l = (ms / total) * lp;
    d += `<rect x="${r2(xa)}" y="${y + 48}" width="${r2(l - 3)}" height="16" rx="2" fill="${i === 3 ? C.ambre : i % 2 ? C.dalle : '#ECE7DE'}" stroke="${C.ardoise}" stroke-width="1"/>`;
    d += petit(`${ms}`, xa + 4, y + 60, 11);
    t += ms;
  });
  d += petit(`${total} ms`, x0 + lp + 6, y + 60, 11);
  let yl = y + 96;
  for (const [n, txt, ms] of TEMPS) { d += petit(n, x0, yl, 13, P8) + petit(`${txt} : ${ms} ms`, x0 + 58, yl, 13); yl += 20; }
  d += petit('Chaque post-it apparaît en fondu court (60 ms), un léger décalage dans la colonne ;', x0, yl + 6, 12);
  d += petit('bascules de poses en step-end, comme les autres cartes.', x0, yl + 22, 12);
  return d;
}

let y = M, corps = '';
const LEGENDES = [
  ['repos', 'Repos : les trois au board ; Jean colle un post-it, bras sous l’horizontale.'],
  ['fin', 'Fin : le board rempli ; la designer colle, à deux mains, le seul post-it ambre.'],
];
LEGENDES.forEach(([nom, t], i) => {
  const x = M + i * (CASE + M);
  corps += cadre(x, y, CASE, H_CASE) + scene(CARTES[nom], x, y, K) + legende(i + 1, t, x, y + H_CASE + 22);
});
y += H_CASE + LEG + 12;
corps += cadre(M, y, CASE, H_CASE) + scene(POSES_CASE, M, y, K);
for (const [nm, xn] of NOMS) corps += petit(nm, M + xn * K, y + H_CASE - 10);
corps += legende(3, 'Les poses : debout, montre, bras-tendus ; aucune nouvelle.', M, y + H_CASE + 22);
corps += cadre(M + CASE + M, y, CASE, H_CASE) + decoupage(M + CASE + M, y);
corps += legende(4, 'La durée : quatre temps, une colonne chacun.', M + CASE + M, y + H_CASE + 22);
y += H_CASE + LEG + 12;
let n = 5;
for (const nom of ['fin', 'repos']) {
  let x = M;
  const hMax = (160 / L) * 480;
  for (const w of [480, 384, 335]) {
    const k = w / L;
    corps += cadre(x, y, w, 160 * k) + scene(CARTES[nom], x, y, k);
    x += w + 20;
  }
  corps += legende(n++, `${nom === 'fin' ? 'Fin' : 'Repos'} aux largeurs de carte : 480, 384 et 335 px, taille réelle.`, M, y + hMax + 22);
  y += hMax + LEG + 12;
}
const H = Math.round(y + 4);
const planche =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${LARG}" height="${H}">${STYLE}` +
  `<rect width="${LARG}" height="${H}" fill="${C.ivoire}"/>${corps}</svg>`;
await sharp(Buffer.from(planche)).png({ compressionLevel: 9 }).toFile(join(ICI, 'planche.png'));

// ---------------------------------------------------------------------------
// Les contrôles, pour le rapport.
console.log(`board : ${BX} à ${BX + BW}, ${HAUT} à ${BAS} ; colonnes de ${COL}.`);
console.log(`places : PM ${PM_X}, Jean ${r2(J_X)} (tête et buste de ${r2(J_X - 9)} à ${r2(J_X + 12.4)} ; post-it col. 1 jusqu'à ${r2(BX + COL / 2 + PI / 2)}, col. 2 dès ${r2(BX + 1.5 * COL - PI / 2)}), designer ${r2(D_X)} (buste dès ${r2(D_X - 9)}, board jusqu'à ${BX + BW}).`);
console.log(`bras : Jean ${angle(CIBLE_J, J_X)}°, PM ${angle(CIBLE_PM, PM_X)}° sous l'horizontale ; mains de la designer à y -73 et -76, post-it ambre de ${Y_RETENU} à ${Y_RETENU + PI}.`);
console.log(`planche.png ${LARG} × ${H}.`);

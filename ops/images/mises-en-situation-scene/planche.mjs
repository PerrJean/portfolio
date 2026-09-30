// Les images clés de la scène « Mises en situation » (registre/0069), carte
// du projet « mises en situation orales par IA » : images fixes, aucune
// animation. Une seule scène, un board et des post-it (le Design Sprint).
// Quatrième version, sur les retours de Jean : son personnage est celui de
// gauche, et il n'est pas actif ; les deux autres font le travail ; le PM ne
// fait que deux gestes, plus longs, trois temps de 200 ms. Et aucun bras levé
// seul au-dessus de l'épaule : un bras qui colle reste à l'horizontale ou
// plus bas ; la designer colle à deux mains.
//  1. repos : le board, quatre colonnes ; la première est pleine, la
//     deuxième a deux post-it ; Jean à gauche du board, debout, tourné vers
//     lui ; le PM devant le board, entre la première et la deuxième colonne,
//     colle un post-it en bas de la deuxième (le bras 47° sous
//     l'horizontale) ; la product designer au bord droit, tournée vers le
//     board ;
//  2. et 3. le board se remplit colonne après colonne, en entonnoir (4, 4,
//     2, 1) : le PM colle le milieu de la deuxième, puis fait un pas jusqu'à
//     l'écart suivant et colle la troisième (ses deux post-it au milieu, rangs
//     2 et 3, là où sa main arrive sans lever le bras) ;
//  4. fin : un seul post-it ambre, dans la dernière colonne, à mi-hauteur (le
//     pari retenu), un petit signe de bulle dessus (l'oral) ; la designer
//     vient de le coller à deux mains (bras-tendus) ; le PM a baissé le bras ;
//     Jean n'a pas bougé.
// Produit repos.svg et fin.svg, dans le repère de Scene.astro
// (0 -140 426.667 160), mêmes classes, et planche.png.
// Relançable : node ops/images/mises-en-situation-scene/planche.mjs.
// Sans paquet ajouté : sharp ; le texte en chemins (../accueil/police.mjs).
//
// Aucune pose nouvelle : debout, bras-tendus, marche-2 et montre (poses.ts),
// montre avec d'autres cibles, toutes sous l'horizontale (le bras avant droit,
// 32,2, vers la cible). Les objets (board, post-it, post-it retenu) viennent
// de poses.ts (OBJETS), comme dans le site (SceneMisesEnSituation.astro).

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { POSES, LUNETTES, OBJETS, montre } from '../../../src/components/scene/poses.ts';
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
// Les places et le board (mêmes mesures que la deuxième version).

const BW = 156, COL = BW / 4;
const PI = 13, RANGS = [-123, -104, -85, -66]; // côté du post-it, haut de chaque rang
const Y_RETENU = -82; // le post-it ambre : les mains de bras-tendus (y -73 et -76) dessus
const A_GAUCHE = Math.round(1 + Math.sqrt(LONG_BRAS ** 2 - 9 ** 2) + 1); // de Jean au board
const MAINS_D = 30; // de la designer au centre du post-it ambre (mains de bras-tendus à 29 et 31)
const LARGEUR = 12 + A_GAUCHE + COL * 3.5 + MAINS_D + 12;
const J_X = Math.round((L - LARGEUR) / 2 + 12), BX = J_X + A_GAUCHE;
// Le PM devant le board, dans l'écart entre les post-it de deux colonnes
// (26 de large ; sa tête et son buste, de -9 à 12,4, y passent) : d'abord
// entre la première et la deuxième, puis entre la deuxième et la troisième.
const PM_1 = BX + COL - 3, PM_2 = BX + 2 * COL - 3;
const D_X = BX + COL * 3.5 + MAINS_D;

const xPostit = (col) => BX + COL * (col + 0.5) - PI / 2;
const postit = (col, y, retenu = false) =>
  `<g class="postit c${col + 1}" transform="translate(${r2(xPostit(col))} ${y})">${retenu ? OBJETS['postit-retenu'] : OBJETS.postit}</g>`;
const BOARD = `<g class="board" transform="translate(${BX} 0)">${OBJETS.board}</g>`;
// Le remplissage, temps par temps : au repos, la première colonne pleine,
// deux dans la deuxième (celui du bas, le PM le colle) ; puis deux de plus
// dans la deuxième, deux au milieu de la troisième ; enfin l'ambre (on
// diverge, puis on converge).
const REPOS_POSTIT = [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 3]];
const AJOUTS = [[[1, 2], [1, 1]], [[2, 2], [2, 1]]];
const jusqua = (n) => [...REPOS_POSTIT, ...AJOUTS.slice(0, n).flat()];
const postits = (liste) => liste.map(([c, r]) => postit(c, RANGS[r])).join('');
const SOL = `<line class="se" x1="0" y1="0" x2="${L}" y2="0" stroke-width="1.5"/>`;

// ---------------------------------------------------------------------------
// Les personnages.

const perso = (dessin, x, { jean = false, miroir = false, classe = '' } = {}) => {
  const d = dessin.replace('{L}', jean ? LUNETTES : '');
  return `<g transform="translate(${r2(x)} 0)"><g class="${classe}"${miroir ? ' transform="scale(-1 1)"' : ''}>${d}</g></g>`;
};
// La cible, du repère de la scène à celui de la pose (miroir : tournée vers
// la gauche).
const locale = ([x, y], px, miroir = false) => [miroir ? px - x : x - px, y];
const centre = (col, rang) => [BX + COL * (col + 0.5), RANGS[rang] + PI / 2];
// Les gestes du PM : au repos, le haut du post-it du bas de la deuxième
// colonne ; puis le milieu de la deuxième (rang 3), puis, un écart plus loin,
// celui de la troisième. Le bras reste droit, 32,2 : la main arrive sur le bord du
// post-it visé.
const GESTES = {
  repos: [[BX + COL * 1.5, RANGS[3]], PM_1, false],
  col2: [centre(1, 2), PM_1, false],
  col3: [centre(2, 2), PM_2, false],
};
const PM = Object.fromEntries(Object.entries(GESTES).map(([k, [c, x, m]]) => [k, montre(locale(c, x, m))]));
// L'angle d'un bras qui montre, en degrés sous l'horizontale (> 0 : plus bas).
const angle = ([c, px, m]) => {
  const [lx, ly] = locale(c, px, m);
  return r2((Math.atan2(ly - EP_AV[1], lx - EP_AV[0]) * 180) / Math.PI);
};
const main = ([c, px, m]) => {
  const [lx, ly] = locale(c, px, m), dx = lx - 1, dy = ly + 89, k = LONG_BRAS / Math.hypot(dx, dy);
  return [r2(m ? px - (1 + dx * k) : px + 1 + dx * k), r2(-89 + dy * k)];
};

const JEAN = perso(POSES.debout, J_X, { jean: true, classe: 'j-debout' });
const DESIGNER = perso(POSES.debout, D_X, { miroir: true, classe: 'd-debout' });
const CARTES = {
  repos: SOL + BOARD + postits(jusqua(0)) + JEAN + perso(PM.repos, PM_1, { classe: 'pm-repos' }) + DESIGNER,
  col2: SOL + BOARD + postits(jusqua(1)) + JEAN + perso(PM.col2, PM_1, { classe: 'pm-col2' }) + DESIGNER,
  col3: SOL + BOARD + postits(jusqua(2)) + JEAN + perso(PM.col3, PM_2, { classe: 'pm-col3' }) + DESIGNER,
  fin:
    SOL + BOARD + postits(jusqua(2)) + postit(3, Y_RETENU, true) + JEAN +
    perso(POSES.debout, PM_2, { classe: 'pm-debout' }) +
    perso(POSES['bras-tendus'], D_X, { miroir: true, classe: 'd-colle' }),
};
const fichier = (corps) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -140 ${L} 160" width="${L}" height="160">${STYLE}${corps}</svg>\n`;
for (const nom of ['repos', 'fin']) writeFileSync(join(ICI, `${nom}.svg`), fichier(CARTES[nom]));

// ---------------------------------------------------------------------------
// La planche : repos et fin ; les trois temps intermédiaires et les poses ;
// le découpage ; puis la fin et le repos aux largeurs de carte (480, 384,
// 335 px), taille réelle.

const P8 = police(800), P4 = police(400);
const M = 20, LARG = 2 * M + 1280, LEG = 34;
const CASE = (1280 - M) / 2, K = CASE / L, H_CASE = 160 * K;
const legende = (n, t, x, y) => P8.chemin(`${n}`, x, y, 15, 0, 'fs') + P4.chemin(t, x + 16, y, 15, 0, 'fs');
const petit = (t, x, y, taille = 13, p = P4) => p.chemin(t, x, y, taille, 0, 'fs');
const cadre = (x, y, l, h) => `<rect x="${x}" y="${y}" width="${l}" height="${h}" fill="${C.ivoire}" stroke="${C.dalle}" stroke-width="2"/>`;
const scene = (corps, x, y, k) => `<g transform="translate(${x} ${y + 140 * k}) scale(${k})">${corps}</g>`;

// Les poses sur leur ligne de pied.
const POSES_CASE =
  `<line class="se" x1="6" y1="0" x2="${L - 6}" y2="0" stroke-width="1.5"/>` +
  perso(POSES.debout, 30, { jean: true }) +
  perso(PM.repos, 110) + perso(PM.col2, 200) +
  perso(POSES['marche-2'], 300) + perso(POSES['bras-tendus'], 395, { miroir: true });
const NOMS = [
  ['Jean : debout', 8],
  [`PM : ${[GESTES.repos, GESTES.col2].map((g) => `${angle(g)}°`.replace(".", ",")).join(", ")}`, 100],
  ['marche-2', 282],
  ['bras-tendus', 352],
];

const TEMPS = [
  ['temps 1', 'le PM colle le milieu de la deuxième ; deux post-it', 200],
  ['temps 2', 'un pas vers l’écart suivant, il colle la troisième ; deux', 200],
  ['temps 3', 'la designer colle l’ambre à deux mains ; le PM baisse le bras', 200],
];
function decoupage(x, y) {
  const total = TEMPS.reduce((s, t) => s + t[2], 0);
  let d = petit(`Découpage : ${total} ms, trois temps ; Jean ne bouge pas`, x + 16, y + 30, 14, P8);
  const x0 = x + 16, lp = CASE - 32 - 64;
  let t = 0;
  TEMPS.forEach(([, , ms], i) => {
    const xa = x0 + (t / total) * lp, l = (ms / total) * lp;
    d += `<rect x="${r2(xa)}" y="${y + 48}" width="${r2(l - 3)}" height="16" rx="2" fill="${i === TEMPS.length - 1 ? C.ambre : i % 2 ? C.dalle : '#ECE7DE'}" stroke="${C.ardoise}" stroke-width="1"/>`;
    d += petit(`${ms}`, xa + 4, y + 60, 11);
    t += ms;
  });
  d += petit(`${total} ms`, x0 + lp + 6, y + 60, 11);
  let yl = y + 96;
  for (const [n, txt, ms] of TEMPS) { d += petit(n, x0, yl, 13, P8) + petit(`${txt} : ${ms} ms`, x0 + 70, yl, 13); yl += 20; }
  d += petit('Chaque post-it apparaît en fondu court (60 ms), le second 30 ms après le premier ;', x0, yl + 6, 12);
  d += petit('bascules de poses en step-end, comme les autres cartes.', x0, yl + 22, 12);
  return d;
}

let y = M, corps = '';
const CASES = [
  ['repos', 'Repos : Jean à gauche, il regarde ; le PM colle, bras sous l’horizontale.'],
  ['fin', 'Fin : le board rempli ; la designer colle, à deux mains, le seul post-it ambre.'],
  ['col2', 'Temps 1 : le PM colle le milieu de la deuxième colonne.'],
  ['col3', 'Temps 2 : un écart plus loin, il colle le milieu de la troisième.'],
];
CASES.forEach(([nom, t], i) => {
  const x = M + (i % 2) * (CASE + M), yc = y + Math.floor(i / 2) * (H_CASE + LEG + 12);
  corps += cadre(x, yc, CASE, H_CASE) + scene(CARTES[nom], x, yc, K) + legende(i + 1, t, x, yc + H_CASE + 22);
});
y += 2 * (H_CASE + LEG + 12);
corps += cadre(M, y, CASE, H_CASE) + scene(POSES_CASE, M, y, K);
for (const [nm, xn] of NOMS) corps += petit(nm, M + xn * K, y + H_CASE - 10);
corps += legende(5, 'Les poses : aucune nouvelle ; aucun bras au-dessus de l’épaule.', M, y + H_CASE + 22);
corps += cadre(M + CASE + M, y, CASE, H_CASE) + decoupage(M + CASE + M, y);
corps += legende(6, 'La durée : trois temps de 200 ms.', M + CASE + M, y + H_CASE + 22);
y += H_CASE + LEG + 12;
let n = 7;
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
const ecart = (c) => [r2(xPostit(c) + PI), r2(xPostit(c + 1))];
console.log(`board : ${BX} à ${BX + BW} ; colonnes de ${COL}.`);
console.log(`places : Jean ${J_X} (bras jusqu'à ${J_X + 12.4}, board dès ${BX}), PM ${PM_1} puis ${PM_2} (buste de -9 à +12,4 ; écarts ${ecart(0).join('-')} et ${ecart(1).join('-')}), designer ${D_X}.`);
for (const [k, g] of Object.entries(GESTES)) console.log(`PM ${k} : ${angle(g)}° sous l'horizontale, main en ${main(g).join(', ')}.`);
console.log(`designer : mains à y -73 et -76, post-it ambre de ${Y_RETENU} à ${Y_RETENU + PI}, x ${r2(xPostit(3))} à ${r2(xPostit(3) + PI)}.`);
console.log(`planche.png ${LARG} × ${H}.`);

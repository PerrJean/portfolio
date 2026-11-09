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
// Sans paquet ajouté : sharp ; le texte en chemins (../commun/police.mjs).
//
// Aucune pose nouvelle : debout, bras-tendus, marche-2 et montre (poses.ts),
// montre avec d'autres cibles, toutes sous l'horizontale (le bras avant droit,
// 32,2, vers la cible). Le board et le post-it viennent de poses.ts
// (OBJETS), comme dans le site (SceneMisesEnSituation.astro) ; le post-it
// retenu est dessiné ici (POSTIT_RETENU).

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { POSES, OBJETS, montre } from '../../../src/components/scene/poses.ts';
import { L, r2, sol, svgScene } from '../commun/svg.mjs';
import { EP_AV, LONG_BRAS, perso } from '../commun/personnage.mjs';
import { M, LARG, CASE, RANG, encadre, grille, casePoses, decoupage, auxLargeurs, ecrirePlanche } from '../commun/planche.mjs';

const ICI = fileURLToPath(new URL('./', import.meta.url));

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

// Le post-it retenu (ambre, un signe de bulle : l'oral) est un objet de
// planche : il a quitté poses.ts en 0090, la scène animée ne s'en sert pas.
const POSTIT_RETENU =
  '<rect class="fa se" x="0" y="0" width="13" height="13" rx="1" stroke-width="1.5"/><path class="se" d="M1.9,5.5 a3.6,2.6 0 1 1 2.2,2.4 l-2.4,1.8 l0.6,-2.6 Z" fill="none" stroke-width="1.1" stroke-linejoin="round"/>';
const xPostit = (col) => BX + COL * (col + 0.5) - PI / 2;
const postit = (col, y, retenu = false) =>
  `<g class="postit c${col + 1}" transform="translate(${r2(xPostit(col))} ${y})">${retenu ? POSTIT_RETENU : OBJETS.postit}</g>`;
const BOARD = `<g class="board" transform="translate(${BX} 0)">${OBJETS.board}</g>`;
// Le remplissage, temps par temps : au repos, la première colonne pleine,
// deux dans la deuxième (celui du bas, le PM le colle) ; puis deux de plus
// dans la deuxième, deux au milieu de la troisième ; enfin l'ambre (on
// diverge, puis on converge).
const REPOS_POSTIT = [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 3]];
const AJOUTS = [[[1, 2], [1, 1]], [[2, 2], [2, 1]]];
const jusqua = (n) => [...REPOS_POSTIT, ...AJOUTS.slice(0, n).flat()];
const postits = (liste) => liste.map(([c, r]) => postit(c, RANGS[r])).join('');

// ---------------------------------------------------------------------------
// Les personnages.

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
  repos: sol() + BOARD + postits(jusqua(0)) + JEAN + perso(PM.repos, PM_1, { classe: 'pm-repos' }) + DESIGNER,
  col2: sol() + BOARD + postits(jusqua(1)) + JEAN + perso(PM.col2, PM_1, { classe: 'pm-col2' }) + DESIGNER,
  col3: sol() + BOARD + postits(jusqua(2)) + JEAN + perso(PM.col3, PM_2, { classe: 'pm-col3' }) + DESIGNER,
  fin:
    sol() + BOARD + postits(jusqua(2)) + postit(3, Y_RETENU, true) + JEAN +
    perso(POSES.debout, PM_2, { classe: 'pm-debout' }) +
    perso(POSES['bras-tendus'], D_X, { miroir: true, classe: 'd-colle' }),
};
for (const nom of ['repos', 'fin']) writeFileSync(join(ICI, `${nom}.svg`), svgScene(CARTES[nom]));

// ---------------------------------------------------------------------------
// La planche : repos et fin ; les trois temps intermédiaires et les poses ;
// le découpage ; puis la fin et le repos aux largeurs de carte (480, 384,
// 335 px), taille réelle.

// Les poses sur leur ligne de pied.
const POSES_CASE =
  sol(6, L - 6) +
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
const TOTAL = TEMPS.reduce((s, t) => s + t[2], 0);
const DECOUPAGE = {
  titre: `Découpage : ${TOTAL} ms, trois temps ; Jean ne bouge pas`,
  temps: TEMPS,
  notes: [
    'Chaque post-it apparaît en fondu court (60 ms), le second 30 ms après le premier ;',
    'bascules de poses en step-end, comme les autres cartes.',
  ],
};

let y = M, corps = '';
corps += grille([
  ['repos', 'Repos : Jean à gauche, il regarde ; le PM colle, bras sous l’horizontale.'],
  ['fin', 'Fin : le board rempli ; la designer colle, à deux mains, le seul post-it ambre.'],
  ['col2', 'Temps 1 : le PM colle le milieu de la deuxième colonne.'],
  ['col3', 'Temps 2 : un écart plus loin, il colle le milieu de la troisième.'],
], y, CARTES);
y += 2 * RANG;
corps += casePoses(M, y, POSES_CASE, NOMS, 5, 'Les poses : aucune nouvelle ; aucun bras au-dessus de l’épaule.');
corps += encadre(M + CASE + M, y, decoupage(M + CASE + M, y, DECOUPAGE), 6, 'La durée : trois temps de 200 ms.');
y += RANG;
const largeurs = auxLargeurs([[CARTES.fin, 'Fin'], [CARTES.repos, 'Repos']], y, 7);
corps += largeurs.corps;
y = largeurs.y;
const H = Math.round(y + 4);
await ecrirePlanche(join(ICI, 'planche.png'), corps, H);

// ---------------------------------------------------------------------------
// Les contrôles, pour le rapport.
const ecart = (c) => [r2(xPostit(c) + PI), r2(xPostit(c + 1))];
console.log(`board : ${BX} à ${BX + BW} ; colonnes de ${COL}.`);
console.log(`places : Jean ${J_X} (bras jusqu'à ${J_X + 12.4}, board dès ${BX}), PM ${PM_1} puis ${PM_2} (buste de -9 à +12,4 ; écarts ${ecart(0).join('-')} et ${ecart(1).join('-')}), designer ${D_X}.`);
for (const [k, g] of Object.entries(GESTES)) console.log(`PM ${k} : ${angle(g)}° sous l'horizontale, main en ${main(g).join(', ')}.`);
console.log(`designer : mains à y -73 et -76, post-it ambre de ${Y_RETENU} à ${Y_RETENU + PI}, x ${r2(xPostit(3))} à ${r2(xPostit(3) + PI)}.`);
console.log(`planche.png ${LARG} × ${H}.`);

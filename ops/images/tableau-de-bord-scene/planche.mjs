// Les images clés de la scène « Tableau de bord client » (registre/0090),
// carte 07 : images fixes, aucune animation. L'histoire : cinq clients disent
// beaucoup de besoins ; il en sort une donnée. Jean anime.
//  1. repos : le board de la carte Mises en situation, ses quatre colonnes
//     garnies de post-it au trait, nombreux et un peu de travers ; Jean à
//     gauche du board, en animateur (montre, le bras 24° sous l'horizontale,
//     vers la première colonne) ; deux clients anonymes à droite, tournés
//     vers le board ;
//  2. en chemin : les post-it ont fait 60 % du trajet vers le centre, leur
//     biais à moitié redressé ; le bras de Jean suit ;
//  3. fin : un seul post-it ambre, deux fois plus grand (26), au milieu du
//     board ; Jean le montre (bras 8° sous l'horizontale). Aucun texte.
// Produit repos.svg, chemin.svg et fin.svg, dans le repère de Scene.astro
// (0 -140 426.667 160), mêmes classes, et planche.png.
// Relançable : node ops/images/tableau-de-bord-scene/planche.mjs.
// Sans paquet ajouté : sharp ; le texte en chemins (../commun/police.mjs).
//
// Aucune pose nouvelle : montre (Jean, deux cibles) et debout (les clients,
// en miroir). Board et post-it : OBJETS de poses.ts. Le grand post-it ambre
// est un objet de planche (un aplat ambre, le trait du post-it).

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { POSES, OBJETS, montre } from '../../../src/components/scene/poses.ts';
import { L, r2, sol, svgScene } from '../commun/svg.mjs';
import { LONG_BRAS, perso } from '../commun/personnage.mjs';
import { M, LARG, CASE, RANG, encadre, grille, casePoses, decoupage, auxLargeurs, ecrirePlanche } from '../commun/planche.mjs';

const ICI = fileURLToPath(new URL('./', import.meta.url));

// ---------------------------------------------------------------------------
// Les places : Jean, le board, les deux clients.

const BW = 156, PI = 13, GRAND = 26;
const A_GAUCHE = 33; // de Jean au board : sa main arrive au bord du cadre (celle de la carte 02)
const ECART_CLIENT = 24, ENTRE_CLIENTS = 30;
const LARGEUR = 10 + A_GAUCHE + BW + ECART_CLIENT + ENTRE_CLIENTS + 10;
const J_X = Math.round((L - LARGEUR) / 2 + 10), BX = J_X + A_GAUCHE;
const C1 = BX + BW + ECART_CLIENT, C2 = C1 + ENTRE_CLIENTS;

// Les post-it au repos, dans le repère du board : coin haut gauche et biais
// (degrés). Seize, quatre colonnes (séparations à 39, 78, 117), deux qui se
// chevauchent ; chacun reste dans sa colonne.
const POSTITS = [
  [14, -124, -4], [11, -106, 3], [15, -89, -2], [12, -70, 5], [21, -97, 7],
  [51, -123, 3], [55, -106, -5], [50, -88, 2], [54, -70, -3],
  [90, -125, -3], [93, -107, 4], [88, -86, -6],
  [128, -122, 4], [131, -104, -3], [126, -87, 2], [130, -68, -4],
];
// Le grand post-it, centré sur le milieu du board, un peu sous la mi-hauteur.
const MILIEU = [BW / 2, -86];
const CIBLE_PI = [MILIEU[0] - PI / 2, MILIEU[1] - PI / 2]; // où chaque petit post-it converge
const AVANCE = 0.6; // l'image en chemin

const postit = ([x, y, a], t = 0) => {
  const px = x + (CIBLE_PI[0] - x) * t, py = y + (CIBLE_PI[1] - y) * t, pa = a * (1 - t / 1.2);
  return `<g class="postit" transform="translate(${r2(BX + px)} ${r2(py)}) rotate(${r2(pa)} 6.5 6.5)">${OBJETS.postit}</g>`;
};
const GRAND_POSTIT =
  `<g class="postit-donnee" transform="translate(${r2(BX + MILIEU[0] - GRAND / 2)} ${MILIEU[1] - GRAND / 2})">` +
  `<rect class="fa se" x="0" y="0" width="${GRAND}" height="${GRAND}" rx="1.5" stroke-width="2"/></g>`;
const BOARD = `<g class="board" transform="translate(${BX} 0)">${OBJETS.board}</g>`;

// ---------------------------------------------------------------------------
// Les personnages.

// Les cibles de Jean, dans le repère de la scène : au repos, le bas de la
// première colonne ; à la fin, le coin bas gauche du grand post-it.
const CIBLES = {
  repos: [BX + 19.5, -66],
  fin: [BX + MILIEU[0] - GRAND / 2 + 3, MILIEU[1] + GRAND / 2 - 2],
};
CIBLES.chemin = [0, 1].map((i) => CIBLES.repos[i] + (CIBLES.fin[i] - CIBLES.repos[i]) * AVANCE);
const locale = ([x, y]) => [x - J_X, y];
const angle = (c) => {
  const [lx, ly] = locale(c);
  return r2((Math.atan2(ly + 89, lx - 1) * 180) / Math.PI);
};
const main = (c) => {
  const [lx, ly] = locale(c), dx = lx - 1, dy = ly + 89, k = LONG_BRAS / Math.hypot(dx, dy);
  return [r2(J_X + 1 + dx * k), r2(-89 + dy * k)];
};
const JEAN = Object.fromEntries(Object.entries(CIBLES).map(([k, c]) => [k, perso(montre(locale(c)), J_X, { jean: true, classe: `j-${k}` })]));
const CLIENTS = perso(POSES.debout, C1, { miroir: true, classe: 'client-1' }) + perso(POSES.debout, C2, { miroir: true, classe: 'client-2' });

const CARTES = {
  repos: sol() + BOARD + POSTITS.map((p) => postit(p)).join('') + JEAN.repos + CLIENTS,
  chemin: sol() + BOARD + POSTITS.map((p) => postit(p, AVANCE)).join('') + JEAN.chemin + CLIENTS,
  fin: sol() + BOARD + GRAND_POSTIT + JEAN.fin + CLIENTS,
};
for (const nom of ['repos', 'chemin', 'fin']) writeFileSync(join(ICI, `${nom}.svg`), svgScene(CARTES[nom]));

// ---------------------------------------------------------------------------
// La planche : repos et fin ; en chemin et les poses ; le découpage ; puis la
// fin et le repos aux largeurs de carte (480, 384, 335 px), taille réelle.

const deg = (v) => `${v}°`.replace('.', ',');

const POSES_CASE =
  sol(6, L - 6) +
  perso(montre(locale(CIBLES.repos)), 40, { jean: true }) +
  perso(montre(locale(CIBLES.chemin)), 140, { jean: true }) +
  perso(montre(locale(CIBLES.fin)), 240, { jean: true }) +
  perso(POSES.debout, 360, { miroir: true });
const NOMS = [
  [`montre ${deg(angle(CIBLES.repos))}`, 18],
  [`montre ${deg(angle(CIBLES.chemin))}`, 118],
  [`montre ${deg(angle(CIBLES.fin))}`, 218],
  ['debout, miroir', 330],
];

const TEMPS = [
  ['temps 1', 'les seize post-it glissent vers le centre, biais redressé', 300],
  ['temps 2', 'ils se fondent en un seul, l’ambre grandit à 26', 150],
  ['temps 3', 'Jean lève un peu le bras vers lui ; tout se pose', 150],
];
const TOTAL = TEMPS.reduce((s, t) => s + t[2], 0);
const DECOUPAGE = {
  titre: `Découpage : ${TOTAL} ms, trois temps ; les clients ne bougent pas`,
  temps: TEMPS,
  ambre: 1, // l'ambre apparaît au deuxième temps
  notes: [
    'Glissement en ease-in-out (translate + rotate de chaque post-it) ; les petits s’effacent',
    'pendant que l’ambre apparaît (scale de 0,5 à 1) ; le bras de Jean bascule en step-end.',
  ],
};

let y = M, corps = '';
corps += grille([
  ['repos', 'Repos : le board plein de besoins ; Jean anime, deux clients regardent.'],
  ['fin', 'Fin : il en sort une donnée, un seul post-it ambre ; Jean le montre.'],
  ['chemin', 'En chemin : les post-it convergent vers le centre (60 % du trajet).'],
], y, CARTES);
corps += casePoses(M + CASE + M, y + RANG, POSES_CASE, NOMS, 4, 'Les poses : aucune nouvelle ; aucun bras au-dessus de l’épaule.');
y += 2 * RANG;
corps += encadre(M, y, decoupage(M, y, DECOUPAGE), 5, 'La durée : 600 ms, trois temps.');
y += RANG;
const largeurs = auxLargeurs([[CARTES.fin, 'Fin'], [CARTES.repos, 'Repos']], y, 6);
corps += largeurs.corps;
y = largeurs.y;
const H = Math.round(y + 4);
await ecrirePlanche(join(ICI, 'planche.png'), corps, H);

// ---------------------------------------------------------------------------
// Les contrôles, pour le rapport.
console.log(`board : ${BX} à ${BX + BW} ; Jean ${J_X} ; clients ${C1} et ${C2} (miroir).`);
for (const [k, c] of Object.entries(CIBLES)) console.log(`Jean ${k} : ${angle(c)}° sous l'horizontale, main en ${main(c).join(', ')}.`);
for (const [x, yy] of POSTITS) if (!((x >= 2 && x + PI <= 37) || (x >= 41 && x + PI <= 76) || (x >= 80 && x + PI <= 115) || (x >= 119 && x + PI <= 154)) || yy < -128 || yy + PI > -48) console.log(`post-it hors colonne : ${x}, ${yy}`);
console.log(`grand post-it : x ${r2(BX + MILIEU[0] - GRAND / 2)} à ${r2(BX + MILIEU[0] + GRAND / 2)}, y ${MILIEU[1] - GRAND / 2} à ${MILIEU[1] + GRAND / 2}.`);
console.log(`planche.png ${LARG} × ${H}.`);

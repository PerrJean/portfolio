// Les images clés de la scène « Fusion » (registre/0069), carte du projet
// « fusion des plateformes » : images fixes (l'animation est dans
// src/components/scene/SceneFusion.astro). Quatrième version, sur les
// retours de Jean : les deux bâtiments ont le même contour, un seul trait
// plein ; il n'y a pas de mur à part entre les deux, mais un écart, du vide ;
// ce sont les deux parois qui se font face qui tombent.
//  1. repos : deux cabanes au même trait, séparées par un écart visible, au
//     sol comme en haut ; dans la cabane de gauche, Jean et les trois
//     ouvriers de l'en-tête poussent sa paroi droite en chaîne (Jean à la
//     paroi, chacun les mains dans le dos de celui qui le précède) ;
//  2. la paroi poussée bascule vers la droite jusqu'à toucher la paroi gauche
//     de l'autre cabane (11,35°), la chaîne la suit ;
//  3. les deux parois tombent ensemble vers la droite, comme des dominos, la
//     chaîne trébuche en avant ;
//  4. fin : l'écart a disparu ; il ne reste qu'une cabane, sur toute la
//     largeur, sur une dalle commune ; point ambre sur la dalle, là où
//     étaient les parois ; les quatre lèvent les deux mains.
// Règle (Jean) : aucun personnage avec un seul bras levé au-dessus de
// l'épaule ; pour célébrer, les deux mains levées.
// Produit repos.svg, penche.svg, chute.svg, fin.svg, dans le repère de
// Scene.astro (0 -140 426.667 160), mêmes classes, et planche.png.
// Relançable : node ops/images/fusion-scene/planche.mjs.
// Sans paquet ajouté : sharp ; le texte en chemins (../commun/police.mjs).
//
// Les poses, dessinées ici et reportées telles quelles dans poses.ts (pousse,
// hourra), sur les segments existants, sans articulation nouvelle :
//  - pousse : buste et tête basculés de 25° aux hanches (la bascule de
//    penche, 30°, un peu moins) ; la jambe arrière tendue loin derrière, le
//    pied à plat ; la jambe avant fléchie, genou devant (comme marche-2) ;
//    les deux bras droits, repartis des épaules basculées, de la longueur de
//    ceux de bras-tendus (32,2 et 33,6), 10° et 6° sous l'horizontale ;
//  - hourra : les jambes et le buste de debout ; les deux bras droits, de
//    la longueur de ceux de bras-tendus, levés en V à 45° : l'avant vers
//    l'avant, l'arrière vers l'arrière (à 45°, ils passent à côté de la
//    tête sans la toucher ; plus haut, ils la mordent).
// Les objets : la cabane (murs et toit à deux pans, un trait plein, une
// fenêtre carrée, une porte, la paroi qui tombe : CABANE dans poses.ts), la
// dalle (celle de l'en-tête, 12 de haut sous le sol).

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { POSES, CABANE } from '../../../src/components/scene/poses.ts';
import { L, r2, pt, add, rad, tourne, sol, svgScene } from '../commun/svg.mjs';
import { jambes, brasArriere, brasAvant, TORSE, TETE, JAMBES_DEBOUT, EP_AR, EP_AV, LONG_BRAS, perso } from '../commun/personnage.mjs';
import { M, LARG, CASE, RANG, encadre, grille, casePoses, decoupage, auxLargeurs, ecrirePlanche } from '../commun/planche.mjs';

const ICI = fileURLToPath(new URL('./', import.meta.url));

// ---------------------------------------------------------------------------
// Les pièces des poses : celles de poses.ts (../commun/personnage.mjs).

const LONG_AV = LONG_BRAS, LONG_AR = Math.hypot(31, 13); // bras-tendus : 32,2 et 33,6
const dirBras = (deg) => [Math.cos(rad(deg)), Math.sin(rad(deg))]; // deg > 0 : sous l'horizontale

// pousse : la bascule, les jambes, les bras.
const BASCULE = 25, SOUS = 10;
const EPB_AR = tourne(EP_AR, BASCULE), EPB_AV = tourne(EP_AV, BASCULE);
const MAIN_AV = add(EPB_AV, dirBras(SOUS).map((v) => v * LONG_AV));
const MAIN_AR = add(EPB_AR, dirBras(SOUS - 4).map((v) => v * LONG_AR));
const POUSSE =
  jambes('-5.25,-56 -16,-4 -11,-4', '5.25,-56 13,-31 9,-4 14,-4') +
  brasArriere(EPB_AR, MAIN_AR) + `<g transform="rotate(${BASCULE} 0 -56)">${TORSE}${TETE}</g>` + brasAvant(EPB_AV, MAIN_AV);
// Le dos basculé : le bord x = -9 du buste, à la hauteur y (repère de la pose).
const dos = (y) => {
  const s = Math.sin(rad(BASCULE)), c = Math.cos(rad(BASCULE));
  return -9 * c - ((y + 56 + 9 * s) / c) * s;
};
const MAIN_BORD = 3.5; // demi-trait du bras

// hourra : les deux bras en V, à 45° au-dessus de l'horizontale.
const V = 45;
const H_AV = add(EP_AV, [LONG_AV * Math.cos(rad(V)), -LONG_AV * Math.sin(rad(V))]);
const H_AR = add(EP_AR, [-LONG_AR * Math.cos(rad(V)), -LONG_AR * Math.sin(rad(V))]);
const HOURRA = JAMBES_DEBOUT + brasArriere(EP_AR, H_AR) + TORSE + TETE + brasAvant(EP_AV, H_AV);
// Distance du centre de la tête (1,-110) à un bras, moins le demi-trait :
// doit rester au-dessus du rayon (10) pour que le bras ne morde pas la tête.
const jeu = (a, b) => {
  const [dx, dy] = [b[0] - a[0], b[1] - a[1]], l = Math.hypot(dx, dy);
  return Math.abs(dx * (-110 - a[1]) - dy * (1 - a[0])) / l - MAIN_BORD;
};
// Les poses du site doivent rester celles-ci.
if (POSES.pousse !== POUSSE || POSES.hourra !== HOURRA) throw new Error('pousse ou hourra : poses.ts ne suit plus la planche');

// ---------------------------------------------------------------------------
// Le décor.

// La cabane de la fin, celle de la deuxième version : de X0 à X1. Au repos,
// la cabane de gauche va de X0 à XG, l'écart de XG à XD (24), la cabane de
// droite de XD à X1 ; le point ambre au milieu de l'écart (S).
const X0 = 35.8, XG = 266.9, ECART = 24, XD = XG + ECART, X1 = 390.9, S = XG + ECART / 2;
const MUR_T = 1.25; // demi-trait des murs
const PORTE_X = X1 - 34;
// L'angle où la paroi poussée touche l'autre : son haut (122) atteint XD.
const CONTACT = (Math.asin(ECART / 122) * 180) / Math.PI;
// La fenêtre, petite et haute dans le coin : le dernier pousseur passe dessous.
const FENETRE = CABANE.fenetre(X0 + 8, -116, 16);
const PORTE = CABANE.porte(PORTE_X, 26, 62);
const paroi = (x, angle, classe) => `<g class="${classe}" transform="translate(${r2(x)} 0) rotate(${r2(angle)})">${CABANE.paroi}</g>`;
const CABANES = (ag, ad) =>
  `<g class="cabane-g">${CABANE.murs(X0, XG, 'droite')}${FENETRE}</g>` +
  `<g class="cabane-d">${CABANE.murs(XD, X1, 'gauche')}${PORTE}</g>` +
  paroi(XD, ad, 'paroi-d') + paroi(XG, ag, 'paroi-g');
const CABANE_FIN = `<g class="cabane-fin">${CABANE.murs(X0, X1)}${FENETRE}${PORTE}</g>`;
const DALLE = `<rect class="dalle fd" x="${r2(X0 - 12)}" y="0" width="${r2(X1 - X0 + 24)}" height="12"/>`;
const POINT = `<circle class="point fa" cx="${r2(S)}" cy="6" r="5"/>`;

// ---------------------------------------------------------------------------
// Les personnages.

// La chaîne contre la paroi droite de la cabane de gauche, penchée de
// `angle` : Jean à la paroi (sa main au ras du trait, à l'intérieur), puis A,
// B, C, chacun les mains au dos de celui qui le précède.
const PAS_CHAINE = MAIN_AV[0] + MAIN_BORD - (dos(MAIN_AV[1]) - MAIN_BORD);
const faceParoi = (y, angle) => XG - y * Math.tan(rad(angle)) - MUR_T / Math.cos(rad(angle));
const chaine = (angle) => {
  const j = faceParoi(MAIN_AV[1], angle) - MAIN_AV[0] - MAIN_BORD;
  return [0, 1, 2, 3].map((i) => j - i * PAS_CHAINE);
};
const pousseurs = (xs, suffixe) =>
  perso(POUSSE, xs[3], { classe: `c-${suffixe}` }) + perso(POUSSE, xs[2], { classe: `b-${suffixe}` }) +
  perso(POUSSE, xs[1], { classe: `a-${suffixe}` }) + perso(POUSSE, xs[0], { jean: true, classe: `j-${suffixe}` });
// La fin : Jean, A et C à gauche du point, B à droite, face à eux, les deux
// mains levées ; 58 d'écart, pour que les mains de deux voisins ne se
// croisent pas (2 × 23,8 de bras, plus le trait) ; la porte reste libre.
const PAS_FIN = 58;
const FIN_X = [S - 28, S - 28 - PAS_FIN, S + 28, S - 28 - 2 * PAS_FIN];
// La chaîne : au repos, puis contre la paroi qui touche l'autre (+PENCHE),
// puis, quand les parois tombent, elle trébuche jusqu'à ce que Jean soit à
// sa place de la fin (+TOTAL).
const REPOS_X = chaine(0), PENCHE_X = chaine(CONTACT);
const PENCHE = PENCHE_X[0] - REPOS_X[0], TOTAL = FIN_X[0] - r2(REPOS_X[0]);
// La chute, à mi-course : la paroi poussée de CONTACT à 90°, l'autre de 0 à
// 90°, au même rythme (la première reste posée sur la seconde).
const MI = 0.5, CHUTE_X = REPOS_X.map((x) => x + PENCHE + MI * (TOTAL - PENCHE));

const CARTES = {
  repos: sol() + CABANES(0, 0) + pousseurs(REPOS_X, 'pousse'),
  penche: sol() + CABANES(CONTACT, 0) + pousseurs(PENCHE_X, 'pousse'),
  chute: sol() + CABANES(CONTACT + MI * (90 - CONTACT), MI * 90) + pousseurs(CHUTE_X, 'pousse'),
  fin:
    DALLE + sol() + CABANE_FIN + POINT +
    perso(HOURRA, FIN_X[1], { classe: 'a-hourra' }) +
    perso(HOURRA, FIN_X[0], { jean: true, classe: 'j-hourra' }) +
    perso(HOURRA, FIN_X[3], { classe: 'c-hourra' }) +
    perso(HOURRA, FIN_X[2], { miroir: true, classe: 'b-hourra' }),
};
// La paroi poussée ne traverse jamais l'autre : distance signée de son haut à
// la paroi de droite (<= 0 : derrière ou posée dessus), pendant la chute.
const traverse = Math.max(...Array.from({ length: 101 }, (_, i) => {
  const p = i / 100, ag = rad(CONTACT + p * (90 - CONTACT)), ad = rad(p * 90);
  return -ECART * Math.cos(ad) + 122 * Math.sin(ag - ad);
}));
for (const [nom, corps] of Object.entries(CARTES)) writeFileSync(join(ICI, `${nom}.svg`), svgScene(corps));

// ---------------------------------------------------------------------------
// La planche : les trois images, les poses ; le découpage ; puis la fin et le
// repos aux largeurs de carte (480, 384, 335 px), taille réelle.

// Case 4 : les deux poses nouvelles, à côté de celles dont elles partent.
const POSES_CASE =
  sol(6, L - 6) +
  perso(POSES.penche, 45) + perso(POUSSE, 125, { jean: true }) +
  perso(POSES.debout, 250) + perso(HOURRA, 340, { jean: true });
const NOMS = [['penche', 28], ['pousse', 112], ['debout', 232], ['hourra', 322]];

// Case 5 : le découpage.
const TEMPS = [
  ['0 à 200', 'la paroi poussée bascule jusqu’à l’autre, la chaîne la suit', 200, 'ease-in-out'],
  ['200 à 400', 'les deux parois tombent vers la droite, la chaîne trébuche', 200, 'ease-in'],
  ['400', 'une seule cabane, la dalle ; les deux bras tendus', 100, 'step-end'],
  ['500', 'les deux mains levées ; le point ambre se pose dès 400', 100, 'step-end'],
];
const DECOUPAGE = {
  titre: 'Découpage : 600 ms ; aucun bras levé seul',
  temps: TEMPS,
  colonne: 84,
  texte: ([, txt, ms, c]) => `${txt} : ${ms} ms (${c})`,
};

let y = M, corps = '';
corps += grille([
  ['repos', 'Repos : deux cabanes, un écart ; les quatre poussent la paroi droite.'],
  ['penche', 'La paroi poussée bascule et touche l’autre.'],
  ['chute', 'Les deux parois tombent vers la droite ; la chaîne trébuche.'],
  ['fin', 'Fin : une seule cabane sur la dalle, point ambre ; les deux mains levées.'],
], y, CARTES);
y += 2 * RANG;
corps += casePoses(M, y, POSES_CASE, NOMS, 5, 'Les poses : pousse et hourra, à côté de celles dont elles partent.');
corps += encadre(M + CASE + M, y, decoupage(M + CASE + M, y, DECOUPAGE), 6, 'La durée : la bascule, la chute, puis la fusion.');
y += RANG;
const largeurs = auxLargeurs([[CARTES.fin, 'Fin'], [CARTES.repos, 'Repos']], y, 7);
corps += largeurs.corps;
y = largeurs.y;
const H = Math.round(y + 4);
await ecrirePlanche(join(ICI, 'planche.png'), corps, H);

// ---------------------------------------------------------------------------
// Les contrôles, pour le rapport.
const teteHaut = tourne([1, -120], BASCULE)[1];
console.log(`repos : cabane gauche ${r2(X0)} à ${r2(XG)}, écart ${r2(XG)} à ${r2(XD)} (${ECART}), droite ${r2(XD)} à ${r2(X1)} ; point ${r2(S)} ; contact à ${r2(CONTACT * 100) / 100}°.`);
console.log(`pousse : mains ${pt(MAIN_AV)} et ${pt(MAIN_AR)} ; haut de tête ${r2(teteHaut)} ; pas de chaîne ${r2(PAS_CHAINE)}.`);
console.log(`chaîne au repos : ${REPOS_X.map(r2).join(', ')} ; main de Jean jusqu'à ${r2(REPOS_X[0] + MAIN_AV[0] + MAIN_BORD)} (paroi à ${r2(XG - MUR_T)}) ; jambe arrière du dernier à ${r2(REPOS_X[3] - 16 - 3.75)} (cabane dès ${r2(X0 + MUR_T)}) ; glissement ${r2(PENCHE)} puis ${r2(TOTAL)} en tout ; traversée max ${r2(traverse)} (≤ 0).`);
console.log(`hourra : mains ${pt(H_AV)} et ${pt(H_AR)} ; jeu bras-tête ${r2(jeu(EP_AV, H_AV))} et ${r2(jeu(EP_AR, H_AR))} (rayon 10).`);
console.log(`fin : ${FIN_X.map(r2).join(', ')} ; porte dès ${r2(PORTE_X)}.`);
console.log(`planche.png ${LARG} × ${H}.`);

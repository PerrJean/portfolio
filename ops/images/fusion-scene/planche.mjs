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
// Sans paquet ajouté : sharp ; le texte en chemins (../accueil/police.mjs).
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
import sharp from 'sharp';
import { POSES, LUNETTES, CABANE } from '../../../src/components/scene/poses.ts';
import { police } from '../accueil/police.mjs';

const ICI = fileURLToPath(new URL('./', import.meta.url));
const C = { ivoire: '#FEFAF2', encre: '#2A1F1A', ambre: '#F2A33A', orange: '#B54E19', ardoise: '#5E7488', dalle: '#D9D4CC' };
const STYLE =
  `<style>.fe{fill:${C.encre}}.se{stroke:${C.encre}}.fi{fill:${C.ivoire}}.si{stroke:${C.ivoire}}` +
  `.sa{stroke:${C.ardoise}}.so{stroke:${C.orange}}.fa{fill:${C.ambre}}.fd{fill:${C.dalle}}.fs{fill:${C.ardoise}}</style>`;
const L = 426.667;
const r2 = (v) => Math.round(v * 10) / 10;
const pt = ([x, y]) => `${r2(x)},${r2(y)}`;
const add = ([a, b], [c, d]) => [a + c, b + d];
const rad = (d) => (d * Math.PI) / 180;
const tourne = ([x, y], deg, [cx, cy] = [0, -56]) => {
  const a = rad(deg), dx = x - cx, dy = y - cy;
  return [cx + dx * Math.cos(a) - dy * Math.sin(a), cy + dx * Math.sin(a) + dy * Math.cos(a)];
};

// ---------------------------------------------------------------------------
// Les pièces des poses (celles de poses.ts).

const LIGNE = 'fill="none" stroke-linecap="round" stroke-linejoin="round"';
const trait = (c, points, l) => `<polyline class="${c}" points="${points}" ${LIGNE} stroke-width="${l}"/>`;
const jambes = (ar, av) => trait('se', ar, 7.5) + trait('se', av, 7.5);
const brasArriere = (a, b) => trait('se', `${pt(a)} ${pt(b)}`, 7);
const brasAvant = (a, b) => trait('si', `${pt(a)} ${pt(b)}`, 10) + trait('se', `${pt(a)} ${pt(b)}`, 7);
const TORSE = '<path class="fe" d="M-9,-88 A9,9 0 0 1 9,-88 L9,-55 Q9,-52 6,-52 L-6,-52 Q-9,-52 -9,-55 Z"/>';
const TETE = '<circle class="fe" cx="1" cy="-110" r="10"/>{L}';
const JAMBES_DEBOUT = jambes('-5.25,-56 -4.5,-4 0.5,-4', '5.25,-56 4.5,-4 9.5,-4');
const EP_AR = [0, -89], EP_AV = [1, -89];
const LONG_AV = Math.hypot(28, 16), LONG_AR = Math.hypot(31, 13); // bras-tendus : 32,2 et 33,6
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
const SOL = `<line class="se" x1="0" y1="0" x2="${L}" y2="0" stroke-width="1.5"/>`;

// ---------------------------------------------------------------------------
// Les personnages.

const perso = (dessin, x, { jean = false, miroir = false, classe = '' } = {}) => {
  const d = dessin.replace('{L}', jean ? LUNETTES : '');
  return `<g transform="translate(${r2(x)} 0)"><g class="${classe}"${miroir ? ' transform="scale(-1 1)"' : ''}>${d}</g></g>`;
};
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
  repos: SOL + CABANES(0, 0) + pousseurs(REPOS_X, 'pousse'),
  penche: SOL + CABANES(CONTACT, 0) + pousseurs(PENCHE_X, 'pousse'),
  chute: SOL + CABANES(CONTACT + MI * (90 - CONTACT), MI * 90) + pousseurs(CHUTE_X, 'pousse'),
  fin:
    DALLE + SOL + CABANE_FIN + POINT +
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
const fichier = (corps) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -140 ${L} 160" width="${L}" height="160">${STYLE}${corps}</svg>\n`;
for (const [nom, corps] of Object.entries(CARTES)) writeFileSync(join(ICI, `${nom}.svg`), fichier(corps));

// ---------------------------------------------------------------------------
// La planche : les trois images, les poses ; le découpage ; puis la fin et le
// repos aux largeurs de carte (480, 384, 335 px), taille réelle.

const P8 = police(800), P4 = police(400);
const M = 20, LARG = 2 * M + 1280, LEG = 34;
const CASE = (1280 - M) / 2, K = CASE / L, H_CASE = 160 * K;
const legende = (n, t, x, y) => P8.chemin(`${n}`, x, y, 15, 0, 'fs') + P4.chemin(t, x + 16, y, 15, 0, 'fs');
const petit = (t, x, y, taille = 13, p = P4) => p.chemin(t, x, y, taille, 0, 'fs');
const cadre = (x, y, l, h) => `<rect x="${x}" y="${y}" width="${l}" height="${h}" fill="${C.ivoire}" stroke="${C.dalle}" stroke-width="2"/>`;
const scene = (corps, x, y, k) => `<g transform="translate(${x} ${y + 140 * k}) scale(${k})">${corps}</g>`;

// Case 4 : les deux poses nouvelles, à côté de celles dont elles partent.
const POSES_CASE =
  `<line class="se" x1="6" y1="0" x2="${L - 6}" y2="0" stroke-width="1.5"/>` +
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
function decoupage(x, y) {
  let d = petit('Découpage : 600 ms ; aucun bras levé seul', x + 16, y + 30, 14, P8);
  const x0 = x + 16, lp = CASE - 32 - 64;
  let t = 0;
  TEMPS.forEach(([, , ms], i) => {
    const xa = x0 + (t / 600) * lp, l = (ms / 600) * lp;
    d += `<rect x="${r2(xa)}" y="${y + 48}" width="${r2(l - 3)}" height="16" rx="2" fill="${i === TEMPS.length - 1 ? C.ambre : i % 2 ? C.dalle : '#ECE7DE'}" stroke="${C.ardoise}" stroke-width="1"/>`;
    d += petit(`${ms}`, xa + 4, y + 60, 11);
    t += ms;
  });
  d += petit(`${t} ms`, x0 + lp + 6, y + 60, 11);
  let yl = y + 96;
  for (const [n, txt, ms, c] of TEMPS) { d += petit(n, x0, yl, 13, P8) + petit(`${txt} : ${ms} ms (${c})`, x0 + 84, yl, 13); yl += 20; }
  return d;
}

let y = M, corps = '';
const LEGENDES = [
  ['repos', 'Repos : deux cabanes, un écart ; les quatre poussent la paroi droite.'],
  ['penche', 'La paroi poussée bascule et touche l’autre.'],
  ['chute', 'Les deux parois tombent vers la droite ; la chaîne trébuche.'],
  ['fin', 'Fin : une seule cabane sur la dalle, point ambre ; les deux mains levées.'],
];
LEGENDES.forEach(([nom, t], i) => {
  const x = M + (i % 2) * (CASE + M), yc = y + Math.floor(i / 2) * (H_CASE + LEG + 12);
  corps += cadre(x, yc, CASE, H_CASE) + scene(CARTES[nom], x, yc, K) + legende(i + 1, t, x, yc + H_CASE + 22);
});
y += 2 * (H_CASE + LEG + 12);
corps += cadre(M, y, CASE, H_CASE) + scene(POSES_CASE, M, y, K);
for (const [nm, xn] of NOMS) corps += petit(nm, M + xn * K, y + H_CASE - 10);
corps += legende(5, 'Les poses : pousse et hourra, à côté de celles dont elles partent.', M, y + H_CASE + 22);
corps += cadre(M + CASE + M, y, CASE, H_CASE) + decoupage(M + CASE + M, y);
corps += legende(6, 'La durée : la bascule, la chute, puis la fusion.', M + CASE + M, y + H_CASE + 22);
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
const teteHaut = tourne([1, -120], BASCULE)[1];
console.log(`repos : cabane gauche ${r2(X0)} à ${r2(XG)}, écart ${r2(XG)} à ${r2(XD)} (${ECART}), droite ${r2(XD)} à ${r2(X1)} ; point ${r2(S)} ; contact à ${r2(CONTACT * 100) / 100}°.`);
console.log(`pousse : mains ${pt(MAIN_AV)} et ${pt(MAIN_AR)} ; haut de tête ${r2(teteHaut)} ; pas de chaîne ${r2(PAS_CHAINE)}.`);
console.log(`chaîne au repos : ${REPOS_X.map(r2).join(', ')} ; main de Jean jusqu'à ${r2(REPOS_X[0] + MAIN_AV[0] + MAIN_BORD)} (paroi à ${r2(XG - MUR_T)}) ; jambe arrière du dernier à ${r2(REPOS_X[3] - 16 - 3.75)} (cabane dès ${r2(X0 + MUR_T)}) ; glissement ${r2(PENCHE)} puis ${r2(TOTAL)} en tout ; traversée max ${r2(traverse)} (≤ 0).`);
console.log(`hourra : mains ${pt(H_AV)} et ${pt(H_AR)} ; jeu bras-tête ${r2(jeu(EP_AV, H_AV))} et ${r2(jeu(EP_AR, H_AR))} (rayon 10).`);
console.log(`fin : ${FIN_X.map(r2).join(', ')} ; porte dès ${r2(PORTE_X)}.`);
console.log(`planche.png ${LARG} × ${H}.`);

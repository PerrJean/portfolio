// Les images clés de la scène « Fusion » (registre/0069), carte du projet
// « fusion des plateformes » : images fixes, aucune animation. Deuxième
// version, sur les retours de Jean : tout le monde pousse, dès le repos ; la
// forme des deux toits ne change pas, le mur de séparation est plus épais ;
// les personnages restent dans la cabane ; à la fin, les deux mains levées.
//  1. repos : deux cabanes, l'une au trait simple, l'autre au trait double
//     (deux façons de construire), séparées par un mur épais ; dans la
//     cabane de gauche, Jean et les trois ouvriers de l'en-tête poussent le
//     mur en chaîne (Jean au mur, chacun les mains dans le dos de celui qui
//     le précède) ; le mur tient ;
//  2. intermédiaire : le mur penche ;
//  3. fin : le mur est tombé ; il ne reste qu'une cabane, sur toute la
//     largeur, d'un seul style (le trait simple), sur une dalle commune ;
//     point ambre sur la dalle, là où était le mur ; les quatre lèvent les
//     deux mains.
// Règle (Jean) : aucun personnage avec un seul bras levé au-dessus de
// l'épaule ; pour célébrer, les deux mains levées.
// Produit repos.svg, intermediaire.svg, fin.svg, dans le repère de
// Scene.astro (0 -140 426.667 160), mêmes classes, et planche.png.
// Relançable : node ops/images/fusion-scene/planche.mjs.
// Sans paquet ajouté : sharp ; le texte en chemins (../accueil/police.mjs).
//
// Les poses nouvelles, dessinées ici seulement (à reporter dans poses.ts),
// sur les segments existants, sans articulation nouvelle :
//  - pousse : buste et tête basculés de 25° aux hanches (la bascule de
//    penche, 30°, un peu moins) ; la jambe arrière tendue loin derrière, le
//    pied à plat ; la jambe avant fléchie, genou devant (comme marche-2) ;
//    les deux bras droits, repartis des épaules basculées, de la longueur de
//    ceux de bras-tendus (32,2 et 33,6), 10° et 6° sous l'horizontale ;
//  - hourra : les jambes et le buste de debout ; les deux bras droits, de
//    la longueur de ceux de bras-tendus, levés en V à 45° : l'avant vers
//    l'avant, l'arrière vers l'arrière (à 45°, ils passent à côté de la
//    tête sans la toucher ; plus haut, ils la mordent).
// Les objets nouveaux (objets de planche) : la cabane (murs et toit à deux
// pans, au trait simple ou double, une fenêtre carrée, une porte), le mur de
// séparation (un pan de 24, au grain du mur de la carte 03), la dalle
// (celle de l'en-tête, 12 de haut sous le sol).

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { POSES, LUNETTES } from '../../../src/components/scene/poses.ts';
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

// ---------------------------------------------------------------------------
// Le décor.

const E = 122, R = 140; // égout et faîtage des cabanes
const MUR_L = 24; // épaisseur du mur de séparation
// La chaîne : Jean au mur, puis trois ouvriers ; chacun a les mains au dos
// de celui qui le précède, à la hauteur des mains.
const PAS_CHAINE = MAIN_AV[0] + MAIN_BORD - (dos(MAIN_AV[1]) - MAIN_BORD);
const LARGE_G = 3 * PAS_CHAINE + MAIN_AV[0] + MAIN_BORD + 16 + 3.75 + 4; // le dernier : jambe arrière à -16
const LARGE_D = 100;
const TOTAL = LARGE_G + MUR_L + LARGE_D;
const X0 = (L - TOTAL) / 2, XM = X0 + LARGE_G, X1 = XM + MUR_L + LARGE_D;

// La cabane : murs et toit à deux pans, d'un seul trait ; « double » la
// dessine en trait double (encre 6, âme ivoire 2,4).
const contour = (xa, xb) => `M${r2(xa)},0 L${r2(xa)},${-E} L${r2((xa + xb) / 2)},${-R} L${r2(xb)},${-E} L${r2(xb)},0`;
const chemin = (d, double) =>
  double
    ? `<path class="se" d="${d}" fill="none" stroke-width="6" stroke-linejoin="round"/><path class="si" d="${d}" fill="none" stroke-width="2.4" stroke-linejoin="round"/>`
    : `<path class="se" d="${d}" fill="none" stroke-width="2.5" stroke-linejoin="round"/>`;
const fenetre = (x, y, c, double) => chemin(`M${r2(x)},${r2(y)} h${c} v${c} h${-c} Z M${r2(x + c / 2)},${r2(y)} v${c}`, double);
const porte = (x, l, h, double) => chemin(`M${r2(x)},0 L${r2(x)},${-h} L${r2(x + l)},${-h} L${r2(x + l)},0`, double);
const PORTE_X = X1 - 34;
// La fenêtre, petite et haute dans le coin : le dernier pousseur passe dessous.
const FENETRE = fenetre(X0 + 8, -116, 16, false);
const CABANE_G = `<g class="cabane-g">${chemin(contour(X0, XM), false)}${FENETRE}</g>`;
const CABANE_D = `<g class="cabane-d">${chemin(contour(XM + MUR_L, X1), true)}${porte(PORTE_X, 26, 62, true)}</g>`;

// Le mur de séparation : un pan de 24, trois rangs de pierres au grain du mur
// de la carte 03 (joints fins, opacité 0,4, décalés d'un rang à l'autre) ;
// pivot au pied, côté droit.
const joint = (x1, y1, x2, y2) => `<line class="se" x1="${r2(x1)}" y1="${r2(y1)}" x2="${r2(x2)}" y2="${r2(y2)}" stroke-width="1" stroke-opacity="0.4"/>`;
const PAN = (() => {
  const h = E / 3, ys = [0, -h, -2 * h, -E];
  let d = `<rect class="fi se" x="${-MUR_L}" y="${-E}" width="${MUR_L}" height="${E}" stroke-width="2"/>`;
  d += joint(-MUR_L, ys[1], 0, ys[1]) + joint(-MUR_L, ys[2], 0, ys[2]);
  [[MUR_L / 2], [MUR_L / 4, (3 * MUR_L) / 4], [MUR_L / 2]].forEach((xs, i) => xs.forEach((x) => (d += joint(-x, ys[i], -x, ys[i + 1]))));
  return d;
})();
const mur = (angle) => `<g class="mur" transform="translate(${r2(XM + MUR_L)} 0) rotate(${angle})">${PAN}</g>`;
const PENCHE = 11;
// La face gauche du mur, penché de `angle`, à la hauteur y.
const faceMur = (y, angle) => XM + MUR_L - MUR_L * Math.cos(rad(angle)) - y * Math.sin(rad(angle));

// La cabane de la fin : une seule, sur toute la largeur, au trait simple.
const CABANE_FIN = `<g class="cabane-fin">${chemin(contour(X0, X1), false)}${FENETRE}${porte(PORTE_X, 26, 62, false)}</g>`;
const DALLE = `<rect class="dalle fd" x="${r2(X0 - 12)}" y="0" width="${r2(X1 - X0 + 24)}" height="12"/>`;
const PX = XM + MUR_L / 2;
const POINT = `<circle class="point fa" cx="${r2(PX)}" cy="6" r="5"/>`;
const SOL = `<line class="se" x1="0" y1="0" x2="${L}" y2="0" stroke-width="1.5"/>`;

// ---------------------------------------------------------------------------
// Les personnages.

const perso = (dessin, x, { jean = false, miroir = false, classe = '' } = {}) => {
  const d = dessin.replace('{L}', jean ? LUNETTES : '');
  return `<g transform="translate(${r2(x)} 0)"><g class="${classe}"${miroir ? ' transform="scale(-1 1)"' : ''}>${d}</g></g>`;
};
// La chaîne contre le mur, penché de `angle` : Jean au mur, puis A, B, C.
const chaine = (angle) => {
  const j = faceMur(MAIN_AV[1], angle) - MAIN_AV[0] - MAIN_BORD;
  return [0, 1, 2, 3].map((i) => j - i * PAS_CHAINE);
};
const REPOS_X = chaine(0), INTER_X = chaine(PENCHE);
const pousseurs = (xs, suffixe) =>
  perso(POUSSE, xs[3], { classe: `c-${suffixe}` }) + perso(POUSSE, xs[2], { classe: `b-${suffixe}` }) +
  perso(POUSSE, xs[1], { classe: `a-${suffixe}` }) + perso(POUSSE, xs[0], { jean: true, classe: `j-${suffixe}` });
// La fin : Jean, A et C à gauche du point, B à droite, face à eux, les deux
// mains levées ; 58 d'écart, pour que les mains de deux voisins ne se
// croisent pas (2 × 23,8 de bras, plus le trait) ; la porte reste libre.
const ECART = 58;
const FIN_X = [PX - 28, PX - 28 - ECART, PX + 28, PX - 28 - 2 * ECART];

const CARTES = {
  repos: SOL + CABANE_G + CABANE_D + mur(0) + pousseurs(REPOS_X, 'pousse'),
  intermediaire: SOL + CABANE_G + CABANE_D + mur(PENCHE) + pousseurs(INTER_X, 'pousse'),
  fin:
    DALLE + SOL + CABANE_FIN + POINT +
    perso(HOURRA, FIN_X[1], { classe: 'a-hourra' }) +
    perso(HOURRA, FIN_X[0], { jean: true, classe: 'j-hourra' }) +
    perso(HOURRA, FIN_X[3], { classe: 'c-hourra' }) +
    perso(HOURRA, FIN_X[2], { miroir: true, classe: 'b-hourra' }),
};
const fichier = (corps) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -140 ${L} 160" width="${L}" height="160">${STYLE}${corps}</svg>\n`;
for (const [nom, corps] of Object.entries(CARTES)) writeFileSync(join(ICI, `${nom}.svg`), fichier(corps));

// ---------------------------------------------------------------------------
// La planche : les trois images, les poses ; le découpage proposé ; puis la
// fin et le repos aux largeurs de carte (480, 384, 335 px), taille réelle.

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
const NOMS = [['penche', 28], ['pousse (nouvelle)', 100], ['debout', 232], ['hourra (nouvelle)', 312]];

// Case 5 : le découpage, la version longue et la courte.
const LONGUE = [
  ['1 à 2', 'le mur penche sous la poussée', 200, 'ease-in-out'],
  ['2 à 3', 'le mur tombe ; une seule cabane, la dalle', 200, 'ease-in'],
  ['fin', 'les deux mains levées, le point ambre', 200, 'step-end'],
];
const COURTE = [['chute', 'le mur tombe (de 0 à la fin)', 250], ['point', 'bascule des poses, le point', 100]];
function decoupage(x, y) {
  let d = petit('Découpage proposé : 600 ms ; version courte : 350 ms, le mur qui tombe seul', x + 16, y + 30, 14, P8);
  const x0 = x + 16, lp = CASE - 32 - 64;
  const barre = (temps, yb) => {
    let t = 0, s = '';
    temps.forEach(([, , ms], i) => {
      const xa = x0 + (t / 600) * lp, l = (ms / 600) * lp;
      s += `<rect x="${r2(xa)}" y="${yb}" width="${r2(l - 3)}" height="16" rx="2" fill="${i === temps.length - 1 ? C.ambre : i % 2 ? C.dalle : '#ECE7DE'}" stroke="${C.ardoise}" stroke-width="1"/>`;
      s += petit(`${ms}`, xa + 4, yb + 12, 11);
      t += ms;
    });
    return s + petit(`${t} ms`, x0 + (t / 600) * lp + 6, yb + 12, 11);
  };
  d += barre(LONGUE, y + 48) + barre(COURTE, y + 74);
  let yl = y + 114;
  for (const [n, txt, ms, c] of LONGUE) { d += petit(n, x0, yl, 13, P8) + petit(`${txt} : ${ms} ms (${c})`, x0 + 58, yl, 13); yl += 19; }
  for (const [n, txt, ms] of COURTE) { d += petit(n, x0, yl, 13, P8) + petit(`court : ${txt}, ${ms} ms`, x0 + 58, yl, 13); yl += 19; }
  return d;
}

let y = M, corps = '';
const LEGENDES = [
  ['repos', 'Repos : deux cabanes, un mur épais ; les quatre poussent en chaîne.'],
  ['intermediaire', 'Le mur penche.'],
  ['fin', 'Fin : une seule cabane sur la dalle, point ambre ; les deux mains levées.'],
];
LEGENDES.forEach(([nom, t], i) => {
  const x = M + (i % 2) * (CASE + M), yc = y + Math.floor(i / 2) * (H_CASE + LEG + 12);
  corps += cadre(x, yc, CASE, H_CASE) + scene(CARTES[nom], x, yc, K) + legende(i + 1, t, x, yc + H_CASE + 22);
});
{
  const x = M + CASE + M, yc = y + H_CASE + LEG + 12;
  corps += cadre(x, yc, CASE, H_CASE) + scene(POSES_CASE, x, yc, K);
  for (const [nm, xn] of NOMS) corps += petit(nm, x + xn * K, yc + H_CASE - 10);
  corps += legende(4, 'Les poses : deux nouvelles, à côté de celles dont elles partent.', x, yc + H_CASE + 22);
}
y += 2 * (H_CASE + LEG + 12);
corps += cadre(M, y, CASE, H_CASE) + decoupage(M, y);
corps += legende(5, 'La durée : trois temps, ou la chute seule.', M, y + H_CASE + 22);
y += H_CASE + LEG + 12;
let n = 6;
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
console.log(`cabanes : gauche ${r2(X0)} à ${r2(XM)}, mur ${r2(XM)} à ${r2(XM + MUR_L)}, droite à ${r2(X1)} ; égout ${-E}, faîtage ${-R}.`);
console.log(`pousse : mains ${pt(MAIN_AV)} et ${pt(MAIN_AR)} ; haut de tête ${r2(teteHaut)} ; pas de chaîne ${r2(PAS_CHAINE)}.`);
console.log(`chaîne au repos : ${REPOS_X.map(r2).join(', ')} ; penchée : ${INTER_X.map(r2).join(', ')} ; jambe arrière du dernier à ${r2(REPOS_X[3] - 16 - 3.75)} (cabane dès ${r2(X0)}).`);
console.log(`hourra : mains ${pt(H_AV)} et ${pt(H_AR)} ; jeu bras-tête ${r2(jeu(EP_AV, H_AV))} et ${r2(jeu(EP_AR, H_AR))} (rayon 10).`);
console.log(`fin : ${FIN_X.map(r2).join(', ')} ; mains levées au-dessus du point : ${r2(FIN_X[0] + H_AV[0])} et ${r2(FIN_X[2] - H_AV[0])} ; porte dès ${r2(PORTE_X)}.`);
console.log(`planche.png ${LARG} × ${H}.`);

// Les images clés de la scène « l'échelle » (registre/0062), carte du
// troisième projet (la matrice de compétences) : images fixes, aucune
// animation. Deuxième version, sur les retours de Jean : plus de tréteau ni
// de plan ; Jean transmet un marteau, puis l'ouvrier monte d'un barreau.
//  1. repos : Jean debout tient le marteau tête en haut ; l'ouvrier au pied
//     de l'échelle, tourné vers lui ;
//  2. Jean tend le marteau, l'ouvrier le prend (sa main sur le manche, au-
//     dessus de celles de Jean) ;
//  3. l'ouvrier, marteau en main, pose le pied sur le premier barreau ; Jean
//     commence à lever le bras ;
//  4. fin : l'ouvrier sur le premier barreau, marteau en main tête en haut,
//     Jean le bras vers le deuxième barreau ; point ambre sur le premier.
// Produit 1-repos.svg (copié en repos.svg), 2-transmet.svg, 3-pied.svg,
// 4-fin.svg (copié en fin.svg), dans le repère de Scene.astro, mêmes
// classes, et planche.png. Relançable : node ops/images/matrice/planche.mjs.
// Sans paquet ajouté : sharp ; le texte en chemins (../accueil/police.mjs).
//
// Les poses nouvelles, dessinées ici seulement (à reporter dans poses.ts),
// toutes sur les segments existants, sans articulation nouvelle :
//  - montre(cible) : debout, le bras avant droit, long de 32,2 (celui de
//    bras-tendus), vers la cible ;
//  - pied-barreau : les jambes de marche-2, la jambe avant repliée plus haut
//    (cuisse et tibia de même longueur, genou recalculé) pour poser le pied
//    sur le barreau ; le bras avant de bras-tendus (sur le montant), le bras
//    arrière tendu vers l'arrière, 46° sous l'horizontale (il tient le marteau) ;
//  - sur-echelle : les jambes de debout ; buste et tête basculés de 8° aux
//    hanches (la bascule de penche) ; le bras avant de bras-tendus sur le
//    troisième barreau, le bras arrière vers l'arrière (marteau), comme en 3,
//    tous deux repartis des épaules basculées.
// Le marteau en main : OBJETS.marteau à 1,2 (la taille du marteau de B),
// sa poignée dans la main ; tête en haut (-90°), ou penché de 10° vers
// l'arrière (-100°, l'angle de marteau-1) quand il est tenu derrière soi.

import { writeFileSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { POSES, LUNETTES, OBJETS } from '../../../src/components/scene/poses.ts';
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

// ---------------------------------------------------------------------------
// Les objets nouveaux : le mur et l'échelle.

// Le pan de mur : un carré au trait, trois rangs de pierres (deux joints
// horizontaux, un ou deux joints verticaux décalés par rang), au grain de
// la poutre (trait fin, opacité 0,4).
const MUR = { x: 318, haut: -134, droite: 420 };
const joint = (x1, y1, x2, y2) => `<line class="se" x1="${r2(x1)}" y1="${r2(y1)}" x2="${r2(x2)}" y2="${r2(y2)}" stroke-width="1" stroke-opacity="0.4"/>`;
const DESSIN_MUR = (() => {
  const l = MUR.droite - MUR.x, h = -MUR.haut / 3, ys = [0, -h, -2 * h, MUR.haut];
  let d = `<rect class="fi se" x="${MUR.x}" y="${MUR.haut}" width="${l}" height="${-MUR.haut}" stroke-width="2"/>`;
  d += joint(MUR.x, ys[1], MUR.droite, ys[1]) + joint(MUR.x, ys[2], MUR.droite, ys[2]);
  const verticales = [[l / 2], [l / 4, (3 * l) / 4], [l / 2]];
  verticales.forEach((xs, i) => xs.forEach((x) => (d += joint(MUR.x + x, ys[i], MUR.x + x, ys[i + 1]))));
  return `<g class="mur">${d}</g>`;
})();

// L'échelle : deux montants parallèles inclinés (0,3 de pied pour 1 de
// haut), le montant droit appuyé en haut contre le mur ; trois barreaux
// horizontaux, un par niveau de la grille (junior, intermédiaire, senior).
// La pente décale le deuxième barreau de 10,8 vers la droite par rapport
// au premier : il dépasse des tibias de l'ouvrier monté.
const PENTE = 0.3, LARGEUR = 32, HAUT = -125, BARREAUX = [-19, -55, -91];
const PIED_D = MUR.x - 2 + PENTE * HAUT;
const PIED_G = PIED_D - LARGEUR;
const montant = (x0, y) => x0 - PENTE * y;
const barreau = (y) => ({ x1: montant(PIED_G, y), x2: montant(PIED_D, y), y });
const DESSIN_ECHELLE =
  '<g class="echelle">' +
  BARREAUX.map((y) => { const b = barreau(y); return `<line class="se" x1="${r2(b.x1)}" y1="${y}" x2="${r2(b.x2)}" y2="${y}" stroke-width="3" stroke-linecap="round"/>`; }).join('') +
  [PIED_G, PIED_D].map((x0) => `<line class="se" x1="${r2(x0)}" y1="-1" x2="${r2(montant(x0, HAUT))}" y2="${HAUT}" stroke-width="4" stroke-linecap="round"/>`).join('') +
  '</g>';
const B1 = barreau(BARREAUX[0]), B2 = barreau(BARREAUX[1]), B3 = barreau(BARREAUX[2]);

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
// Les vecteurs de bras-tendus : arrière (0,-89 → 31,-76), avant (1,-89 → 29,-73).
const V_AR = [31, 13], V_AV = [28, 16];
// Le bras qui tient le marteau derrière soi : 31,8 de long (32,2 et 33,6
// pour ceux de bras-tendus), 46° sous l'horizontale (assez bas pour ne pas brandir,
// assez loin pour que le manche ne touche pas le dos).
const V_MARTEAU = [-22, 23];
const LONG_BRAS = Math.hypot(...V_AV); // 32,2
const vers = (de, cible) => { const dx = cible[0] - de[0], dy = cible[1] - de[1], k = LONG_BRAS / Math.hypot(dx, dy); return [de[0] + dx * k, de[1] + dy * k]; };
const tourne = ([x, y], deg, [cx, cy] = [0, -56]) => {
  const a = (deg * Math.PI) / 180, dx = x - cx, dy = y - cy;
  return [cx + dx * Math.cos(a) - dy * Math.sin(a), cy + dx * Math.sin(a) + dy * Math.cos(a)];
};

// Le marteau tenu : poignée dans la main, à 1,2.
const MARTEAU_ECH = 1.2;
const marteau = ([x, y], angle, classe = 'marteau') =>
  `<g class="${classe}" transform="translate(${r2(x)} ${r2(y)}) rotate(${angle}) scale(${MARTEAU_ECH})">${OBJETS.marteau}</g>`;
// Les points du marteau, pour les contrôles de contact : l'étendue de la
// tête (rect 22..30 × -8..7) et le bout du manche.
const teteMarteau = ([x, y], angle) => {
  const a = (angle * Math.PI) / 180, k = MARTEAU_ECH;
  return [[22, -8], [30, -8], [22, 7], [30, 7]].map(([u, v]) => [x + k * (u * Math.cos(a) - v * Math.sin(a)), y + k * (u * Math.sin(a) + v * Math.cos(a))]);
};

// montre(cible) : debout, le bras avant tendu vers la cible (coordonnées de
// la pose).
const montre = (cible) => JAMBES_DEBOUT + brasArriere(EP_AR, [-2, -58]) + TORSE + TETE + brasAvant(EP_AV, vers(EP_AV, cible));

// bras-tendus, tel quel (Jean tend le marteau des deux mains).
const BRAS_TENDUS = POSES['bras-tendus'];

// pied-barreau : la jambe avant de marche-2 (cuisse 24,3, tibia 19,9, pied
// 5 de long, 1 de pente) repliée pour que le bas du pied (trait 7,5) touche
// le haut du premier barreau (trait 3), cheville en `cheville`.
const HANCHE_AV = [5.25, -56];
const CUISSE = Math.hypot(9 - 5.25, -32 + 56), TIBIA = Math.hypot(3 - 9, -13 + 32);
const genou = (h, c) => {
  const dx = c[0] - h[0], dy = c[1] - h[1], d = Math.hypot(dx, dy);
  const a = Math.acos((CUISSE ** 2 + d ** 2 - TIBIA ** 2) / (2 * CUISSE * d)), b = Math.atan2(dy, dx);
  return [h[0] + CUISSE * Math.cos(b - a), h[1] + CUISSE * Math.sin(b - a)]; // genou vers l'avant
};
const piedBarreau = (cheville) => {
  const g = genou(HANCHE_AV, cheville);
  return (
    brasArriere(EP_AR, add(EP_AR, V_MARTEAU)) +
    jambes('-5.25,-56 -3,-4 2,-4', `${pt(HANCHE_AV)} ${pt(g)} ${pt(cheville)} ${pt(add(cheville, [5, 1]))}`) +
    TORSE + TETE + brasAvant(EP_AV, add(EP_AV, V_AV))
  );
};

// sur-echelle : bascule de 8° aux hanches.
const BASCULE = 8;
const EPB_AR = tourne(EP_AR, BASCULE), EPB_AV = tourne(EP_AV, BASCULE);
const MAIN_ECH_AR = add(EPB_AR, V_MARTEAU), MAIN_ECH_AV = add(EPB_AV, V_AV);
const SUR_ECHELLE =
  JAMBES_DEBOUT + brasArriere(EPB_AR, MAIN_ECH_AR) + `<g transform="rotate(${BASCULE} 0 -56)">${TORSE}${TETE}</g>` + brasAvant(EPB_AV, MAIN_ECH_AV);

// ---------------------------------------------------------------------------
// La scène.

const perso = (dessin, x, { jean = false, miroir = false, classe = '', y = 0 } = {}) => {
  let d = dessin.replace('{L}', jean ? LUNETTES : '');
  // Le marteau tenu tête en haut (la règle CSS de la pose de B, en attribut).
  d = d.replace('<g class="marteau-tour">', '<g class="marteau-tour" transform="rotate(-115) scale(1.2)">');
  return `<g transform="translate(${r2(x)} ${r2(y)})"><g class="${classe}"${miroir ? ' transform="scale(-1 1)"' : ''}>${d}</g></g>`;
};
const SOL = `<line class="se" x1="0" y1="0" x2="${L}" y2="0" stroke-width="1.5"/>`;
const DECOR = SOL + DESSIN_MUR + DESSIN_ECHELLE;

// Les places. L'ouvrier au repos à 26 du pied de l'échelle, Jean à 62 de
// lui : leurs mains se rejoignent sur le manche en 2. Jean ne bouge plus.
const O_X = PIED_G - 26, J_X = O_X - 62;
// 2 : Jean tend le marteau (bras-tendus, poignée dans la main avant) ;
// l'ouvrier, tourné vers lui, prend le manche 12 plus haut.
const MAIN_J = add([J_X, 0], add(EP_AV, V_AV));
const PRISE = add(MAIN_J, [0, -12]);
// 3 : l'ouvrier au pied de l'échelle, pied avant sur le premier barreau.
const O3_X = PIED_G - 6;
const CHEVILLE = [16, B1.y - 1.5 - 3.75 - 0.5];
// 4 : l'ouvrier monté ; les tibias à gauche du deuxième barreau.
const O4_X = PIED_G + 9, O4_Y = B1.y - 1.5 + 0.25;
// La cible de Jean : le milieu de la part visible du deuxième barreau
// (entre le devant du tibia et le montant droit).
const TIBIA_4 = O4_X + 4.94 + 3.75;
const CIBLE = [(TIBIA_4 + B2.x2) / 2, B2.y];
const cibleLocale = (c) => [c[0] - J_X, c[1]];
// 3 : le bras de Jean à mi-chemin, 50° sous l'horizontale.
const MI = [EP_AV[0] + Math.cos((50 * Math.PI) / 180), EP_AV[1] + Math.sin((50 * Math.PI) / 180)];

const M2 = marteau(MAIN_J, -90, 'marteau-transmis');
const MAIN_3 = add([O3_X, 0], add(EP_AR, V_MARTEAU));
const M3 = marteau(MAIN_3, -100, 'marteau-ouvrier');
const MAIN_4 = add([O4_X, O4_Y], MAIN_ECH_AR);
const M4 = marteau(MAIN_4, -100, 'marteau-ouvrier');
const POINT = `<circle class="point fa" cx="${r2(B1.x2 - 7)}" cy="${B1.y}" r="5"/>`;

const CARTES = {
  '1-repos': DECOR + perso(POSES['marteau-2'], J_X, { jean: true, classe: 'j-marteau' }) + perso(POSES.debout, O_X, { miroir: true, classe: 'o-debout' }),
  '2-transmet':
    DECOR + M2 +
    perso(BRAS_TENDUS, J_X, { jean: true, classe: 'j-tend' }) +
    perso(montre([O_X - PRISE[0], PRISE[1]]), O_X, { miroir: true, classe: 'o-prend' }),
  '3-pied':
    DECOR + M3 +
    perso(montre(MI), J_X, { jean: true, classe: 'j-leve' }) +
    perso(piedBarreau(CHEVILLE), O3_X, { classe: 'o-pied' }),
  '4-fin':
    DECOR + POINT + M4 +
    perso(montre(cibleLocale(CIBLE)), J_X, { jean: true, classe: 'j-montre' }) +
    perso(SUR_ECHELLE, O4_X, { classe: 'o-echelle', y: O4_Y }),
};
const fichier = (corps) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -140 ${L} 160" width="${L}" height="160">${STYLE}${corps}</svg>\n`;
for (const [nom, corps] of Object.entries(CARTES)) writeFileSync(join(ICI, `${nom}.svg`), fichier(corps));
copyFileSync(join(ICI, '1-repos.svg'), join(ICI, 'repos.svg'));
copyFileSync(join(ICI, '4-fin.svg'), join(ICI, 'fin.svg'));

// ---------------------------------------------------------------------------
// La planche : 1 et 2 ; 3 et 4 ; les poses, le découpage proposé ; puis la
// fin et le repos aux largeurs de carte (480, 384, 335 px), taille réelle.

const P8 = police(800), P4 = police(400);
const M = 20, LARG = 2 * M + 1280, LEG = 34;
const CASE = (1280 - M) / 2, K = CASE / L, H_CASE = 160 * K;
const legende = (n, t, x, y) => P8.chemin(`${n}`, x, y, 15, 0, 'fs') + P4.chemin(t, x + 16, y, 15, 0, 'fs');
const petit = (t, x, y, taille = 13, p = P4) => p.chemin(t, x, y, taille, 0, 'fs');
const cadre = (x, y, l, h) => `<rect x="${x}" y="${y}" width="${l}" height="${h}" fill="${C.ivoire}" stroke="${C.dalle}" stroke-width="2"/>`;
const carte = (nom, x, y, k) => `<g transform="translate(${x} ${y + 140 * k}) scale(${k})">${CARTES[nom]}</g>`;

// Case 5 : les poses sur leur ligne de pied.
const POSES_CASE =
  `<line class="se" x1="6" y1="0" x2="${L - 6}" y2="0" stroke-width="1.5"/>` +
  perso(POSES['marteau-2'], 40, { jean: true }) +
  marteau(add([118, 0], add(EP_AV, V_AV)), -90) + perso(BRAS_TENDUS, 118) +
  perso(montre([80, -60]), 200) +
  marteau(add([282, 0], add(EP_AR, V_MARTEAU)), -100) + perso(piedBarreau(CHEVILLE), 282) +
  `<line class="se" x1="290" y1="${-20.5}" x2="${314}" y2="${-20.5}" stroke-width="1" stroke-opacity="0.4"/>` +
  marteau(add([372, -21.25], MAIN_ECH_AR), -100) + perso(SUR_ECHELLE, 372, { y: -21.25 }) +
  `<line class="se" x1="362" y1="${-19.75}" x2="${394}" y2="${-19.75}" stroke-width="3" stroke-linecap="round"/>`;
const NOMS = [['marteau-2', 16], ['bras-tendus', 92], ['montre', 186], ['pied-barreau', 250], ['sur-echelle', 340]];

// Case 6 : le découpage proposé, 800 ms, et le repli à 600 ms.
const TEMPS = [
  ['1 à 2', 'Jean tend, l’ouvrier prend', 200],
  ['2 à 3', 'il se tourne, pied au barreau', 250],
  ['3 à 4', 'il monte, Jean vise', 200],
  ['point', 'le point ambre', 150],
];
const REPLI = [150, 200, 150, 100];
function decoupage(x, y) {
  let d = petit('Découpage proposé : 800 ms (repli : 600 ms, la durée des cartes 01 et 02)', x + 16, y + 30, 14, P8);
  const x0 = x + 16, lp = CASE - 32 - 64;
  const barre = (durees, yb, total) => {
    let t = 0, s = '';
    durees.forEach((ms, i) => {
      const xa = x0 + (t / 800) * lp, l = (ms / 800) * lp;
      s += `<rect x="${r2(xa)}" y="${yb}" width="${r2(l - 3)}" height="16" rx="2" fill="${i === 3 ? C.ambre : i % 2 ? C.dalle : '#ECE7DE'}" stroke="${C.ardoise}" stroke-width="1"/>`;
      s += petit(`${ms}`, xa + 4, yb + 12, 11);
      t += ms;
    });
    return s + petit(`${total} ms`, x0 + (t / 800) * lp + 6, yb + 12, 11);
  };
  d += barre(TEMPS.map((t) => t[2]), y + 48, 800);
  d += barre(REPLI, y + 74, 600);
  let yl = y + 116;
  TEMPS.forEach(([n, t, ms], i) => {
    d += petit(`${n}`, x0, yl, 13, P8) + petit(`${t} : ${ms} ms (repli ${REPLI[i]})`, x0 + 58, yl, 13);
    yl += 20;
  });
  d += petit('Bascules de poses en step-end, déplacements en ease-out, comme les deux autres cartes.', x0, yl + 6, 12);
  return d;
}

let y = M, corps = '';
const LEGENDES = [
  ['1-repos', 'Repos : Jean tient le marteau, l’ouvrier au pied de l’échelle, tourné vers lui.'],
  ['2-transmet', 'Jean tend le marteau, l’ouvrier le prend par le manche.'],
  ['3-pied', 'Marteau en main, l’ouvrier pose le pied ; Jean lève le bras.'],
  ['4-fin', 'Fin : l’ouvrier sur le premier barreau, point ambre ; Jean vise le deuxième.'],
];
LEGENDES.forEach(([nom, t], i) => {
  const x = M + (i % 2) * (CASE + M), yc = y + Math.floor(i / 2) * (H_CASE + LEG + 12);
  corps += cadre(x, yc, CASE, H_CASE) + carte(nom, x, yc, K) + legende(i + 1, t, x, yc + H_CASE + 22);
});
y += 2 * (H_CASE + LEG + 12);
corps += cadre(M, y, CASE, H_CASE) + `<g transform="translate(${M} ${y + 140 * K}) scale(${K})">${POSES_CASE}</g>`;
for (const [nm, xn] of NOMS) corps += petit(nm, M + xn * K, y + H_CASE - 10);
corps += legende(5, 'Les poses : deux reprises telles quelles, trois variantes (montre, pied-barreau, sur-echelle).', M, y + H_CASE + 22);
corps += cadre(M + CASE + M, y, CASE, H_CASE) + decoupage(M + CASE + M, y);
corps += legende(6, 'La durée : quatre temps.', M + CASE + M, y + H_CASE + 22);
y += H_CASE + LEG + 12;
let n = 7;
for (const nom of ['4-fin', '1-repos']) {
  let x = M;
  const hMax = (160 / L) * 480;
  for (const w of [480, 384, 335]) {
    const k = w / L;
    corps += cadre(x, y, w, 160 * k) + carte(nom, x, y, k);
    x += w + 20;
  }
  corps += legende(n++, `${nom === '4-fin' ? 'Fin' : 'Repos'} aux largeurs de carte : 480, 384 et 335 px, taille réelle.`, M, y + hMax + 22);
  y += hMax + LEG + 12;
}
const H = Math.round(y + 4);
const planche =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${LARG}" height="${H}">${STYLE}` +
  `<rect width="${LARG}" height="${H}" fill="${C.ivoire}"/>${corps}</svg>`;
await sharp(Buffer.from(planche)).png({ compressionLevel: 9 }).toFile(join(ICI, 'planche.png'));

// ---------------------------------------------------------------------------
// Les contrôles, pour le rapport.
const tete4 = O4_Y + tourne([1, -120], BASCULE)[1];
const t4 = teteMarteau(MAIN_4, -100), t3 = teteMarteau(MAIN_3, -100), t2 = teteMarteau(MAIN_J, -90);
const bornes = (ps) => `x ${r2(Math.min(...ps.map((p) => p[0])))} à ${r2(Math.max(...ps.map((p) => p[0])))}, y ${r2(Math.min(...ps.map((p) => p[1])))} à ${r2(Math.max(...ps.map((p) => p[1])))}`;
const angle = (c) => r2((Math.atan2(c[1] - EP_AV[1], c[0] - EP_AV[0]) * 180) / Math.PI);
console.log(`échelle : pieds ${r2(PIED_G)} et ${r2(PIED_D)}, barreaux ${BARREAUX.join(', ')} ; B2 de ${r2(B2.x1)} à ${r2(B2.x2)}, tibia de l'ouvrier monté jusqu'à ${r2(TIBIA_4)}.`);
console.log(`places : Jean ${r2(J_X)}, ouvrier ${r2(O_X)} (repos, 2), ${r2(O3_X)} (3), ${r2(O4_X)} (4) ; haut de tête en 4 : ${r2(tete4)}.`);
console.log(`marteau : 2 ${bornes(t2)} ; 3 ${bornes(t3)} ; 4 ${bornes(t4)}. Tête de l'ouvrier en 4 : x ${r2(O4_X + tourne([1, -110], BASCULE)[0] - 10)} à ${r2(O4_X + tourne([1, -110], BASCULE)[0] + 10)}.`);
console.log(`bras de Jean : 3 à ${angle(MI)}°, 4 à ${angle(cibleLocale(CIBLE))}° sous l'horizontale ; prise de l'ouvrier ${pt(PRISE)}, main de Jean ${pt(MAIN_J)}.`);
console.log(`genou de pied-barreau ${pt(genou(HANCHE_AV, CHEVILLE))}, cheville ${pt(CHEVILLE)} ; pied de ${r2(O3_X + CHEVILLE[0] - 3.75)} à ${r2(O3_X + CHEVILLE[0] + 5 + 3.75)} sur B1 de ${r2(B1.x1)} à ${r2(B1.x2)}.`);
console.log(`planche.png ${LARG} × ${H}.`);

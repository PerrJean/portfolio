// Les images clés de la scène « sonder le terrain » (registre/0085), carte
// UserVoice : Jean a construit la sonde qui réunit et classe les retours des
// apprenants. Images fixes, aucune animation, rien dans src/.
//  1. repos : Jean debout, la longue tige de sondage tenue à deux mains,
//     verticale, la pointe posée sur la ligne de sol ; sous le sol, en coupe,
//     trois couches de terrain en traits fins ;
//  2. t1 : il enfonce la tige (8 sous le sol), ses mains descendent avec
//     elle, le buste penché de 12° ;
//  3. t2 : la tige traverse les trois couches (19 sous le sol), Jean penché
//     de 25° au-dessus d'elle, la tête au-dessus de la poignée ;
//  4. t3 : il remonte la tige, les mains reprises plus bas sur elle (les
//     bras restent sous les épaules) ; au bout, la carotte : un cylindre au
//     trait, trois bandes qui reprennent les couches ; dans le sol, le trou ;
//  5. fin : la tige plantée dans le trou, Jean a reculé d'un pas ; il tient
//     la carotte à l'horizontale, à deux mains, par les bouts, devant lui ;
//     le point ambre se pose sur la bande du milieu (le sujet qui compte
//     n'est pas en surface).
// Règle (Jean) : jamais un seul bras levé au-dessus de l'épaule ; ici aucune
// main ni aucun coude ne monte au-dessus des épaules (contrôlé plus bas).
// Produit repos.svg, t1.svg, t2.svg, t3.svg, fin.svg dans le repère de
// Scene.astro (0 -140 426.667 160), mêmes classes, même sol, même dalle
// (x 245 à 420, 12 de haut), et planche.png.
// Relançable : node ops/images/uservoice-sonde/planche.mjs.
// Sans paquet ajouté : sharp ; le texte en chemins (../accueil/police.mjs).
//
// Les poses nouvelles (à reporter dans poses.ts, bloc SONDE ci-dessous) :
// les jambes de debout ; buste et tête basculés aux hanches (la bascule de
// penche, pivot 0,-56) ; deux bras pliés au coude (bras 21,5, avant-bras 17,
// ceux du marteau), le coude toujours sous la ligne épaule-main ; la tige,
// dessinée dans la pose (comme la poutre de poutre-epaule), entre le bras
// arrière et le bras avant.
// Les objets nouveaux (bloc OBJETS_SONDE) : la tige (trait 3, poignée en T),
// la carotte (9 d'épais, trois bandes de 6), les couches (trois lignes
// ondulées à 6, 12 et 18 sous le sol, ardoise, trait 1,2 : celui des
// séparations du board), le trou (la colonne de la carotte, les couches
// coupées).

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { LUNETTES } from '../../../src/components/scene/poses.ts';
import { police } from '../accueil/police.mjs';

const ICI = fileURLToPath(new URL('./', import.meta.url));
const C = { ivoire: '#FEFAF2', encre: '#2A1F1A', ambre: '#F2A33A', orange: '#B54E19', ardoise: '#5E7488', dalle: '#D9D4CC' };
const STYLE =
  `<style>.fe{fill:${C.encre}}.se{stroke:${C.encre}}.fi{fill:${C.ivoire}}.si{stroke:${C.ivoire}}` +
  `.sa{stroke:${C.ardoise}}.so{stroke:${C.orange}}.fa{fill:${C.ambre}}.fd{fill:${C.dalle}}.fs{fill:${C.ardoise}}</style>`;
const L = 426.667;
const r1 = (v) => Math.round(v * 10) / 10;
const pt = ([x, y]) => `${r1(x)},${r1(y)}`;
const rad = (d) => (d * Math.PI) / 180;
const tourne = ([x, y], deg, [cx, cy] = [0, -56]) => {
  const a = rad(deg), dx = x - cx, dy = y - cy;
  return [cx + dx * Math.cos(a) - dy * Math.sin(a), cy + dx * Math.sin(a) + dy * Math.cos(a)];
};

// ---------------------------------------------------------------------------
// Les pièces des poses (celles de poses.ts, à l'identique).

const LIGNE = 'fill="none" stroke-linecap="round" stroke-linejoin="round"';
const trait = (c, points, l) => `<polyline class="${c}" points="${points}" ${LIGNE} stroke-width="${l}"/>`;
const jambes = (ar, av) => trait('se', ar, 7.5) + trait('se', av, 7.5);
const brasArriere = (points) => trait('se', points, 7);
const brasAvant = (points) => trait('si', points, 10) + trait('se', points, 7);
const TORSE = '<path class="fe" d="M-9,-88 A9,9 0 0 1 9,-88 L9,-55 Q9,-52 6,-52 L-6,-52 Q-9,-52 -9,-55 Z"/>';
const TETE = '<circle class="fe" cx="1" cy="-110" r="10"/>{L}';
const DEBOUT = jambes('-5.25,-56 -4.5,-4 0.5,-4', '5.25,-56 4.5,-4 9.5,-4');
const EP_AR = [0, -89], EP_AV = [1, -89];

// ---------------------------------------------------------------------------
// OBJETS_SONDE — à reporter dans poses.ts (OBJETS), origines indiquées.

const TIGE_L = 104;          // de la pointe à la poignée
const POIGNEE = 12;          // la barre du T
const CAR_L = 18, CAR_E = 9; // la carotte : longueur (3 bandes de 6), épaisseur
const BANDE = CAR_L / 3;
const COUCHES_Y = [6, 12, 18]; // les trois lignes sous le sol : trois couches de 6

const OBJETS_SONDE = {
  /** La tige de sondage, origine à la pointe, verticale vers le haut :
   *  trait 3 (celui des barreaux de l'échelle), poignée en T au sommet. */
  tige:
    `<g stroke-linecap="round"><line class="se" x1="0" y1="0" x2="0" y2="${-TIGE_L}" stroke-width="3"/>` +
    `<line class="se" x1="${-POIGNEE / 2}" y1="${-TIGE_L}" x2="${POIGNEE / 2}" y2="${-TIGE_L}" stroke-width="3"/></g>`,
  /** La carotte, origine au milieu de son bout « surface », couchée vers la
   *  droite (x de 0 à 18) : un cylindre au trait, trois bandes de 6 qui
   *  reprennent les couches (surface à gauche). Debout : rotate(90). */
  carotte:
    `<rect class="fi se" x="0" y="${-CAR_E / 2}" width="${CAR_L}" height="${CAR_E}" rx="2" stroke-width="1.5"/>` +
    `<g stroke-width="1.2" stroke-linecap="round"><line class="sa" x1="${BANDE}" y1="${-CAR_E / 2 + 0.75}" x2="${BANDE}" y2="${CAR_E / 2 - 0.75}"/>` +
    `<line class="sa" x1="${2 * BANDE}" y1="${-CAR_E / 2 + 0.75}" x2="${2 * BANDE}" y2="${CAR_E / 2 - 0.75}"/></g>`,
  /** Les couches, de x0 à x1 (repère de la scène) : trois lignes ondulées
   *  (amplitude 0,45, période 56, décalées d'une ligne à l'autre). */
  couches: (x0, x1) =>
    COUCHES_Y.map((y, i) => {
      const per = 56, amp = 0.45, dec = (i * per) / 3;
      let d = `M${r1(x0)},${y}`;
      for (let x = x0, k = 0; x < x1; k++) {
        const nx = Math.min(x + per / 2, x1);
        const s = Math.floor((x - x0 + dec) / (per / 2)) % 2 ? 1 : -1;
        d += ` Q${r1((x + nx) / 2)},${r1(y + s * 2 * amp * ((nx - x) / (per / 2)))} ${r1(nx)},${y}`;
        x = nx;
      }
      return `<path class="sa" d="${d}" fill="none" stroke-width="1.2" stroke-linecap="round"/>`;
    }).join(''),
  /** Le trou laissé par la carotte, origine au milieu, au sol : la colonne
   *  coupe les couches (aplat ivoire), deux bords et un fond au trait fin. */
  trou:
    `<path class="fi sa" d="M${-CAR_E / 2},0.75 L${-CAR_E / 2},18 L${CAR_E / 2},18 L${CAR_E / 2},0.75" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"/>`,
};

// ---------------------------------------------------------------------------
// SONDE — les poses, à reporter dans poses.ts (POSES). Repère de la pose :
// pieds à l'origine, tournée vers la droite ; la tige à x = TIGE_X.

const TIGE_X = 26;
const BRAS = 21.5, AVANT_BRAS = 17;
/** Le coude d'un bras plié de l'épaule e à la main m, sous la ligne e-m. */
function coude(e, m) {
  const dx = m[0] - e[0], dy = m[1] - e[1], d = Math.hypot(dx, dy);
  if (d > BRAS + AVANT_BRAS) throw new Error(`main hors d'atteinte : ${pt(e)} → ${pt(m)} (${r1(d)})`);
  const a = (BRAS ** 2 - AVANT_BRAS ** 2 + d ** 2) / (2 * d), h = Math.sqrt(Math.max(0, BRAS ** 2 - a ** 2));
  const ux = dx / d, uy = dy / d;
  let n = [-uy, ux];
  if (n[1] < 0) n = [uy, -ux]; // le coude vers le bas
  return [e[0] + a * ux + h * n[0], e[1] + a * uy + h * n[1]];
}
const CONTROLES = [];
/** Une pose de la sonde : bascule du buste (degrés, > 0 vers l'avant), mains
 *  du bras avant et du bras arrière, l'objet tenu (coordonnées de la pose),
 *  dessiné entre les deux bras, ou devant les deux (devant : la carotte de
 *  la fin, que les avant-bras ne doivent pas cacher). */
function poseSonde(nom, bascule, mainAv, mainAr, tenu, devant = false) {
  const eAv = tourne(EP_AV, bascule), eAr = tourne(EP_AR, bascule);
  const cAv = coude(eAv, mainAv), cAr = coude(eAr, mainAr);
  CONTROLES.push({ nom, eAv, eAr, cAv, cAr, mainAv, mainAr });
  return (
    DEBOUT +
    brasArriere(`${pt(eAr)} ${pt(cAr)} ${pt(mainAr)}`) +
    `<g transform="rotate(${bascule} 0 -56)">${TORSE}${TETE}</g>` +
    (devant ? '' : tenu) +
    brasAvant(`${pt(eAv)} ${pt(cAv)} ${pt(mainAv)}`) +
    (devant ? tenu : '')
  );
}
const tigeA = (pointe) => `<g transform="translate(${TIGE_X} ${pointe})">${OBJETS_SONDE.tige}</g>`;
const carotteDebout = (haut) => `<g transform="translate(${TIGE_X} ${haut}) rotate(90)">${OBJETS_SONDE.carotte}</g>`;

// La prise : la main avant 12 au-dessus de la main arrière (deux mains
// lisibles, la main arrière encore à portée en t2).
const PRISE = 12;
const POINTE = { repos: 0, t1: 8, t2: 19, t3: -24 }; // la pointe de la tige (y)
const MAIN = { repos: -82, t1: -74, t2: -63, t3: -86 }; // la main avant (y)
const FIN_Y = -66, FIN_X0 = 12; // la carotte couchée : milieu en y, bout surface en x

const SONDE = {
  'sonde-repos': poseSonde('repos', 0, [TIGE_X, MAIN.repos], [TIGE_X, MAIN.repos + PRISE], tigeA(POINTE.repos)),
  'sonde-enfonce': poseSonde('t1', 12, [TIGE_X, MAIN.t1], [TIGE_X, MAIN.t1 + PRISE], tigeA(POINTE.t1)),
  'sonde-traverse': poseSonde('t2', 25, [TIGE_X, MAIN.t2], [TIGE_X, MAIN.t2 + PRISE], tigeA(POINTE.t2)),
  'sonde-remonte': poseSonde('t3', -5, [TIGE_X, MAIN.t3], [TIGE_X, MAIN.t3 + PRISE], carotteDebout(POINTE.t3) + tigeA(POINTE.t3)),
  /** La carotte couchée, tenue par les bouts (chaque main 1 au-delà),
   *  dessinée devant les bras : les mains dépassent des deux bouts. */
  'sonde-carotte': poseSonde('fin', 0, [FIN_X0 + CAR_L + 1, FIN_Y], [FIN_X0 - 1, FIN_Y],
    `<g transform="translate(${FIN_X0} ${FIN_Y})">${OBJETS_SONDE.carotte}</g>`, true),
};

// ---------------------------------------------------------------------------
// Le décor et les cartes.

const XJ = 140;                   // Jean au repos
const XT = XJ + TIGE_X;           // le point de sondage
const COUPE = [12, 233];          // les couches, jusqu'avant la dalle
const XJ_FIN = XT - 45;           // fin : un pas en arrière, la carotte loin de la tige
const DALLE = '<rect class="fd" x="245" y="0" width="175" height="12"/>';
const SOL = `<line class="se" x1="0" y1="0" x2="${L}" y2="0" stroke-width="1.5"/>`;
const COUCHES = OBJETS_SONDE.couches(...COUPE);
const TROU = `<g transform="translate(${XT} 0)">${OBJETS_SONDE.trou}</g>`;
const POINT_X = XJ_FIN + FIN_X0 + 1.5 * BANDE;
const POINT = `<circle class="point fa" cx="${r1(POINT_X)}" cy="${FIN_Y}" r="3.5"/>`;

const perso = (dessin, x) => `<g transform="translate(${r1(x)} 0)">${dessin.replace('{L}', LUNETTES)}</g>`;
const CARTES = {
  repos: DALLE + COUCHES + SOL + perso(SONDE['sonde-repos'], XJ),
  t1: DALLE + COUCHES + SOL + perso(SONDE['sonde-enfonce'], XJ),
  t2: DALLE + COUCHES + SOL + perso(SONDE['sonde-traverse'], XJ),
  t3: DALLE + COUCHES + TROU + SOL + perso(SONDE['sonde-remonte'], XJ),
  fin: DALLE + COUCHES + TROU + SOL + `<g transform="translate(${XT} 18)">${OBJETS_SONDE.tige}</g>` +
    perso(SONDE['sonde-carotte'], XJ_FIN) + POINT,
};
const fichier = (corps) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -140 ${L} 160" width="${L}" height="160">${STYLE}${corps}</svg>\n`;
for (const [nom, corps] of Object.entries(CARTES)) writeFileSync(join(ICI, `${nom}.svg`), fichier(corps));

// ---------------------------------------------------------------------------
// Les contrôles : aucune main ni aucun coude au-dessus des épaules ; la tête
// ne touche pas la tige ; la carotte de la fin ne touche pas la tige plantée.

for (const c of CONTROLES) {
  const haut = Math.min(c.eAv[1], c.eAr[1]);
  for (const [k, p] of [['main avant', c.mainAv], ['main arrière', c.mainAr], ['coude avant', c.cAv], ['coude arrière', c.cAr]])
    if (p[1] < haut) throw new Error(`${c.nom} : ${k} au-dessus de l'épaule (${r1(p[1])} < ${r1(haut)})`);
}
const BASCULES = { repos: 0, t1: 12, t2: 25, t3: -5 };
const jeuTete = Object.fromEntries(Object.entries(BASCULES).map(([n, b]) => {
  const [hx, hy] = tourne([1, -110], b), top = POINTE[n] - TIGE_L;
  // distance du centre de la tête au T (tige verticale x = TIGE_X, de top à la pointe ; barre de top)
  const dTige = hy < top ? Math.hypot(TIGE_X - hx, top - hy) : Math.abs(TIGE_X - hx);
  const dx = Math.max(0, Math.abs(hx - TIGE_X) - POIGNEE / 2), dBarre = Math.hypot(dx, hy - top);
  return [n, r1(Math.min(dTige, dBarre) - 10 - 1.5)];
}));
for (const [n, j] of Object.entries(jeuTete)) if (j <= 0) throw new Error(`${n} : la tête touche la tige (${j})`);
const jeuFin = XT - 1.5 - (XJ_FIN + FIN_X0 + CAR_L + 1 + 5);
if (jeuFin <= 0) throw new Error(`fin : la main touche la tige (${r1(jeuFin)})`);

// ---------------------------------------------------------------------------
// La planche : les cinq images côte à côte à 480 px (largeur de carte,
// taille réelle), légendées ; dessous, les mêmes en gros plan sur Jean.

const P8 = police(800), P4 = police(400);
const M = 20, W = 480, N = 5, LARG = M + N * (W + M), LEG = 40;
const legende = (n, t, x, y) => P8.chemin(`${n}`, x, y, 15, 0, 'fs') + P4.chemin(t, x + 16, y, 15, 0, 'fs');
const petit = (t, x, y, taille = 13) => P4.chemin(t, x, y, taille, 0, 'fs');
const cadre = (x, y, l, h) => `<rect x="${x}" y="${y}" width="${l}" height="${h}" fill="${C.ivoire}" stroke="${C.dalle}" stroke-width="2"/>`;
const LEGENDES = [
  ['repos', 'Repos : la tige à deux mains,', 'la pointe sur le sol ; trois couches.'],
  ['t1', 'Temps 1 : il enfonce la tige,', 'les mains descendent avec elle.'],
  ['t2', 'Temps 2 : la tige traverse', 'les trois couches.'],
  ['t3', 'Temps 3 : il la remonte ;', 'au bout, la carotte, trois bandes.'],
  ['fin', 'Fin : la carotte à l’horizontale,', 'à deux mains ; point ambre, bande 2.'],
];
let corps = '';
const kC = W / L, hC = 160 * kC;
let y = M;
LEGENDES.forEach(([nom, a, b], i) => {
  const x = M + i * (W + M);
  corps += cadre(x, y, W, hC) + `<g transform="translate(${x} ${y + 140 * kC}) scale(${kC})">${CARTES[nom]}</g>`;
  corps += legende(i + 1, a, x, y + hC + 22) + petit(b, x + 16, y + hC + 42, 15);
});
y += hC + LEG + 26;
// Gros plan : x de XJ_FIN - 25 à XJ_FIN - 25 + 150, y de -140 à 20.
const Z0 = XJ_FIN - 25, ZL = 150, kZ = W / ZL, hZ = 160 * kZ;
corps += petit('Gros plan (× 3,2) : les mêmes images, cadrées sur Jean et la tige ; les traits restent ceux de la carte.', M, y, 15);
y += 14;
LEGENDES.forEach(([nom], i) => {
  const x = M + i * (W + M);
  corps += `<svg x="${x}" y="${y}" width="${W}" height="${r1(hZ)}" viewBox="${r1(Z0)} -140 ${ZL} 160">` +
    `<rect x="${r1(Z0)}" y="-140" width="${ZL}" height="160" fill="${C.ivoire}"/>${CARTES[nom]}</svg>` +
    `<rect x="${x}" y="${y}" width="${W}" height="${r1(hZ)}" fill="none" stroke="${C.dalle}" stroke-width="2"/>`;
  corps += P8.chemin(nom, x + 10, y + 24, 15, 0, 'fs');
});
y += hZ + M;
const H = Math.round(y);
const planche =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${LARG}" height="${H}">${STYLE}` +
  `<rect width="${LARG}" height="${H}" fill="${C.ivoire}"/>${corps}</svg>`;
await sharp(Buffer.from(planche)).png({ compressionLevel: 9 }).toFile(join(ICI, 'planche.png'));

// ---------------------------------------------------------------------------
// Pour le rapport, et pour le report dans poses.ts.
for (const c of CONTROLES)
  console.log(`${c.nom} : épaules ${pt(c.eAv)} / ${pt(c.eAr)} ; mains ${pt(c.mainAv)} / ${pt(c.mainAr)} ; coudes ${pt(c.cAv)} / ${pt(c.cAr)}.`);
console.log(`jeu tête-tige : ${Object.entries(jeuTete).map(([n, j]) => `${n} ${j}`).join(', ')} ; fin : main-tige ${r1(jeuFin)}.`);
console.log(`Jean ${XJ} (fin ${XJ_FIN}) ; sondage ${XT} ; couches ${COUPE.join(' à ')} ; point ${r1(POINT_X)},${FIN_Y}.`);
console.log(`planche.png ${LARG} × ${H}.`);
if (process.argv.includes('--poses')) console.log(JSON.stringify({ SONDE, OBJETS_SONDE: { ...OBJETS_SONDE, couches: OBJETS_SONDE.couches(...COUPE) } }, null, 1));

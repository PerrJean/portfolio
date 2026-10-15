// Les images clés de la scène « la conversation » (registre/0090), carte
// Mises en situation orales : images fixes, aucune animation. L'histoire :
// une IA joue l'interlocuteur ; chaque échange se termine par un retour
// pédagogique.
//  1. repos : un apprenant anonyme, assis sur un tabouret, les mains sur une
//     table ; sur la table, un écran (rectangle au trait, un petit disque
//     dedans : l'interlocuteur) ; Jean un peu en retrait à gauche, debout,
//     qui regarde ;
//  2. et 3. les tours de parole : une bulle au trait côté apprenant, puis une
//     côté écran, deux traits ardoise dedans, aucun texte ;
//  4. fin : l'écran tend une fiche ambre (un rectangle, trois traits), la
//     seule lumière de la scène ; l'apprenant la regarde.
// Produit repos.svg, tour-1.svg, tour-2.svg et fin.svg, dans le repère de
// Scene.astro (0 -140 426.667 160), mêmes classes, et planche.png.
// Relançable : node ops/images/conversation-scene/planche.mjs.
// Sans paquet ajouté : sharp ; le texte en chemins (../accueil/police.mjs).
//
// Poses : debout (Jean) de poses.ts ; « assis », nouvelle, sur les segments
// existants (voir ASSIS). Objets de planche : tabouret, table, écran, bulle,
// fiche.

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

// ---------------------------------------------------------------------------
// La pose assise, à ajouter à poses.ts. Mêmes aides que poses.ts (trait,
// jambes, brasArriere, brasAvant, torse, TETE), recopiées ici.

const LIGNE = 'fill="none" stroke-linecap="round" stroke-linejoin="round"';
const trait = (c, points, largeur) => `<polyline class="${c}" points="${points}" ${LIGNE} stroke-width="${largeur}"/>`;
const jambes = (arriere, avant) => trait('se', arriere, 7.5) + trait('se', avant, 7.5);
const brasArriere = (points) => trait('se', points, 7);
const brasAvant = (points) => trait('si', points, 10) + trait('se', points, 7);
const torse = () =>
  '<path class="fe" d="M-9,-88 A9,9 0 0 1 9,-88 L9,-55 Q9,-52 6,-52 L-6,-52 Q-9,-52 -9,-55 Z"/>';
const TETE = '<circle class="fe" cx="1" cy="-110" r="10"/>{L}';
/** Assis : les jambes pliées au genou, cuisse 24,25 à l'horizontale et tibia
 *  19,9 à la verticale (ceux de marche-2), pied 5 à plat ; les hanches
 *  descendent donc de 56 à 24 (32 plus bas). Le haut du corps est celui de
 *  debout, abaissé de 32 d'un bloc (translate) ; les deux bras droits, longs
 *  de 29 (celui de debout), tendus 10 et 14 degrés sous l'horizontale, les
 *  mains posées sur la table (y -52 et -50). Les genoux à 10,5 l'un de
 *  l'autre, l'écart des jambes de debout. */
const ASSIS =
  jambes('-5.25,-24 19,-24 19,-4 24,-4', '5.25,-24 29.5,-24 29.5,-4 34.5,-4') +
  '<g transform="translate(0 32)">' +
  brasArriere('0,-89 28.5,-84') +
  torse() +
  TETE +
  brasAvant('1,-89 29.5,-82') +
  '</g>';

// ---------------------------------------------------------------------------
// Les objets de planche, origine sous le personnage assis (ses hanches à x 0).

/** Le tabouret : l'assise sous les hanches (son dessus à -20, le bas des
 *  cuisses), deux pieds écartés, le trait du board. */
const TABOURET =
  '<line class="se" x1="-8" y1="-16" x2="-11" y2="-1" stroke-width="3.5" stroke-linecap="round"/>' +
  '<line class="se" x1="6" y1="-16" x2="9" y2="-1" stroke-width="3.5" stroke-linecap="round"/>' +
  '<rect class="fe" x="-13" y="-20" width="24" height="5" rx="1"/>';
/** La table : un plateau de 115 (le plateau du tréteau, 5 d'épaisseur), son
 *  dessus à -47, et deux pieds droits ; le pied gauche passe devant les
 *  pieds de l'apprenant, pas dans ses genoux. */
const TABLE_X = [20, 135];
const TABLE =
  `<line class="se" x1="46" y1="-43" x2="46" y2="-1" stroke-width="4" stroke-linecap="round"/>` +
  `<line class="se" x1="127" y1="-43" x2="127" y2="-1" stroke-width="4" stroke-linecap="round"/>` +
  `<rect class="fe" x="${TABLE_X[0]}" y="-47" width="${TABLE_X[1] - TABLE_X[0]}" height="5" rx="1"/>`;
/** L'écran : un cadre de 50 × 34 au trait du board, sur un pied court ; le
 *  petit disque d'encre au milieu (l'interlocuteur : rond pour l'humain), à
 *  la hauteur des yeux de l'apprenant assis. */
const ECRAN_X = 100, ECRAN = { l: 50, h: 34, bas: -55 };
const ECRAN_SVG =
  `<line class="se" x1="${ECRAN_X}" y1="${ECRAN.bas}" x2="${ECRAN_X}" y2="-47" stroke-width="4"/>` +
  `<line class="se" x1="${ECRAN_X - 8}" y1="-48.5" x2="${ECRAN_X + 8}" y2="-48.5" stroke-width="3" stroke-linecap="round"/>` +
  `<rect class="fi se" x="${ECRAN_X - ECRAN.l / 2}" y="${ECRAN.bas - ECRAN.h}" width="${ECRAN.l}" height="${ECRAN.h}" rx="2" stroke-width="2.5"/>` +
  `<circle class="fe" cx="${ECRAN_X}" cy="${ECRAN.bas - ECRAN.h / 2}" r="6"/>`;
/** La bulle : un rectangle arrondi au trait (1,8), la queue vers le bas qui
 *  pointe sur celui qui parle ; deux traits ardoise dedans (1,4), sans
 *  texte. x, y : coin haut gauche ; base : abscisse du départ de la queue ;
 *  pointe : son bout. */
const bulle = (x, y, l, h, base, pointe, longueurs) => {
  const b = y + h, rx = 6;
  const d =
    `M${x + rx},${y} H${x + l - rx} Q${x + l},${y} ${x + l},${y + rx} V${b - rx} Q${x + l},${b} ${x + l - rx},${b} ` +
    `H${base + 7} L${pointe[0]},${pointe[1]} L${base},${b} H${x + rx} Q${x},${b} ${x},${b - rx} V${y + rx} Q${x},${y} ${x + rx},${y} Z`;
  const traits = longueurs
    .map((lg, i) => `<line class="sa" x1="${x + 7}" y1="${y + 8 + i * 7}" x2="${x + 7 + lg}" y2="${y + 8 + i * 7}" stroke-width="1.4" stroke-linecap="round"/>`)
    .join('');
  return `<path class="fi se" d="${d}" stroke-width="1.8" stroke-linejoin="round"/>${traits}`;
};
// La bulle de l'apprenant au-dessus de sa tête, à droite (la tête de -9 à
// 11, son haut à -88) ; celle de l'écran au-dessus du cadre (haut à -89).
const BULLE_APPRENANT = bulle(6, -124, 36, 22, 10, [5, -94], [22, 14]);
const BULLE_ECRAN = bulle(ECRAN_X - 20, -126, 36, 22, ECRAN_X + 2, [ECRAN_X + 4, -94], [20, 12]);
/** La fiche : un aplat ambre de 20 × 25 au trait du post-it, trois traits
 *  d'encre ; elle sort du bord gauche de l'écran (inclinée de 8 degrés),
 *  devant lui, à hauteur des yeux de l'apprenant. */
const FICHE = { x: ECRAN_X - ECRAN.l / 2 - 16, y: -87, l: 20, h: 25, biais: -8 };
const FICHE_SVG =
  `<g class="fiche" transform="translate(${FICHE.x} ${FICHE.y}) rotate(${FICHE.biais} ${FICHE.l / 2} ${FICHE.h / 2})">` +
  `<rect class="fa se" x="0" y="0" width="${FICHE.l}" height="${FICHE.h}" rx="1.5" stroke-width="1.8"/>` +
  `<g stroke-width="1.4" stroke-linecap="round"><line class="se" x1="4" y1="7" x2="16" y2="7"/>` +
  `<line class="se" x1="4" y1="12.5" x2="16" y2="12.5"/><line class="se" x1="4" y1="18" x2="11" y2="18"/></g></g>`;

// ---------------------------------------------------------------------------
// Les places et les images.

const perso = (dessin, x, { jean = false, classe = '' } = {}) =>
  `<g transform="translate(${r2(x)} 0)"><g class="${classe}">${dessin.replace('{L}', jean ? LUNETTES : '')}</g></g>`;
const RETRAIT = 58; // de Jean à l'apprenant
const LARGEUR = 10 + RETRAIT + TABLE_X[1];
const J_X = Math.round((L - LARGEUR) / 2 + 10), A_X = J_X + RETRAIT;
const ici = (svg, classe = '') => `<g${classe ? ` class="${classe}"` : ''} transform="translate(${A_X} 0)">${svg}</g>`;
const SOL = `<line class="se" x1="0" y1="0" x2="${L}" y2="0" stroke-width="1.5"/>`;
const FOND =
  SOL + perso(POSES.debout, J_X, { jean: true, classe: 'j-debout' }) +
  ici(TABOURET) + ici(TABLE) + ici(ECRAN_SVG) + perso(ASSIS, A_X, { classe: 'apprenant' });
const CARTES = {
  repos: FOND,
  'tour-1': FOND + ici(BULLE_APPRENANT, 'bulle-apprenant'),
  'tour-2': FOND + ici(BULLE_ECRAN, 'bulle-ecran'),
  fin: FOND + ici(FICHE_SVG),
};
const fichier = (corps) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -140 ${L} 160" width="${L}" height="160">${STYLE}${corps}</svg>\n`;
for (const nom of Object.keys(CARTES)) writeFileSync(join(ICI, `${nom}.svg`), fichier(CARTES[nom]));

// ---------------------------------------------------------------------------
// La planche : repos et fin ; les deux tours ; la pose assise et le
// découpage ; puis la fin et le repos aux largeurs de carte, taille réelle.

const P8 = police(800), P4 = police(400);
const M = 20, LARG = 2 * M + 1280, LEG = 34;
const CASE = (1280 - M) / 2, K = CASE / L, H_CASE = 160 * K;
const legende = (n, t, x, y) => P8.chemin(`${n}`, x, y, 15, 0, 'fs') + P4.chemin(t, x + 16, y, 15, 0, 'fs');
const petit = (t, x, y, taille = 13, p = P4) => p.chemin(t, x, y, taille, 0, 'fs');
const cadre = (x, y, l, h) => `<rect x="${x}" y="${y}" width="${l}" height="${h}" fill="${C.ivoire}" stroke="${C.dalle}" stroke-width="2"/>`;
const scene = (corps, x, y, k) => `<g transform="translate(${x} ${y + 140 * k}) scale(${k})">${corps}</g>`;

// La pose assise seule, à côté de debout, sur la même ligne de pied ; puis
// avec son tabouret.
const POSES_CASE =
  `<line class="se" x1="6" y1="0" x2="${L - 6}" y2="0" stroke-width="1.5"/>` +
  perso(POSES.debout, 60) + perso(ASSIS, 160) +
  `<g transform="translate(290 0)">${TABOURET}</g>` + perso(ASSIS, 290) +
  `<line class="sa" x1="40" y1="-56" x2="200" y2="-56" stroke-width="1" stroke-dasharray="3 3"/>` +
  `<line class="sa" x1="140" y1="-24" x2="200" y2="-24" stroke-width="1" stroke-dasharray="3 3"/>`;
const NOMS = [['debout', 40], ['assis', 158], ['assis, tabouret', 262]];

const TEMPS = [
  ['temps 1', 'bulle de l’apprenant', 150],
  ['temps 2', 'bulle de l’écran ; la première s’efface', 150],
  ['temps 3', 'la fiche ambre sort de l’écran vers l’apprenant', 300],
];
function decoupage(x, y) {
  const total = TEMPS.reduce((s, t) => s + t[2], 0);
  let d = petit(`Découpage : ${total} ms, trois temps ; personne ne bouge`, x + 16, y + 30, 14, P8);
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
  d += petit('Bulles : fondu et scale de 0,8 à 1 depuis la pointe de la queue (80 ms), step-end ensuite.', x0, yl + 6, 12);
  d += petit('Fiche : de derrière le bord de l’écran (+14 en x, opacité 0) à sa place, en ease-out.', x0, yl + 22, 12);
  return d;
}

let y = M, corps = '';
const CASES = [
  ['repos', 'Repos : l’apprenant face à l’écran ; Jean en retrait, qui regarde.'],
  ['fin', 'Fin : l’écran tend la fiche ambre, le retour ; l’apprenant la regarde.'],
  ['tour-1', 'Tour 1 : l’apprenant parle, une bulle de son côté.'],
  ['tour-2', 'Tour 2 : l’interlocuteur répond, une bulle côté écran.'],
];
CASES.forEach(([nom, t], i) => {
  const x = M + (i % 2) * (CASE + M), yc = y + Math.floor(i / 2) * (H_CASE + LEG + 12);
  corps += cadre(x, yc, CASE, H_CASE) + scene(CARTES[nom], x, yc, K) + legende(i + 1, t, x, yc + H_CASE + 22);
});
y += 2 * (H_CASE + LEG + 12);
corps += cadre(M, y, CASE, H_CASE) + scene(POSES_CASE, M, y, K);
for (const [nm, xn] of NOMS) corps += petit(nm, M + xn * K, y + H_CASE - 10);
corps += legende(5, 'La pose assise, nouvelle : hanches 32 plus bas, genou plié, aucun bras levé.', M, y + H_CASE + 22);
corps += cadre(M + CASE + M, y, CASE, H_CASE) + decoupage(M + CASE + M, y);
corps += legende(6, 'La durée : 600 ms, trois temps.', M + CASE + M, y + H_CASE + 22);
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
const long = (a, b) => r2(Math.hypot(b[0] - a[0], b[1] - a[1]));
console.log(`Jean ${J_X}, apprenant ${A_X}, table ${A_X + TABLE_X[0]} à ${A_X + TABLE_X[1]}, écran ${A_X + ECRAN_X - ECRAN.l / 2} à ${A_X + ECRAN_X + ECRAN.l / 2}.`);
console.log(`assis : cuisses ${long([-5.25, -24], [19, -24])}, tibias ${long([19, -24], [19, -4])}, bras ${long([0, -89], [28.5, -84])} et ${long([1, -89], [29.5, -82])}.`);
console.log(`yeux de l'apprenant à y -78 ; disque à ${ECRAN.bas - ECRAN.h / 2} ; fiche de ${FICHE.y} à ${FICHE.y + FICHE.h}.`);
console.log(`planche.png ${LARG} × ${H}.`);

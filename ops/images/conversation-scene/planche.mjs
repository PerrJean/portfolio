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
// Sans paquet ajouté : sharp ; le texte en chemins (../commun/police.mjs).
//
// Poses : debout (Jean) de poses.ts ; « assis », nouvelle, sur les segments
// existants (voir ASSIS). Objets de planche : tabouret, table, écran, bulle,
// fiche.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { POSES } from '../../../src/components/scene/poses.ts';
import { L, r2, sol, svgScene } from '../commun/svg.mjs';
import { jambes, brasArriere, brasAvant, TORSE, TETE, perso } from '../commun/personnage.mjs';
import { M, LARG, CASE, RANG, encadre, grille, casePoses, decoupage, auxLargeurs, ecrirePlanche } from '../commun/planche.mjs';

const ICI = fileURLToPath(new URL('./', import.meta.url));

// ---------------------------------------------------------------------------
// La pose assise, à ajouter à poses.ts. Mêmes aides que poses.ts
// (../commun/personnage.mjs).

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
  brasArriere([0, -89], [28.5, -84]) +
  TORSE +
  TETE +
  brasAvant([1, -89], [29.5, -82]) +
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

const RETRAIT = 58; // de Jean à l'apprenant
const LARGEUR = 10 + RETRAIT + TABLE_X[1];
const J_X = Math.round((L - LARGEUR) / 2 + 10), A_X = J_X + RETRAIT;
const ici = (svg, classe = '') => `<g${classe ? ` class="${classe}"` : ''} transform="translate(${A_X} 0)">${svg}</g>`;
const FOND =
  sol() + perso(POSES.debout, J_X, { jean: true, classe: 'j-debout' }) +
  ici(TABOURET) + ici(TABLE) + ici(ECRAN_SVG) + perso(ASSIS, A_X, { classe: 'apprenant' });
const CARTES = {
  repos: FOND,
  'tour-1': FOND + ici(BULLE_APPRENANT, 'bulle-apprenant'),
  'tour-2': FOND + ici(BULLE_ECRAN, 'bulle-ecran'),
  fin: FOND + ici(FICHE_SVG),
};
for (const nom of Object.keys(CARTES)) writeFileSync(join(ICI, `${nom}.svg`), svgScene(CARTES[nom]));

// ---------------------------------------------------------------------------
// La planche : repos et fin ; les deux tours ; la pose assise et le
// découpage ; puis la fin et le repos aux largeurs de carte, taille réelle.

// La pose assise seule, à côté de debout, sur la même ligne de pied ; puis
// avec son tabouret.
const POSES_CASE =
  sol(6, L - 6) +
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
const TOTAL = TEMPS.reduce((s, t) => s + t[2], 0);
const DECOUPAGE = {
  titre: `Découpage : ${TOTAL} ms, trois temps ; personne ne bouge`,
  temps: TEMPS,
  notes: [
    'Bulles : fondu et scale de 0,8 à 1 depuis la pointe de la queue (80 ms), step-end ensuite.',
    'Fiche : de derrière le bord de l’écran (+14 en x, opacité 0) à sa place, en ease-out.',
  ],
};

let y = M, corps = '';
corps += grille([
  ['repos', 'Repos : l’apprenant face à l’écran ; Jean en retrait, qui regarde.'],
  ['fin', 'Fin : l’écran tend la fiche ambre, le retour ; l’apprenant la regarde.'],
  ['tour-1', 'Tour 1 : l’apprenant parle, une bulle de son côté.'],
  ['tour-2', 'Tour 2 : l’interlocuteur répond, une bulle côté écran.'],
], y, CARTES);
y += 2 * RANG;
corps += casePoses(M, y, POSES_CASE, NOMS, 5, 'La pose assise, nouvelle : hanches 32 plus bas, genou plié, aucun bras levé.');
corps += encadre(M + CASE + M, y, decoupage(M + CASE + M, y, DECOUPAGE), 6, 'La durée : 600 ms, trois temps.');
y += RANG;
const largeurs = auxLargeurs([[CARTES.fin, 'Fin'], [CARTES.repos, 'Repos']], y, 7);
corps += largeurs.corps;
y = largeurs.y;
const H = Math.round(y + 4);
await ecrirePlanche(join(ICI, 'planche.png'), corps, H);

// ---------------------------------------------------------------------------
// Les contrôles, pour le rapport.
const long = (a, b) => r2(Math.hypot(b[0] - a[0], b[1] - a[1]));
console.log(`Jean ${J_X}, apprenant ${A_X}, table ${A_X + TABLE_X[0]} à ${A_X + TABLE_X[1]}, écran ${A_X + ECRAN_X - ECRAN.l / 2} à ${A_X + ECRAN_X + ECRAN.l / 2}.`);
console.log(`assis : cuisses ${long([-5.25, -24], [19, -24])}, tibias ${long([19, -24], [19, -4])}, bras ${long([0, -89], [28.5, -84])} et ${long([1, -89], [29.5, -82])}.`);
console.log(`yeux de l'apprenant à y -78 ; disque à ${ECRAN.bas - ECRAN.h / 2} ; fiche de ${FICHE.y} à ${FICHE.y + FICHE.h}.`);
console.log(`planche.png ${LARG} × ${H}.`);

// Les images clés de la scène « l'échelle » (registre/0062), carte du
// troisième projet (la matrice de compétences) : images fixes, aucune
// animation.
//  1. repos : Jean penché sur le plan ouvert (la grille) ; l'ouvrier au pied
//     de l'échelle, tourné vers lui ;
//  2. intermédiaire : Jean s'est redressé et montre l'échelle ; l'ouvrier
//     s'est tourné vers elle et lève le pied ;
//  3. fin : l'ouvrier est monté d'un barreau (pieds sur le premier, mains
//     sur le troisième) ; point ambre sur le barreau atteint.
// Produit repos.svg, intermediaire.svg, fin.svg (repère de Scene.astro,
// mêmes classes) et planche.png. Relançable : node ops/images/matrice/planche.mjs.
// Sans paquet ajouté : sharp ; le texte en chemins (../accueil/police.mjs).
//
// Deux poses nouvelles, dessinées ici seulement (à reporter dans poses.ts) :
//  - sur-echelle : les jambes de debout ; le buste et la tête basculés de
//    BASCULE degrés aux hanches (la bascule de penche, sans le décalage) ;
//    les deux bras de bras-tendus, mêmes vecteurs, repartis des épaules
//    basculées. Posée sur un barreau : translate(x, haut du barreau).
//  - montre : les jambes, le buste, la tête et le bras arrière de debout ;
//    le bras avant tendu, droit, de même longueur que celui de bras-tendus
//    (32,2), vers la cible.

import { writeFileSync } from 'node:fs';
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

// ---------------------------------------------------------------------------
// Les objets nouveaux : le mur et l'échelle.

// Le pan de mur : un carré au trait, trois assises de joints (le grain de la
// poutre : trait fin, opacité 0,4).
const MUR = { x: 372, haut: -134, droite: 420 };
const joints = () => {
  let d = '';
  const h = 22, l = MUR.droite - MUR.x;
  for (let i = 1, y = -h; y > MUR.haut + 4; i++, y -= h) {
    d += `<line class="se" x1="${MUR.x}" y1="${y}" x2="${MUR.droite}" y2="${y}" stroke-width="1" stroke-opacity="0.4"/>`;
    const x = MUR.x + (i % 2 ? l / 2 : l / 4);
    const xs = i % 2 ? [x] : [x, x + l / 2];
    for (const xj of xs) d += `<line class="se" x1="${xj}" y1="${y}" x2="${xj}" y2="${y + h}" stroke-width="1" stroke-opacity="0.4"/>`;
  }
  return d;
};
const DESSIN_MUR =
  `<g class="mur"><rect class="fi se" x="${MUR.x}" y="${MUR.haut}" width="${MUR.droite - MUR.x}" height="${-MUR.haut}" stroke-width="2"/>${joints()}</g>`;

// L'échelle : deux montants parallèles, inclinés au quart (4 de haut pour 1
// de pied), le montant droit appuyé en haut contre le mur ; trois barreaux
// horizontaux, un par niveau de la grille (junior, intermédiaire, senior).
const PENTE = 0.25, LARGEUR = 32, HAUT = -125, BARREAUX = [-19, -55, -91];
const PIED_D = MUR.x - 2 + PENTE * HAUT; // le bord du montant (trait 4) touche le mur
const PIED_G = PIED_D - LARGEUR;
const montant = (x0, y) => x0 - PENTE * y; // x d'un montant à la hauteur y
const barreau = (y) => ({ x1: montant(PIED_G, y), x2: montant(PIED_D, y), y });
const DESSIN_ECHELLE =
  '<g class="echelle">' +
  BARREAUX.map((y) => { const b = barreau(y); return `<line class="se" x1="${r2(b.x1)}" y1="${y}" x2="${r2(b.x2)}" y2="${y}" stroke-width="3" stroke-linecap="round"/>`; }).join('') +
  [PIED_G, PIED_D].map((x0) => `<line class="se" x1="${r2(x0)}" y1="-1" x2="${r2(montant(x0, HAUT))}" y2="${HAUT}" stroke-width="4" stroke-linecap="round"/>`).join('') +
  '</g>';

// ---------------------------------------------------------------------------
// Les poses nouvelles (voir l'en-tête).

const LIGNE = 'fill="none" stroke-linecap="round" stroke-linejoin="round"';
const trait = (c, points, l) => `<polyline class="${c}" points="${points}" ${LIGNE} stroke-width="${l}"/>`;
const brasArriere = (p) => trait('se', p, 7);
const brasAvant = (p) => trait('si', p, 10) + trait('se', p, 7);
const TORSE = '<path class="fe" d="M-9,-88 A9,9 0 0 1 9,-88 L9,-55 Q9,-52 6,-52 L-6,-52 Q-9,-52 -9,-55 Z"/>';
const TETE = '<circle class="fe" cx="1" cy="-110" r="10"/>{L}';
const DEBOUT_JAMBES = trait('se', '-5.25,-56 -4.5,-4 0.5,-4', 7.5) + trait('se', '5.25,-56 4.5,-4 9.5,-4', 7.5);
const tourne = ([x, y], deg, [cx, cy]) => {
  const a = (deg * Math.PI) / 180, dx = x - cx, dy = y - cy;
  return [cx + dx * Math.cos(a) - dy * Math.sin(a), cy + dx * Math.sin(a) + dy * Math.cos(a)];
};
const pt = ([x, y]) => `${r2(x)},${r2(y)}`;

const BASCULE = 8;
const HANCHES = [0, -56];
const EP_AR = tourne([0, -89], BASCULE, HANCHES), EP_AV = tourne([1, -89], BASCULE, HANCHES);
// Les vecteurs des bras de bras-tendus : arrière (0,-89 → 31,-76), avant (1,-89 → 29,-73).
const MAIN_AR = [EP_AR[0] + 31, EP_AR[1] + 13], MAIN_AV = [EP_AV[0] + 28, EP_AV[1] + 16];
const SUR_ECHELLE =
  DEBOUT_JAMBES +
  brasArriere(`${pt(EP_AR)} ${pt(MAIN_AR)}`) +
  `<g transform="rotate(${BASCULE} 0 -56)">${TORSE}${TETE}</g>` +
  brasAvant(`${pt(EP_AV)} ${pt(MAIN_AV)}`);

const LONG_BRAS = Math.hypot(28, 16); // 32,2
const montre = (x, cible) => {
  const dx = cible[0] - (x + 1), dy = cible[1] - -89, k = LONG_BRAS / Math.hypot(dx, dy);
  return (
    DEBOUT_JAMBES + brasArriere('0,-89 -2,-58') + TORSE + TETE + brasAvant(`1,-89 ${pt([1 + dx * k, -89 + dy * k])}`)
  );
};

// ---------------------------------------------------------------------------
// La scène.

const perso = (dessin, x, { jean = false, miroir = false, classe = '', y = 0 } = {}) => {
  const d = dessin.replace('{L}', jean ? LUNETTES : '');
  return `<g transform="translate(${r2(x)} ${r2(y)})"><g class="${classe}"${miroir ? ' transform="scale(-1 1)"' : ''}>${d}</g></g>`;
};
const SOL = `<line class="se" x1="0" y1="0" x2="${L}" y2="0" stroke-width="1.5"/>`;
// Le tréteau et le plan déroulé (la grille), comme la fin de la carte 01,
// aux mêmes places (tréteau en 150, plan en 100).
const TRETEAU_X = 150;
const TRETEAU = `<g transform="translate(${TRETEAU_X} 0)">${OBJETS.treteau}</g>`;
const PLAN =
  `<g transform="translate(${TRETEAU_X - 50} 0)"><g class="plan">` +
  '<polygon class="fi sa" points="0,-58 100,-58 106,-66 6,-66" stroke-width="1.5" stroke-linejoin="round"/>' +
  '<line class="sa" x1="5.5" y1="-60" x2="83.7" y2="-60" stroke-width="1" stroke-linecap="round"/>' +
  '<line class="sa" x1="7" y1="-62" x2="66.8" y2="-62" stroke-width="1" stroke-linecap="round"/>' +
  '<line class="sa" x1="8.5" y1="-64" x2="49.9" y2="-64" stroke-width="1" stroke-linecap="round"/></g></g>';
const DECOR = SOL + DESSIN_MUR + DESSIN_ECHELLE + TRETEAU + PLAN;

// Jean : penché sur le plan en 66 (la fin de la carte 01), puis redressé au
// même endroit, le bras vers le deuxième barreau, sur la partie qui dépasse
// des jambes de l'ouvrier (bras presque horizontal : 5° vers le bas).
const JEAN_X = TRETEAU_X - 84;
const B1 = barreau(BARREAUX[0]), B2 = barreau(BARREAUX[1]);
const CIBLE = [B2.x2 - 9, B2.y];
const JEAN_PENCHE = perso(POSES.penche, JEAN_X, { jean: true, classe: 'j-penche' });
const JEAN_MONTRE = perso(montre(JEAN_X, CIBLE), JEAN_X, { jean: true, classe: 'j-montre' });

// L'ouvrier. Au repos, debout au pied de l'échelle, tourné vers Jean. Puis
// tourné vers l'échelle, il lève le pied (marche-2 : le pied avant à
// hauteur de cheville, contre le montant, sous le premier barreau). À la
// fin, sur le premier barreau : le bas des semelles (y = -0,25 dans la
// pose) sur le haut du barreau (trait 3) ; la bascule de 8° garde la tête
// dans le repère (haut à -139,5) et à gauche du montant gauche.
const O_REPOS = perso(POSES.debout, PIED_G - 26, { miroir: true, classe: 'o-debout' });
const O_PIED = perso(POSES['marche-2'], PIED_G - 12, { classe: 'o-pied' });
const O_X = B1.x1 + 4;
const O_ECHELLE = perso(SUR_ECHELLE, O_X, { classe: 'o-echelle', y: B1.y - 1.5 + 0.25 });
const POINT = `<circle class="point fa" cx="${r2(B1.x2 - 7)}" cy="${B1.y}" r="5"/>`;

const CARTES = {
  repos: DECOR + JEAN_PENCHE + O_REPOS,
  intermediaire: DECOR + JEAN_MONTRE + O_PIED,
  fin: DECOR + POINT + JEAN_MONTRE + O_ECHELLE,
};
const fichier = (corps) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -140 ${L} 160" width="${L}" height="160">${STYLE}${corps}</svg>\n`;
for (const [nom, corps] of Object.entries(CARTES)) writeFileSync(join(ICI, `${nom}.svg`), fichier(corps));

// ---------------------------------------------------------------------------
// La planche : repos, intermédiaire ; fin, la pose sur l'échelle à côté de
// celles qu'elle reprend ; puis la fin et le repos aux largeurs de carte
// (480, 384, 335 px), à taille réelle.

const P8 = police(800), P4 = police(400);
const M = 20, LARG = 2 * M + 1280, LEG = 34;
const CASE = (1280 - M) / 2, K = CASE / L, H_CASE = 160 * K;
const legende = (n, t, x, y) => P8.chemin(`${n}`, x, y, 15, 0, 'fs') + P4.chemin(t, x + 16, y, 15, 0, 'fs');
const cadre = (x, y, l, h) => `<rect x="${x}" y="${y}" width="${l}" height="${h}" fill="${C.ivoire}" stroke="${C.dalle}" stroke-width="2"/>`;
const carte = (nom, x, y, k) => `<g transform="translate(${x} ${y + 140 * k}) scale(${k})">${CARTES[nom]}</g>`;

// Case 4 : les poses, agrandies, sur leur ligne de pied (debout, bras-tendus,
// sur-echelle ; la bascule en tirets ardoise).
const tiret = `stroke="${C.ardoise}" stroke-width="1" stroke-dasharray="3 3" fill="none"`;
const POSES_CASE =
  `<line class="se" x1="10" y1="0" x2="${L - 10}" y2="0" stroke-width="1.5"/>` +
  perso(POSES.debout, 60) + perso(POSES['bras-tendus'], 160) +
  perso(SUR_ECHELLE, 280) +
  `<line x1="280" y1="-56" x2="280" y2="-128" ${tiret}/>` +
  `<line x1="280" y1="-56" x2="${r2(280 + 72 * Math.sin((BASCULE * Math.PI) / 180))}" y2="${r2(-56 - 72 * Math.cos((BASCULE * Math.PI) / 180))}" ${tiret}/>` +
  perso(montre(380, [800, -80]), 380, { jean: true });
const NOMS = [['debout', 50], ['bras-tendus', 140], ['sur-echelle', 258], ['montre', 368]];

let y = M, corps = '';
const LEGENDES = [
  ['repos', 'Repos : Jean penché sur le plan ouvert (la grille), l’ouvrier au pied de l’échelle.'],
  ['intermediaire', 'Intermédiaire : Jean montre l’échelle, l’ouvrier se tourne et lève le pied.'],
  ['fin', 'Fin : l’ouvrier sur le premier barreau, point ambre ; Jean montre le suivant.'],
];
LEGENDES.forEach(([nom, t], i) => {
  const x = M + (i % 2) * (CASE + M), yc = y + Math.floor(i / 2) * (H_CASE + LEG + 12);
  corps += cadre(x, yc, CASE, H_CASE) + carte(nom, x, yc, K) + legende(i + 1, t, x, yc + H_CASE + 22);
});
{
  const x = M + CASE + M, yc = y + H_CASE + LEG + 12;
  corps += cadre(x, yc, CASE, H_CASE) + `<g transform="translate(${x} ${yc + 140 * K}) scale(${K})">${POSES_CASE}</g>`;
  for (const [n, xn] of NOMS) corps += P4.chemin(n, x + xn * K, yc + H_CASE - 10, 13, 0, 'fs');
  corps += legende(4, 'Les poses : deux reprises, deux variantes (sur-echelle, montre).', x, yc + H_CASE + 22);
}
y += 2 * (H_CASE + LEG + 12);
let n = 5;
for (const nom of ['fin', 'repos']) {
  let x = M;
  const hMax = (160 / L) * 480;
  for (const w of [480, 384, 335]) {
    const k = w / L, h = 160 * k;
    corps += cadre(x, y, w, h) + carte(nom, x, y, k);
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

// Les mesures, pour le rapport.
const hautTete = B1.y - 1.25 + tourne([1, -120], BASCULE, HANCHES)[1];
console.log(
  `échelle : pieds ${r2(PIED_G)} et ${r2(PIED_D)}, haut ${HAUT}, barreaux ${BARREAUX.join(', ')} ; ` +
    `ouvrier sur l'échelle en ${r2(O_X)}, haut de tête ${r2(hautTete)} (repère jusqu'à -140) ; ` +
    `mains ${pt(MAIN_AR)} et ${pt(MAIN_AV)} (relatives), barreau 3 de ${r2(barreau(-92).x1)} à ${r2(barreau(-92).x2)} ; ` +
    `cible de Jean ${pt(CIBLE)}.`,
);
console.log(`planche.png ${LARG} × ${H}, repos.svg, intermediaire.svg, fin.svg dans ${ICI}`);

// Les images clés des scènes de l'accueil (registre/0057, étape 2) : images
// fixes, pas encore d'animation.
//  1. l'en-tête à 1280 px : l'impatience (A, B et le porteur, au repos,
//     fin de l'impatience) sous le soleil, à droite de la phrase signature ;
//  2. carte 01 UserVoice, repos : Jean seul, le plan roulé sous le bras ;
//  3. carte 01, fin : Jean a déroulé le plan sur le tréteau, penché dessus ;
//  4. carte 02 Audit contenu, repos : Jean sur le plan ouvert ; à droite,
//     à distance, l'équipe de l'en-tête dans ses poses de repos ;
//  5. carte 02, fin : les trois ont posé leurs outils et l'ont rejoint.
// Produit entete.svg, 01-repos.svg, 01-fin.svg, 02-repos.svg, 02-fin.svg
// (repère de Scene.astro, mêmes classes, réutilisables pour l'animation) et
// planche.png. Relançable : node ops/images/accueil/planche.mjs. Sans paquet
// ajouté : sharp ; le texte est dessiné en chemins depuis la police du site
// (police.mjs).

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { POSES, LUNETTES, OBJETS } from '../../../src/components/scene/poses.ts';
import { police, couper } from './police.mjs';

const ICI = fileURLToPath(new URL('./', import.meta.url));
const C = {
  ivoire: '#FEFAF2', encre: '#2A1F1A', ambre: '#F2A33A', orange: '#B54E19', ardoise: '#5E7488', dalle: '#D9D4CC',
  anneau1: '#DE872F', anneau2: '#C96A24', // les color-mix de Soleil.astro (apercu.mjs)
};
const STYLE =
  `<style>.fe{fill:${C.encre}}.se{stroke:${C.encre}}.fi{fill:${C.ivoire}}.si{stroke:${C.ivoire}}` +
  `.sa{stroke:${C.ardoise}}.so{stroke:${C.orange}}.fa{fill:${C.ambre}}.fd{fill:${C.dalle}}.fs{fill:${C.ardoise}}</style>`;

// ---------------------------------------------------------------------------
// Les pièces de Scene.astro, figées.

const L = 426.667;
const perso = (pose, x, { jean = false, miroir = false, classe = '' } = {}) => {
  let d = POSES[pose].replace('{L}', jean ? LUNETTES : '');
  // Le marteau de B au repos : tête en haut, 1,2 fois plus grand (la règle
  // CSS de Scene.astro, posée ici en attribut).
  d = d.replace('<g class="marteau-tour">', '<g class="marteau-tour" transform="rotate(-115) scale(1.2)">');
  const g = `<g class="${classe}"${miroir ? ' transform="scale(-1 1)"' : ''}>${d}</g>`;
  return `<g transform="translate(${x} 0)">${g}</g>`;
};
const SOL = (x1 = 0, x2 = L) => `<line class="se" x1="${x1}" y1="0" x2="${x2}" y2="0" stroke-width="1.5"/>`;
const DALLE = '<rect class="fd" x="245" y="0" width="175" height="12"/>';
const TRETEAU = `<g transform="translate(150 0)">${OBJETS.treteau}</g>`;
// Le plan déroulé sur le tréteau (Scene.astro, .plan à scaleX(1)).
const PLAN =
  '<g transform="translate(100 0)"><g class="plan">' +
  '<polygon class="fi sa" points="0,-58 100,-58 106,-66 6,-66" stroke-width="1.5" stroke-linejoin="round"/>' +
  '<line class="sa" x1="5.5" y1="-60" x2="83.7" y2="-60" stroke-width="1" stroke-linecap="round"/>' +
  '<line class="sa" x1="7" y1="-62" x2="66.8" y2="-62" stroke-width="1" stroke-linecap="round"/>' +
  '<line class="sa" x1="8.5" y1="-64" x2="49.9" y2="-64" stroke-width="1" stroke-linecap="round"/></g></g>';
const POINT = '<circle class="point fa" cx="188" cy="-62" r="5"/>';
// Les outils à terre. La poutre à plat sur la dalle, centre en 354 (fin de
// « on regarde le plan », Scene.astro). Le marteau de B (OBJETS.marteau, à
// 1,2 comme en main) couché sur la poutre : incliné de 11,3° pour que le
// bout du manche et le bas de la tête y reposent ensemble.
const POUTRE_A_TERRE = `<g class="poutre-pose" transform="translate(354 0)">${OBJETS.poutre}</g>`;
const MARTEAU_POSE = (x, y) => `<g class="marteau-pose" transform="translate(${x} ${y - 3.06}) rotate(-11.3) scale(1.2)">${OBJETS.marteau}</g>`;

// Jean aux places de Scene.astro : en 55 plan sous le bras, en 66 penché
// sur le plan.
const JEAN_SOUS = perso('plan-sous-bras', 55, { jean: true, classe: 'j-sous' });
const JEAN_PENCHE = perso('penche', 66, { jean: true, classe: 'j-penche' });

// L'équipe de l'en-tête (A, B, le porteur), sans lunettes. Au repos de la
// carte 02 : les poses de repos de l'en-tête, même ordre et mêmes sens,
// resserrées (le porteur à 86 de B au lieu de 105 : 11 entre la tête du
// marteau et le bout de la poutre) et calées au bout de la dalle (poutre de
// 320 à 420) : 33 d'écart entre le tréteau et A.
const EQUIPE_REPOS =
  perso('debout', 246, { classe: 'a-debout' }) +
  perso('marteau-2', 276, { classe: 'b-marteau' }) +
  perso('poutre-epaule', 362, { miroir: true, classe: 'c-poutre' });
// À la fin : les places finales de « on regarde le plan » (Scene.astro).
// A penché derrière le tréteau (en 128, dessiné avant lui), B penché en
// face de Jean (236) ; le porteur, debout derrière B (266), regarde par-dessus
// son épaule : penché en 288 comme dans Scene.astro, ses mains tombaient dans
// le vide, illisible à la taille d'une carte.
const A_DERRIERE = perso('penche', 128, { classe: 'a-penche' });
const EQUIPE_FIN =
  perso('penche', 236, { miroir: true, classe: 'b-penche' }) +
  perso('debout', 266, { miroir: true, classe: 'c-debout' });

const DECOR = SOL() + DALLE + TRETEAU;
const CARTES = {
  '01-repos': DECOR + JEAN_SOUS,
  '01-fin': DECOR + PLAN + POINT + JEAN_PENCHE,
  '02-repos': DECOR + PLAN + JEAN_PENCHE + EQUIPE_REPOS,
  '02-fin':
    SOL() + DALLE + POUTRE_A_TERRE + MARTEAU_POSE(340, -8) + A_DERRIERE + TRETEAU + PLAN + POINT + JEAN_PENCHE + EQUIPE_FIN,
};

// L'en-tête : A, B et le porteur à leur place de Scene.astro, au repos (fin
// de l'impatience), avec leur bout de sol et la dalle. La boîte garde la
// hauteur du repère (-140 à 20) et part de 205 : elle contient aussi les
// écarts de l'animation (saut de A jusqu'à -134, poutre lancée jusqu'à
// -132, tour du marteau entre 234 et 316).
const ENTETE_X = 205;
const ENTETE_L = L - ENTETE_X;
const ENTETE =
  SOL(ENTETE_X, L) + DALLE +
  perso('debout', 220, { classe: 'a-debout' }) +
  perso('marteau-2', 250, { classe: 'b-marteau' }) +
  perso('poutre-epaule', 355, { miroir: true, classe: 'c-poutre' });
const ENVELOPPE = { x1: 211, x2: 420, y1: -134, y2: 12 };

const fichier = (vue, l, corps) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vue}" width="${l}" height="160">${STYLE}${corps}</svg>\n`;
writeFileSync(join(ICI, 'entete.svg'), fichier(`${ENTETE_X} -140 ${ENTETE_L} 160`, ENTETE_L, ENTETE));
for (const [nom, corps] of Object.entries(CARTES)) writeFileSync(join(ICI, `${nom}.svg`), fichier(`0 -140 ${L} 160`, L, corps));

// ---------------------------------------------------------------------------
// La maquette de l'accroche (base.css, index.astro, Soleil.astro), à la
// largeur d'écran `vw`, en px CSS ; y = 0 en haut de la section .accroche.

const P8 = police(800), P4 = police(400);
const H1 = 'J’écoute, je pose des hypothèses, je teste, puis je construis là où ça compte.';
const SOUS = 'Deux projets sur une plateforme EdTech : écouter des milliers d’apprenants, puis corriger ce qui les gêne.';
const REM = 16;
const clamp = (a, v, b) => Math.min(Math.max(a, v), b);

// L'échelle des ouvriers : 1 à 960 px (personnage de 120 px), 1,25 à
// 1280 px (150 px), linéaire entre les deux.
const echelle = (vw) => clamp(1, 1 + ((vw - 960) / 320) * 0.25, 1.25);

function maquette(vw) {
  const vwp = vw / 100;
  const cont = Math.min(vw, 72 * REM), gout = 1.25 * REM;
  const g = (vw - cont) / 2 + gout, d = (vw + cont) / 2 - gout;
  const haut = clamp(3 * REM, 8 * vwp, 6 * REM), bas = clamp(2.5 * REM, 6 * vwp, 4.5 * REM);
  const soleil = clamp(6.5 * REM, 4 * REM + 10 * vwp, 12 * REM);
  const rSoleil = (173 / 200) * soleil;
  const t1 = clamp(2.125 * REM, 1.5 * REM + 3.6 * vwp, 4.25 * REM), lh1 = 1.08 * t1;
  const lignes1 = couper(H1, 20 * P8.largeur('0', t1), (s) => P8.largeur(s, t1, -0.01), true);
  const t2 = clamp(1.125 * REM, REM + 0.5 * vwp, 1.3125 * REM), lh2 = 1.5 * t2;
  const lignes2 = couper(SOUS, Math.min(38 * REM, d - g), (s) => P4.largeur(s, t2));
  const base = (haut0, lh, t) => haut0 + (lh - 1.3 * t) / 2 + 0.984 * t; // ligne de base
  const yH1 = haut, yS = haut + lignes1.length * lh1 + clamp(REM, 2.5 * vwp, 1.5 * REM);
  const hauteur = yS + lignes2.length * lh2 + bas;
  const droiteH1 = g + Math.max(...lignes1.map((l) => P8.largeur(l, t1, -0.01)));
  // Les ouvriers : sol sur la ligne de base de la dernière ligne de la
  // phrase, boîte calée au bord droit du conteneur.
  const s = echelle(vw);
  const sol = base(yH1 + (lignes1.length - 1) * lh1, lh1, t1);
  const boite = { x: d - ENTETE_L * s, y: sol - 140 * s, l: ENTETE_L * s, h: 160 * s };
  const env = { x: boite.x + (ENVELOPPE.x1 - ENTETE_X) * s, y: sol + ENVELOPPE.y1 * s, l: (ENVELOPPE.x2 - ENVELOPPE.x1) * s, h: (ENVELOPPE.y2 - ENVELOPPE.y1) * s };
  // Le bas du soleil au-dessus de la boîte : au plus bas sur sa largeur.
  const xs = [boite.x, Math.min(d, vw)].map((x) => Math.min(Math.max(x, vw - rSoleil), vw));
  const basSoleil = Math.max(...xs.map((x) => Math.sqrt(Math.max(0, rSoleil ** 2 - (vw - x) ** 2))));
  return { vw, g, d, soleil, rSoleil, t1, lh1, t2, lh2, lignes1, lignes2, yH1, yS, hauteur, droiteH1, s, sol, boite, env, basSoleil, base };
}

const M1280 = maquette(1280), M960 = maquette(960);

function dessinMaquette(m) {
  const { vw, soleil, t1, lh1, t2, lh2, lignes1, lignes2, yH1, yS, hauteur, g, s, sol, boite, droiteH1, basSoleil, base } = m;
  const k = soleil / 200;
  const astre =
    `<g transform="translate(${vw - soleil} 0) scale(${k})">` +
    `<circle cx="200" cy="0" r="169" fill="none" stroke="${C.orange}" stroke-width="8"/>` +
    `<circle cx="200" cy="0" r="150" fill="none" stroke="${C.anneau2}" stroke-width="11"/>` +
    `<circle cx="200" cy="0" r="129" fill="none" stroke="${C.anneau1}" stroke-width="14"/>` +
    `<circle cx="200" cy="0" r="110" fill="${C.ambre}"/></g>`;
  const texte =
    lignes1.map((l, i) => P8.chemin(l, g, base(yH1 + i * lh1, lh1, t1).toFixed(2), t1, -0.01)).join('') +
    lignes2.map((l, i) => P4.chemin(l, g, base(yS + i * lh2, lh2, t2).toFixed(2), t2)).join('');
  const scene = `<g transform="translate(${boite.x - ENTETE_X * s} ${sol}) scale(${s})">${ENTETE}</g>`;
  // Les cotes, en ardoise : la boîte des ouvriers en tirets, l'écart à la
  // phrase, l'écart au soleil.
  const tiret = `fill="none" stroke="${C.ardoise}" stroke-width="1" stroke-dasharray="4 4"`;
  const cote = `stroke="${C.ardoise}" stroke-width="1"`;
  const yc = boite.y + 24, xc = boite.x + boite.l / 2;
  const petit = (t, x, y) => P4.chemin(t, x, y, 13, 0, 'fs');
  const cotes =
    `<rect x="${boite.x}" y="${boite.y}" width="${boite.l}" height="${boite.h}" ${tiret}/>` +
    `<line x1="${droiteH1}" y1="${yc}" x2="${boite.x}" y2="${yc}" ${cote}/>` +
    `<line x1="${droiteH1}" y1="${yc - 5}" x2="${droiteH1}" y2="${yc + 5}" ${cote}/><line x1="${boite.x}" y1="${yc - 5}" x2="${boite.x}" y2="${yc + 5}" ${cote}/>` +
    petit(`${Math.round(boite.x - droiteH1)} px`, (droiteH1 + boite.x) / 2 - 18, yc - 6) +
    `<line x1="${xc}" y1="${basSoleil}" x2="${xc}" y2="${boite.y}" ${cote} stroke-dasharray="2 3"/>` +
    petit(`${Math.round(boite.y - basSoleil)} px`, xc + 6, (basSoleil + boite.y) / 2 + 4) +
    petit(`${Math.round(boite.l)} × ${Math.round(boite.h)} px`, boite.x, boite.y + boite.h + 16);
  return {
    corps:
      `<clipPath id="section-${vw}"><rect width="${vw}" height="${hauteur}"/></clipPath>` +
      `<rect width="${vw}" height="${hauteur}" fill="${C.ivoire}"/>` +
      `<g clip-path="url(#section-${vw})">${astre}</g>` + texte + scene + cotes +
      `<rect width="${vw}" height="${hauteur}" fill="none" stroke="${C.dalle}" stroke-width="2"/>`,
    hauteur,
  };
}

// ---------------------------------------------------------------------------
// La planche : la maquette à taille réelle, puis les cartes deux par deux
// (01 repos, 01 fin ; 02 repos, 02 fin).

const M = 20, LARGEUR = 2 * M + 1280, LEG = 34;
const CASE = (1280 - M) / 2, K = CASE / L, H_CASE = 160 * K;
const legende = (n, t, x, y) => P8.chemin(`${n}`, x, y, 15, 0, 'fs') + P4.chemin(t, x + 16, y, 15, 0, 'fs');

const entete = dessinMaquette(M1280);
let y = M;
let corps = `<g transform="translate(${M} ${y})">${entete.corps}</g>`;
y += entete.hauteur + 22;
corps += legende(1, 'En-tête à 1280 px : les ouvriers au repos, sous le soleil, posés sur la ligne de base de la phrase (boîte en tirets).', M, y);
y += LEG - 12;
const LEGENDES = [
  ['01-repos', '01 UserVoice, repos : Jean seul, le plan roulé sous le bras.'],
  ['01-fin', '01 UserVoice, fin : Jean a déroulé le plan et le regarde.'],
  ['02-repos', '02 Audit contenu, repos : Jean sur le plan ouvert, l’équipe de l’en-tête à distance.'],
  ['02-fin', '02 Audit contenu, fin : les trois l’ont rejoint, outils à terre ; ils regardent le plan.'],
];
LEGENDES.forEach(([nom, t], i) => {
  const x = M + (i % 2) * (CASE + M);
  const yc = y + Math.floor(i / 2) * (H_CASE + LEG + 12);
  corps +=
    `<rect x="${x}" y="${yc}" width="${CASE}" height="${H_CASE}" fill="${C.ivoire}" stroke="${C.dalle}" stroke-width="2"/>` +
    `<g transform="translate(${x} ${yc + 140 * K}) scale(${K})">${CARTES[nom]}</g>` +
    legende(i + 2, t, x, yc + H_CASE + 22);
});
const H = Math.round(y + 2 * (H_CASE + LEG + 12) + 4);
const planche =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${LARGEUR}" height="${H}">${STYLE}` +
  `<rect width="${LARGEUR}" height="${H}" fill="${C.ivoire}"/>${corps}</svg>`;
await sharp(Buffer.from(planche)).png({ compressionLevel: 9 }).toFile(join(ICI, 'planche.png'));

// Contrôle à une autre largeur, hors planche :
// node planche.mjs 960 chemin/maquette-960.png
if (process.argv[3]) {
  const m = dessinMaquette(maquette(Number(process.argv[2])));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${process.argv[2]}" height="${Math.ceil(m.hauteur)}">${STYLE}${m.corps}</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(process.argv[3]);
}

// Les mesures, pour le rapport : à 1280 et à 960 px.
for (const m of [M1280, M960]) {
  const r = (v) => Math.round(v);
  console.log(
    `${m.vw} px : échelle ${m.s}, boîte ${r(m.boite.l)} × ${r(m.boite.h)} px de x ${r(m.boite.x)} à ${r(m.boite.x + m.boite.l)}, ` +
      `y ${r(m.boite.y)} à ${r(m.boite.y + m.boite.h)} (sol en ${r(m.sol)}) ; enveloppe animée ${r(m.env.l)} × ${r(m.env.h)} ; ` +
      `phrase jusqu'à x ${r(m.droiteH1)} (écart ${r(m.boite.x - m.droiteH1)}), soleil jusqu'à y ${r(m.basSoleil)} (écart ${r(m.boite.y - m.basSoleil)}), ` +
      `section ${r(m.hauteur)} px de haut, ${m.lignes1.length} lignes de titre.`,
  );
}
console.log(`planche.png ${LARGEUR} × ${H}, entete.svg et quatre cartes dans ${ICI}`);

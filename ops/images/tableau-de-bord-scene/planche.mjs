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
// Sans paquet ajouté : sharp ; le texte en chemins (../accueil/police.mjs).
//
// Aucune pose nouvelle : montre (Jean, deux cibles) et debout (les clients,
// en miroir). Board et post-it : OBJETS de poses.ts. Le grand post-it ambre
// est un objet de planche (un aplat ambre, le trait du post-it).

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { POSES, LUNETTES, OBJETS, montre } from '../../../src/components/scene/poses.ts';
import { police } from '../accueil/police.mjs';

const ICI = fileURLToPath(new URL('./', import.meta.url));
const C = { ivoire: '#FEFAF2', encre: '#2A1F1A', ambre: '#F2A33A', orange: '#B54E19', ardoise: '#5E7488', dalle: '#D9D4CC' };
const STYLE =
  `<style>.fe{fill:${C.encre}}.se{stroke:${C.encre}}.fi{fill:${C.ivoire}}.si{stroke:${C.ivoire}}` +
  `.sa{stroke:${C.ardoise}}.so{stroke:${C.orange}}.fa{fill:${C.ambre}}.fd{fill:${C.dalle}}.fs{fill:${C.ardoise}}</style>`;
const L = 426.667;
const r2 = (v) => Math.round(v * 10) / 10;
const LONG_BRAS = Math.hypot(28, 16); // 32,2, le bras de montre

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
const SOL = `<line class="se" x1="0" y1="0" x2="${L}" y2="0" stroke-width="1.5"/>`;

// ---------------------------------------------------------------------------
// Les personnages.

const perso = (dessin, x, { jean = false, miroir = false, classe = '' } = {}) => {
  const d = dessin.replace('{L}', jean ? LUNETTES : '');
  return `<g transform="translate(${r2(x)} 0)"><g class="${classe}"${miroir ? ' transform="scale(-1 1)"' : ''}>${d}</g></g>`;
};
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
  repos: SOL + BOARD + POSTITS.map((p) => postit(p)).join('') + JEAN.repos + CLIENTS,
  chemin: SOL + BOARD + POSTITS.map((p) => postit(p, AVANCE)).join('') + JEAN.chemin + CLIENTS,
  fin: SOL + BOARD + GRAND_POSTIT + JEAN.fin + CLIENTS,
};
const fichier = (corps) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -140 ${L} 160" width="${L}" height="160">${STYLE}${corps}</svg>\n`;
for (const nom of ['repos', 'chemin', 'fin']) writeFileSync(join(ICI, `${nom}.svg`), fichier(CARTES[nom]));

// ---------------------------------------------------------------------------
// La planche : repos et fin ; en chemin et les poses ; le découpage ; puis la
// fin et le repos aux largeurs de carte (480, 384, 335 px), taille réelle.

const P8 = police(800), P4 = police(400);
const M = 20, LARG = 2 * M + 1280, LEG = 34;
const CASE = (1280 - M) / 2, K = CASE / L, H_CASE = 160 * K;
const legende = (n, t, x, y) => P8.chemin(`${n}`, x, y, 15, 0, 'fs') + P4.chemin(t, x + 16, y, 15, 0, 'fs');
const petit = (t, x, y, taille = 13, p = P4) => p.chemin(t, x, y, taille, 0, 'fs');
const cadre = (x, y, l, h) => `<rect x="${x}" y="${y}" width="${l}" height="${h}" fill="${C.ivoire}" stroke="${C.dalle}" stroke-width="2"/>`;
const scene = (corps, x, y, k) => `<g transform="translate(${x} ${y + 140 * k}) scale(${k})">${corps}</g>`;
const deg = (v) => `${v}°`.replace('.', ',');

const POSES_CASE =
  `<line class="se" x1="6" y1="0" x2="${L - 6}" y2="0" stroke-width="1.5"/>` +
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
function decoupage(x, y) {
  const total = TEMPS.reduce((s, t) => s + t[2], 0);
  let d = petit(`Découpage : ${total} ms, trois temps ; les clients ne bougent pas`, x + 16, y + 30, 14, P8);
  const x0 = x + 16, lp = CASE - 32 - 64;
  let t = 0;
  TEMPS.forEach(([, , ms], i) => {
    const xa = x0 + (t / total) * lp, l = (ms / total) * lp;
    d += `<rect x="${r2(xa)}" y="${y + 48}" width="${r2(l - 3)}" height="16" rx="2" fill="${i === 1 ? C.ambre : i % 2 ? C.dalle : '#ECE7DE'}" stroke="${C.ardoise}" stroke-width="1"/>`;
    d += petit(`${ms}`, xa + 4, y + 60, 11);
    t += ms;
  });
  d += petit(`${total} ms`, x0 + lp + 6, y + 60, 11);
  let yl = y + 96;
  for (const [n, txt, ms] of TEMPS) { d += petit(n, x0, yl, 13, P8) + petit(`${txt} : ${ms} ms`, x0 + 70, yl, 13); yl += 20; }
  d += petit('Glissement en ease-in-out (translate + rotate de chaque post-it) ; les petits s’effacent', x0, yl + 6, 12);
  d += petit('pendant que l’ambre apparaît (scale de 0,5 à 1) ; le bras de Jean bascule en step-end.', x0, yl + 22, 12);
  return d;
}

let y = M, corps = '';
const CASES = [
  ['repos', 'Repos : le board plein de besoins ; Jean anime, deux clients regardent.'],
  ['fin', 'Fin : il en sort une donnée, un seul post-it ambre ; Jean le montre.'],
  ['chemin', 'En chemin : les post-it convergent vers le centre (60 % du trajet).'],
];
CASES.forEach(([nom, t], i) => {
  const x = M + (i % 2) * (CASE + M), yc = y + Math.floor(i / 2) * (H_CASE + LEG + 12);
  corps += cadre(x, yc, CASE, H_CASE) + scene(CARTES[nom], x, yc, K) + legende(i + 1, t, x, yc + H_CASE + 22);
});
{
  const x = M + CASE + M, yc = y + H_CASE + LEG + 12;
  corps += cadre(x, yc, CASE, H_CASE) + scene(POSES_CASE, x, yc, K);
  for (const [nm, xn] of NOMS) corps += petit(nm, x + xn * K, yc + H_CASE - 10);
  corps += legende(4, 'Les poses : aucune nouvelle ; aucun bras au-dessus de l’épaule.', x, yc + H_CASE + 22);
}
y += 2 * (H_CASE + LEG + 12);
corps += cadre(M, y, CASE, H_CASE) + decoupage(M, y);
corps += legende(5, 'La durée : 600 ms, trois temps.', M, y + H_CASE + 22);
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
console.log(`board : ${BX} à ${BX + BW} ; Jean ${J_X} ; clients ${C1} et ${C2} (miroir).`);
for (const [k, c] of Object.entries(CIBLES)) console.log(`Jean ${k} : ${angle(c)}° sous l'horizontale, main en ${main(c).join(', ')}.`);
for (const [x, yy] of POSTITS) if (!((x >= 2 && x + PI <= 37) || (x >= 41 && x + PI <= 76) || (x >= 80 && x + PI <= 115) || (x >= 119 && x + PI <= 154)) || yy < -128 || yy + PI > -48) console.log(`post-it hors colonne : ${x}, ${yy}`);
console.log(`grand post-it : x ${r2(BX + MILIEU[0] - GRAND / 2)} à ${r2(BX + MILIEU[0] + GRAND / 2)}, y ${MILIEU[1] - GRAND / 2} à ${MILIEU[1] + GRAND / 2}.`);
console.log(`planche.png ${LARG} × ${H}.`);

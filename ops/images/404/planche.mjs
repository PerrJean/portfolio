// Les quatre images clés de la page 404, « Le chantier a déménagé »
// (registre/0055, étape 2) : images fixes, pas encore d'animation.
//  1. le panneau de chantier seul, la flèche vers la gauche ;
//  2. Jean arrive de la gauche, marteau en main (marche-1) ;
//  3. il tape le panneau (frappe-2, l'arc du coup depuis frappe-1) ;
//  4. le panneau a pivoté, la flèche montre la droite ; Jean, un pas en
//     arrière, bras tendus vers la droite, marteau tête en haut
//     (bras-tendus, le marteau ajouté dans la main avant).
// Produit 1.svg à 4.svg (réutilisables pour l'animation, mêmes classes que
// Scene.astro) et planche.png, les quatre côte à côte, numérotées.
// Relançable : node ops/images/404/planche.mjs. Sans paquet ajouté : sharp,
// et la police @fontsource convertie de WOFF en TTF dans un dossier
// temporaire, effacé à la fin (même méthode qu'ops/images/apercu.mjs).

import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateSync } from 'node:zlib';
import sharp from 'sharp';
import { POSES, LUNETTES } from '../../../src/components/scene/poses.ts';

const ICI = fileURLToPath(new URL('./', import.meta.url));
const RACINE = fileURLToPath(new URL('../../../', import.meta.url));
const POLICE = join(RACINE, 'node_modules/@fontsource/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-400-normal.woff');

const C = { ivoire: '#FEFAF2', encre: '#2A1F1A', ambre: '#F2A33A', orange: '#B54E19', ardoise: '#5E7488' };

// La scène : même repère que Scene.astro (sol à y = 0, personnage de
// 120 de haut), 400 de large.
const L = 400;
const VUE = `0 -140 ${L} 160`;
const STYLE =
  `<style>.fe{fill:${C.encre}}.se{stroke:${C.encre}}.fi{fill:${C.ivoire}}.si{stroke:${C.ivoire}}` +
  `.sa{stroke:${C.ardoise}}.so{stroke:${C.orange}}.fa{fill:${C.ambre}}</style>`;

// ---------------------------------------------------------------------------
// Le panneau de chantier. Origine au sol, au milieu. Angles droits : cadre
// et flèche en jointure droite, bouts carrés. `sens` = 1 vers la droite,
// -1 vers la gauche : la flèche seule se retourne, le cadre pivote sur son
// axe (les pieds ne bougent pas).
const CADRE = { g: -32, d: 32, h: -104, b: -66 };
const panneau = (sens) => {
  const { g, d, h, b } = CADRE;
  const pieds =
    [-20, 20].map((x) => `<line class="se" x1="${x}" y1="${b}" x2="${x}" y2="0" stroke-width="4" stroke-linecap="butt"/>` +
      `<line class="se" x1="${x - 7}" y1="-1.5" x2="${x + 7}" y2="-1.5" stroke-width="3" stroke-linecap="butt"/>`).join('');
  const cadre = `<rect class="fi se" x="${g}" y="${h}" width="${d - g}" height="${b - h}" stroke-width="3" stroke-linejoin="miter"/>`;
  const liseré = `<rect class="se" x="${g + 5}" y="${h + 5}" width="${d - g - 10}" height="${b - h - 10}" fill="none" stroke-width="1.2" stroke-linejoin="miter"/>`;
  const y = (h + b) / 2;
  const fleche =
    `<g transform="scale(${sens} 1)">` +
    `<line class="se" x1="-15" y1="${y}" x2="13" y2="${y}" stroke-width="5" stroke-linecap="square"/>` +
    `<polyline class="se" points="4,${y - 9} 14,${y} 4,${y + 9}" fill="none" stroke-width="5" stroke-linecap="square" stroke-linejoin="miter"/>` +
    '</g>';
  return `<g class="panneau">${pieds}${cadre}${liseré}${fleche}</g>`;
};

// ---------------------------------------------------------------------------
// Jean : une pose de la bibliothèque, avec ses lunettes.
const jean = (pose, x, extra = (d) => d) =>
  `<g transform="translate(${x} 0)"><g class="jean">${extra(POSES[pose].replace('{L}', LUNETTES))}</g></g>`;

// Le marteau de MARTEAU (poses.ts), tenu à la main (x, y), tourné de
// `angle` : manche vers le bas, tête en haut quand l'angle est vers -90.
const marteauEnMain = (x, y, angle) =>
  `<g transform="translate(${x} ${y}) rotate(${angle})"><line class="se" x1="-3" y1="0" x2="26" y2="0" stroke-width="4" stroke-linecap="round"/><rect class="fe" x="22" y="-8" width="8" height="15" rx="1.5"/></g>`;

// Les poses de marche et bras-tendus ne tiennent rien : on glisse le
// marteau sous le bras avant (le dernier lisere + trait de la pose), la
// poignée dans sa main, comme MARTEAU le fait.
const enMain = (dessin, x, y, angle) => {
  const i = dessin.lastIndexOf('<polyline class="si"');
  return dessin.slice(0, i) + marteauEnMain(x, y, angle) + dessin.slice(i);
};
// Dans la marche : la main avant est en arrière du pas (-14, -64) ; tête en
// haut, penché en arrière pour ne pas toucher le buste.
const avecMarteau = (dessin) => enMain(dessin, -14, -64, -115);

// Position de Jean au coup : la tête du marteau, à frappe-2, finit en
// x + 46,3 (coin avant bas, à y = -82,7) ; elle touche le bord du cadre.
const PANNEAU_X = 250;
const JEAN_X = PANNEAU_X + CADRE.g - 1.5 - 46.3;

// L'arc du coup, comme l'arc de B dans Scene.astro (encre à 30 %) : la tête
// du marteau tourne autour de l'épaule (1, -89), à 39,4 ; de frappe-1
// (-67,3°) à frappe-2 (2,7°). Tracé un peu en dehors (rayon 44) et arrêté
// avant le cadre, pour ne couvrir ni la tête du marteau ni le panneau.
const arcCoup = () => {
  const r = 44, cx = JEAN_X + 1, cy = -89;
  const pt = (deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)].map((v) => v.toFixed(1));
  const [a, b] = [pt(-80), pt(-28)];
  return `<path class="se" d="M${a[0]},${a[1]} A${r},${r} 0 0 1 ${b[0]},${b[1]}" fill="none" stroke-width="1.5" stroke-opacity="0.3" stroke-linecap="round"/>`;
};

// Le pivot, en ardoise (information secondaire) : un demi-tour au trait
// au-dessus du cadre, de gauche à droite par l'avant, pointe vers le haut.
const pivot = () => {
  const y = CADRE.h - 9, rx = 22, xd = PANNEAU_X + rx;
  return `<path class="sa" d="M${PANNEAU_X - rx},${y} A${rx},5 0 0 0 ${xd},${y} L${xd},${y - 3}" fill="none" stroke-width="1.5" stroke-linecap="round"/>` +
    `<polyline class="sa" points="${xd - 3.5},${y} ${xd},${y - 4} ${xd + 3.5},${y}" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`;
};

const SOL = `<line class="se" x1="0" y1="0" x2="${L}" y2="0" stroke-width="1.5"/>`;
const placePanneau = (sens) => `<g transform="translate(${PANNEAU_X} 0)">${panneau(sens)}</g>`;

const IMAGES = [
  // 1. Le panneau seul, flèche vers la gauche.
  SOL + placePanneau(-1),
  // 2. Jean entre par la gauche.
  SOL + placePanneau(-1) + jean('marche-1', 60, avecMarteau),
  // 3. Le coup : frappe-2, l'arc depuis frappe-1, un point de lumière.
  SOL + placePanneau(-1) + arcCoup() + jean('frappe-2', JEAN_X) +
    `<circle class="fa" cx="${PANNEAU_X + CADRE.g - 0.5}" cy="-84" r="3.5"/>`,
  // 4. Le panneau a pivoté : la flèche montre la droite. Jean a reculé d'un
  //    pas, bras tendus vers la droite, le marteau debout dans la main.
  SOL + placePanneau(1) + pivot() + jean('bras-tendus', JEAN_X - 20, (d) => enMain(d, 29, -73, -90)),
];

const svg = (corps) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VUE}" width="${L}" height="160">${STYLE}` +
  `<rect x="0" y="-140" width="${L}" height="160" fill="${C.ivoire}"/>${corps}</svg>`;

IMAGES.forEach((corps, i) => writeFileSync(join(ICI, `${i + 1}.svg`), svg(corps) + '\n'));

// ---------------------------------------------------------------------------
// La police : WOFF 1 → TTF (copie de woffEnTtf d'ops/images/apercu.mjs).
function woffEnTtf(woff) {
  const n = woff.readUInt16BE(12);
  const tables = [];
  for (let i = 0; i < n; i++) {
    const e = 44 + i * 20;
    const off = woff.readUInt32BE(e + 4), comp = woff.readUInt32BE(e + 8), orig = woff.readUInt32BE(e + 12);
    const brut = woff.subarray(off, off + comp);
    tables.push({ tag: woff.subarray(e, e + 4), somme: woff.readUInt32BE(e + 16), data: comp < orig ? inflateSync(brut) : brut });
  }
  const pas = 2 ** Math.floor(Math.log2(n));
  const tete = Buffer.alloc(12 + 16 * n);
  woff.copy(tete, 0, 4, 8);
  tete.writeUInt16BE(n, 4);
  tete.writeUInt16BE(pas * 16, 6);
  tete.writeUInt16BE(Math.log2(pas), 8);
  tete.writeUInt16BE(n * 16 - pas * 16, 10);
  const morceaux = [tete];
  let decalage = tete.length;
  tables.forEach((t, i) => {
    const d = 12 + i * 16;
    t.tag.copy(tete, d);
    tete.writeUInt32BE(t.somme, d + 4);
    tete.writeUInt32BE(decalage, d + 8);
    tete.writeUInt32BE(t.data.length, d + 12);
    const bourrage = (4 - (t.data.length % 4)) % 4;
    morceaux.push(t.data, Buffer.alloc(bourrage));
    decalage += t.data.length + bourrage;
  });
  return Buffer.concat(morceaux);
}

// ---------------------------------------------------------------------------
// La planche : quatre cases de 375 px, 20 px de marge et d'écart.
const M = 20, CASE = 375, K = CASE / L, H_CASE = 160 * K, H = Math.round(M + H_CASE + 44);
const LARGEUR = 2 * M + 4 * CASE + 3 * M;
const x0 = (i) => M + i * (CASE + M);

const planche =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${LARGEUR}" height="${H}">${STYLE}` +
  `<rect width="${LARGEUR}" height="${H}" fill="${C.ivoire}"/>` +
  IMAGES.map((corps, i) => `<g transform="translate(${x0(i)} ${M + 140 * K}) scale(${K})">${corps}</g>`).join('') +
  '</svg>';

const temporaire = mkdtempSync(join(tmpdir(), 'planche-404-'));
try {
  const fontfile = join(temporaire, 'atkinson-400.ttf');
  writeFileSync(fontfile, woffEnTtf(readFileSync(POLICE)));
  const chiffres = await Promise.all(
    [1, 2, 3, 4].map((n) =>
      sharp({ text: { text: `<span foreground="${C.ardoise}">${n}</span>`, font: 'Atkinson Hyperlegible Next 18', fontfile, dpi: 72, rgba: true } })
        .png()
        .toBuffer({ resolveWithObject: true }),
    ),
  );
  const calques = chiffres.map(({ data, info }, i) => ({
    input: data,
    left: Math.round(x0(i) + CASE / 2 - info.width / 2),
    top: Math.round(M + H_CASE + 12),
  }));
  await sharp(Buffer.from(planche)).composite(calques).png({ compressionLevel: 9 }).toFile(join(ICI, 'planche.png'));
} finally {
  rmSync(temporaire, { recursive: true, force: true });
}
console.log(`planche.png ${LARGEUR} × ${H}, 1.svg à 4.svg dans ${ICI}`);

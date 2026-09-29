// Produit les images d'accueil du site dans public/ : le favicon (SVG, PNG
// 32 px, apple-touch-icon 180 px) et l'aperçu Open Graph 1200 × 630 ; et,
// hors du site, dans ops/images/couverture/, la bannière LinkedIn 1584 × 396
// (FR, EN, et leur version @2x). Relançable à la main : node ops/images/apercu.mjs. Sans paquet ajouté :
// sharp, et la police @fontsource convertie de WOFF en TTF dans un dossier
// temporaire, effacé à la fin (registre/0038).

import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateSync } from 'node:zlib';
import sharp from 'sharp';
import { POSES, LUNETTES } from '../../src/components/scene/poses.ts';

const RACINE = fileURLToPath(new URL('../../', import.meta.url));
const PUBLIC = join(RACINE, 'public');
const POLICES = join(RACINE, 'node_modules/@fontsource/atkinson-hyperlegible-next/files');

// Les jetons (src/styles/jetons.css). Les deux anneaux intermédiaires du
// soleil sont les color-mix de Soleil.astro, calculés en sRGB.
const C = {
  ivoire: '#FEFAF2',
  encre: '#2A1F1A',
  ambre: '#F2A33A',
  orange: '#B54E19',
  ardoise: '#5E7488',
  dalle: '#D9D4CC',
  anneau1: '#DE872F', // ambre 67 %, orange 33 %
  anneau2: '#C96A24', // ambre 33 %, orange 67 %
};

// ---------------------------------------------------------------------------
// La police : WOFF 1 → TTF. Un WOFF 1 est un sfnt dont chaque table est
// (ou non) compressée par zlib ; on décompresse et on réécrit l'en-tête.

function woffEnTtf(woff) {
  if (woff.toString('latin1', 0, 4) !== 'wOFF') throw new Error('pas un WOFF 1');
  const n = woff.readUInt16BE(12);
  const tables = [];
  for (let i = 0; i < n; i++) {
    const e = 44 + i * 20;
    const off = woff.readUInt32BE(e + 4);
    const comp = woff.readUInt32BE(e + 8);
    const orig = woff.readUInt32BE(e + 12);
    const brut = woff.subarray(off, off + comp);
    tables.push({
      tag: woff.subarray(e, e + 4),
      somme: woff.readUInt32BE(e + 16),
      data: comp < orig ? inflateSync(brut) : brut,
    });
  }
  const pas = 2 ** Math.floor(Math.log2(n));
  const tete = Buffer.alloc(12 + 16 * n);
  woff.copy(tete, 0, 4, 8); // flavor
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
// Le favicon : les lunettes du logo (Lunettes.astro), redessinées sur une
// grille de 32 pour tenir à 16 px : verres plus petits au trait plus épais
// (1,5 px à 16 px), pont court, branches courtes. Sur fond sombre, un disque
// ivoire derrière, les lunettes réduites pour y tenir.

const VERRES_32 =
  `<g class="verres" fill="none" stroke="${C.orange}" stroke-linecap="round" stroke-linejoin="round">` +
  '<circle cx="8" cy="16" r="5" stroke-width="3"/>' +
  '<circle cx="24" cy="16" r="5" stroke-width="3"/>' +
  '<path d="M12.7 14.3 Q16 11.4 19.3 14.3" stroke-width="2.5"/>' +
  '<path d="M3.3 14.3 L1.6 10.5" stroke-width="2.5"/>' +
  '<path d="M28.7 14.3 L30.4 10.5" stroke-width="2.5"/>' +
  '</g>';

const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    .fond { display: none; }
    @media (prefers-color-scheme: dark) {
      .fond { display: inline; }
      .verres { transform: scale(0.86); transform-origin: 16px 16px; }
    }
  </style>
  <circle class="fond" cx="16" cy="16" r="16" fill="${C.ivoire}"/>
  ${VERRES_32}
</svg>
`;

// L'icône d'écran d'accueil (180 px) : assez grande pour le logo d'origine,
// tel quel, sur fond ivoire plein, avec 15 % de marge de chaque côté.
const APPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="${C.ivoire}"/>
  <g transform="translate(90 90) scale(1.97) translate(-32 -17)" fill="none" stroke="${C.orange}"
     stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="16" cy="17" r="10.5"/>
    <circle cx="48" cy="17" r="10.5"/>
    <path d="M26.5 15 Q32 10 37.5 15"/>
    <path d="M5.5 14 L2 7"/>
    <path d="M58.5 14 L62 7"/>
  </g>
</svg>`;

// ---------------------------------------------------------------------------
// Le bâtiment terminé, comme Batiment.astro sans JavaScript : fondations,
// quatre étages (la fenêtre du dernier allumée), toit, grue fixe, et
// l'équipe sur le toit, Jean à gauche aux lunettes orange. Mêmes
// coordonnées : sol en y = 0, vers le haut en négatif, 240 de large.

const B = { largeur: 240, x0: 50, x1: 150, fondations: 10, hauteur: 380, toit: 8, sousFleche: 92, echelle: 0.72 };
const CX = (B.x0 + B.x1) / 2;
const POINTE = 66;
const arrondi = (v) => Math.round(v * 100) / 100;

// Les lunettes de Jean, un quart plus grandes autour du verre, comme le
// bâtiment les agrandit en CSS.
const LUNETTES_BATIMENT = LUNETTES.replace('<g class="lunettes">', '<g transform="translate(9 -111) scale(1.25) translate(-9 111)">')
  .replace('stroke-width="1.6"', 'stroke-width="2"')
  .replace('stroke-width="1.8"', 'stroke-width="2.4"');

const personnage = (pose, { jean = false, miroir = false } = {}) =>
  `<g${miroir ? ' transform="scale(-1 1)"' : ''}>${POSES[pose].replace('{L}', jean ? LUNETTES_BATIMENT : '')}</g>`;

// hauteur et sousFleche se règlent pour la bannière, plus basse ; par défaut,
// les valeurs de B (l'aperçu).
function batiment(nombre = 4, { hauteur = B.hauteur, sousFleche = B.sousFleche } = {}) {
  const h = hauteur / nombre;
  const hautToit = -(B.fondations + hauteur) - B.toit;
  const fleche = hautToit - sousFleche;
  const sommet = fleche - 26;
  const zigzag = (n, point) => Array.from({ length: n + 1 }, (_, i) => point(i)).join(' ');
  const mat = zigzag(Math.floor(-fleche / 14), (i) => `${i % 2 ? 214 : 204},${arrondi(-i * 14)}`);
  const treillis = zigzag((236 - POINTE) / 10, (i) => `${POINTE + i * 10},${i % 2 ? fleche - 7 : fleche}`);

  const grue = [
    `<rect class="fd se" x="198" y="-4" width="22" height="4" stroke-width="1.2"/>`,
    `<line class="se" x1="204" y1="0" x2="204" y2="${fleche}" stroke-width="1.5"/>`,
    `<line class="se" x1="214" y1="0" x2="214" y2="${fleche}" stroke-width="1.5"/>`,
    `<polyline class="se" points="${mat}" fill="none" stroke-width="0.8" stroke-linejoin="round"/>`,
    `<line class="se" x1="${POINTE}" y1="${fleche}" x2="236" y2="${fleche}" stroke-width="1.5"/>`,
    `<line class="se" x1="${POINTE}" y1="${fleche - 7}" x2="236" y2="${fleche - 7}" stroke-width="1.2"/>`,
    `<polyline class="se" points="${treillis}" fill="none" stroke-width="0.8" stroke-linejoin="round"/>`,
    `<polyline class="se" points="204,${fleche - 7} 209,${sommet} 214,${fleche - 7}" fill="none" stroke-width="1.2" stroke-linejoin="round"/>`,
    `<polyline class="se" points="${POINTE + 4},${fleche - 7} 209,${sommet} 234,${fleche - 7}" fill="none" stroke-width="0.8" stroke-linejoin="round"/>`,
    `<rect class="fe" x="222" y="${fleche}" width="14" height="12"/>`,
    `<rect class="fi se" x="191" y="${fleche + 2}" width="12" height="11" stroke-width="1.2"/>`,
    `<rect class="fi se" x="${CX - 7}" y="${fleche}" width="14" height="5" stroke-width="1.2"/>`,
  ].join('');

  const etages = Array.from({ length: nombre }, (_, k) => {
    const bas = -(B.fondations + k * h);
    const haut = bas - h;
    const hf = Math.min(h * 0.42, 30);
    const yf = arrondi(haut + (h - hf) / 2);
    const porte = arrondi(Math.min(h * 0.62, 44));
    const fenetre = (x, classe = 'fi') =>
      `<rect class="${classe} se" x="${x}" y="${yf}" width="14" height="${arrondi(hf)}" stroke-width="1"/>`;
    return (
      `<rect class="fi se" x="${B.x0}" y="${arrondi(haut)}" width="${B.x1 - B.x0}" height="${arrondi(h)}" stroke-width="1.5"/>` +
      fenetre(CX - 37) +
      (k === 0
        ? `<rect class="fi se" x="${CX - 8}" y="${arrondi(bas - porte)}" width="16" height="${porte}" stroke-width="1"/>`
        : fenetre(CX - 7)) +
      fenetre(CX + 23, k === nombre - 1 ? 'fa' : 'fi')
    );
  }).join('');

  const toit = `<rect class="fd se" x="${B.x0 - 6}" y="${hautToit}" width="${B.x1 - B.x0 + 12}" height="${B.toit}" stroke-width="1.5"/>`;
  const equipe =
    `<g transform="translate(${CX - 22} ${hautToit}) scale(${B.echelle})">${personnage('bras-tendus', { jean: true })}</g>` +
    `<g transform="translate(${CX + 22} ${hautToit}) scale(${B.echelle})">${personnage('debout', { miroir: true })}</g>`;

  return {
    haut: -(sommet - 4),
    dessin:
      grue +
      `<line class="se" x1="0" y1="0" x2="${B.largeur}" y2="0" stroke-width="1.5"/>` +
      `<rect class="fd se" x="${B.x0 - 6}" y="${-B.fondations}" width="${B.x1 - B.x0 + 12}" height="${B.fondations}" stroke-width="1.5"/>` +
      etages +
      toit +
      equipe,
  };
}

// ---------------------------------------------------------------------------
// L'aperçu 1200 × 630 : fond ivoire, soleil au coin haut droit (Soleil.astro),
// bâtiment au centre droit, texte à gauche, composé par sharp (Pango) avec la
// police du site.

const OG = { largeur: 1200, hauteur: 630, marge: 72 };
const SOLEIL = 310; // le côté du carré de Soleil.astro (viewBox 200), en px
const ECHELLE_BATIMENT = 1;
const X_BATIMENT = 690; // bord gauche du dessin (x = 0 du bâtiment)
const SOL = 596; // y du sol dans l'image

// Le soleil de Soleil.astro, centré sur (cx, 0) : un disque ambre et trois
// anneaux vers l'orange, en aplats, pour un carré de côté cote (viewBox 200).
function soleil(cx, cote) {
  const k = cote / 200;
  const anneau = (r, largeur, couleur) =>
    `<circle cx="${cx}" cy="0" r="${arrondi(r * k)}" fill="none" stroke="${couleur}" stroke-width="${arrondi(largeur * k)}"/>`;
  return (
    anneau(169, 8, C.orange) +
    anneau(150, 11, C.anneau2) +
    anneau(129, 14, C.anneau1) +
    `<circle cx="${cx}" cy="0" r="${arrondi(110 * k)}" fill="${C.ambre}"/>`
  );
}

const STYLE_TRAIT = `<style>
    .fe { fill: ${C.encre}; } .se { stroke: ${C.encre}; } .fi { fill: ${C.ivoire}; }
    .si { stroke: ${C.ivoire}; } .sa { stroke: ${C.ardoise}; } .so { stroke: ${C.orange}; }
    .fd { fill: ${C.dalle}; } .fa { fill: ${C.ambre}; }
  </style>`;

function fondOg() {
  const { dessin } = batiment(4);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG.largeur}" height="${OG.hauteur}" viewBox="0 0 ${OG.largeur} ${OG.hauteur}">
  ${STYLE_TRAIT}
  <rect width="${OG.largeur}" height="${OG.hauteur}" fill="${C.ivoire}"/>
  ${soleil(OG.largeur, SOLEIL)}
  <g transform="translate(${X_BATIMENT} ${SOL}) scale(${ECHELLE_BATIMENT})">${dessin}</g>
</svg>`;
}

const echapper = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Un bloc de texte rendu par Pango, en PNG transparent. */
async function texte(contenu, { fontfile, famille, taille, couleur, largeur, interligne = 0 }) {
  const { data, info } = await sharp({
    text: {
      text: `<span foreground="${couleur}">${echapper(contenu)}</span>`,
      font: `${famille} ${taille}`,
      fontfile,
      width: largeur,
      dpi: 72,
      rgba: true,
      wrap: 'word',
      spacing: interligne,
    },
  })
    .png()
    .toBuffer({ resolveWithObject: true });
  // Pango rogne l'image à l'encre : un jambage (le j de « j'écoute ») qui
  // déborde à gauche décale tout le bloc. On mesure où commence l'encre de
  // la première ligne, pour aligner les blocs sur leur première lettre.
  const alpha = await sharp(data).extractChannel(3).raw().toBuffer();
  let approche = info.width;
  for (let y = 0; y < Math.min(info.height, Math.round(taille * 0.7)); y++)
    for (let x = 0; x < approche; x++) if (alpha[y * info.width + x] > 64) approche = x;
  return { data, largeur: info.width, hauteur: info.height, approche };
}

async function apercu(polices) {
  const colonne = X_BATIMENT - OG.marge - 24;
  const nom = await texte('Jean Perrier', {
    fontfile: polices[800], famille: 'Atkinson Hyperlegible Next ExtraBold', taille: 44, couleur: C.encre, largeur: colonne,
  });
  const phrase = await texte("Je bâtis sur des hypothèses\u00a0: j'écoute, je teste, puis j'investis là où ça compte.", {
    fontfile: polices[800], famille: 'Atkinson Hyperlegible Next ExtraBold', taille: 60, couleur: C.encre, largeur: colonne, interligne: 6,
  });
  const role = await texte('Head of Product · IA appliquée · Data', {
    fontfile: polices[400], famille: 'Atkinson Hyperlegible Next', taille: 34, couleur: C.ardoise, largeur: colonne,
  });

  // Le bloc est centré verticalement, à gauche, entre les marges.
  const ecarts = [30, 36];
  const total = nom.hauteur + ecarts[0] + phrase.hauteur + ecarts[1] + role.hauteur;
  let y = Math.round((OG.hauteur - total) / 2);
  const calques = [];
  for (const [bloc, apres] of [[nom, ecarts[0]], [phrase, ecarts[1]], [role, 0]]) {
    calques.push({ input: bloc.data, left: OG.marge - bloc.approche, top: y });
    y += bloc.hauteur + apres;
  }
  const sortie = join(PUBLIC, 'og', 'apercu.png');
  mkdirSync(join(PUBLIC, 'og'), { recursive: true });
  await sharp(Buffer.from(fondOg())).composite(calques).png({ compressionLevel: 9 }).toFile(sortie);
  return { sortie, blocs: { nom, phrase, role }, total };
}

// ---------------------------------------------------------------------------
// La bannière de couverture LinkedIn, 1584 × 396, FR et EN, en simple et en
// double résolution. Hors de public/ : le site ne la sert pas.
// Deux contraintes de LinkedIn : la photo de profil couvre le coin bas
// gauche (480 px de large, la moitié basse) ; au téléphone, environ 15 % de
// chaque côté sont rognés. Le texte tient donc dans la bande centrale, à
// droite de la photo ; le bâtiment, plus bas (quatre étages de 70 au lieu de
// 95), et le soleil occupent la droite. Seule la ligne de sol, prolongée,
// passe sous la photo.

const COUV = {
  largeur: 1584, hauteur: 396,
  texte: 500, colonne: 710, taille: 38, // le texte : bord gauche, largeur, corps
  soleil: 200,
  batiment: { x: 1222, sol: 368, echelle: 0.75, hauteur: 280, sousFleche: 72 },
};
const COUVERTURE = join(RACINE, 'ops/images/couverture');
const PHRASES = {
  // Trop longue pour deux lignes à 38 px : trois lignes, coupées à la main
  // pour ne pas laisser « compte. » seul sur la dernière.
  fr: "Je bâtis sur des hypothèses :\nj'écoute, je teste, puis\nj'investis là où ça compte.",
  en: 'I build on hypotheses: I listen, I test, then I invest where it counts.',
};

function fondCouverture(f) {
  const { x, sol, echelle, hauteur, sousFleche } = COUV.batiment;
  const { dessin } = batiment(4, { hauteur, sousFleche });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${COUV.largeur * f}" height="${COUV.hauteur * f}" viewBox="0 0 ${COUV.largeur} ${COUV.hauteur}">
  ${STYLE_TRAIT}
  <rect width="${COUV.largeur}" height="${COUV.hauteur}" fill="${C.ivoire}"/>
  ${soleil(COUV.largeur, COUV.soleil)}
  <line class="se" x1="0" y1="${sol}" x2="${x}" y2="${sol}" stroke-width="${arrondi(1.5 * echelle)}"/>
  <g transform="translate(${x} ${sol}) scale(${echelle})">${dessin}</g>
</svg>`;
}

async function couverture(polices, langue, f) {
  const phrase = await texte(PHRASES[langue], {
    // La virgule finale nomme la famille du fichier 800 telle quelle : sans
    // elle, Pango lit « ExtraBold » comme une graisse et, une fois le fichier
    // 400 chargé, retombe sur lui.
    fontfile: polices[800], famille: 'Atkinson Hyperlegible Next ExtraBold,', taille: COUV.taille * f, couleur: C.encre,
    largeur: COUV.colonne * f, interligne: 4 * f,
  });
  const adresse = await texte('jeanperrier.pm', {
    fontfile: polices[400], famille: 'Atkinson Hyperlegible Next', taille: 28 * f, couleur: C.ardoise, largeur: COUV.colonne * f,
  });
  // Le bloc est centré verticalement, calé à gauche sur sa première lettre.
  const ecart = 22 * f;
  const total = phrase.hauteur + ecart + adresse.hauteur;
  const y = Math.round((COUV.hauteur * f - total) / 2);
  const calques = [
    { input: phrase.data, left: COUV.texte * f - phrase.approche, top: y },
    { input: adresse.data, left: COUV.texte * f - adresse.approche, top: y + phrase.hauteur + ecart },
  ];
  mkdirSync(COUVERTURE, { recursive: true });
  const sortie = join(COUVERTURE, `couverture-${langue}${f > 1 ? `@${f}x` : ''}.png`);
  await sharp(Buffer.from(fondCouverture(f))).composite(calques).png({ compressionLevel: 9 }).toFile(sortie);
  return { sortie, droite: COUV.texte + Math.max(phrase.largeur, adresse.largeur) / f, haut: y / f, bas: (y + total) / f };
}

// ---------------------------------------------------------------------------

const decrire = async (f) => {
  const m = await sharp(f).metadata();
  return `${f.slice(RACINE.length).split('\\').join('/')} : ${m.width} × ${m.height}, ${m.format}`;
};

const temporaire = mkdtempSync(join(tmpdir(), 'portfolio-police-'));
try {
  const polices = {};
  for (const graisse of [400, 800]) {
    const woff = readFileSync(join(POLICES, `atkinson-hyperlegible-next-latin-${graisse}-normal.woff`));
    polices[graisse] = join(temporaire, `atkinson-${graisse}.ttf`);
    writeFileSync(polices[graisse], woffEnTtf(woff));
  }

  writeFileSync(join(PUBLIC, 'favicon.svg'), FAVICON_SVG);
  const f32 = join(PUBLIC, 'favicon-32.png');
  await sharp(Buffer.from(FAVICON_SVG), { density: 72 }).resize(32, 32).png().toFile(f32);
  const apple = join(PUBLIC, 'apple-touch-icon.png');
  await sharp(Buffer.from(APPLE_SVG)).flatten({ background: C.ivoire }).png().toFile(apple);
  // favicon.ico : sharp ne sait pas écrire ce format ; les navigateurs
  // prennent le SVG ou le PNG déclarés dans le <head>.

  const { sortie, blocs, total } = await apercu(polices);
  const bannieres = [];
  for (const langue of ['fr', 'en']) for (const f of [1, 2]) bannieres.push(await couverture(polices, langue, f));

  console.log('Images produites :');
  for (const f of [join(PUBLIC, 'favicon.svg'), f32, apple, sortie, ...bannieres.map((b) => b.sortie)])
    console.log('  ' + (await decrire(f)));
  console.log(
    `Texte de l'aperçu : nom ${blocs.nom.hauteur} px, phrase ${blocs.phrase.largeur} × ${blocs.phrase.hauteur} px, ` +
      `rôle ${blocs.role.largeur} × ${blocs.role.hauteur} px (bloc de ${total} px de haut).`,
  );
  const rogne = COUV.largeur * 0.15;
  for (const b of bannieres.filter((_, i) => i % 2 === 0))
    console.log(
      `Texte de ${b.sortie.slice(COUVERTURE.length + 1)} : x ${COUV.texte} à ${Math.round(b.droite)}, y ${Math.round(b.haut)} à ` +
        `${Math.round(b.bas)} (bande sûre ${rogne} à ${COUV.largeur - rogne} ; photo : x < 480 et y > ${COUV.hauteur / 2}).`,
    );
} finally {
  rmSync(temporaire, { recursive: true, force: true });
}

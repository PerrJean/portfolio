// Les trois schémas du projet « fusion des plateformes » (registre/0067),
// dans le style du schéma d'Audit contenu (chaine-audit.css) : au trait,
// cadres à angles droits à l'encre, liaisons et flèches en ardoise, fond
// ivoire, l'ambre seule lumière (jamais de texte), aucune animation.
//  1. avant-apres : trois plateformes, trois façons de faire ; puis deux,
//     sur un design system commun, la plateforme unique en pointillés ;
//  2. trajectoires : la valeur apportée dans le temps, sans chiffre ;
//  3. gabarits : une trentaine de vignettes toutes différentes, puis quatre
//     gabarits communs (support + question).
// Deux dispositions : « large » pour la colonne de texte (736 px, lue
// jusqu'à 851) et « etroit » pour le téléphone (350 px : 390 moins les
// gouttières de 1,25 rem). Texte à 16 px en large, 15 px en étroit, tracé en
// chemins depuis la police du site (../accueil/police.mjs) : le SVG ne
// charge rien.
// Produit <schema>.<langue>.svg (large), <schema>.etroit.<langue>.svg et
// planche.png (FR, large à gauche, étroit à droite dans un cadre de 390 px).
// Relançable : node ops/images/fusion/planche.mjs [dossier-planche-en]

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { police, couper } from '../accueil/police.mjs';

const ICI = fileURLToPath(new URL('./', import.meta.url));
const C = { ivoire: '#FEFAF2', encre: '#2A1F1A', ambre: '#F2A33A', ardoise: '#5E7488', dalle: '#D9D4CC' };
const STYLE = `<style>.fe{fill:${C.encre}}.fs{fill:${C.ardoise}}</style>`;
const P = { 400: police(400), 700: police(700) };
const NBSP = ' ';

// Les deux dispositions : largeur, corps du texte, du titre de section.
const MODES = {
  large: { W: 736, T: 16, H: 17 },
  etroit: { W: 350, T: 15, H: 16 },
};

// ---------------------------------------------------------------------------
// Les libellés, FR et EN (anglais américain, court).

const TEXTES = {
  fr: {
    avant: 'Avant', avantSous: `trois plateformes, trois façons de faire`,
    apres: 'Après', apresSous: `deux plateformes, un socle commun`,
    colonnes: [
      ['Préparation aux examens', 'Examens'],
      ['Apprentissage général', 'Généraliste'],
      ['Entreprises', 'Entreprises'],
    ],
    couches: [['Interface', 'Interface'], [`Gabarits d’activité`, 'Gabarits'], ['Données', 'Données']],
    quatre: ['Quatre gabarits communs', 'Quatre communs'],
    ds: 'Design system commun',
    unique: 'Plateforme unique', uniqueSous: `second temps, non engagé (arbitrage)`,
    rejoint: `le contenu Entreprises rejoint la généraliste`,
    valeur: 'Valeur apportée', temps: 'Temps',
    retenue: ['La trajectoire retenue', `chaque étape rapporte`],
    vite: ['Livrer vite', 'la dette freine'],
    propre: ['Construire proprement', 'rien avant longtemps'],
    trentaine: 'Une trentaine de gabarits, chacun le sien',
    communs: 'Quatre gabarits communs',
    support: 'Support', question: 'Question',
    titres: {
      'avant-apres': `Avant : trois plateformes, chacune avec son interface, ses gabarits d’activité et ses données, chacune dessinée d’un trait différent. Après : la plateforme examens et la plateforme généraliste, qui reçoit le contenu Entreprises et passe à quatre gabarits communs, toutes deux posées sur un design system commun. En pointillés, la plateforme unique : second temps, non engagé, par arbitrage.`,
      trajectoires: `Trois trajectoires de valeur apportée dans le temps. La trajectoire retenue monte par paliers, chaque étape rapporte. Livrer vite monte vite puis s’aplatit sous la dette. Construire proprement reste à plat longtemps.`,
      gabarits: `À gauche, une trentaine de gabarits d’activité, tous différents. À droite, quatre gabarits communs, chacun fait d’un support et d’une question.`,
    },
  },
  en: {
    avant: 'Before', avantSous: 'three platforms, three ways of working',
    apres: 'After', apresSous: 'two platforms, one shared foundation',
    colonnes: [
      ['Exam prep', 'Exam prep'],
      ['General learning', 'General'],
      ['Business', 'Business'],
    ],
    couches: [['Interface', 'Interface'], ['Activity templates', 'Templates'], ['Data', 'Data']],
    quatre: ['Four shared templates', 'Four shared'],
    ds: 'Shared design system',
    unique: 'Single platform', uniqueSous: 'phase two, not pursued (a trade-off)',
    rejoint: 'Business content moves into general learning',
    valeur: 'Value delivered', temps: 'Time',
    retenue: ['The chosen path', 'every step pays off'],
    vite: ['Ship fast', 'debt slows it down'],
    propre: ['Build it clean', 'nothing for a long time'],
    trentaine: 'Some thirty templates, each its own',
    communs: 'Four shared templates',
    support: 'Media', question: 'Question',
    titres: {
      'avant-apres': 'Before: three platforms, each with its own interface, activity templates and data, each drawn with a different line. After: the exam prep platform and the general learning platform, which takes in the business content and moves to four shared templates, both built on a shared design system. Dotted: the single platform, phase two, not pursued, a trade-off.',
      trajectoires: 'Three paths of value delivered over time. The chosen path climbs step by step, every step pays off. Shipping fast climbs quickly, then flattens under debt. Building it clean stays flat for a long time.',
      gabarits: 'Left: some thirty activity templates, all different. Right: four shared templates, each made of a media block and a question.',
    },
  },
};

// ---------------------------------------------------------------------------
// Les briques : texte en chemins, cadres, flèches.

const f = (v) => +v.toFixed(2);
const largeur = (t, taille, g = 400) => P[g].largeur(t, taille);

/** Une ligne, ligne de base en y ; ancre start, middle ou end. */
function ligne(t, x, y, taille, g = 400, ancre = 'start') {
  const l = largeur(t, taille, g);
  const x0 = ancre === 'middle' ? x - l / 2 : ancre === 'end' ? x - l : x;
  return P[g].chemin(t, f(x0), f(y), taille, 0, 'fe');
}

/** Un bloc coupé à `max` px, haut du bloc en `haut`. Rend { svg, h, l }. */
function bloc(t, x, haut, max, taille, g = 400, ancre = 'start', interligne = 1.3) {
  const lignes = couper(t, max, (s) => largeur(s, taille, g), true);
  const lh = interligne * taille;
  const svg = lignes
    .map((l, i) => ligne(l, x, haut + i * lh + (lh - 1.3 * taille) / 2 + 0.984 * taille, taille, g, ancre))
    .join('');
  return { svg, h: lignes.length * lh, l: Math.max(...lignes.map((l) => largeur(l, taille, g))), n: lignes.length };
}

/** Un bloc centré verticalement dans [y, y + h]. */
const blocCentre = (t, x, y, h, max, taille, g, ancre) => {
  const essai = bloc(t, x, 0, max, taille, g, ancre);
  // Le centre optique : les capitales, pas la boîte (léger décalage vers le bas).
  return bloc(t, x, y + (h - essai.h) / 2 + 0.04 * taille, max, taille, g, ancre).svg;
};

/** Un cadre à angles droits, traits de trois façons (et les pointillés). */
function cadre(x, y, w, h, trait = 'continu', fond = C.ivoire) {
  const r = (e, a = '') =>
    `<rect x="${f(x + e)}" y="${f(y + e)}" width="${f(w - 2 * e)}" height="${f(h - 2 * e)}" ${a}/>`;
  switch (trait) {
    case 'continu':
      return r(0.75, `fill="${fond}" stroke="${C.encre}" stroke-width="1.5"`);
    case 'epais':
      return r(1.6, `fill="${fond}" stroke="${C.encre}" stroke-width="3.2"`);
    case 'double':
      return r(0.6, `fill="${fond}" stroke="${C.encre}" stroke-width="1.2"`) + r(4.4, `fill="none" stroke="${C.encre}" stroke-width="1.2"`);
    case 'pointille':
      return r(1, `fill="${fond}" stroke="${C.encre}" stroke-width="2" stroke-dasharray="0.1 5" stroke-linecap="round"`);
    case 'fin':
      return r(0.5, `fill="${fond}" stroke="${C.encre}" stroke-width="1"`);
  }
  throw new Error(trait);
}

/** Le bout d'une flèche (le chevron de chaine-audit), pointe en (x, y). */
const bout = (x, y, angle) =>
  `<path transform="translate(${f(x)} ${f(y)}) rotate(${angle})" d="M-5.5,-5L0,0L-5.5,5" fill="none" stroke="${C.ardoise}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`;
const trace = (d, a = '') =>
  `<path d="${d}" fill="none" stroke="${C.ardoise}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ${a}/>`;

const svg = (W, H, titre, corps) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${f(H)}" width="${W}" height="${Math.ceil(H)}" role="img" aria-label="${titre.replace(/"/g, '&quot;')}">` +
  `<title>${titre}</title>${STYLE}<rect width="${W}" height="${f(H)}" fill="${C.ivoire}"/>${corps}</svg>\n`;

// ---------------------------------------------------------------------------
// 1. Avant / après. Une grille : à gauche le nom des couches, en haut le nom
// des plateformes ; chaque plateforme a son trait. Une liaison en Z porte le
// contenu Entreprises dans la généraliste.

function avantApres(x, mode) {
  const { W, T, H } = MODES[mode];
  const e = mode === 'etroit' ? 1 : 0; // libellé long ou court
  const gauche = mode === 'etroit' ? 76 : 148; // colonne des couches
  const ecart = mode === 'etroit' ? 6 : 14;
  const col = (W - gauche - 2 * ecart) / 3;
  const cx = (i) => gauche + i * (col + ecart);
  const rang = mode === 'etroit' ? 46 : 48, pas = rang + 6;
  const TRAITS = ['continu', 'double', 'epais']; // examens, généraliste, entreprises
  let s = '';

  // Une rangée d'en-tête : le titre de la section à gauche, les plateformes.
  const entete = (y, titre, sous, noms) => {
    const t = bloc(titre, 0, y, gauche - 10, H, 700);
    const st = mode === 'large' ? bloc(sous, 0, y + t.h + 2, gauche - 12, T - 1 < 15 ? 15 : T - 1) : { svg: '', h: 0 };
    const cols = noms.map((n, i) => (n ? bloc(n, cx(i), 0, col - 4, T, 700) : { h: 0 }));
    const hNoms = Math.max(...cols.map((c) => c.h));
    const hTot = Math.max(t.h + st.h + 2, hNoms);
    // Les noms posés en bas de la rangée, juste au-dessus des cadres.
    noms.forEach((n, i) => {
      if (n) s += bloc(n, cx(i), y + hTot - cols[i].h, col - 4, T, 700).svg;
    });
    s += t.svg + st.svg;
    return hTot + 10;
  };
  const libelles = (y) =>
    x.couches.forEach((c, j) => {
      s += blocCentre(c[e], 0, y + j * pas, rang, gauche - 6, T);
    });

  // Avant.
  let y = 0;
  y += entete(y, x.avant, x.avantSous, x.colonnes.map((c) => c[e]));
  libelles(y);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) s += cadre(cx(i), y + j * pas, col, rang, TRAITS[i]);
  const basAvant = y + 2 * pas + rang;

  // La liaison en Z : du bas de la colonne Entreprises au haut de la
  // généraliste, sous la rangée d'en-tête d'après. Son libellé à gauche de
  // la dernière descente.
  const xDepart = cx(2) + col / 2, xArrivee = cx(1) + col / 2;
  const lib = bloc(x.rejoint, xArrivee - 12, 0, xArrivee - 12 - (mode === 'etroit' ? 0 : gauche), T, 400, 'end');
  const zone = Math.max(64, lib.h + 30);
  const yMilieu = basAvant + 18;
  const yFin = basAvant + zone;
  s += trace(`M${f(xDepart)},${f(basAvant + 2)}V${f(yMilieu)}H${f(xArrivee)}V${f(yFin - 1)}`) + bout(xArrivee, yFin - 1, 90);
  s += bloc(x.rejoint, xArrivee - 12, yMilieu + 8, lib.l + 1, T, 400, 'end').svg;
  y = yFin + 6;

  // Après.
  const yEntete = y;
  y += entete(y, x.apres, x.apresSous, [x.colonnes[0][e], x.colonnes[1][e], null]);
  libelles(y);
  for (let j = 0; j < 3; j++) {
    s += cadre(cx(0), y + j * pas, col, rang, TRAITS[0]);
    if (j === 1) {
      s += cadre(cx(1), y + j * pas, col, rang, TRAITS[1], C.ambre);
      s += blocCentre(x.quatre[e], cx(1) + col / 2, y + j * pas, rang, col - 20, T, 700, 'middle');
    } else s += cadre(cx(1), y + j * pas, col, rang, TRAITS[1]);
  }
  // Le design system, sous les deux plateformes.
  const yDs = y + 3 * pas;
  const lDs = 2 * col + ecart;
  const hDs = Math.max(rang, bloc(x.ds, 0, 0, lDs - 24, T, 700).h + 16);
  s += cadre(cx(0), yDs, lDs, hDs, 'continu', C.ambre);
  s += blocCentre(x.ds, cx(0) + lDs / 2, yDs, hDs, lDs - 24, T, 700, 'middle');
  let bas = yDs + hDs;

  // La plateforme unique, en pointillés : la troisième colonne en large, une
  // bande sous le socle en étroit.
  const pad = 12;
  if (mode === 'large') {
    const h = bas - yEntete;
    s += cadre(cx(2), yEntete, col, h, 'pointille');
    const t = bloc(x.unique, cx(2) + pad, yEntete + pad, col - 2 * pad, T, 700);
    s += t.svg + bloc(x.uniqueSous, cx(2) + pad, yEntete + pad + t.h + 2, col - 2 * pad, T).svg;
  } else {
    const t = bloc(x.unique, pad, 0, W - 2 * pad, T, 700);
    const u = bloc(x.uniqueSous, pad, 0, W - 2 * pad, T);
    const y0 = bas + 14, h = t.h + u.h + 2 * pad + 2;
    s += cadre(0, y0, W, h, 'pointille');
    s += bloc(x.unique, pad, y0 + pad, W - 2 * pad, T, 700).svg + bloc(x.uniqueSous, pad, y0 + pad + t.h + 2, W - 2 * pad, T).svg;
    bas = y0 + h;
  }
  return { corps: s, h: bas + 2 };
}

// ---------------------------------------------------------------------------
// 2. Les trois trajectoires : valeur apportée dans le temps, sans chiffre.
// La retenue à l'encre épaisse, un point d'ambre à chaque palier ; les deux
// écartées en tirets. Légende directe au bout de chaque courbe.

function trajectoires(x, mode) {
  const { W, T } = MODES[mode];
  const legende = mode === 'etroit' ? 128 : 236;
  const x0 = 8, haut = 34, ph = mode === 'etroit' ? 250 : 270;
  const pw = W - legende - x0 - 14;
  const base = haut + ph;
  const px = (t) => x0 + t * pw, py = (v) => base - v * ph;
  let s = '';

  // Les axes, en ardoise, avec leur nom.
  s += trace(`M${px(0)},${f(haut - 10)}V${f(base)}H${f(px(1) + 8)}`);
  s += bout(px(0), haut - 12, -90) + bout(px(1) + 10, base, 0);
  s += ligne(x.valeur, px(0) + 12, haut - 12, T, 700);
  s += ligne(x.temps, px(1) + 10, base + 24, T, 400, 'end');

  // Livrer vite : monte vite, puis s'aplatit.
  const N = 60;
  const courbe = (g) => Array.from({ length: N + 1 }, (_, i) => `${i ? 'L' : 'M'}${f(px(i / N))},${f(py(g(i / N)))}`).join('');
  const vite = (t) => 0.02 + 0.56 * (1 - Math.exp(-t / 0.11));
  // Construire proprement : à plat longtemps, puis monte tard.
  const propre = (t) => 0.02 + (t < 0.68 ? 0 : 0.28 * ((t - 0.68) / 0.32) ** 1.6);
  const tirets = `stroke="${C.encre}" stroke-width="1.75" stroke-dasharray="7 5" fill="none" stroke-linecap="butt"`;
  s += `<path d="${courbe(vite)}" ${tirets}/>`;
  s += `<path d="${courbe(propre)}" ${tirets}/>`;

  // La retenue : cinq paliers, chacun rapporte dès sa sortie.
  const paliers = 5, marche = 0.168, v0 = 0.02;
  let d = `M${px(0)},${f(py(v0))}`, v = v0;
  const points = [];
  for (let i = 0; i < paliers; i++) {
    const t = 0.06 + i * 0.185;
    d += `H${f(px(t))}`;
    v += marche;
    d += `L${f(px(t + 0.025))},${f(py(v))}`;
    points.push([px(t + 0.025), py(v)]);
  }
  d += `H${f(px(1))}`;
  s += `<path d="${d}" fill="none" stroke="${C.encre}" stroke-width="3" stroke-linejoin="miter"/>`;
  s += points.map(([a, b]) => `<circle cx="${f(a)}" cy="${f(b)}" r="5.5" fill="${C.ambre}" stroke="${C.encre}" stroke-width="1.5"/>`).join('');

  // Les légendes, au bout de chaque courbe : le nom en gras, puis l'effet.
  const lx = px(1) + 12, lmax = W - lx;
  const leg = (paire, v1) => {
    const a = bloc(paire[0], 0, 0, lmax, T, 700), b = bloc(paire[1], 0, 0, lmax, T);
    const h = a.h + b.h, y1 = py(v1) - h / 2;
    return bloc(paire[0], lx, y1, lmax, T, 700).svg + bloc(paire[1], lx, y1 + a.h, lmax, T).svg;
  };
  s += leg(x.retenue, v) + leg(x.vite, vite(1)) + leg(x.propre, propre(1));
  return { corps: s, h: base + 32 };
}

// ---------------------------------------------------------------------------
// 3. Les gabarits : une trentaine de vignettes toutes différentes (4 hauts
// × 7 bas, aucune paire deux fois : 28, pas le décompte réel), une flèche,
// quatre gabarits communs (un support, une question).

function vignette(x, y, w, h, i) {
  const l = (x1, y1, x2, y2, e = 1.25) => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${C.encre}" stroke-width="${e}" stroke-linecap="round"/>`;
  const r = (a, b, c, d2) => `<rect x="${f(a)}" y="${f(b)}" width="${f(c)}" height="${f(d2)}" fill="none" stroke="${C.encre}" stroke-width="1"/>`;
  const o = (a, b, rr) => `<circle cx="${f(a)}" cy="${f(b)}" r="${rr}" fill="none" stroke="${C.encre}" stroke-width="1"/>`;
  const m = 5, X = x + m, Y = y + m, L = w - 2 * m;
  let s = cadre(x, y, w, h, 'fin');
  // Le haut : quatre façons de poser la consigne et le support.
  switch (i % 4) {
    case 0: s += l(X, Y + 2, X + L * 0.8, Y + 2, 2); break; // titre long
    case 1: s += l(X, Y + 2, X + L * 0.4, Y + 2, 2) + l(X, Y + 7, X + L * 0.9, Y + 7); break; // titre et consigne
    case 2: s += r(X, Y, L * 0.4, 12) + l(X + L * 0.5, Y + 3, X + L, Y + 3) + l(X + L * 0.5, Y + 8, X + L * 0.8, Y + 8); break; // image à gauche
    case 3: s += `<path d="M${f(X + 2)},${f(Y + 6)}` + [3, 8, 4, 10, 5, 7, 3, 9, 4].map((a, k) => `L${f(X + 5 + k * 3)},${f(Y + 6 + (k % 2 ? -a / 2 : a / 2))}`).join('') + `" fill="none" stroke="${C.encre}" stroke-width="1"/>`; break; // son
  }
  // Le bas : sept façons de répondre.
  const yb = y + h - m;
  switch (Math.floor(i / 4) % 7) {
    case 0: s += o(X + 3, yb - 9, 2.5) + l(X + 8, yb - 9, X + L * 0.6, yb - 9) + o(X + 3, yb - 2, 2.5) + l(X + 8, yb - 2, X + L * 0.5, yb - 2); break;
    case 1: s += r(X, yb - 8, L * 0.45, 8) + r(X + L * 0.55, yb - 8, L * 0.45, 8); break;
    case 2: s += l(X, yb - 7, X + L * 0.3, yb - 7) + l(X + L * 0.35, yb - 7, X + L * 0.6, yb - 7, 2.2) + l(X + L * 0.65, yb - 7, X + L, yb - 7) + l(X, yb - 1, X + L * 0.7, yb - 1); break;
    case 3: s += [0, 1, 2].map((k) => r(X + k * (L / 3), yb - 7, L / 3 - 3, 7)).join(''); break;
    case 4: s += o(X + 3, yb - 7, 2) + o(X + 3, yb - 1, 2) + o(X + L - 3, yb - 7, 2) + o(X + L - 3, yb - 1, 2) + l(X + 6, yb - 7, X + L - 6, yb - 1, 1); break;
    case 5: s += r(X + L * 0.55, yb - 9, L * 0.45, 9) + l(X, yb - 5, X + L * 0.45, yb - 5); break;
    case 6: s += `<path d="M${f(X + 1)},${f(yb - 10)}L${f(X + 7)},${f(yb - 6)}L${f(X + 1)},${f(yb - 2)}Z" fill="none" stroke="${C.encre}" stroke-width="1"/>` + l(X + 11, yb - 6, X + L, yb - 6) ; break;
  }
  return s;
}

// Les quatre sortes de question, en pictogramme : choix, texte à trous,
// remise en ordre, association.
function picto(k, x, y, T) {
  const e = `stroke="${C.encre}" stroke-width="1.25" fill="none" stroke-linecap="round"`;
  const g = `stroke="${C.encre}" stroke-width="2.5" fill="none" stroke-linecap="round"`;
  switch (k) {
    case 0: return `<circle cx="${f(x + 5)}" cy="${f(y - 5)}" r="4" ${e}/><circle cx="${f(x + 17)}" cy="${f(y - 5)}" r="4" ${e}/><circle cx="${f(x + 17)}" cy="${f(y - 5)}" r="1.6" fill="${C.encre}"/><circle cx="${f(x + 29)}" cy="${f(y - 5)}" r="4" ${e}/>`;
    case 1: return `<path d="M${f(x)},${f(y - 1)}H${f(x + 8)}M${f(x + 25)},${f(y - 1)}H${f(x + 34)}" ${e}/><path d="M${f(x + 11)},${f(y - 1)}H${f(x + 22)}" ${g}/>`;
    case 2: return `<rect x="${f(x)}" y="${f(y - 10)}" width="9" height="9" ${e}/><rect x="${f(x + 25)}" y="${f(y - 10)}" width="9" height="9" ${e}/><path d="M${f(x + 12)},${f(y - 7.5)}H${f(x + 22)}M${f(x + 22)},${f(y - 3.5)}H${f(x + 12)}M${f(x + 19)},${f(y - 10)}L${f(x + 22)},${f(y - 7.5)}L${f(x + 19)},${f(y - 5)}M${f(x + 15)},${f(y - 6)}L${f(x + 12)},${f(y - 3.5)}L${f(x + 15)},${f(y - 1)}" ${e}/>`;
    case 3: return `<circle cx="${f(x + 3)}" cy="${f(y - 9)}" r="2.5" ${e}/><circle cx="${f(x + 3)}" cy="${f(y - 2)}" r="2.5" ${e}/><circle cx="${f(x + 31)}" cy="${f(y - 9)}" r="2.5" ${e}/><circle cx="${f(x + 31)}" cy="${f(y - 2)}" r="2.5" ${e}/><path d="M${f(x + 6)},${f(y - 9)}L${f(x + 28)},${f(y - 2)}M${f(x + 6)},${f(y - 2)}L${f(x + 28)},${f(y - 9)}" ${e}/>`;
  }
}

function gabarits(x, mode) {
  const { W, T } = MODES[mode];
  const etroit = mode === 'etroit';
  const zone = etroit ? W : 332; // largeur de chaque moitié
  const nc = 7, nr = 4, eg = 6;
  const vw = (zone - (nc - 1) * eg) / nc, vh = 40;
  const hGrille = nr * vh + (nr - 1) * eg;
  let s = '';

  // À gauche (en haut au téléphone) : la trentaine.
  const t1 = bloc(x.trentaine, 0, 0, zone, T, 700);
  s += t1.svg;
  const yg = t1.h + 10;
  for (let i = 0; i < nc * nr; i++) s += vignette((i % nc) * (vw + eg), yg + Math.floor(i / nc) * (vh + eg), vw, vh, (i * 11) % 28);

  // La flèche, puis les quatre gabarits communs.
  let x2, y2;
  if (etroit) {
    const ya = yg + hGrille + 8;
    s += trace(`M${W / 2},${ya}V${ya + 34}`) + bout(W / 2, ya + 34, 90);
    x2 = 0; y2 = ya + 44;
  } else {
    x2 = W - zone;
    const ym = yg + hGrille / 2;
    s += trace(`M${f(zone + 12)},${f(ym)}H${f(x2 - 12)}`) + bout(x2 - 12, ym, 0);
    y2 = 0;
  }
  const t2 = bloc(x.communs, x2, y2, zone, T, 700);
  s += t2.svg;
  const yc = y2 + t2.h + 10;
  const gw = (zone - 12) / 2, gh = etroit ? 92 : (hGrille - 12) / 2;
  const blocH = (gh - 3 * 7) / 2;
  for (let k = 0; k < 4; k++) {
    const gx = x2 + (k % 2) * (gw + 12), gy = yc + Math.floor(k / 2) * (gh + 12);
    s += cadre(gx, gy, gw, gh, 'continu', C.ambre);
    const bx = gx + 7, bl = gw - 14;
    s += cadre(bx, gy + 7, bl, blocH, 'fin') + blocCentre(x.support, bx + 9, gy + 7, blocH, bl - 18, T);
    const qy = gy + 14 + blocH;
    s += cadre(bx, qy, bl, blocH, 'fin') + blocCentre(x.question, bx + 9, qy, blocH, bl - 60, T);
    s += picto(k, bx + bl - 43, qy + blocH / 2 + 6, T);
  }
  const bas = etroit ? yc + 2 * gh + 12 : Math.max(yg + hGrille, yc + 2 * gh + 12);
  return { corps: s, h: bas + 2 };
}

// ---------------------------------------------------------------------------
// Les fichiers, puis la planche.

const SCHEMAS = { 'avant-apres': avantApres, trajectoires, gabarits };
const rendus = {};
for (const langue of ['fr', 'en']) {
  for (const [nom, dessin] of Object.entries(SCHEMAS)) {
    for (const mode of ['large', 'etroit']) {
      const { corps, h } = dessin(TEXTES[langue], mode);
      const texte = svg(MODES[mode].W, h, TEXTES[langue].titres[nom], corps);
      writeFileSync(join(ICI, `${nom}${mode === 'etroit' ? '.etroit' : ''}.${langue}.svg`), texte);
      rendus[`${nom}.${mode}.${langue}`] = { corps, h };
    }
  }
}

async function planche(langue, sortie) {
  const M = 24, GAP = 48, CADRE = 390, GOUT = 20, LEG = 15;
  const WL = MODES.large.W, WE = MODES.etroit.W;
  const LARGEUR = M + WL + GAP + CADRE + M;
  const legende = (t, x, y) => P[400].chemin(t, x, y, LEG, 0, 'fs');
  let s = '', yL = M, yE = M;
  s += legende(langue === 'fr' ? 'Grand écran, 736 px (colonne de texte)' : 'Wide, 736 px', M, yL + 12);
  s += legende(langue === 'fr' ? 'Téléphone, 390 px (350 px de dessin)' : 'Phone, 390 px', M + WL + GAP, yE + 12);
  yL += 30; yE += 30;
  const yE0 = yE;
  yE += GOUT;
  for (const nom of Object.keys(SCHEMAS)) {
    const l = rendus[`${nom}.large.${langue}`], e = rendus[`${nom}.etroit.${langue}`];
    s += `<g transform="translate(${M} ${f(yL)})">${l.corps}</g>`;
    yL += l.h + 28;
    s += `<line x1="${M}" y1="${f(yL - 14)}" x2="${M + WL}" y2="${f(yL - 14)}" stroke="${C.dalle}" stroke-width="1.5"/>`;
    s += `<g transform="translate(${M + WL + GAP + GOUT} ${f(yE)})">${e.corps}</g>`;
    yE += e.h + 36;
  }
  const H = Math.ceil(Math.max(yL, yE) + M);
  const telephone = `<rect x="${M + WL + GAP}" y="${yE0}" width="${CADRE}" height="${f(yE - yE0 - 16)}" fill="none" stroke="${C.dalle}" stroke-width="2"/>`;
  const doc =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${LARGEUR}" height="${H}">${STYLE}` +
    `<rect width="${LARGEUR}" height="${H}" fill="${C.ivoire}"/>${telephone}${s}</svg>`;
  await sharp(Buffer.from(doc)).png({ compressionLevel: 9 }).toFile(sortie);
  console.log(`${sortie} ${LARGEUR} × ${H}`);
}

await planche('fr', join(ICI, 'planche.png'));
// Contrôle de l'anglais, hors livrable : node planche.mjs <dossier>
if (process.argv[2]) await planche('en', join(process.argv[2], 'planche.en.png'));
for (const [k, v] of Object.entries(rendus)) console.log(`${k} : hauteur ${Math.ceil(v.h)}`);

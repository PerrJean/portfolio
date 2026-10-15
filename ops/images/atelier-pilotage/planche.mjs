// Les trois schémas du projet « atelier de pilotage » (registre/0090), dans
// le style de la Fusion (../fusion/planche.mjs) : au trait, cadres à angles
// droits à l'encre, liaisons et flèches en ardoise, fond ivoire, l'ambre
// seule lumière (jamais de texte), aucune animation.
//  1. frise : les trois temps de l'atelier ; Explorer et Confronter, qui ont
//     pris l'essentiel de la séance, plus larges et seuls à porter l'ambre ;
//     Projeter, écourté, plus étroit, au trait fin. Aucune durée ;
//  2. donnee-decision : donnée brute → donnée comparée → décision, sur un
//     exemple fictif (10 h, 6 h, 60 %) ; l'écart à l'objectif en ambre ;
//  3. niveaux : contrat → groupe → apprenant, la même lecture à chaque niveau
//     (temps passé, ligne de l'objectif, écart en ambre), sans aucun chiffre.
// Deux dispositions : « large » (736 px) et « etroit » (350 px). Texte à
// 16 px en large, 15 px en étroit, tracé en chemins depuis la police du site
// (../accueil/police.mjs) : le SVG ne charge rien.
// Produit <schema>.<langue>.svg, <schema>.etroit.<langue>.svg et planche.png
// (FR, large à gauche, étroit à droite dans un cadre de 390 px).
// Relançable : node ops/images/atelier-pilotage/planche.mjs [dossier-planche-en]

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { police, couper } from '../accueil/police.mjs';

const ICI = fileURLToPath(new URL('./', import.meta.url));
const C = { ivoire: '#FEFAF2', encre: '#2A1F1A', ambre: '#F2A33A', ardoise: '#5E7488', dalle: '#D9D4CC' };
const STYLE = `<style>.fe{fill:${C.encre}}.fs{fill:${C.ardoise}}</style>`;
const P = { 400: police(400), 700: police(700) };
const NB = ' '; // insécable : « 6 h », « : », « % » ne se séparent pas

const MODES = {
  large: { W: 736, T: 16, H: 17 },
  etroit: { W: 350, T: 15, H: 16 },
};

// ---------------------------------------------------------------------------
// Les libellés, FR et EN (anglais britannique, naturel, pas traduit).

const TEXTES = {
  fr: {
    temps: [
      { titre: 'Explorer', etapes: ['Situations', 'Décisions', 'Données utiles'] },
      { titre: 'Projeter', sous: 'écourté', etapes: ['Formats', 'Niveau de détail'] },
      { titre: 'Confronter', etapes: ['Maquettes', 'Retours des clients', 'Hypothèse confirmée'] },
    ],
    brute: 'Donnée brute', comparee: 'Donnée comparée', decision: 'Décision',
    passe: `Temps passé${NB}: 6${NB}h`,
    objectif: `Objectif${NB}: 10${NB}h`, realise: `Réalisé${NB}: 6${NB}h`,
    part: `60${NB}% de l’objectif`, ecart: 'écart',
    agir: 'Repérer les apprenants et les groupes à accompagner',
    fictif: 'Exemple fictif',
    niveaux: [
      ['Contrat', 'la vue d’ensemble'],
      ['Groupe', 'les classes ou équipes en retard'],
      ['Apprenant', 'qui a atteint son objectif'],
    ],
    ligneObjectif: 'objectif', tempsPasse: 'temps passé',
    titres: {
      frise: `Les trois temps de l’atelier, de gauche à droite. Explorer : des situations aux décisions, puis aux données utiles. Projeter, écourté : les formats, puis le niveau de détail. Confronter : les maquettes, les retours des clients, l’hypothèse confirmée. Explorer et Confronter, plus larges et mis en couleur, ont pris l’essentiel de la séance.`,
      'donnee-decision': `Exemple fictif, en trois étapes. Donnée brute : temps passé, 6 heures. Donnée comparée : objectif de 10 heures, 6 réalisées, soit 60 % de l’objectif ; l’écart restant est mis en couleur. Décision : repérer les apprenants et les groupes à accompagner.`,
      niveaux: `La même lecture à trois niveaux, du plus large au plus fin : le temps passé face à la ligne de l’objectif, l’écart mis en couleur. Contrat : la vue d’ensemble, une seule barre. Groupe : les classes ou équipes en retard, quelques barres. Apprenant : qui a atteint son objectif, une barre par personne, un point au bout de celles qui l’atteignent.`,
    },
  },
  en: {
    temps: [
      { titre: 'Explore', etapes: ['Situations', 'Decisions', 'Useful data'] },
      { titre: 'Shape', sous: 'cut short', etapes: ['Formats', 'Level of detail'] },
      { titre: 'Test', etapes: ['Mockups', 'Client feedback', 'Hypothesis confirmed'] },
    ],
    brute: 'Raw data', comparee: 'Against a target', decision: 'Decision',
    passe: `Time spent: 6${NB}hours`,
    objectif: `Target: 10${NB}hours`, realise: `Spent: 6${NB}hours`,
    part: '60% of target', ecart: 'gap',
    agir: 'Spot the learners and groups who need support',
    fictif: 'Fictional example',
    niveaux: [
      ['Contract', 'the overall picture'],
      ['Group', 'classes or teams falling behind'],
      ['Learner', 'who has reached their target'],
    ],
    ligneObjectif: 'target', tempsPasse: 'time spent',
    titres: {
      frise: 'The three parts of the workshop, from left to right. Explore: from situations to decisions, then to useful data. Shape, cut short: formats, then level of detail. Test: mockups, client feedback, hypothesis confirmed. Explore and Test, wider and highlighted, took up most of the session.',
      'donnee-decision': 'A fictional example, in three steps. Raw data: time spent, 6 hours. Against a target: a 10-hour target, 6 hours spent, so 60% of the target; the remaining gap is highlighted. Decision: spot the learners and groups who need support.',
      niveaux: 'The same reading at three levels, from broadest to finest: time spent against the target line, with the gap highlighted. Contract: the overall picture, a single bar. Group: classes or teams falling behind, a few bars. Learner: who has reached their target, one bar per person, with a dot at the end of those that reach it.',
    },
  },
};

// ---------------------------------------------------------------------------
// Les briques (celles de la Fusion) : texte en chemins, cadres, flèches.

const f = (v) => +v.toFixed(2);
const largeur = (t, taille, g = 400) => P[g].largeur(t, taille);

function ligne(t, x, y, taille, g = 400, ancre = 'start') {
  const l = largeur(t, taille, g);
  const x0 = ancre === 'middle' ? x - l / 2 : ancre === 'end' ? x - l : x;
  return P[g].chemin(t, f(x0), f(y), taille, 0, 'fe');
}

/** Un bloc coupé à `max` px, haut du bloc en `haut`. Rend { svg, h, l, n }. */
function bloc(t, x, haut, max, taille, g = 400, ancre = 'start', interligne = 1.3) {
  const lignes = couper(t, max, (s) => largeur(s, taille, g), true);
  for (const l of lignes) if (largeur(l, taille, g) > max + 0.5) console.warn(`DÉBORDE (${f(max)} px) : ${l}`);
  const lh = interligne * taille;
  const svg = lignes
    .map((l, i) => ligne(l, x, haut + i * lh + (lh - 1.3 * taille) / 2 + 0.984 * taille, taille, g, ancre))
    .join('');
  return { svg, h: lignes.length * lh, l: Math.max(...lignes.map((l) => largeur(l, taille, g))), n: lignes.length };
}

/** Un bloc centré verticalement dans [y, y + h]. */
const blocCentre = (t, x, y, h, max, taille, g, ancre) => {
  const essai = bloc(t, x, 0, max, taille, g, ancre);
  return bloc(t, x, y + (h - essai.h) / 2 + 0.04 * taille, max, taille, g, ancre).svg;
};

function cadre(x, y, w, h, trait = 'continu', fond = C.ivoire) {
  const r = (e, a = '') =>
    `<rect x="${f(x + e)}" y="${f(y + e)}" width="${f(w - 2 * e)}" height="${f(h - 2 * e)}" ${a}/>`;
  switch (trait) {
    case 'continu':
      return r(0.75, `fill="${fond}" stroke="${C.encre}" stroke-width="1.5"`);
    case 'fin':
      return r(0.5, `fill="${fond}" stroke="${C.encre}" stroke-width="1"`);
  }
  throw new Error(trait);
}

const bout = (x, y, angle) =>
  `<path transform="translate(${f(x)} ${f(y)}) rotate(${angle})" d="M-5.5,-5L0,0L-5.5,5" fill="none" stroke="${C.ardoise}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`;
const trace = (d) =>
  `<path d="${d}" fill="none" stroke="${C.ardoise}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`;
const flecheH = (x1, x2, y) => trace(`M${f(x1)},${f(y)}H${f(x2)}`) + bout(x2, y, 0);
const flecheV = (x, y1, y2) => trace(`M${f(x)},${f(y1)}V${f(y2)}`) + bout(x, y2, 90);
const plein = (x, y, w, h, fond) => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fond}"/>`;

const svg = (W, H, titre, corps) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${f(H)}" width="${W}" height="${Math.ceil(H)}" role="img" aria-label="${titre.replace(/"/g, '&quot;')}">` +
  `<title>${titre}</title>${STYLE}<rect width="${W}" height="${f(H)}" fill="${C.ivoire}"/>${corps}</svg>\n`;

// ---------------------------------------------------------------------------
// 1. La frise. En large, trois colonnes de gauche à droite, les étapes en
// descente dans chacune ; en étroit, trois bandes de haut en bas, les étapes
// en chaîne dans chacune. Explorer et Confronter : en-tête en ambre, trait
// continu, pleine largeur ; Projeter : en-tête ivoire, trait fin, plus étroit.

function frise(x, mode) {
  const { W, T, H } = MODES[mode];
  const pad = mode === 'etroit' ? 8 : 14;
  let s = '';

  // L'en-tête d'un temps : le titre en gras, « écourté » à côté ou dessous.
  const entete = (t, px, py, w, hh) => {
    const fort = t.sous === undefined;
    let r = fort ? cadre(px, py, w, hh, 'continu', C.ambre) : '';
    if (!t.sous) return r + blocCentre(t.titre, px + pad, py, hh, w - 2 * pad, H, 700);
    if (mode === 'etroit') {
      const lt = largeur(t.titre, H, 700);
      return r + blocCentre(t.titre, px + pad, py, hh, lt + 1, H, 700) + blocCentre(t.sous, px + pad + lt + 10, py, hh, w, T);
    }
    const a = bloc(t.titre, 0, 0, w - 2 * pad, H, 700), b = bloc(t.sous, 0, 0, w - 2 * pad, T);
    const y0 = py + (hh - a.h - b.h) / 2;
    return r + bloc(t.titre, px + pad, y0, w - 2 * pad, H, 700).svg + bloc(t.sous, px + pad, y0 + a.h, w - 2 * pad, T).svg;
  };

  if (mode === 'large') {
    const larges = 262, etroite = 150, gap = (W - 2 * larges - etroite) / 2;
    const ws = [larges, etroite, larges];
    const xs = [0, larges + gap, larges + gap + etroite + gap];
    const hh = 1.3 * H + 1.3 * T + 16; // place pour « écourté » sous le titre
    const pas = 24; // la flèche entre deux étapes
    // Hauteur de chaque étape, à la largeur de sa colonne.
    const hs = x.temps.map((t, i) => t.etapes.map((e) => Math.max(38, bloc(e, 0, 0, ws[i] - 2 * pad - 20, T).h + 16)));
    const hCorps = (i) => hs[i].reduce((a, b) => a + b, 0) + (hs[i].length - 1) * pas;
    const corps = Math.max(...x.temps.map((_, i) => hCorps(i))) + 2 * pad;
    const hTot = hh + corps;
    x.temps.forEach((t, i) => {
      const fort = !t.sous;
      s += cadre(xs[i], 0, ws[i], hTot, fort ? 'continu' : 'fin');
      if (!fort) s += `<line x1="${xs[i]}" y1="${f(hh)}" x2="${xs[i] + ws[i]}" y2="${f(hh)}" stroke="${C.encre}" stroke-width="1"/>`;
      s += entete(t, xs[i], 0, ws[i], hh);
      let y = hh + (corps - hCorps(i)) / 2;
      t.etapes.forEach((e, k) => {
        const bw = ws[i] - 2 * pad;
        s += cadre(xs[i] + pad, y, bw, hs[i][k], 'fin') + blocCentre(e, xs[i] + pad + 10, y, hs[i][k], bw - 20, T);
        y += hs[i][k];
        if (k < t.etapes.length - 1) s += flecheV(xs[i] + ws[i] / 2, y + 4, y + pas - 4);
        y += pas;
      });
      if (i < 2) s += flecheH(xs[i] + ws[i] + 5, xs[i + 1] - 5, hh + corps / 2);
    });
    return { corps: s, h: hTot + 2 };
  }

  // Étroit : trois bandes, Projeter rentrée des deux côtés.
  const retrait = 36, gapE = 18, hh = 1.3 * H + 14, entre = 30;
  let y = 0;
  x.temps.forEach((t, i) => {
    const fort = !t.sous;
    const px = fort ? 0 : retrait, w = fort ? W : W - 2 * retrait;
    const n = t.etapes.length;
    const bw = (w - 2 * pad - (n - 1) * gapE) / n;
    const hb = Math.max(40, ...t.etapes.map((e) => bloc(e, 0, 0, bw - 12, T).h + 14));
    const hTot = hh + pad + hb + pad;
    s += cadre(px, y, w, hTot, fort ? 'continu' : 'fin');
    if (!fort) s += `<line x1="${px}" y1="${f(y + hh)}" x2="${px + w}" y2="${f(y + hh)}" stroke="${C.encre}" stroke-width="1"/>`;
    s += entete(t, px, y, w, hh);
    const yb = y + hh + pad;
    t.etapes.forEach((e, k) => {
      const bx = px + pad + k * (bw + gapE);
      s += cadre(bx, yb, bw, hb, 'fin') + blocCentre(e, bx + 6, yb, hb, bw - 12, T);
      if (k < n - 1) s += flecheH(bx + bw + 3, bx + bw + gapE - 3, yb + hb / 2);
    });
    y += hTot;
    if (i < 2) { s += flecheV(W / 2, y + 5, y + entre - 5); y += entre; }
  });
  return { corps: s, h: y + 2 };
}

// ---------------------------------------------------------------------------
// 2. De la donnée à la décision. Trois cadres reliés par des flèches (en
// ligne en large, en colonne en étroit), un titre en gras au-dessus de
// chacun ; au milieu, la jauge : réalisé à l'encre, écart en ambre.

function donneeDecision(x, mode) {
  const { W, T, H } = MODES[mode];
  const etroit = mode === 'etroit';
  const pad = 14, fl = 44; // marge intérieure, place d'une flèche
  const cw = etroit ? W : (W - 2 * fl) / 3;
  const iw = cw - 2 * pad; // largeur utile dans un cadre
  const hJauge = 26;

  // Le contenu de chaque cadre, dessiné à partir de (x0, y0) ; rend { svg, h }.
  const contenus = [
    (x0, y0) => { const b = bloc(x.passe, x0, y0, iw, T); return b; },
    (x0, y0) => {
      const a = bloc(x.objectif, x0, y0, iw, T), b = bloc(x.realise, x0, y0 + a.h, iw, T);
      const yj = y0 + a.h + b.h + 10;
      const pleinW = 0.6 * iw;
      let g = plein(x0, yj, pleinW, hJauge, C.encre) + plein(x0 + pleinW, yj, iw - pleinW, hJauge, C.ambre);
      g += `<rect x="${f(x0 + 0.75)}" y="${f(yj + 0.75)}" width="${f(iw - 1.5)}" height="${f(hJauge - 1.5)}" fill="none" stroke="${C.encre}" stroke-width="1.5"/>`;
      g += blocCentre(x.ecart, x0 + pleinW + (iw - pleinW) / 2, yj, hJauge, iw - pleinW - 8, T, 400, 'middle');
      const c = bloc(x.part, x0, yj + hJauge + 8, iw, T);
      return { svg: a.svg + b.svg + g + c.svg, h: a.h + b.h + 10 + hJauge + 8 + c.h };
    },
    (x0, y0) => bloc(x.agir, x0, y0, iw, T),
  ];
  const titres = [x.brute, x.comparee, x.decision];
  const hs = contenus.map((c) => c(0, 0).h);
  const hTitre = Math.max(...titres.map((t) => bloc(t, 0, 0, cw, H, 700).h));
  let s = '', bas;

  if (!etroit) {
    const hc = Math.max(...hs) + 2 * pad + 4;
    const yc = hTitre + 8;
    titres.forEach((t, i) => {
      const x0 = i * (cw + fl);
      s += bloc(t, x0, 0, cw, H, 700).svg + cadre(x0, yc, cw, hc, 'continu');
      s += contenus[i](x0 + pad, yc + (hc - hs[i]) / 2).svg;
      if (i < 2) s += flecheH(x0 + cw + 8, x0 + cw + fl - 8, yc + hc / 2);
    });
    bas = yc + hc;
  } else {
    let y = 0;
    titres.forEach((t, i) => {
      const ht = bloc(t, 0, y, cw, H, 700);
      s += ht.svg;
      y += ht.h + 6;
      const hc = hs[i] + 2 * pad + 4;
      s += cadre(0, y, cw, hc, 'continu') + contenus[i](pad, y + (hc - hs[i]) / 2).svg;
      y += hc;
      if (i < 2) { s += flecheV(W / 2, y + 6, y + 30); y += 38; }
    });
    bas = y;
  }
  // La mention, sous le schéma, à droite.
  const m = bloc(x.fictif, W, bas + 10, W, T, 400, 'end');
  return { corps: s + m.svg, h: bas + 10 + m.h + 2 };
}

// ---------------------------------------------------------------------------
// 3. Les trois niveaux, en descente. À chaque niveau, le libellé (le nom en
// gras, la phrase), puis des barres : le temps passé au trait, l'écart
// jusqu'à la ligne de l'objectif (tirets) en ambre ; une barre au contrat,
// quelques-unes aux groupes, une par apprenant ; un point au bout
// de qui a atteint l'objectif. Aucune valeur affichée.

const BARRES = [
  { h: 20, e: 0, v: [0.62] },
  { h: 11, e: 7, v: [0.88, 0.5, 1.06, 0.72] },
  { h: 9, e: 5, v: [1.1, 0.42, 0.86, 1.0, 0.28, 0.66, 1.04, 0.78] },
];

function niveaux(x, mode) {
  const { W, T, H } = MODES[mode];
  const etroit = mode === 'etroit';
  const xl = 22, xf = 7; // libellés, flèche de descente
  const gauche = etroit ? xl : 268; // début des barres
  const cw = W - gauche - 4;
  const ech = (etroit ? 0.78 : 0.82) * cw; // largeur d'une valeur 1
  const obj = gauche + ech; // la ligne de l'objectif
  const entre = 30; // entre deux niveaux
  let s = '', y = 0;
  const libs = [];

  BARRES.forEach((b, i) => {
    const [nom, phrase] = x.niveaux[i];
    const lw = etroit ? W - xl : gauche - xl - 22;
    const a = bloc(nom, xl, y, lw, H, 700), p = bloc(phrase, xl, y + a.h, lw, T);
    s += a.svg + p.svg;
    const hLib = a.h + p.h;
    libs.push([y, y + hLib]);
    // Les barres : sous le libellé en étroit, à sa droite en large.
    let yb = etroit ? y + hLib + 10 : y;
    if (i === 0) {
      s += ligne(x.ligneObjectif, obj, yb + 0.984 * T, T, 400, 'middle');
      yb += 1.3 * T + 6;
    } else if (!etroit) yb += 6;
    const hB = b.v.length * b.h + (b.v.length - 1) * b.e;
    b.v.forEach((v, k) => {
      const by = yb + k * (b.h + b.e);
      // Le temps passé au trait (contour encre, intérieur ivoire) ; un point
      // plein au bout de la barre de qui a atteint son objectif.
      s += `<rect x="${f(gauche + 0.75)}" y="${f(by + 0.75)}" width="${f(v * ech - 1.5)}" height="${f(b.h - 1.5)}" fill="${C.ivoire}" stroke="${C.encre}" stroke-width="1.5"/>`;
      if (v >= 1) s += `<circle cx="${f(gauche + v * ech + 8)}" cy="${f(by + b.h / 2)}" r="${Math.min(4, b.h / 2)}" fill="${C.encre}"/>`;
      if (v < 1) s += `<rect x="${f(gauche + v * ech)}" y="${f(by + 0.5)}" width="${f((1 - v) * ech - 0.75)}" height="${f(b.h - 1)}" fill="${C.ambre}" stroke="${C.encre}" stroke-width="1"/>`;
    });
    s += `<line x1="${f(obj)}" y1="${f(yb - 6)}" x2="${f(obj)}" y2="${f(yb + hB + 6)}" stroke="${C.encre}" stroke-width="2" stroke-dasharray="4 3"/>`;
    let fin = yb + hB + 6;
    if (i === 0) {
      // Le nom des deux parts, sous la barre du contrat.
      const yl = yb + hB + 6;
      s += ligne(x.tempsPasse, gauche, yl + 0.984 * T, T);
      s += ligne(x.ecart, gauche + (b.v[0] + (1 - b.v[0]) / 2) * ech, yl + 0.984 * T, T, 400, 'middle');
      fin = yl + 1.3 * T;
    }
    y = Math.max(fin, y + hLib) + entre;
  });
  // La descente : une flèche entre deux libellés.
  for (let i = 0; i < 2; i++) s += flecheV(xf, libs[i][0] + 4, libs[i + 1][0] + 14);
  return { corps: s, h: y - entre + 2 };
}

// ---------------------------------------------------------------------------
// Les fichiers, puis la planche.

const SCHEMAS = { frise, 'donnee-decision': donneeDecision, niveaux };
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
  const WL = MODES.large.W;
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

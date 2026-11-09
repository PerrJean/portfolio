// La police du site (Atkinson Hyperlegible Next, @fontsource, WOFF 1) lue
// sans paquet, de deux façons :
//  - police(graisse) : chasses (hmtx) et contours (glyf) des glyphes, pour
//    mesurer une ligne comme le navigateur (sans crénage) et la dessiner en
//    chemins SVG (maquette de l'en-tête, schémas, légendes des planches) ;
//  - avecPolicesTtf(graisses, travail) : la police convertie de WOFF en TTF
//    dans un dossier temporaire, effacé à la fin, pour le texte que sharp
//    compose lui-même (Pango : apercu.mjs, 404/planche.mjs ; registre/0038).

import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateSync } from 'node:zlib';

const FICHIERS = fileURLToPath(new URL('../../../node_modules/@fontsource/atkinson-hyperlegible-next/files/', import.meta.url));
const woff = (graisse) => readFileSync(join(FICHIERS, `atkinson-hyperlegible-next-latin-${graisse}-normal.woff`));

/** Les tables d'un WOFF 1, dans l'ordre du fichier : étiquette, somme de
 *  contrôle, données (décompressées par zlib quand elles l'étaient). */
function lireTables(woff) {
  if (woff.toString('latin1', 0, 4) !== 'wOFF') throw new Error('pas un WOFF 1');
  const n = woff.readUInt16BE(12);
  const tables = [];
  for (let i = 0; i < n; i++) {
    const e = 44 + i * 20;
    const off = woff.readUInt32BE(e + 4), comp = woff.readUInt32BE(e + 8), orig = woff.readUInt32BE(e + 12);
    const brut = woff.subarray(off, off + comp);
    tables.push({ tag: woff.subarray(e, e + 4), somme: woff.readUInt32BE(e + 16), data: comp < orig ? inflateSync(brut) : brut });
  }
  return tables;
}

/** WOFF 1 → TTF : un WOFF 1 est un sfnt dont chaque table est (ou non)
 *  compressée ; on garde les tables décompressées et on réécrit l'en-tête. */
function woffEnTtf(woff) {
  const tables = lireTables(woff);
  const n = tables.length;
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

/** Écrit les graisses demandées en TTF dans un dossier temporaire, passe à
 *  `travail` leurs chemins ({ 400: '…/atkinson-400.ttf', … }), puis efface
 *  le dossier, même en cas d'erreur. */
export async function avecPolicesTtf(graisses, travail) {
  const temporaire = mkdtempSync(join(tmpdir(), 'portfolio-police-'));
  try {
    const polices = {};
    for (const graisse of graisses) {
      polices[graisse] = join(temporaire, `atkinson-${graisse}.ttf`);
      writeFileSync(polices[graisse], woffEnTtf(woff(graisse)));
    }
    return await travail(polices);
  } finally {
    rmSync(temporaire, { recursive: true, force: true });
  }
}

// cmap : sous-table 3/1 (format 4).
function lireCmap(cmap) {
  const n = cmap.readUInt16BE(2);
  for (let i = 0; i < n; i++) {
    const pf = cmap.readUInt16BE(4 + i * 8), enc = cmap.readUInt16BE(6 + i * 8), off = cmap.readUInt32BE(8 + i * 8);
    if (pf !== 3 || enc !== 1 || cmap.readUInt16BE(off) !== 4) continue;
    const seg = cmap.readUInt16BE(off + 6) / 2;
    const fins = off + 14, debuts = fins + seg * 2 + 2, deltas = debuts + seg * 2, ranges = deltas + seg * 2;
    return (code) => {
      for (let s = 0; s < seg; s++) {
        if (code > cmap.readUInt16BE(fins + s * 2)) continue;
        const debut = cmap.readUInt16BE(debuts + s * 2);
        if (code < debut) return 0;
        const delta = cmap.readInt16BE(deltas + s * 2), ro = cmap.readUInt16BE(ranges + s * 2);
        if (ro === 0) return (code + delta) & 0xffff;
        const g = cmap.readUInt16BE(ranges + s * 2 + ro + (code - debut) * 2);
        return g === 0 ? 0 : (g + delta) & 0xffff;
      }
      return 0;
    };
  }
  throw new Error('cmap 3/1 introuvable');
}

/** Le lecteur des contours d'un glyphe (table glyf, index loca), en
 *  unités de la police (y vers le haut), en chemin SVG ; un glyphe composé
 *  suit ses composants. */
function lecteurContours(glyf, loca) {
  const contours = (g, dx = 0, dy = 0) => {
    const debut = loca(g), fin = loca(g + 1);
    if (fin === debut) return '';
    const b = glyf.subarray(debut, fin);
    const nc = b.readInt16BE(0);
    if (nc < 0) {
      let p = 10, d = '', drapeaux;
      do {
        drapeaux = b.readUInt16BE(p);
        const gi = b.readUInt16BE(p + 2);
        p += 4;
        let a1, a2;
        if (drapeaux & 1) { a1 = b.readInt16BE(p); a2 = b.readInt16BE(p + 2); p += 4; }
        else { a1 = b.readInt8(p); a2 = b.readInt8(p + 1); p += 2; }
        if (drapeaux & 8) p += 2; else if (drapeaux & 0x40) p += 4; else if (drapeaux & 0x80) p += 8;
        d += contours(gi, dx + a1, dy + a2);
      } while (drapeaux & 0x20);
      return d;
    }
    const finsPts = [];
    for (let i = 0; i < nc; i++) finsPts.push(b.readUInt16BE(10 + i * 2));
    const nPts = finsPts[nc - 1] + 1;
    let p = 10 + nc * 2;
    p += 2 + b.readUInt16BE(p);
    const dr = [];
    while (dr.length < nPts) {
      const f = b[p++];
      dr.push(f);
      if (f & 8) { let r = b[p++]; while (r--) dr.push(f); }
    }
    const coord = (court, meme) => {
      const v = [];
      let c = 0;
      for (const f of dr) {
        if (f & court) { const d = b[p++]; c += f & meme ? d : -d; }
        else if (!(f & meme)) { c += b.readInt16BE(p); p += 2; }
        v.push(c);
      }
      return v;
    };
    const xs = coord(2, 16), ys = coord(4, 32);
    let d = '', i0 = 0;
    const f = (v) => +v.toFixed(1);
    for (const iFin of finsPts) {
      const pts = [];
      for (let i = i0; i <= iFin; i++) pts.push({ x: xs[i] + dx, y: ys[i] + dy, sur: dr[i] & 1 });
      i0 = iFin + 1;
      // Départ sur un point de la courbe (réel ou implicite).
      let k = pts.findIndex((q) => q.sur);
      if (k < 0) { pts.unshift({ x: (pts[0].x + pts.at(-1).x) / 2, y: (pts[0].y + pts.at(-1).y) / 2, sur: 1 }); k = 0; }
      const tour = [...pts.slice(k), ...pts.slice(0, k)];
      d += `M${f(tour[0].x)},${f(tour[0].y)}`;
      for (let i = 1; i <= tour.length; i++) {
        const q = tour[i % tour.length];
        if (q.sur) { d += `L${f(q.x)},${f(q.y)}`; continue; }
        const r = tour[(i + 1) % tour.length];
        const bout = r.sur ? r : { x: (q.x + r.x) / 2, y: (q.y + r.y) / 2 };
        d += `Q${f(q.x)},${f(q.y)} ${f(bout.x)},${f(bout.y)}`;
        if (r.sur) i++;
      }
      d += 'Z';
    }
    return d;
  };
  return contours;
}

export function police(graisse) {
  const t = Object.fromEntries(lireTables(woff(graisse)).map((e) => [e.tag.toString('latin1'), e.data]));
  const glyphe = lireCmap(t.cmap);
  const nh = t.hhea.readUInt16BE(34);
  const longLoca = t.head.readInt16BE(50) === 1;
  const loca = (g) => (longLoca ? t.loca.readUInt32BE(g * 4) : t.loca.readUInt16BE(g * 2) * 2);
  const chasse = (g) => t.hmtx.readUInt16BE(4 * Math.min(g, nh - 1));

  const contours = lecteurContours(t.glyf, loca);

  /** Chasse d'une chaîne en px, à `taille` px, `espacement` en em. */
  const largeur = (texte, taille, espacement = 0) =>
    [...texte].reduce((s, c) => s + (chasse(glyphe(c.codePointAt(0))) / 1000) * taille + espacement * taille, 0);

  /** La chaîne en un <path>, ligne de base en (x, y). */
  const chemin = (texte, x, y, taille, espacement = 0, classe = 'fe') => {
    let d = '', cx = 0;
    for (const c of texte) {
      const g = glyphe(c.codePointAt(0));
      const c0 = contours(g);
      if (c0) d += `<path transform="translate(${(x + cx).toFixed(2)} ${y}) scale(${taille / 1000} ${-taille / 1000})" d="${c0}"/>`;
      cx += (chasse(g) / 1000) * taille + espacement * taille;
    }
    return `<g class="${classe}">${d}</g>`;
  };

  return { largeur, chemin, ascendante: t.hhea.readInt16BE(4) / 1000, descendante: -t.hhea.readInt16BE(6) / 1000 };
}

/** Coupe comme le navigateur : mots séparés par les espaces ordinaires
 *  (l'insécable tient), au plus `max` px ; `equilibre` imite
 *  text-wrap: balance (même nombre de lignes, la plus étroite possible). */
export function couper(texte, max, mesure, equilibre = false) {
  const mots = texte.split(' ');
  const glouton = (w) => {
    const lignes = [];
    let l = '';
    for (const m of mots) {
      const essai = l ? `${l} ${m}` : m;
      if (l && mesure(essai) > w) { lignes.push(l); l = m; } else l = essai;
    }
    lignes.push(l);
    return lignes;
  };
  const base = glouton(max);
  if (!equilibre) return base;
  let bas = 0, haut = max;
  while (haut - bas > 0.5) {
    const m = (bas + haut) / 2;
    if (glouton(m).length <= base.length) haut = m; else bas = m;
  }
  return glouton(haut);
}

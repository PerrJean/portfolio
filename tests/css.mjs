// Outils de lecture du CSS construit, pour les tests qui jugent un rendu
// (registre/0089). Aucune dépendance : un découpage en règles assez juste pour
// la sortie minifiée d'Astro, pas un moteur CSS.
// Ce fichier n'est pas un test (il ne finit pas en .test.mjs).

import { lire } from './outils.mjs';

const sansCommentaires = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');

/** Index juste après la parenthèse fermante qui répond à celle de `ouvre`. */
export function fermer(chaine, ouvre) {
  let prof = 0;
  for (let i = ouvre; i < chaine.length; i++) {
    if (chaine[i] === '(') prof++;
    else if (chaine[i] === ')' && --prof === 0) return i + 1;
  }
  return chaine.length;
}

/** Découpe sur `sep`, hors parenthèses, crochets et guillemets. */
export function decouper(chaine, sep) {
  const parts = [];
  let prof = 0;
  let guillemet = null;
  let courant = '';
  for (const c of chaine) {
    if (guillemet) {
      courant += c;
      if (c === guillemet) guillemet = null;
      continue;
    }
    if (c === '"' || c === "'") guillemet = c;
    else if (c === '(' || c === '[') prof++;
    else if (c === ')' || c === ']') prof--;
    if (prof === 0 && (sep === ' ' ? /\s/.test(c) : c === sep)) {
      parts.push(courant);
      courant = '';
    } else courant += c;
  }
  parts.push(courant);
  return parts.map((p) => p.trim()).filter(Boolean);
}

/** Sélecteur sans les attributs de portée d'Astro, combinateurs resserrés. */
export const normaliser = (sel) =>
  sel
    .replace(/\[data-astro-cid-[\w-]+\]/g, '')
    .replace(/\s*([>+~])\s*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

/** `:is(…)` et `:where(…)` dépliés : `.a:is(:b,:c)` → [`.a:b`, `.a:c`]. */
export function deplier(sel) {
  const m = /:(?:is|where|matches)\(/.exec(sel);
  if (!m) return [sel];
  const ouvre = m.index + m[0].length - 1;
  const fin = fermer(sel, ouvre);
  return decouper(sel.slice(ouvre + 1, fin - 1), ',').flatMap((arg) =>
    deplier(sel.slice(0, m.index) + arg + sel.slice(fin)),
  );
}

/**
 * Les règles de style d'un CSS, dans l'ordre :
 * { bruts, paires, selecteurs, decl: [[prop, valeur]], medias, rang }.
 * `bruts` : les sélecteurs tels qu'écrits (pour la spécificité) ;
 * `selecteurs` : normalisés et dépliés ; `paires` : [normalisé, brut].
 * Les @keyframes sont ignorés.
 */
export function regles(css, depart = 0) {
  const sortie = [];
  const pile = [];
  let tampon = '';
  let guillemet = null;
  for (const c of sansCommentaires(css)) {
    if (guillemet) {
      tampon += c;
      if (c === guillemet) guillemet = null;
    } else if (c === '"' || c === "'") {
      guillemet = c;
      tampon += c;
    } else if (c === '{') {
      pile.push(tampon.split(';').pop().trim());
      tampon = '';
    } else if (c === '}') {
      const tete = pile.pop();
      if (tete && !tete.startsWith('@') && !pile.some((t) => /^@(?:-\w+-)?keyframes/i.test(t))) {
        const bruts = decouper(tete, ',');
        const paires = bruts.flatMap((b) => deplier(normaliser(b)).map((s) => [s, b]));
        sortie.push({
          bruts,
          paires,
          selecteurs: paires.map(([s]) => s),
          decl: decouper(tampon, ';')
            .map((d) => d.indexOf(':') > 0 && [d.slice(0, d.indexOf(':')).trim().toLowerCase(), d.slice(d.indexOf(':') + 1).replace(/!important\s*$/i, '').trim()])
            .filter(Boolean),
          medias: pile.filter((t) => t.startsWith('@')),
          rang: depart + sortie.length,
        });
      }
      tampon = '';
    } else tampon += c;
  }
  return sortie;
}

/** Valeur (la dernière) d'une propriété dans une règle, ou undefined. */
export const valeur = (regle, prop) => regle.decl.filter(([p]) => p === prop).pop()?.[1];

/** Les règles dont l'un des sélecteurs normalisés vaut l'un de ceux donnés. */
export const reglesDe = (tout, ...sels) => tout.filter((r) => r.selecteurs.some((s) => sels.includes(s)));

/** Le CSS d'une page : feuilles liées et balises <style>, dans l'ordre du document. */
export function cssDePage(rel) {
  const html = lire(rel).replace(/<!--[\s\S]*?-->/g, '');
  const morceaux = [];
  for (const m of html.matchAll(/<link\b([^>]*)>|<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi)) {
    if (m[2] !== undefined) morceaux.push(m[2]);
    else if (/\brel\s*=\s*["']?stylesheet/i.test(m[1])) {
      const href = /\bhref\s*=\s*["']?([^"'\s>]+)/i.exec(m[1])?.[1];
      if (href?.startsWith('/') && !href.startsWith('//')) morceaux.push(lire(href.slice(1)));
    }
  }
  const sortie = [];
  for (const css of morceaux) sortie.push(...regles(css, sortie.length));
  return sortie;
}

/** Les propriétés personnalisées de :root : { '--encre': '#2a1f1a', … }. */
export function racine(tout) {
  const jetons = {};
  for (const r of reglesDe(tout, ':root')) for (const [p, v] of r.decl) if (p.startsWith('--')) jetons[p] = v;
  return jetons;
}

/** Remplace les var(--x, repli) par leur valeur, récursivement ; hex en minuscules. */
export function resoudre(val, ...portees) {
  let v = val ?? '';
  for (let tour = 0; tour < 10 && v.includes('var('); tour++) {
    const i = v.indexOf('var(');
    const fin = fermer(v, i + 3);
    const [nom, ...repli] = decouper(v.slice(i + 4, fin - 1), ',');
    const trouve = portees.find((p) => p[nom] !== undefined)?.[nom] ?? repli.join(',');
    v = v.slice(0, i) + trouve + v.slice(fin);
  }
  return v.trim().replace(/#[0-9a-f]{3,8}\b/gi, (h) => h.toLowerCase());
}

/** Une longueur simple ou un calc() de longueurs, en px (1 rem = 16 px). */
export function enPx(expr) {
  const js = expr
    .replace(/calc\(/g, '(')
    .replace(/(-?\d*\.?\d+)(rem|em)\b/g, '($1*16)')
    .replace(/(-?\d*\.?\d+)px\b/g, '($1)');
  if (!/^[\d\s.+\-*/()]+$/.test(js)) return NaN;
  return Function(`return (${js});`)();
}

/** Les quatre côtés [haut, droite, bas, gauche] d'un raccourci margin / padding. */
export function cotes(val) {
  const v = decouper(val, ' ');
  return [v[0], v[1] ?? v[0], v[2] ?? v[0], v[3] ?? v[1] ?? v[0]];
}

/** Spécificité [a, b, c] d'un sélecteur (un seul, sans virgule). */
export function specificite(sel) {
  let a = 0;
  let b = 0;
  let c = 0;
  const ident = (i) => {
    while (i < sel.length && /[\w-]/.test(sel[i])) i++;
    return i;
  };
  let i = 0;
  while (i < sel.length) {
    const ch = sel[i];
    if (ch === '#') { a++; i = ident(i + 1); }
    else if (ch === '.') { b++; i = ident(i + 1); }
    else if (ch === '[') { b++; i = sel.indexOf(']', i) + 1; }
    else if (ch === ':' && sel[i + 1] === ':') { c++; i = ident(i + 2); if (sel[i] === '(') i = fermer(sel, i); }
    else if (ch === ':') {
      const debut = i + 1;
      i = ident(debut);
      const nom = sel.slice(debut, i).toLowerCase();
      if (sel[i] === '(') {
        const fin = fermer(sel, i);
        const args = decouper(sel.slice(i + 1, fin - 1), ',');
        i = fin;
        if (['is', 'not', 'has', 'matches'].includes(nom)) {
          const max = args.map(specificite).sort(compSpec).pop() ?? [0, 0, 0];
          a += max[0]; b += max[1]; c += max[2];
        } else if (nom !== 'where') b++;
      } else if (['before', 'after', 'first-line', 'first-letter'].includes(nom)) c++;
      else b++;
    } else if (/[a-zA-Z_]/.test(ch)) { c++; i = ident(i); }
    else i++;
  }
  return [a, b, c];
}

/** Comparaison de deux spécificités (pour sort) : négatif si x < y. */
export const compSpec = (x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2];

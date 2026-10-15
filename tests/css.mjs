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

/**
 * Remplace les var(--x, repli) par leur valeur, récursivement ; hex en
 * minuscules. Une portée est un objet { '--x': valeur } ou une fonction nom → valeur.
 */
export function resoudre(val, ...portees) {
  let v = val ?? '';
  for (let tour = 0; tour < 10 && v.includes('var('); tour++) {
    const i = v.indexOf('var(');
    const fin = fermer(v, i + 3);
    const [nom, ...repli] = decouper(v.slice(i + 4, fin - 1), ',');
    const lu = (p) => (typeof p === 'function' ? p(nom) : p[nom]);
    const trouve = lu(portees.find((p) => lu(p) !== undefined) ?? {}) ?? repli.join(',');
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


// --- La cascade sur le DOM réel ---------------------------------------------
// Pour juger un rendu sans dépendre de l'écriture d'un sélecteur : chaque règle
// est confrontée aux éléments de la page (elements() d'outils.mjs), à une
// largeur d'écran donnée, dans un état donné (survol, focus). Ce n'est pas un
// moteur CSS : pas de !important, pas de couches, :nth-child seulement
// numérique, les pseudo-classes inconnues sont tenues pour vraies (on
// surestime ce qui peut viser).

const LONGUEUR = /^-?\d*\.?\d+(?:px|rem|em|%)?$|^(?:thin|medium|thick)$/;
const STYLE_DE_TRAIT = /^(?:none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|auto)$/;

/**
 * Une requête @media est-elle vraie dans ce contexte d'écran
 * { largeur, survol (souris fine), reduit (mouvement réduit) } ? Les
 * en-têtes qui ne sont pas des @media (@supports, @layer) sont vrais.
 * Une caractéristique inconnue lève une erreur : mieux vaut un test rouge
 * qu'une media devinée.
 */
export function evaluerMedia(tete, ctx) {
  if (!/^@media\b/i.test(tete)) return true;
  return decouper(tete.replace(/^@media\s*/i, ''), ',').some((requete) => {
    let q = requete.trim().toLowerCase();
    const non = q.startsWith('not ');
    if (non) q = q.slice(4);
    const vrai = q
      .replace(/^only\s+/, '')
      .split(/\s+and\s+/)
      .every((t) => terme(t.trim(), ctx, tete));
    return non ? !vrai : vrai;
  });
}

function terme(t, ctx, tete) {
  if (t === 'all' || t === 'screen') return true;
  if (t === 'print') return false;
  const m = /^\(\s*([\w-]+)\s*(?::\s*([^)]+))?\)$/.exec(t);
  const v = m?.[2]?.trim() ?? '';
  switch (m?.[1]) {
    case 'min-width': return ctx.largeur >= enPx(v);
    case 'max-width': return ctx.largeur <= enPx(v);
    case 'hover': return (v === '' || v === 'hover') === Boolean(ctx.survol);
    case 'pointer': return (v === '' || v === 'fine') === Boolean(ctx.survol);
    case 'prefers-reduced-motion': return (v === 'reduce') === Boolean(ctx.reduit);
    case 'prefers-color-scheme': return v === 'light';
    default: throw new Error(`@media non évaluée par tests/css.mjs : « ${t} » dans « ${tete} »`);
  }
}

const PARTIE = /\.([\w-]+)|#([\w-]+)|\[\s*([\w:-]+)\s*(?:([~|^$*]?=)\s*(?:"([^"]*)"|'([^']*)'|([^\]\s]*)))?\s*\w?\s*\]|:([\w-]+)(\((?:[^()]|\([^()]*\))*\))?/y;

/** Un compose (sans combinateur) vise-t-il cet élément, dans l'état { survol, focus } ? */
function compose(c, el, etat) {
  const t = /^(\*|[a-zA-Z][\w-]*)/.exec(c);
  if (t && t[1] !== '*' && t[1].toLowerCase() !== el.nom) return false;
  PARTIE.lastIndex = t ? t[0].length : 0;
  let m;
  while (PARTIE.lastIndex < c.length && (m = PARTIE.exec(c))) {
    if (m[1] && !el.classes.includes(m[1])) return false;
    if (m[2] && el.attrs.id !== m[2]) return false;
    if (m[3]) {
      const v = el.attrs[m[3].toLowerCase()];
      if (v === undefined || (m[4] === '=' && v !== (m[5] ?? m[6] ?? m[7]))) return false;
    }
    if (!m[8]) continue;
    const arg = m[9]?.slice(1, -1).trim() ?? '';
    const dans = (cible) => Boolean(cible && (cible === el || cible.ancetres.includes(el)));
    switch (m[8].toLowerCase()) {
      case 'root': if (el.nom !== 'html') return false; break;
      case 'hover': if (!dans(etat.survol)) return false; break;
      case 'focus': case 'focus-visible': if (etat.focus !== el) return false; break;
      case 'focus-within': if (!dans(etat.focus)) return false; break;
      case 'active': case 'visited': case 'target': case 'checked': case 'disabled': return false;
      case 'first-child': if (el.rang !== 1) return false; break;
      case 'nth-child': if (/^\d+$/.test(arg) && el.rang !== Number(arg)) return false; break;
      case 'not':
        if (decouper(arg, ',').some((a) => !/[\s>+~]/.test(a) && compose(a, el, etat))) return false;
        break;
      default: break;
    }
  }
  return true;
}

/** Un sélecteur (sans virgule) en composes : [{ c, comb }], comb étant le combinateur à sa gauche. */
function composes(sel) {
  const parts = [];
  let courant = '';
  let comb = ' ';
  let prof = 0;
  for (const ch of sel) {
    if (ch === '(' || ch === '[') prof++;
    else if (ch === ')' || ch === ']') prof--;
    if (prof === 0 && /[\s>+~]/.test(ch)) {
      if (courant) {
        parts.push({ c: courant, comb });
        courant = '';
        comb = ' ';
      }
      if (!/\s/.test(ch)) comb = ch;
    } else courant += ch;
  }
  if (courant) parts.push({ c: courant, comb });
  return parts;
}

function correspond(parts, i, el, etat) {
  if (!el || !compose(parts[i].c, el, etat)) return false;
  if (i === 0) return true;
  const { comb } = parts[i];
  if (comb === '>') return correspond(parts, i - 1, el.parent, etat);
  if (comb === '+') return correspond(parts, i - 1, el.precedent, etat);
  if (comb === '~') {
    for (let p = el.precedent; p; p = p.precedent) if (correspond(parts, i - 1, p, etat)) return true;
    return false;
  }
  return el.ancetres.some((a) => correspond(parts, i - 1, a, etat));
}

/** Le sélecteur brut vise-t-il l'élément lui-même (pas un pseudo-élément) ? */
export const vise = (brut, el, etat = {}) =>
  !/::|:(?:before|after|first-line|first-letter|marker|placeholder|selection)\b/i.test(brut) &&
  deplier(brut).some((sel) => {
    const parts = composes(sel);
    return parts.length > 0 && correspond(parts, parts.length - 1, el, etat);
  });

/** Largeur, style, couleur d'un raccourci de trait (border-top, outline). */
export function traitDe(v = '') {
  const t = { largeur: undefined, style: undefined, couleur: undefined };
  for (const mot of decouper(v, ' ')) {
    if (LONGUEUR.test(mot)) t.largeur = mot;
    else if (STYLE_DE_TRAIT.test(mot)) t.style = mot;
    else t.couleur = mot;
  }
  return t;
}

const tel = (v) => v;
const axe = (i) => (v) => decouper(v, ' ')[i] ?? decouper(v, ' ')[0];
const cote = (i) => (v) => cotes(v)[i];
const mot = (k, defaut) => (v) => traitDe(v)[k] ?? defaut;
const imageDe = (v) => decouper(v, ' ').find((t) => /gradient\(|url\(/.test(t)) ?? 'none';
const couleurDeFond = (v) =>
  decouper(v, ' ')
    .filter((t) => !/gradient\(|url\(/.test(t) && /^(?:var\(|#|rgba?\(|hsla?\(|transparent$|currentcolor$)/i.test(t))
    .pop() ?? 'transparent';
const decorations = (v) =>
  decouper(v, ' ').filter((t) => /^(?:none|underline|overline|line-through)$/.test(t)).join(' ') || 'none';
const sansRepetition = (v) => decouper(v, ' ').filter((t) => !/^(?:stretch|repeat|round|space)$/.test(t)).join(' ');

/** Pour chaque propriété longue : [propriété déclarée, ce qu'on en extrait]. */
const COMPOSANTES = {
  'background-color': [['background', couleurDeFond], ['background-color', tel]],
  'background-image': [['background', imageDe], ['background-image', tel]],
  'text-decoration-line': [['text-decoration', decorations], ['text-decoration-line', tel]],
  'text-decoration-thickness': [
    ['text-decoration', (v) => decouper(v, ' ').find((t) => LONGUEUR.test(t)) ?? 'auto'],
    ['text-decoration-thickness', tel],
  ],
  'overflow-x': [['overflow', axe(0)], ['overflow-x', tel], ['overflow-inline', tel]],
  'border-image-source': [['border-image', (v) => imageDe(decouper(v, '/')[0])], ['border-image-source', tel]],
  'border-image-slice': [
    ['border-image', (v) => decouper(decouper(v, '/')[0], ' ').filter((t) => !/gradient\(|url\(/.test(t)).join(' ')],
    ['border-image-slice', tel],
  ],
  'border-image-outset': [['border-image', (v) => sansRepetition(decouper(v, '/')[2] ?? '0')], ['border-image-outset', tel]],
  transition: [['transition', tel], ['transition-property', tel], ['transition-duration', tel]],
  'outline-width': [['outline', mot('largeur', 'medium')], ['outline-width', tel]],
  'outline-style': [['outline', mot('style', 'none')], ['outline-style', tel]],
  'outline-color': [['outline', mot('couleur', 'currentcolor')], ['outline-color', tel]],
};
const LOGIQUES = {
  top: ['block', axe(0), 'block-start'],
  bottom: ['block', axe(1), 'block-end'],
  left: ['inline', axe(0), 'inline-start'],
  right: ['inline', axe(1), 'inline-end'],
};
['top', 'right', 'bottom', 'left'].forEach((c, i) => {
  const [axeLogique, extraire, logique] = LOGIQUES[c];
  for (const base of ['margin', 'padding'])
    COMPOSANTES[`${base}-${c}`] = [
      [base, cote(i)],
      [`${base}-${axeLogique}`, extraire],
      [`${base}-${logique}`, tel],
      [`${base}-${c}`, tel],
    ];
  for (const [k, cle, defaut] of [['width', 'largeur', 'medium'], ['style', 'style', 'none'], ['color', 'couleur', 'currentcolor']])
    COMPOSANTES[`border-${c}-${k}`] = [
      ['border', mot(cle, defaut)],
      [`border-${c}`, mot(cle, defaut)],
      [`border-${logique}`, mot(cle, defaut)],
      [`border-${k}`, cote(i)],
      [`border-${c}-${k}`, tel],
    ];
});

/**
 * La déclaration qui l'emporte sur l'élément pour une propriété longue, à
 * cet écran et dans cet état : { valeur, prop, brute, brut, spec }, ou
 * undefined si aucune règle ne la pose (valeur initiale ou héritée).
 */
export function calcule(css, el, prop, etat = {}, ctx = {}) {
  const voies = COMPOSANTES[prop] ?? [[prop, tel]];
  const props = voies.map(([p]) => p);
  let meilleur = null;
  for (const r of css) {
    const d = r.decl.filter(([p]) => props.includes(p)).pop();
    if (!d || !r.medias.every((m) => evaluerMedia(m, ctx))) continue;
    for (const brut of r.bruts) {
      if (!vise(brut, el, etat)) continue;
      const spec = specificite(brut);
      if (!meilleur || compSpec(spec, meilleur.spec) >= 0) meilleur = { spec, brut, prop: d[0], brute: d[1] };
    }
  }
  if (!meilleur) return undefined;
  return { ...meilleur, valeur: voies.find(([p]) => p === meilleur.prop)[1](meilleur.brute) };
}

/** Comme calcule, en remontant aux ancêtres tant que rien n'est posé ou que la valeur est héritée. */
export function herite(css, el, prop, etat = {}, ctx = {}) {
  for (const n of [el, ...el.ancetres]) {
    const v = calcule(css, n, prop, etat, ctx);
    const heritee = /^(?:inherit|unset)$/i.test(v?.valeur ?? '') || (prop === 'color' && /^currentcolor$/i.test(v?.valeur ?? ''));
    if (v && !heritee) return { ...v, el: n };
  }
  return undefined;
}

/** Une valeur résolue sur l'élément : ses var() lues dans la cascade (les propriétés personnalisées héritent). */
export const resoudreSur = (css, val, el, etat = {}, ctx = {}) =>
  resoudre(val, (nom) => herite(css, el, nom, etat, ctx)?.valeur);

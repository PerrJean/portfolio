// Les jetons et les briques SVG communs aux scripts d'images : couleurs
// (src/styles/jetons.css), feuille de classes, arrondis et géométrie, et le
// repère d'une scène de Scene.astro (sol à y = 0, personnage de 120 de haut,
// viewBox 0 -140 L 160).

// Les jetons. Les deux anneaux intermédiaires du soleil sont les color-mix
// de Soleil.astro, calculés en sRGB.
export const C = {
  ivoire: '#FEFAF2',
  encre: '#2A1F1A',
  ambre: '#F2A33A',
  orange: '#B54E19',
  ardoise: '#5E7488',
  dalle: '#D9D4CC',
  anneau1: '#DE872F', // ambre 67 %, orange 33 %
  anneau2: '#C96A24', // ambre 33 %, orange 67 %
};

// Les classes de Scene.astro : f (fill) ou s (stroke), puis la couleur
// (e encre, i ivoire, a ardoise ou ambre, o orange, d dalle, s ardoise).
const REGLES = {
  fe: `fill:${C.encre}`,
  se: `stroke:${C.encre}`,
  fi: `fill:${C.ivoire}`,
  si: `stroke:${C.ivoire}`,
  sa: `stroke:${C.ardoise}`,
  so: `stroke:${C.orange}`,
  fa: `fill:${C.ambre}`,
  fd: `fill:${C.dalle}`,
  fs: `fill:${C.ardoise}`,
};
/** La feuille <style> des classes demandées, dans l'ordre donné. */
export const feuille = (classes = Object.keys(REGLES)) => `<style>${classes.map((c) => `.${c}{${REGLES[c]}}`).join('')}</style>`;
/** Toutes les classes : celle des scènes et des planches. */
export const STYLE = feuille();

/** La largeur du repère d'une scène (celle de Scene.astro). */
export const L = 426.667;

/** Arrondi au dixième (l'arrondi des coordonnées des scènes). */
export const r2 = (v) => Math.round(v * 10) / 10;
export const pt = ([x, y]) => `${r2(x)},${r2(y)}`;
export const add = ([a, b], [c, d]) => [a + c, b + d];
export const rad = (d) => (d * Math.PI) / 180;
/** Rotation d'un point de `deg` degrés autour de c (par défaut les hanches
 *  d'une pose, 0,-56 : la bascule de penche). */
export const tourne = ([x, y], deg, [cx, cy] = [0, -56]) => {
  const a = rad(deg), dx = x - cx, dy = y - cy;
  return [cx + dx * Math.cos(a) - dy * Math.sin(a), cy + dx * Math.sin(a) + dy * Math.cos(a)];
};

/** La ligne de sol, de x1 à x2. */
export const sol = (x1 = 0, x2 = L) => `<line class="se" x1="${x1}" y1="0" x2="${x2}" y2="0" stroke-width="1.5"/>`;
/** La dalle de l'en-tête, sous le sol (x 245 à 420, 12 de haut). */
export const DALLE = '<rect class="fd" x="245" y="0" width="175" height="12"/>';

/** Le fichier SVG d'une scène, 160 de haut. */
export const svgScene = (corps, { vue = `0 -140 ${L} 160`, largeur = L, style = STYLE } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vue}" width="${largeur}" height="160">${style}${corps}</svg>\n`;

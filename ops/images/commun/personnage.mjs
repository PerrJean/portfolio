// Le personnage des scènes, pour les poses dessinées dans les planches avant
// d'entrer dans src/components/scene/poses.ts : les mêmes pièces que
// poses.ts (qui ne les exporte pas), recopiées ici une seule fois, et la mise
// en place d'une pose dans une scène.

import { LUNETTES } from '../../../src/components/scene/poses.ts';
import { pt, r2 } from './svg.mjs';

const LIGNE = 'fill="none" stroke-linecap="round" stroke-linejoin="round"';
export const trait = (c, points, largeur) => `<polyline class="${c}" points="${points}" ${LIGNE} stroke-width="${largeur}"/>`;
/** Les deux jambes, jambe arrière d'abord (points en texte). */
export const jambes = (arriere, avant) => trait('se', arriere, 7.5) + trait('se', avant, 7.5);
/** Le bras arrière, sans liseré (derrière le buste), par ses points [x, y]. */
export const brasArriere = (...points) => trait('se', points.map(pt).join(' '), 7);
/** Le bras avant, avec son liseré ivoire, par ses points [x, y]. */
export const brasAvant = (...points) => {
  const p = points.map(pt).join(' ');
  return trait('si', p, 10) + trait('se', p, 7);
};
export const TORSE = '<path class="fe" d="M-9,-88 A9,9 0 0 1 9,-88 L9,-55 Q9,-52 6,-52 L-6,-52 Q-9,-52 -9,-55 Z"/>';
/** La tête ; {L} reçoit les lunettes de Jean, ou rien. */
export const TETE = '<circle class="fe" cx="1" cy="-110" r="10"/>{L}';
export const JAMBES_DEBOUT = jambes('-5.25,-56 -4.5,-4 0.5,-4', '5.25,-56 4.5,-4 9.5,-4');
/** Les épaules : arrière, avant. */
export const EP_AR = [0, -89], EP_AV = [1, -89];
/** Le bras avant de bras-tendus et de montre (1,-89 → 29,-73) : 32,2. */
export const LONG_BRAS = Math.hypot(28, 16);

/** Une pose (son dessin) placée en x (et y) : lunettes pour Jean, miroir
 *  pour un personnage tourné vers la gauche, une classe pour l'animation.
 *  Le marteau de B, au repos, tête en haut, 1,2 fois plus grand : la règle
 *  CSS de Scene.astro, posée ici en attribut. */
export const perso = (dessin, x, { jean = false, miroir = false, classe = '', y = 0 } = {}) => {
  let d = dessin.replace('{L}', jean ? LUNETTES : '');
  d = d.replace('<g class="marteau-tour">', '<g class="marteau-tour" transform="rotate(-115) scale(1.2)">');
  return `<g transform="translate(${r2(x)} ${r2(y)})"><g class="${classe}"${miroir ? ' transform="scale(-1 1)"' : ''}>${d}</g></g>`;
};

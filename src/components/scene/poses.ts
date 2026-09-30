// Poses de profil tournees vers la droite, pieds a l'origine 0,0.
// {L} marque la place des lunettes de Jean.
// Dessin d'origine : .canevas/project/B1-personnages.dc.html. Retouches
// (registre/0022 a 0024) :
//  - poutre-epaule : la poutre est isolee dans le groupe .poutre-lance
//    (origine au centre de la poutre), sans changer le dessin ;
//  - toutes les poses : le buste finit a plat aux hanches (TORSE), les
//    jambes partent separees des les hanches (axes a +-5,25, trait 7,5 :
//    3 d'ecart en haut des cuisses, bords au ras du buste), les mains qui
//    pendaient pres des hanches remontent, pour qu'aucun lisere ni aucun
//    bras ne dessine un contour de jupe ;
//  - lancer-poutre : nouvelle pose, les deux bras leves, mains ouvertes a
//    plat (le dessus des paumes a y = -109,5) ;
//  - frappe-1 et frappe-2 : nouvelles poses du batiment, le bras avant et
//    le marteau pivotent ensemble a l'epaule (groupe .bras-tour) ;
//  - montre, pied-barreau, sur-echelle (registre/0062) : l'echelle de la
//    carte 03, sur les segments existants, sans articulation nouvelle.

const LIGNE = 'fill="none" stroke-linecap="round" stroke-linejoin="round"';
const trait = (c: string, points: string, largeur: number) =>
  `<polyline class="${c}" points="${points}" ${LIGNE} stroke-width="${largeur}"/>`;

/** Les deux jambes, jambe arriere d'abord. */
const jambes = (arriere: string, avant: string) => trait('se', arriere, 7.5) + trait('se', avant, 7.5);
/** Le bras arriere, sans lisere (derriere le buste). */
const brasArriere = (points: string) => trait('se', points, 7);
/** Le bras avant, avec son lisere ivoire. */
const brasAvant = (points: string) => trait('si', points, 10) + trait('se', points, 7);

/** Le buste : haut arrondi, bas a plat aux hanches (y = -52 + dy). */
const torse = (dy = 0) => {
  const y = (v: number) => v + dy;
  return `<path class="fe" d="M-9,${y(-88)} A9,9 0 0 1 9,${y(-88)} L9,${y(-55)} Q9,${y(-52)} 6,${y(-52)} L-6,${y(-52)} Q-9,${y(-52)} -9,${y(-55)} Z"/>`;
};
const TETE = '<circle class="fe" cx="1" cy="-110" r="10"/>{L}';
const DEBOUT = jambes('-5.25,-56 -4.5,-4 0.5,-4', '5.25,-56 4.5,-4 9.5,-4');
const MARTEAU = (angle: number) =>
  jambes('-5.25,-56 -8,-4 -3,-4', '5.25,-56 8,-4 13,-4') +
  brasArriere('0,-89 -4,-58') +
  torse() +
  TETE +
  `<g transform="translate(25 -75)"><g class="marteau-tour"><g transform="rotate(${angle})"><line class="se" x1="-3" y1="0" x2="26" y2="0" stroke-width="4" stroke-linecap="round"/><rect class="fe" x="22" y="-8" width="8" height="15" rx="1.5"/></g></g></g>` +
  brasAvant('1,-89 9,-69 25,-75');
/** Frappe (le batiment des pages projet) : le bras avant et le marteau
 *  forment le groupe .bras-tour, pivot a l'epaule (1,-89). A 0 degre, le
 *  coup porte : la tete du marteau devant l'epaule, a sa hauteur (le point
 *  le plus avance de l'arc, a moins d'une unite pres). A -70, le bras est
 *  leve, le marteau droit au-dessus de la main, sans toucher le visage. */
const FRAPPE = (angle: number) =>
  jambes('-5.25,-56 -8,-4 -3,-4', '5.25,-56 8,-4 13,-4') +
  brasArriere('0,-89 -4,-58') +
  torse() +
  TETE +
  `<g transform="translate(1 -89)"><g class="bras-tour"><g transform="rotate(${angle}) translate(-1 89)">` +
  '<g transform="translate(22 -78) rotate(-25)"><line class="se" x1="-3" y1="0" x2="22" y2="0" stroke-width="4" stroke-linecap="round"/><rect class="fe" x="17" y="-7" width="7" height="13" rx="1.5"/></g>' +
  brasAvant('1,-89 10,-75 22,-78') +
  '</g></g></g>';

/** Montre (la carte 03, registre/0062) : debout, le bras avant droit, long
 *  de 32,2 (celui de bras-tendus), tendu de l'epaule (1,-89) vers la cible,
 *  en coordonnees de la pose. Dessin d'origine : ops/images/matrice/planche.mjs. */
export const montre = (cible: readonly [number, number]) => {
  const dx = cible[0] - 1, dy = cible[1] + 89, k = Math.hypot(28, 16) / Math.hypot(dx, dy);
  const r = (v: number) => Math.round(v * 10) / 10;
  return DEBOUT + brasArriere('0,-89 -2,-58') + torse() + TETE + brasAvant(`1,-89 ${r(1 + dx * k)},${r(-89 + dy * k)}`);
};
/** La cible de Jean sur la carte 03, vue de sa place (x = 158,5) : le milieu
 *  de la part visible du deuxieme barreau, devant les tibias de l'ouvrier
 *  monte (16 degres sous l'horizontale). */
export const CIBLE_DEUXIEME_BARREAU = [121.1, -55] as const;

export const POSES = {
  'debout': DEBOUT + brasArriere('0,-89 -2,-58') + torse() + TETE + brasAvant('1,-89 3,-60'),
  'marche-1':
    jambes('-5.25,-56 -12,-9 -7,-4', '5.25,-56 13,-4 18,-8') +
    brasArriere('0,-89 14,-64') +
    torse() +
    TETE +
    brasAvant('1,-89 -14,-64'),
  'marche-2':
    jambes('-5.25,-56 -3,-4 2,-4', '5.25,-56 9,-32 3,-13 8,-12') +
    brasArriere('0,-89 -3,-58') +
    torse() +
    TETE +
    brasAvant('1,-89 4,-60'),
  'penche':
    jambes('-7.75,-56 -7.5,-4 -2.5,-4', '2.25,-56 1.5,-4 6.5,-4') +
    brasArriere('14.4,-84.1 32,-60') +
    `<g transform="translate(-3 0) rotate(30 0 -56)">${torse()}${TETE}</g>` +
    brasAvant('14.4,-84.1 29,-59.5'),
  'bras-tendus': DEBOUT + brasArriere('0,-89 31,-76') + torse() + TETE + brasAvant('1,-89 29,-73'),
  'plan-sous-bras':
    DEBOUT +
    brasArriere('0,-89 -3,-58') +
    torse() +
    TETE +
    '<rect class="fi sa" x="-16" y="-80" width="44" height="9" rx="4.5" stroke-width="1.8"/><circle class="sa" cx="23.5" cy="-75.5" r="2.2" fill="none" stroke-width="1.2"/>' +
    brasAvant('1,-89 0,-67 14,-68'),
  'poutre-epaule':
    DEBOUT +
    brasArriere('0,-89 -3,-58') +
    torse() +
    '<g transform="translate(-4 -101)"><g class="poutre-lance"><g transform="translate(4 101)"><rect class="se fi" x="-54" y="-105" width="100" height="8" rx="1" stroke-width="2"/><line class="se" x1="-44" y1="-101" x2="6" y2="-101" stroke-width="1" stroke-opacity="0.4" stroke-linecap="round"/></g></g></g>' +
    TETE +
    brasAvant('1,-89 15,-80 12,-99'),
  'lancer-poutre':
    DEBOUT +
    brasArriere('0,-89 9,-95 12,-107') +
    trait('se', '12,-107 18,-107.5', 4) +
    torse() +
    TETE +
    trait('si', '1,-89 14,-92 20,-107', 10) +
    trait('si', '20,-107 26,-107.5', 7) +
    trait('se', '1,-89 14,-92 20,-107', 7) +
    trait('se', '20,-107 26,-107.5', 4),
  'sautillement':
    jambes('-5.25,-62 -5,-12 0.5,-4', '5.25,-62 4,-12 9.5,-4') +
    brasArriere('0,-95 9,-71') +
    torse(-6) +
    '<circle class="fe" cx="1" cy="-116" r="10"/><g transform="translate(0 -6)">{L}</g>' +
    brasAvant('1,-95 14,-70'),
  'marteau-1': MARTEAU(-100),
  'marteau-2': MARTEAU(25),
  'frappe-1': FRAPPE(-70),
  'frappe-2': FRAPPE(0),
  'montre': montre(CIBLE_DEUXIEME_BARREAU),
  /** Pied-barreau : la jambe arriere de marche-2 ; l'avant repliee plus haut
   *  (cuisse 24,3 et tibia 19,9, ceux de marche-2, genou recalcule), le pied
   *  a plat sur le premier barreau ; le bras avant de bras-tendus, sur le
   *  montant ; le bras arriere libre, celui de debout, le long du corps. */
  'pied-barreau':
    jambes('-5.25,-56 -3,-4 2,-4', '5.25,-56 25.3,-42.3 16,-24.8 21,-23.8') +
    brasArriere('0,-89 -2,-58') +
    torse() +
    TETE +
    brasAvant('1,-89 29,-73'),
  /** Sur-echelle : les jambes de debout ; buste et tete basculent de 8 degres
   *  aux hanches (la bascule de penche) ; les bras repartent des epaules
   *  basculees : l'avant, celui de bras-tendus, sur le troisieme barreau ;
   *  l'arriere, celui de debout bascule avec le buste, le long du corps. */
  'sur-echelle':
    DEBOUT +
    brasArriere('4.6,-88.7 -1.7,-58.3') +
    `<g transform="rotate(8 0 -56)">${torse()}${TETE}</g>` +
    brasAvant('5.6,-88.5 33.6,-72.5'),
};

export type Pose = keyof typeof POSES;

export const LUNETTES =
  '<g class="lunettes"><line class="so" x1="5.6" y1="-111" x2="-5" y2="-109.5" stroke-width="1.6" stroke-linecap="round"/><circle class="so" cx="9" cy="-111" r="3.4" fill="none" stroke-width="1.8"/></g>';

export const OBJETS = {
  treteau:
    '<rect class="fe" x="-60" y="-58" width="120" height="6" rx="1"/><polyline class="se" points="-54,-2 -44,-53 -34,-2" fill="none" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><line class="se" x1="-50.5" y1="-20" x2="-37.5" y2="-20" stroke-width="2.5" stroke-linecap="round"/><polyline class="se" points="34,-2 44,-53 54,-2" fill="none" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><line class="se" x1="37.5" y1="-20" x2="50.5" y2="-20" stroke-width="2.5" stroke-linecap="round"/>',
  poutre:
    '<rect class="se fi" x="-50" y="-8" width="100" height="8" rx="1" stroke-width="2"/><line class="se" x1="-40" y1="-4" x2="10" y2="-4" stroke-width="1" stroke-opacity="0.4" stroke-linecap="round"/>',
  marteau:
    '<g transform="translate(0 0) rotate(0)"><line class="se" x1="-3" y1="0" x2="26" y2="0" stroke-width="4" stroke-linecap="round"/><rect class="fe" x="22" y="-8" width="8" height="15" rx="1.5"/></g>',
  /** Le pan de mur de la carte 03, origine au coin bas gauche : 102 de large,
   *  134 de haut, trois rangs de pierres au grain de la poutre. */
  mur:
    '<rect class="fi se" x="0" y="-134" width="102" height="134" stroke-width="2"/><g stroke-width="1" stroke-opacity="0.4"><line class="se" x1="0" y1="-44.7" x2="102" y2="-44.7"/><line class="se" x1="0" y1="-89.3" x2="102" y2="-89.3"/><line class="se" x1="51" y1="0" x2="51" y2="-44.7"/><line class="se" x1="25.5" y1="-44.7" x2="25.5" y2="-89.3"/><line class="se" x1="76.5" y1="-44.7" x2="76.5" y2="-89.3"/><line class="se" x1="51" y1="-89.3" x2="51" y2="-134"/></g>',
  /** L'echelle de la carte 03, origine au pied du montant gauche : deux
   *  montants inclines (0,3 de pied pour 1 de haut), 32 d'ecart, trois
   *  barreaux (les trois niveaux de la grille) a -19, -55 et -91. */
  echelle:
    '<g stroke-linecap="round"><line class="se" x1="5.7" y1="-19" x2="37.7" y2="-19" stroke-width="3"/><line class="se" x1="16.5" y1="-55" x2="48.5" y2="-55" stroke-width="3"/><line class="se" x1="27.3" y1="-91" x2="59.3" y2="-91" stroke-width="3"/><line class="se" x1="0" y1="-1" x2="37.5" y2="-125" stroke-width="4"/><line class="se" x1="32" y1="-1" x2="69.5" y2="-125" stroke-width="4"/></g>',
} as const;

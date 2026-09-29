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
//    plat (le dessus des paumes a y = -109,5).

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
    brasArriere('0,-95 -14,-70') +
    torse(-6) +
    '<circle class="fe" cx="1" cy="-116" r="10"/><g transform="translate(0 -6)">{L}</g>' +
    brasAvant('1,-95 14,-70'),
  'marteau-1': MARTEAU(-100),
  'marteau-2': MARTEAU(25),
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
} as const;

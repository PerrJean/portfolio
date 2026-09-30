# Brief — les images clés des scènes « Fusion » et « Mises en situation » (registre/0069)

Sur l'accueil du portfolio, chaque carte de projet a sa scène au trait, animée
au survol. Deux nouveaux projets arrivent : la **fusion des plateformes** et
les **mises en situation orales par IA**. Tu dessines leurs **images clés
fixes**, aucune animation. Deux fichiers à lire d'abord :
`src/components/scene/poses.ts` (la bibliothèque de poses et d'objets) et
`ops/images/matrice/planche.mjs` (la méthode, l'échelle et le style d'une
planche validée).

## Scène « Fusion » (choix de Jean)

Deux **cabanes** côte à côte, au trait, **collées par un mur de séparation**
(pas trois : Jean veut de l'espace). Elles sont de deux styles différents
(par exemple trait simple et trait double) : deux façons de construire.
- **Repos** : Jean (lunettes rondes orange) et l'**équipe de l'en-tête**
  (les trois ouvriers anonymes, sans lunettes, voir `SceneEntete.astro`)
  sont à côté du mur, prêts à pousser.
- **Intermédiaire** (si utile) : ils poussent le mur, qui penche.
- **Fin** : le mur est tombé ou a glissé ; il ne reste **qu'une cabane**,
  plus large, d'un seul style, posée sur une **dalle commune** ; point ambre
  sur la dalle. Les quatre personnages sont au pied, dans des poses de fin
  (debout, bras tendus…).

## Scène « Mises en situation » (choix de Jean)

**Une seule scène** : Jean et deux personnes de son équipe (le PM et la
product designer : deux ouvriers anonymes) devant un **board** (un tableau au
trait sur pieds, quatre colonnes) et des **post-it** (petits carrés au trait).
- **Repos** : le board a peu de post-it ; Jean est un pas en retrait, le bras
  vers le board (il cadre la démarche) ; les deux autres devant le board.
- **Fin** : le board s'est rempli, colonne après colonne ; **un seul post-it
  en ambre** dans la dernière colonne (le pari retenu) ; un des deux ouvriers
  vient de le coller (bras levé). Aucun texte sur les post-it ; tout au plus
  un petit signe de bulle de parole sur le post-it ambre, pour dire « oral ».

## Les règles du dessin

Celles du site : au trait, fond ivoire, trait encre ; orange réservé aux
lunettes de Jean ; ambre seulement comme lumière (un point, un aplat sur le
post-it retenu) ; ardoise pour l'information secondaire ; bonhommes unisexes
(tête disque, corps gélule) ; carré pour les objets, rond pour l'humain.
**Réutilise les poses existantes** (`debout`, `bras-tendus`, `montre`,
`penche`, poses de l'en-tête) ; si une pose manque (« pousser »), dessine-la
comme variante sur les mêmes segments, sans articulation nouvelle, et décris
ce qu'elle change pour qu'on l'ajoute à `poses.ts`. Les cabanes, le mur, la
dalle, le board et les post-it sont des objets de planche. Chaque scène doit
se lire à la taille d'une carte : vérifie en réduisant à 480, 384 et 335 px.

## Ce que tu rends

Dans `ops/images/fusion-scene/` et `ops/images/mises-en-situation-scene/` :
les SVG `repos.svg`, `fin.svg` (et l'intermédiaire s'il existe), dans le
repère de `Scene.astro`, une `planche.png` par scène (ou une commune), et le
script `planche.mjs` (SVG composé puis `sharp`, déjà installé, aucun paquet).
Regarde les planches (outil Read). Dis quelles poses tu as reprises, ce que tu
as inventé, et une durée d'animation raisonnable (autour de 0,6 s).
Tu ne touches pas à `src/` ni aux tests. Ne commite rien, n'ouvre aucun
navigateur.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

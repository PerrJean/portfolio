# Brief — les images clés de deux scènes de carte (registre/0090)

Sur l'accueil du portfolio, chaque carte de projet a sa scène au trait,
animée au survol. Deux scènes changent : le **tableau à post-its**
(aujourd'hui sur la carte Mises en situation) passe à la nouvelle carte 07,
« Tableau de bord client », avec une nouvelle histoire ; les **Mises en
situation** reçoivent une scène neuve, « la conversation ». Tu dessines
leurs **images clés fixes**, aucune animation. Deux fichiers à lire
d'abord : `src/components/scene/poses.ts` (poses et objets, dont `board` et
`postit`) et `ops/images/mises-en-situation-scene/planche.mjs` (la méthode,
l'échelle et le style de la planche du board, validée).

## Scène 07 « Tableau de bord client » (`ops/images/tableau-de-bord-scene/`)

L'histoire : cinq clients disent beaucoup de besoins ; il en sort **une
donnée**. Jean anime.
- **Repos** : le board (repris de la scène actuelle), ses colonnes déjà
  garnies de post-its au trait, nombreux et un peu en désordre. Jean à côté
  du board, en pose d'animateur (`montre`, bras sous l'épaule). Deux
  personnages anonymes (les clients, sans lunettes) face au board.
- **Fin** : les post-its se sont regroupés vers le centre et ne font plus
  qu'**un seul post-it ambre**, plus grand, au milieu du board ; Jean le
  montre. Aucun texte.
- Un intermédiaire si l'animation en a besoin (les post-its en chemin).

## Scène « Mises en situation » : la conversation (`ops/images/conversation-scene/`)

L'histoire : une IA joue l'interlocuteur ; chaque échange se termine par un
retour pédagogique.
- **Repos** : un apprenant (personnage anonyme) face à un **écran** posé sur
  une table (rectangle au trait, un petit disque dedans pour dire
  l'interlocuteur). Jean un peu en retrait sur le côté, qui regarde.
- **Intermédiaire** : des **bulles au trait** alternent, une côté apprenant,
  une côté écran, sans texte (deux ou trois traits dedans au plus).
- **Fin** : l'écran « tend » une **fiche ambre** (un rectangle et trois
  traits), la seule lumière de la scène ; l'apprenant la regarde.

## Les règles du dessin

Celles du site : au trait, fond ivoire, trait encre ; orange réservé aux
lunettes de Jean ; ambre seulement comme lumière (un aplat) ; ardoise pour
l'information secondaire ; bonhommes unisexes (tête disque, corps gélule) ;
carré pour les objets, rond pour l'humain ; **jamais un bras au-dessus de
l'épaule**. **Réutilise les poses existantes** ; si une pose manque (assis,
par exemple), dessine-la comme variante sur les mêmes segments, sans
articulation nouvelle, et décris ce qu'elle change pour qu'on l'ajoute à
`poses.ts`. L'écran, la table, les bulles et la fiche sont des objets de
planche. Chaque scène doit se lire à la taille d'une carte : vérifie en
réduisant à 480, 384 et 335 px.

## Ce que tu rends

Dans les deux dossiers : `repos.svg`, `fin.svg` (et l'intermédiaire s'il
existe), dans le repère de `Scene.astro`, une `planche.png` par scène, et le
script `planche.mjs` (SVG composé puis `sharp`, déjà installé, aucun
paquet). Regarde les planches (outil Read) et corrige ce qui se lit mal. Dis
quelles poses tu as reprises, ce que tu as inventé, et une durée
d'animation raisonnable (autour de 0,6 s). Tu ne touches ni à `src/`, ni aux
tests, ni aux autres dossiers de `ops/images/`. Ne commite rien, n'ouvre
aucun navigateur. Rapport de 300 mots au plus.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

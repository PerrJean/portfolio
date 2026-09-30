# Brief — les images clés de la scène « l'échelle » (registre/0062)

Sur l'accueil du portfolio, chaque carte de projet a sa scène au trait
(`src/components/scene/SceneUservoice.astro`, `SceneAudit.astro`). Le
troisième projet, une **matrice de compétences pour faire grandir un Product
Owner**, reçoit la sienne. Tu dessines ses **images clés fixes**, aucune
animation. Deux fichiers à lire d'abord : `src/components/scene/poses.ts` et
`ops/images/accueil/planche.mjs` (la planche des scènes validées, dont tu
reprends la méthode, l'échelle et le style).

## La scène choisie par Jean

- **Repos** : une **échelle à trois barreaux** (les trois niveaux de la
  grille : junior, intermédiaire, senior ; aucun texte dessiné) appuyée contre
  un pan de mur au trait ; un **ouvrier** (anonyme, sans lunettes) au pied de
  l'échelle ; **Jean** (lunettes rondes orange) à côté, le **plan ouvert**
  en main ou sur le tréteau (la grille).
- **Fin** (après le survol) : Jean montre du bras le barreau suivant ;
  l'ouvrier est **monté d'un barreau** (pieds sur le premier barreau, mains
  plus haut) ; **point ambre** sur le barreau atteint.
- Au besoin, une **image intermédiaire** (le geste de Jean, l'ouvrier qui
  lève le pied), si elle aide à juger le mouvement.

## Les règles du dessin

Celles du site : au trait, fond ivoire, trait encre ; orange réservé aux
lunettes de Jean ; ambre seulement comme lumière (un point) ; ardoise pour
l'information secondaire ; bonhommes unisexes (tête disque, corps gélule) ;
carré pour les objets, rond pour l'humain. **Réutilise les poses
existantes** (`debout`, `penche`, `bras-tendus`, poses avec le plan) ; la
pose « sur l'échelle » n'existe sans doute pas : dessine-la dans ta planche
comme une variante (mêmes segments, aucune nouvelle articulation) et dis
précisément ce qu'elle change, pour qu'on l'ajoute ensuite à `poses.ts`.
L'échelle et le mur sont des objets nouveaux, dans la planche seulement.
La scène doit se lire à la taille d'une carte : vérifie en réduisant à 480,
384 et 335 px de large, comme la planche précédente.

## Ce que tu rends

`ops/images/matrice/planche.png` (repos, éventuellement intermédiaire, fin ;
numérotées et légendées en petit), les SVG séparés (`repos.svg`, `fin.svg`)
dans le repère de `Scene.astro`, et `ops/images/matrice/planche.mjs` (SVG
composé puis `sharp`, déjà installé, aucun paquet). Regarde la planche (outil
Read). Dis quelles poses tu as reprises et ce que tu as dû inventer.
Tu ne touches pas à `src/` ni aux tests ; un autre chantier intègre le projet
dans `src/` en parallèle. Ne commite rien, n'ouvre aucun navigateur.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

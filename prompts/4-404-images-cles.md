# Brief — les images clés de l'animation 404 (registre/0055, étape 2)

Jean a choisi le scénario de sa page 404 : **« Le chantier a déménagé »**.
Tu dessines ses **quatre images clés, fixes** (aucune animation à ce stade),
pour qu'il valide le dessin avant qu'on anime. Deux fichiers à lire d'abord :
`src/components/scene/poses.ts` (la bibliothèque de poses) et
`src/components/scene/Personnage.astro` (le rendu d'un personnage).

## Le scénario

1. Sol au trait, un **panneau de chantier** à angles droits posé dessus (deux
   pieds, un cadre, une flèche « → » dessinée, pas écrite), orienté vers la
   gauche ou de face. Jean n'est pas encore là (ou entre par le bord gauche).
2. **Jean** (tête disque, corps gélule, lunettes rondes orange) arrive de la
   gauche : pose de marche de la bibliothèque, marteau en main.
3. Il s'arrête à côté du panneau et **le tape du marteau** : poses de frappe
   existantes (bras et marteau qui pivotent à l'épaule, marteau tête en haut).
4. Le panneau **a pivoté** : la flèche montre la droite, là où seront les
   liens ; Jean le regarde, pose debout ou bras tendu vers la droite.

## Les règles du dessin (celles du site)

Au trait, fond ivoire `--ivoire` #FEFAF2, trait `--encre` #2A1F1A ; l'orange
`--orange` #B54E19 réservé aux lunettes de Jean ; l'ambre `--ambre` #F2A33A
seulement comme lumière (un point, jamais du texte) ; l'ardoise `--ardoise`
#5E7488 pour une information secondaire. Carré pour les objets, rond pour
l'humain. Même échelle et même épaisseur de trait que le personnage des
autres pages. **Réutilise les poses existantes** ; n'en crée une que si
aucune ne convient, et dis-le. Aucune nouvelle articulation.

## Ce que tu rends

- Une planche `ops/images/404/planche.png` : les quatre images côte à côte
  (numérotées 1 à 4 sous chaque image, en Atkinson, petit), 1600 px de large
  environ, produite par un petit script `ops/images/404/planche.mjs` (SVG
  composé puis `sharp`, déjà installé, aucun nouveau paquet). Et chaque image
  seule en SVG dans `ops/images/404/` (`1.svg` à `4.svg`), réutilisables pour
  l'animation.
- Regarde la planche (outil Read) avant de rendre : lunettes visibles,
  marteau tête en haut, panneau lisible, flèche qui change de sens.
- Dis quelles poses tu as reprises, et ce que tu as dû inventer.

Tu ne touches pas à `src/` (un autre chantier crée `src/pages/404.astro` en
parallèle), ni aux tests. Ne commite rien, n'ouvre aucun navigateur.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

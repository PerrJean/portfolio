# Brief — chantier 2d : la page projet et son bâtiment (registre/0030)

Le socle (gabarit, en-tête, bascule, jetons, police), l'accueil et la
bibliothèque de personnages (`src/components/scene/poses.ts`,
`Personnage.astro`) existent. Tu construis le **gabarit des pages projet**,
utilisé par les quatre pages : `/projets/uservoice/`,
`/projets/audit-contenu/`, `/en/projects/uservoice/`,
`/en/projects/content-audit/`. Leurs adresses, leurs titres et leurs `<h1>`
ne changent pas (les tests les vérifient).

## Le contenu : un fichier Markdown par projet et par langue

Une collection de contenu Astro, dans `src/contenu/projets/` (pas de dossier
`data/` : il est ignoré par le `.gitignore`), un fichier par projet et par
langue. En-tête validé par un schéma (un champ manquant casse le build) :
`titre`, `fait` (le fait clé), `synthese` (trois phrases : le problème, ce
que j'ai fait, le résultat), `langue`, `cle` (la clé de page de
`src/i18n/routes.ts`). Le corps porte les **H2 libres** du projet.

Pour l'instant, **un texte provisoire**, marqué `[À COMPLÉTER]` (EN :
`[TO BE COMPLETED]`), sauf le titre et le fait clé déjà validés
(`src/contenu/projets.ts`). Les H2 provisoires :

- **UserVoice** (mené seul) : Le point de départ · Écouter à l'échelle ·
  Ce que la donnée a montré · Ce que j'ai construit · Ce que ça a changé.
- **Audit contenu** (mené avec une learning designer) : Pourquoi auditer ·
  La méthode · Ce qu'on a trouvé · Corriger sans casser · Ce que j'en
  retiens.

Traduis ces H2 pour les fichiers anglais.

## La page

1. **La synthèse recruteur**, en haut : le `<h1>`, le **fait clé** en grand,
   puis les trois phrases de la synthèse.
2. **Le corps** : les H2 et leurs paragraphes, lisibles (largeur de ligne
   confortable, Atkinson 400).
3. **« Pour aller plus loin »**, replié dans un vrai `<details>` avec son
   `<summary>` (EN : « Going further »), contenu provisoire.
4. **La fin de page** : le toit posé (voir le bâtiment), puis un lien
   « Projet suivant » vers l'autre projet de la paire (EN : « Next
   project »), bouton tertiaire du socle.

## Le bâtiment (`src/components/batiment/`)

- **Une colonne à droite, au ratio 1 : 4** (environ 240 px pour 960 de
  contenu), **collée** à l'écran pendant la lecture (`position: sticky`), à
  partir de 960 px de large.
- **Un étage par H2**, quel que soit leur nombre : le composant reçoit la
  liste des titres (Astro la fournit au rendu du Markdown) et répartit les
  étages sur la hauteur de la colonne. Dessin au trait fin encre, comme la
  bibliothèque : des fondations, les étages carrés, un toit.
- **Une grue fixe** à côté du bâtiment, qui ne bouge jamais. Quand un H2
  entre à l'écran (`IntersectionObserver`), son étage **descend au bout du
  câble** (le câble se raccourcit) et se pose. Un étage posé ne repart
  jamais.
- **Trois bonhommes au pied du bâtiment**, tirés de la bibliothèque (les
  poses marteau 1 et 2 ; l'un d'eux est Jean, avec ses lunettes orange) :
  ils **tapent du marteau seulement pendant la pose** d'un étage (environ
  1,5 s), puis s'arrêtent. Le marteau pivote au poignet, rien d'autre ne
  s'articule.
- **En fin de page**, quand le bas de l'article est atteint, le **toit** se
  pose et les trois bonhommes se retrouvent **ensemble sur le toit**
  (échange de pose et déplacement, pas d'articulation).
- **Au téléphone** (moins de 960 px) : pas de colonne. Un **petit bâtiment
  horizontal**, collé sous l'en-tête des pages projet, sert d'**indicateur de
  lecture** : ses étages se remplissent avec la progression. Sans
  personnages.
- `aria-hidden="true"` sur tout le dessin. Sous `prefers-reduced-motion:
  reduce`, rien ne bouge : les étages apparaissent en place, sans
  descente, et les marteaux restent immobiles.
- Couleurs par les jetons ; l'ambre ne sert qu'à la lumière (par exemple
  une fenêtre éclairée sur l'étage qui vient d'être posé), jamais au texte.
- JavaScript : le strict nécessaire (l'observateur et la progression), sans
  bibliothèque.

## Règles

Aucun fichier au-delà de 500 lignes. Tu ne modifies ni la logique des tests
ni `src/components/scene/Scene.astro` (une retouche peut y être faite en
parallèle) ; tu peux réutiliser `poses.ts` et `Personnage.astro` sans les
changer. N'installe aucun paquet.

## La preuve attendue

`npx astro build --outDir .dist-2d` puis `DIST=.dist-2d npm test` : les
commandes et le résumé (`fail 0`). Supprime `.dist-2d`. Ne commite rien,
n'ouvre aucun navigateur : la session vérifiera à l'œil.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

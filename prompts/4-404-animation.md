# Brief — l'animation de la page 404 (registre/0056)

Jean a validé les quatre images clés de sa page 404, « Le chantier a
déménagé » (`ops/images/404/1.svg` à `4.svg`, produites par
`ops/images/404/planche.mjs`). Tu les animes dans `src/pages/404.astro`.
Deux fichiers à lire d'abord : `src/components/scene/Scene.astro` (comment
l'accueil anime ses personnages) et `ops/images/404/planche.mjs` (la
géométrie exacte des quatre images).

## Le mouvement (2 à 3 secondes, une seule fois, au chargement)

1. Le panneau est posé, flèche vers la gauche. Jean entre par le bord gauche.
2. Il marche jusqu'au panneau : translation horizontale, poses de marche
   échangées (comme l'accueil), marteau en main, tête en haut.
3. Il s'arrête et frappe : `frappe-1` puis `frappe-2`, bras et marteau qui
   pivotent à l'épaule (même mécanique que l'accueil et le bâtiment), point
   ambre bref à l'impact.
4. Le panneau pivote (la flèche passe de gauche à droite, par exemple un
   `scaleX` de 1 à -1 sur la flèche ou un demi-tour du cadre, sobre), le
   demi-tour ardoise apparaît, Jean recule d'un pas et prend `bras-tendus`.
   L'image finale est exactement `4.svg`.

Pas de boucle, pas de rejouage au survol. Aucune nouvelle articulation ;
aucune dépendance ; CSS et, au besoin, un petit script comme sur l'accueil.

## La page

- Titre (h1, FR) : « Le chantier a déménagé. » ; en dessous : « Cette adresse
  ne mène à aucune page du portfolio. » et le lien « Retour à l’accueil ».
  Bloc anglais (h2 au même corps) : « This site has moved on. » (ou mieux si
  tu trouves plus juste, sans jeu de mots forcé), « This address leads to no
  page of the portfolio. », « Back to the home page ».
- L'animation est décorative (`aria-hidden`), au-dessus ou à côté du texte,
  lisible au téléphone (390 px) comme sur grand écran, sans débordement.
- **`prefers-reduced-motion: reduce`** : aucune animation, l'image finale
  (`4.svg`) affichée d'emblée. Le test `animations` exige que tout
  `@keyframes` soit accompagné de cette media query.
- Couleurs par les jetons (`src/styles/jetons.css`), pas en dur : retire le
  bloc de style des SVG si tu les intègres.

## Ce que tu ne touches pas

Les tests, les autres pages, `src/components/scene/poses.ts` (si une pose
manque, dis-le au lieu de l'ajouter), `src/contenu/`, `src/i18n/publication.ts`.

## La preuve attendue

`npx astro build --outDir .dist-0056` puis `DIST=.dist-0056 npm test`
(`fail 0`). Des captures prises avec Edge sans interface (profil jetable,
chemins Windows) de `/404.html` servie par `npx astro preview` ou par le
serveur de dev à trois instants (début, frappe, fin : utilise un paramètre
de débogage local ou `animation-delay` négatif dans une copie, jamais dans le
code livré), et une en mouvement réduit (`--force-prefers-reduced-motion`).
Regarde-les (outil Read). Supprime `.dist-0056` et tes captures. Ne commite
rien, n'ouvre pas le navigateur intégré.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.
Edge : `"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
--headless=new --disable-gpu --hide-scrollbars --user-data-dir="$(cygpath -w
<dossier-jetable>)" --window-size=1280,900 --screenshot="$(cygpath -w
<fichier>.png)" <url>`.

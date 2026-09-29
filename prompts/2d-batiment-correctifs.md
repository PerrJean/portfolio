# Brief — le bâtiment : trois correctifs (registre/0033)

Retouche de `src/components/batiment/Batiment.astro` (le fichier de ton
prompt), et si besoin du gabarit `src/layouts/Projet.astro` pour la seule
colonne du bâtiment. Retours de Jean après l'avoir vu dans le navigateur.

## 1. Le bâtiment doit grandir au rythme de la lecture des H2

Aujourd'hui, un étage se pose quand son H2 **entre à l'écran par le bas**.
Plusieurs H2 sont souvent visibles ensemble : les étages se posent presque
d'un coup, et le bâtiment ne suit pas la lecture.

Correction : un étage se pose quand son H2 **franchit une ligne de lecture**,
placée à environ un tiers de la hauteur de l'écran en partant du haut
(par exemple `IntersectionObserver` avec une `rootMargin` qui réduit la zone
observée au tiers haut, ou un calcul équivalent). Le H2 suivant ne pose son
étage que lorsqu'il franchit à son tour cette ligne. Au chargement, seuls
les H2 **déjà au-dessus** de la ligne comptent comme lus (page rechargée en
milieu d'article). Un étage posé ne repart jamais. Le toit se pose quand la
fin de l'article franchit la même ligne, ou quand on atteint le bas de la
page si l'article est trop court pour l'atteindre.

## 2. Deux bonhommes seulement

Au pied du bâtiment, **deux** bonhommes : **un à gauche du bâtiment, un à
droite**, chacun tourné vers le bâtiment. L'un des deux est Jean (lunettes
orange). Ils tapent du marteau seulement pendant la pose d'un étage, comme
aujourd'hui. En fin de page, ce sont ces **deux** qui se retrouvent sur le
toit. Retire le troisième partout.

## 3. Le bâtiment reste fixe à l'écran, quel que soit le défilement

Sur grand écran (960 px et plus), le bâtiment, la grue et les bonhommes
occupent **toujours la même place à l'écran**, du haut au bas de la page :
ils ne défilent ni au début (il ne doit pas démarrer plus bas puis se
coller), ni à la fin (il ne doit pas remonter avec le pied de page). Place
la colonne en position fixe (ou collante dès le haut), calée sous l'en-tête,
et assure-toi qu'elle ne passe jamais sur le texte ni sur le pied de page :
la colonne du texte garde sa largeur (ratio 1 : 4) et le bâtiment peut
s'estomper ou se masquer quand le pied de page arrive dans sa zone.
L'indicateur du téléphone ne change pas.

## Ce qui ne change pas

Le dessin, la grue fixe et le câble qui descend l'étage, `aria-hidden`,
`prefers-reduced-motion` (rien ne bouge, les étages apparaissent en place),
les couleurs par jetons. 500 lignes au plus par fichier. Tu ne touches ni aux
tests ni aux autres composants.

## La preuve attendue

`npx astro build --outDir .dist-bat` puis `DIST=.dist-bat npm test` : les
commandes et le résumé (`fail 0`). Supprime `.dist-bat`. Ne commite rien,
n'ouvre aucun navigateur (la session vérifiera à l'œil).

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

# Brief — le favicon et l'aperçu LinkedIn (registre/0038)

Deux images qui font la première impression avant même le clic. Tout est
produit **sans nouveau paquet** : `sharp` (déjà installé, version 0.34) et
la police Atkinson Hyperlegible Next du paquet `@fontsource` (fichiers
`.woff`, dans `node_modules/@fontsource/atkinson-hyperlegible-next/files/`).

## Les couleurs (jetons, `src/styles/jetons.css`)

Ivoire `#FEFAF2` (fond), encre `#2A1F1A`, ambre `#F2A33A` (lumière, jamais de
texte), orange `#B54E19` (action, et les lunettes de Jean), ardoise `#5E7488`.

## 1. Le favicon : le logo-lunettes

- Le logo existe dans `src/components/Lunettes.astro` : une paire de lunettes
  rondes orange. Il doit rester **lisible à 16 px** : simplifie-le au besoin
  (traits plus épais, pont plus court), sans changer son identité.
- Produis : `public/favicon.svg` (avec une variante lisible sur fond sombre
  par `@media (prefers-color-scheme: dark)` dans le SVG, par exemple un
  disque ivoire derrière), `public/favicon-32.png`, `public/apple-touch-icon.png`
  (180 × 180, fond ivoire plein, marge d'environ 15 %), et
  `public/favicon.ico` si `sharp` sait l'écrire, sinon rien (les navigateurs
  prennent le PNG).
- Déclare-les dans le `<head>` de `src/layouts/Base.astro`.

## 2. L'aperçu LinkedIn (Open Graph)

- Une image **1200 × 630**, en PNG, `public/og/apercu.png` (une seule pour
  toutes les pages pour l'instant), qui reprend le système du site :
  - fond ivoire ; le **soleil** en quart de disque ambre, coupé par le coin
    **haut droit**, avec trois anneaux en aplats vers l'orange (comme
    `src/components/Soleil.astro`) ;
  - le **bâtiment terminé** au trait encre (comme
    `src/components/batiment/Batiment.astro` à la fin : fondations, étages,
    toit, grue fixe), avec **les deux personnages sur le toit**, dont Jean
    aux lunettes orange (poses de `src/components/scene/poses.ts`), à droite
    ou au centre droit ;
  - à gauche, en Atkinson 800, « Jean Perrier », puis la phrase « Je bâtis
    sur des hypothèses : j'écoute, je teste, puis je dose l'effort. » ;
    en dessous, en Atkinson 400, « Head of Product · IA appliquée · Data ».
  - Le texte doit rester lisible une fois réduit (LinkedIn l'affiche vers
    550 px de large) : 60 px au moins pour la phrase.
- **La police dans l'image** : `sharp` peut composer du texte avec un fichier
  de police (`sharp({ text: { text, fontfile, … } })`). Convertis le `.woff`
  en `.ttf` dans un dossier temporaire (le format WOFF 1 est un sfnt
  compressé par zlib : Node le décompresse sans dépendance), rends chaque
  bloc de texte, et compose-le sur le fond obtenu depuis un SVG. Le TTF
  temporaire ne va **pas** dans le dépôt.
- Le script qui produit les images va dans `ops/images/` (`apercu.mjs`),
  relançable à la main (`node ops/images/apercu.mjs`), commenté en deux ou
  trois lignes. Les PNG produits sont commités.
- Dans `src/layouts/Base.astro` : `og:image` (URL absolue sur le domaine),
  `og:image:width` 1200, `og:image:height` 630, `og:image:alt` (FR et EN
  selon la langue de la page), et `twitter:card` = `summary_large_image`.
- Le test « aucune ressource tierce » doit rester vert : toutes les URL sont
  sur le domaine du site.

## Ce que tu ne touches pas

Les tests, les textes des pages et de `src/contenu/` (un autre chantier les
écrit en parallèle), les composants d'animation (tu t'en inspires, tu ne les
modifies pas), `src/i18n/publication.ts`. 500 lignes au plus par fichier.

## La preuve attendue

`node ops/images/apercu.mjs` (sortie), puis
`npx astro build --outDir .dist-img` et `DIST=.dist-img npm test` (`fail 0`).
Donne les chemins et dimensions des images produites. Supprime `.dist-img` et
le TTF temporaire. Ne commite rien, n'ouvre aucun navigateur (la session
regardera les images).

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

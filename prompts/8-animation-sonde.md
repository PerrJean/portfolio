# Brief — animer la scène « sonder le terrain » (registre/0085)

Jean a validé les images clés du carottage (`ops/images/uservoice-sonde/`,
planche comprise). Tu les animes, sur le modèle des autres cartes. Deux
fichiers à lire d'abord : `src/components/scene/SceneMatrice.astro` (le
modèle d'une variante de carte) et `ops/images/uservoice-sonde/planche.mjs`
(la géométrie ; `node ops/images/uservoice-sonde/planche.mjs --poses`
imprime les poses et objets à reporter).

## Règle absolue : aucun bras levé seul

Aucun personnage ne lève un seul bras au-dessus de l'épaule, à aucun
instant. Vérifie chaque instant en figeant l'animation (échantillon tous les
50 ms), pas seulement les images clés.

## Ce que tu fais dans le site

- Reporte dans `src/components/scene/poses.ts` les poses `sonde-repos`,
  `sonde-enfonce`, `sonde-traverse`, `sonde-remonte`, `sonde-carotte` et les
  objets (tige, carotte, couches, trou).
- Une **nouvelle variante** `SceneSonde.astro`, aiguillée par `Scene.astro`
  (`variante="sonde"`), et ajoute `'sonde'` au type `SceneDeCarte` de
  `src/contenu/projets.ts` **sans changer la scène d'aucun projet** (le
  câblage des cartes est fait par ailleurs). Ne modifie pas
  `SceneUservoice.astro` : il servira à un autre projet.
- 600 ms, quatre temps de 150 ms : enfoncer, traverser, remonter, la carotte
  à l'horizontale et le point ambre. Même déclenchement que les autres
  cartes : survol et focus sur grand écran, retour au repos ; au téléphone,
  une fois à l'entrée à l'écran, figée sur la fin. Mouvement réduit :
  l'image de fin, ou de repos comme les autres (le test `animations` exige
  la media query). Couleurs par les jetons, décoratif.
- La page `src/labo/scene.astro` montre la nouvelle variante.

## Ce que tu ne touches pas

Les tests, les pages projet, les textes, `redaction/`, `Parcelle.astro`,
`Parcelles.astro`, et la scène de tout projet dans `projets.ts`.

## La preuve attendue

`npx astro build --outDir .dist-sonde` puis `DIST=.dist-sonde npm test`
(`fail 0`). Captures figées (`document.getAnimations()`, `pause()`, puis
`currentTime`) au repos, à mi-course et à la fin, à 1280 et à 390 px, sur
`/labo/scene` du serveur de développement déjà lancé (port 4321 ; ne le
relance pas), dans un Chrome / Edge sans interface ; regarde-les ; et le
relevé des bras tous les 50 ms. Supprime `.dist-sonde`. Ne commite rien.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

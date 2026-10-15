# Brief — animer les scènes des cartes 07 et 01 (registre/0090)

Jean a validé les images clés de deux scènes. Tu les animes, sur le modèle
des autres cartes. Deux fichiers à lire d'abord :
`src/components/scene/SceneMisesEnSituation.astro` (la scène du board
actuelle, que la carte 07 reprend) et `src/components/scene/Scene.astro`
(l'aiguillage des variantes). La géométrie validée est dans
`ops/images/tableau-de-bord-scene/planche.mjs` et
`ops/images/conversation-scene/planche.mjs`.

## Règle absolue : aucun bras levé seul

Aucun personnage ne lève **un seul bras au-dessus de l'épaule**, à aucun
instant de l'animation. Un bras qui montre reste à l'horizontale ou plus
bas. Vérifie chaque instant en figeant l'animation, pas seulement les
images clés.

## 1. Carte 07 « Tableau de bord client » : variante `tableauDeBord`

Les images de `ops/images/tableau-de-bord-scene/` (repos, chemin, fin) :
au repos, seize post-its au trait, un peu de travers, sur le board ; Jean à
gauche en `montre` ; deux clients en `debout`, à droite, immobiles. Au
survol, les post-its glissent vers le centre (biais redressé) et se fondent
en un seul post-it ambre, deux fois plus grand ; le bras de Jean remonte
légèrement vers lui, toujours sous l'horizontale. 600 ms : glissement 300
(ease-in-out), fusion et apparition de l'ambre 150, pose finale 150.

## 2. Carte 01 « Mises en situation » : variante `conversation`

Les images de `ops/images/conversation-scene/` (repos, tour-1, tour-2,
fin) : l'apprenant assis sur un tabouret face à l'écran posé sur la table ;
Jean `debout`, en retrait à gauche, immobile. Au survol : bulle côté
apprenant (150 ms), bulle côté écran, la première s'efface (150 ms), puis
la fiche ambre sort de derrière le bord de l'écran vers l'apprenant
(300 ms, ease-out). Personne ne bouge.

## Ce que tu fais dans le site

- Ajoute à `src/components/scene/poses.ts` la pose `assis` décrite dans
  `ops/images/conversation-scene/planche.mjs` (constante `ASSIS`), sur les
  segments existants ; les objets nouveaux (grand post-it ambre, tabouret,
  table, écran, bulles, fiche) si la liste d'objets s'y prête.
- `SceneTableauDeBord.astro` (variante `tableauDeBord`) remplace
  `SceneMisesEnSituation.astro`, qui disparaît ; `SceneConversation.astro`
  (variante `conversation`) est neuve. Aiguillage dans `Scene.astro`, type
  `SceneDeCarte` et commentaires dans `src/contenu/projets.ts` :
  carte 07 → `tableauDeBord`, carte 01 → `conversation`.
- Même déclenchement que les autres cartes : survol et focus sur grand
  écran, retour au repos ; au téléphone, une fois à l'entrée à l'écran,
  figée sur la fin. **Mouvement réduit** : l'image de repos. Couleurs par
  les jetons, décoratif (`aria-hidden`).
- La page `src/labo/scene.astro` montre les deux nouvelles variantes à la
  place de l'ancienne.

## Ce que tu ne touches pas

Les tests (un autre agent les met à jour après toi), les pages projet, les
textes, `redaction/`, `ops/images/`.

## La preuve attendue

`npx astro build --outDir .dist-scenes` puis `DIST=.dist-scenes npm test` :
liste les échecs, sans modifier les tests (ceux qui citent l'ancienne
variante sont attendus). Captures figées (`document.getAnimations()`,
`pause()`, puis `currentTime`) au repos, à mi-course et à la fin, à 1280 et
à 390 px, dans un Chrome / Edge sans interface ; regarde-les. Un relevé,
pour chaque personnage et chaque instant échantillonné tous les 50 ms,
qu'aucun bras ne passe au-dessus de l'épaule. Passe le vérificateur de
confidentialité sur les fichiers modifiés (chemins Windows, depuis
`C:\Users\Jean PERRIER\Portfolio` :
`python ops/hooks/verifier_confidentialite.py <chemin>`).

Ne commite rien. Rapport de 300 mots au plus : fichiers, preuve, tests en
échec, captures (chemins).

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

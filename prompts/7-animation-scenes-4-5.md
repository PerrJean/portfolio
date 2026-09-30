# Brief — animer les scènes des cartes 01 (fusion) et 02 (mises en situation) (registre/0069)

Sur l'accueil, les cartes 01 (fusion des plateformes, clé `fusion`) et 02
(mises en situation orales, clé `misesEnSituation`) s'affichent sans scène
(`scene: 'aucune'` dans `src/contenu/projets.ts`). Jean a validé leurs images
clés. Tu les animes, sur le modèle des autres cartes. Deux fichiers à lire
d'abord : `src/components/scene/SceneMatrice.astro` (le modèle d'une variante
de carte récente) et `ops/images/fusion-scene/planche.mjs` (la géométrie de la
fusion ; celle du board est dans `ops/images/mises-en-situation-scene/planche.mjs`).

## Règle absolue : aucun bras levé seul

Aucun personnage ne lève **un seul bras au-dessus de l'épaule**, à aucun
instant de l'animation (Jean y voit le salut hitlérien). Un bras qui montre
reste à l'horizontale ou plus bas ; pour célébrer, les **deux** mains. Un bras
qui frappe **avec un marteau en main** est permis. Vérifie chaque instant en
figeant l'animation, pas seulement les images clés.

## 1. Fusion (validée telle quelle)

Les images de `ops/images/fusion-scene/` : au repos, les quatre (Jean et les
trois ouvriers de l'en-tête) poussent en chaîne le mur épais entre les deux
cabanes ; le mur penche, tombe, il ne reste qu'une cabane sur la dalle
commune, point ambre, et les quatre lèvent **les deux mains** (`hourra`).
600 ms : penche 200, tombe 200 (ease-in), mains et point 200.

## 2. Mises en situation : une retouche avant d'animer

Jean demande : **son personnage est celui de gauche, et il n'est pas actif**.
Reprends la scène du board ainsi :
- à gauche du board, **Jean** (lunettes rondes orange), `debout`, qui regarde
  le board ; il ne colle rien, ne montre rien, ne bouge pas (tout au plus un
  léger changement de pose de repos, jamais un bras vers les autres) ;
- les deux autres personnages (le PM et la designer, anonymes) font le
  travail : le PM colle des post-it (bras à l'horizontale ou plus bas), la
  designer colle le post-it ambre **à deux mains**, à mi-hauteur de la
  dernière colonne ;
- le board se remplit en entonnoir colonne après colonne, un seul post-it
  ambre à la fin. 600 ms, quatre temps de 150 ms.
Régénère `ops/images/mises-en-situation-scene/` (planche comprise) avant
d'animer, et regarde la planche.

## Ce que tu fais dans le site

- Ajoute à `src/components/scene/poses.ts` les poses `pousse` et `hourra`
  décrites dans `ops/images/fusion-scene/planche.mjs`, sur les segments
  existants ; les objets cabane, mur, dalle, board, post-it si la liste
  d'objets s'y prête.
- Deux variantes `SceneFusion.astro` et `SceneMisesEnSituation.astro`,
  aiguillées par `Scene.astro` (`variante="fusion"`, `"misesEnSituation"`),
  et `scene` mis à jour dans `projets.ts`.
- Même déclenchement que les autres cartes : survol et focus sur grand écran,
  retour au repos ; au téléphone, une fois à l'entrée à l'écran, figée sur la
  fin. **Mouvement réduit** : l'image de repos (le test `animations` exige la
  media query). Couleurs par les jetons, décoratif.
- La page `src/labo/scene.astro` montre aussi ces deux variantes.

## Ce que tu ne touches pas

Les tests (un autre agent les écrit en parallèle), les pages projet, les
textes, `src/i18n/publication.ts`.

## La preuve attendue

`npx astro build --outDir .dist-scenes` puis `DIST=.dist-scenes npm test`
(`fail 0`). Captures figées (`document.getAnimations()`, `pause()`, puis
`currentTime`) au repos, à mi-course et à la fin, à 1280 et à 390 px, dans
ton propre onglet du navigateur intégré ou dans un Chrome / Edge sans
interface si le panneau ne dessine pas ; regarde-les ; et un relevé, pour
chaque personnage et chaque instant échantillonné tous les 50 ms, qu'aucun
bras sans marteau ne dépasse l'horizontale de l'épaule. Supprime
`.dist-scenes`. Ne commite rien.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

# Brief — l'animation de la carte 03 : l'échelle (registre/0062, étape 3)

Sur l'accueil, la carte du troisième projet (matrice de compétences, clé
`matrice`) s'affiche aujourd'hui sans scène (`scene: 'aucune'` dans
`src/contenu/projets.ts`). Tu lui donnes sa scène animée, sur le modèle des
cartes 01 et 02. Deux fichiers à lire d'abord :
`src/components/scene/SceneUservoice.astro` (le modèle d'une variante de
carte) et `ops/images/matrice/planche.mjs` (la géométrie validée de la
scène : échelle, mur, positions, poses).

## La scène validée par Jean (sans le marteau)

Jean a retiré le marteau pour faire plus simple. La scène garde le décor et
les positions de la dernière planche (`ops/images/matrice/planche.png`) :
échelle à trois barreaux, mur à trois rangs, Jean debout à gauche de
l'échelle (lunettes orange), plus de tréteau ni de plan.

- **Repos** : Jean `debout`, les **mains vides** ; l'ouvrier (anonyme)
  `debout` en miroir au pied de l'échelle, tourné vers Jean.
- **Animation, 600 ms** : Jean lève le bras vers le **deuxième barreau**
  (pose `montre`, visée exacte comme en image 4 de la planche) ; l'ouvrier se
  tourne vers l'échelle, pose le pied sur le premier barreau
  (`pied-barreau`, main sur le montant, **bras arrière libre**, sans marteau),
  puis monte (`sur-echelle`, main sur le troisième barreau, bras arrière
  libre) ; le point ambre s'allume en dernier sur le premier barreau.
  Découpage indicatif : ~150 ms de geste de Jean, ~200 ms pied au barreau,
  ~150 ms montée, ~100 ms point ambre (bascules de poses en step-end,
  déplacements en ease-out, comme les autres cartes).
- Sans le marteau, redessine le bras arrière de l'ouvrier dans une position
  naturelle (le long du corps, ou celui de `debout`) ; dis ce que tu choisis.

## Ce que tu fais

- Ajoute à `src/components/scene/poses.ts` les poses nouvelles décrites dans
  `planche.mjs` : `montre` (avec sa cible), `pied-barreau`, `sur-echelle`,
  sur les segments existants, sans articulation nouvelle. Ajoute l'échelle et
  le mur aux objets s'il y a une liste d'objets.
- Une variante `SceneMatrice.astro`, aiguillée par `Scene.astro`
  (`variante="matrice"`), et `scene: 'matrice'` dans `projets.ts`. La carte 03
  retrouve le bloc de scène que `Parcelle.astro` n'affiche pas pour
  `'aucune'`.
- Même déclenchement que les cartes 01 et 02 : survol et focus sur grand
  écran, retour au repos à la fin ; au téléphone (`hover: none`), une fois à
  l'entrée à l'écran, figée sur la fin. **Mouvement réduit** : l'image de
  repos, aucune animation (le test `animations` exige la media query).
- Couleurs par les jetons ; décoratif (`aria-hidden`).
- La page `src/labo/scene.astro` (dev seulement) montre aussi cette variante.

## Ce que tu ne touches pas

Les tests, les pages projet, `src/pages/index.astro` et `en/index.astro`
(l'accroche vient d'être changée par la session), `src/i18n/publication.ts`.

## La preuve attendue

`npx astro build --outDir .dist-0062` puis `DIST=.dist-0062 npm test`
(`fail 0`). Dans le navigateur intégré, **ton propre onglet** (`tabs_create`,
serveur de dev sur 4321 ; ferme l'onglet et remets la taille par défaut à la
fin) : fige l'animation avec `document.getAnimations()` (`pause()`, puis
`currentTime`) au repos, à 300 ms et à la fin, à 1280 px et à 390 px ;
enregistre ces captures dans le dossier temporaire de la session et regarde-
les. Si le panneau ne dessine pas, utilise un Chrome ou un Edge sans
interface comme au chantier 0058. Supprime `.dist-0062`. Ne commite rien.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

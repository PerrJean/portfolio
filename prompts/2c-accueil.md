# Brief — chantier 2c : la vraie page d'accueil (registre/0028)

Le socle existe (gabarit, en-tête, bascule, boutons, jetons de couleur,
police Atkinson), la scène animée aussi (`src/components/scene/`, vue sur
`/labo/scene/`). Tu assembles la **page d'accueil**, en français (`/`) et
en anglais (`/en/`), avec la même structure.

## Ce que la page montre, dans l'ordre

1. **Le soleil**, fixe, **sans animation** : un quart de disque ambre
   (`--ambre`) coupé par le **coin haut droit** de la page, entouré de trois
   anneaux en aplats qui vont vers l'orange, paliers nets, **aucun dégradé
   continu**. Composant `src/components/Soleil.astro`, décoratif
   (`aria-hidden`). Il ne passe jamais sous du texte au point d'en gêner la
   lecture.
2. **L'accroche** : le `<h1>` « Je bâtis sur des hypothèses : j'écoute, je
   teste, puis je dose l'effort. » (EN : « I build on hypotheses: I listen,
   I test, then I size the effort. »), en Atkinson 800, très grand, et une
   ligne de sous-titre : « Deux projets menés de bout en bout sur une
   plateforme EdTech : écouter des milliers d'apprenants, puis corriger ce
   qui les gêne vraiment. » (EN : « Two projects on an EdTech platform:
   listening to thousands of learners, then fixing what really gets in
   their way. »). Pas de bouton dans l'accroche.
3. **La section `id="projets"`**, titre « Projets » / « Projects », avec
   **les parcelles** (`src/components/Parcelle.astro`) :
   - **Chaque parcelle est un seul grand lien** (`<a class="parcelle">`)
     vers sa page projet, qui contient : le numéro en très grand (« 01 »,
     Atkinson 800), le nom, le fait clé, et **la scène** (`Scene.astro`).
   - 01 · UserVoice : « 1 retour sur 3 porte sur le contenu. » (EN : « 1 in
     3 pieces of feedback is about the content. »)
   - 02 · Audit contenu : « Sur le premier parcours audité, 1 question sur 20
     empêchait l'apprenant de répondre. Toutes ont été corrigées. » (EN :
     « In the first course audited, 1 question in 20 stopped learners from
     answering. All of them were fixed. »)
   - Entre les deux, **une flèche au trait** (encre) qui porte « Alors j'ai
     agi dessus. » (EN : « So I acted on it. ») : horizontale sur grand
     écran, verticale quand les parcelles s'empilent.
   - Le composant accepte une propriété `groupe` : `paire` (01 et 02,
     reliées par la flèche) ou `a-part` (un futur projet sans rapport,
     numéroté à la suite, sans flèche). Aucun projet `a-part` n'existe
     encore : prévois seulement la variante.
   - Les données des projets (numéro, nom, fait clé, adresse, groupe) vivent
     dans **un seul fichier** par langue ou un fichier bilingue
     (`src/data/projets.ts`), dont la page se sert.
4. Le pied de page du gabarit.

## La scène dans la parcelle

- **Plus grande qu'aujourd'hui** : à la taille réelle, les gestes se lisaient
  mal. Sur grand écran, la scène occupe toute la largeur de la parcelle
  (deux parcelles côte à côte à partir de 960 px, empilées en dessous). Son
  dessin ne change pas ; seule son échelle s'adapte (SVG en `width: 100%`).
- Le survol et le focus de la parcelle déclenchent « on regarde le plan »
  (le mécanisme existe déjà : `:hover` et `:focus-within` sur
  `.parcelle`). L'impatience se joue au chargement et à l'entrée à l'écran,
  comme aujourd'hui.
- Tu peux ajuster `Scene.astro` pour la taille et le branchement ; ne change
  ni les poses ni la chorégraphie.

## Règles

Couleurs par les jetons de `src/styles/jetons.css`, typographie du socle,
boutons du socle si tu en as besoin. Accessibilité : la parcelle-lien a un
nom accessible clair (numéro, nom, fait clé), la scène reste `aria-hidden`,
le focus est visible sur toute la parcelle. Aucun fichier au-delà de 500
lignes. Retire l'option `todo` du test d'animations (`tests/`) s'il passe,
sans toucher à sa logique.

## La preuve attendue

`npx astro build --outDir .dist-2c` puis `DIST=.dist-2c npm test` : les
commandes et le résumé (`fail 0`, `todo 0`). Supprime `.dist-2c`. Ne commite
rien, n'ouvre aucun navigateur (la session vérifiera à l'œil).

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

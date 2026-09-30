# Brief — les animations de l'accueil (registre/0058)

Jean a validé les images clés de l'accueil : `ops/images/accueil/planche.png`
et ses SVG (`entete.svg`, `01-repos.svg`, `01-fin.svg`, `02-repos.svg`,
`02-fin.svg`), produits par `ops/images/accueil/planche.mjs`, dans le repère
de `src/components/scene/Scene.astro`. Tu les animes dans le site. Deux
fichiers à lire d'abord : `src/components/scene/Scene.astro` et
`ops/images/accueil/planche.mjs` (positions et poses exactes de chaque image).

## Ce qui change

Aujourd'hui, chaque carte de l'accueil (`src/components/Parcelle.astro`,
`Parcelles.astro`) porte la même `Scene` : l'impatience au chargement (et à
l'entrée à l'écran), puis « on regarde le plan » au survol. Désormais :

1. **L'en-tête** (`src/pages/index.astro` et `src/pages/en/index.astro`, bloc
   `.accroche` avec `Soleil`) reçoit, **à partir de 960 px seulement**, la
   scène d'impatience telle qu'elle est aujourd'hui (trois ouvriers anonymes,
   saut, marteau qui tourne, poutre lancée), **jouée une fois au
   chargement**, placée comme `entete.svg` (échelle 1 à 960 px, 1,25 à
   1280 px, linéaire entre les deux ; le sol sur la ligne de base de la
   dernière ligne de la phrase). Au-delà de 1280 px, calée **sur le soleil**
   (le coin droit de l'écran), jamais sur la phrase : par exemple
   `position: absolute` dans `.accroche` avec
   `right: clamp(var(--gouttiere), calc((100vw - 72rem) / 2 + var(--gouttiere)), 5.25rem)`.
   Elle ne touche ni la phrase ni le soleil, et ne change pas la hauteur de
   l'en-tête. Sous 960 px : absente (`display: none`). Décorative
   (`aria-hidden`).
2. **La carte 01 UserVoice** : repos = `01-repos.svg` (Jean seul, plan roulé
   sous le bras) ; animation → `01-fin.svg` (il déroule le plan sur le
   tréteau et se penche, point ambre).
3. **La carte 02 Audit contenu** : repos = `02-repos.svg` (Jean penché sur le
   plan, l'équipe à distance) ; animation → `02-fin.svg` (les trois
   rejoignent Jean, outils posés, et regardent le plan, point ambre).
4. **Déclenchement des cartes** : sur grand écran, au survol et au focus du
   lien (`:hover`, `:focus-within`, comme aujourd'hui), environ **0,6 s**,
   gestes simultanés, retour au repos quand le survol cesse (ou fin figée,
   au plus simple et au plus propre : dis ce que tu choisis). Sur un appareil
   sans survol (`hover: none`), **une fois** quand la carte arrive au milieu
   de l'écran (IntersectionObserver), puis figée sur la fin.
5. **Mouvement réduit** : aucune animation ; l'en-tête et les cartes restent
   sur leur image de repos. Le test `animations` exige que tout `@keyframes`
   soit accompagné de `@media (prefers-reduced-motion: reduce)`.

Garde la mécanique actuelle (poses figées échangées, translations, pivot du
bras et du marteau à l'épaule) et la bibliothèque `poses.ts` sans nouvelle
articulation ; si tu dois y ajouter une pose, dis-le. Couleurs par les
jetons. Le composant `Scene` peut prendre une variante (`entete`, `uservoice`,
`audit`) ; le choix vient de `src/contenu/projets.ts` (clé de page), pas du
texte. La page `src/labo/scene.astro` (servie en dev seulement) doit rester
utilisable : mets-la à jour pour montrer les trois variantes.

## Ce que tu ne touches pas

Les tests, les pages projet et leur bâtiment, la 404, `src/contenu/projets/`,
`src/i18n/publication.ts`. Un autre chantier (montée d'Astro 7) travaille
dans un worktree séparé : ne touche pas à `package.json` ni au lockfile.

## La preuve attendue

`npx astro build --outDir .dist-0058` puis `DIST=.dist-0058 npm test`
(`fail 0`). Vérification dans le **navigateur intégré** (outils
`mcp__Claude_Browser__*`, serveur de dev sur 4321, ouvre **ton propre
onglet** avec `tabs_create`, ferme-le à la fin, remets la taille par défaut) :
fige les animations avec `document.getAnimations()` (`pause()`, puis
`currentTime`) pour capturer le repos, le milieu et la fin de chaque carte et
de l'en-tête, à 1280 px et à 960 px ; à 390 px, vérifie l'absence de
l'en-tête animé et le déclenchement à l'entrée à l'écran (par JavaScript).
Mesure que l'en-tête ne touche ni la phrase ni le soleil à 960, 1280 et
1600 px. Regarde tes captures. Supprime `.dist-0058`. Ne commite rien.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

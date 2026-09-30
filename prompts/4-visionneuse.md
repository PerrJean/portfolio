# Brief — la visionneuse des captures (registre/0054)

Les pages projet du portfolio (Astro) montrent trois captures d'écran dans
des `<figure>` écrites en HTML brut dans le Markdown
(`src/contenu/projets/{fr,en}/uservoice.md`, `.../audit-contenu.md`,
`.../content-audit.md`) : l'image est dans un lien vers le PNG. Un clic ouvre
le PNG brut, hors du site ; au téléphone, le texte des captures est
illisible. Deux fichiers à lire d'abord : `src/layouts/Projet.astro` et
`src/contenu/projets/fr/uservoice.md`.

## Ce que Jean a choisi

- **Plein écran dans la page**, avec l'élément `<dialog>` natif (`showModal`) :
  fond voilé (encre à ~85 % ou ivoire, selon le contraste de l'image, qui a
  un fond clair), l'image entière, sa légende dessous, un bouton « Fermer »
  (EN « Close ») visible en haut à droite, 24 px de cible au moins. Fermeture
  par le bouton, la touche Échap, un clic hors de l'image.
- **Au téléphone** : l'image à sa **taille réelle** (1360 px de large), dans
  une zone qui défile dans les deux sens ; le pincement pour agrandir reste
  permis (ne bloque pas le zoom de la page). Sur grand écran : l'image tient
  dans la fenêtre (largeur et hauteur), et un second clic peut l'afficher à
  taille réelle si c'est simple ; sinon, ne le fais pas.
- **Pas de flèches** suivante / précédente.
- **Pas de recadrage** : dans la page, la capture reste entière, avec sous
  l'image une mention discrète « Agrandir » (grand écran) / « Toucher pour
  agrandir » (téléphone), FR et EN, dans la légende ou juste au-dessus.

## Les exigences

- **Sans bibliothèque**, un petit script local (dans `Projet.astro` ou un
  composant dédié), qui prend toutes les `figure` des captures dans `.corps`.
  **Sans JavaScript**, le lien vers le PNG continue de marcher (amélioration
  progressive : le script intercepte le clic).
- **Accessibilité** : le focus va au bouton « Fermer » à l'ouverture et revient
  au lien d'origine à la fermeture ; `aria-label` sur le dialogue (le texte
  alternatif de l'image) ; l'arrière-plan ne défile pas pendant l'ouverture ;
  contrastes des jetons ; focus visible.
- **Mouvement** : pas d'animation, ou un fondu de 150 ms au plus, coupé sous
  `prefers-reduced-motion: reduce` (le test `animations` l'exige pour tout
  `@keyframes`).
- **Aucune requête vers un tiers** (C6), aucun cookie, aucun stockage.
- Ne change pas le texte des pages ; si le HTML des figures doit changer (une
  classe, un attribut), change-le dans les quatre fichiers, pareil en FR et EN.

## Ce que tu ne touches pas

Les tests, `src/pages/404.astro` et `ops/images/404/` (un autre chantier les
anime en parallèle), `src/components/scene/`, `src/i18n/publication.ts`.

## La preuve attendue

`npx astro build --outDir .dist-0054` puis `DIST=.dist-0054 npm test`
(`fail 0`). Vérifie dans un navigateur : le navigateur intégré s'il est
disponible (outils `mcp__Claude_Browser__*`, serveur de dev déjà lancé sur
le port 4321 ; les captures d'écran de ce panneau sortent blanches après un
défilement, mesure alors par JavaScript), sinon Edge sans interface. À
1280 px et à 390 px : ouverture, fermeture par bouton, Échap et clic
extérieur, retour du focus, défilement de l'image au téléphone. Remets la
taille du navigateur par défaut (preset desktop) à la fin. Supprime
`.dist-0054`. Ne commite rien.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

# Brief — le soleil de la présentation mène à l'accueil (registre/0095)

Un seul fichier : `public/usecase/dentalsoft/index.html` (présentation
16:9, scène de 1600 × 900 mise à l'échelle). Le soleil est le
`<svg class="soleil" … aria-hidden="true">` (vers la ligne 1003), stylé
par `.soleil` (ligne 44, `pointer-events: none`).

## Ce que tu fais

- Envelopper le soleil dans `<a href="/" class="soleil-lien"
  aria-label="Accueil du portfolio" title="Accueil du portfolio">`, même
  onglet. Le SVG garde `aria-hidden`.
- Le lien prend la place et la taille du soleil (140 × 140, coin haut
  droit) ; le clic doit marcher sur toute sa surface. Contour de focus
  visible au clavier, dans la forme de `:focus-visible` déjà en place.
  Au survol, un retour discret (curseur main, légère opacité ou
  échelle), rien qui change la diapositive.
- Vérifier qu'aucun gestionnaire de la page n'intercepte le clic (un clic
  sur la scène qui avancerait la diapositive, par exemple) et que les
  raccourcis clavier (flèches, Échap) marchent toujours.
- Mode clair et sombre.

## La preuve

- Sers `public/` (`python -m http.server 8791 --directory public`, en
  arrière-plan) ; clique le soleil sur deux vues (première et une du
  milieu) : on arrive à `/`. Tab jusqu'au lien : le contour se voit.
  Capture avant / après de la première vue sous `.canevas/0095/`.
- `npx astro build --outDir .dist-95` puis `DIST=.dist-95 npm test` :
  vert. Supprime `.dist-95`, arrête le serveur.

Ne touche à rien d'autre. Un fichier `registre/0094-…` non suivi
appartient à une autre session : n'y touche pas. Pas de `git stash`, ne
commite rien. Rapport de 120 mots au plus. Environnement : Windows,
Git Bash.

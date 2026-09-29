# Brief — les animations de l'accueil, en composants Astro (registre/0022)

Tu portes les deux animations de l'accueil dans le vrai site, en composants
Astro réutilisables, à partir de la **bibliothèque de personnages** déjà
dessinée (le second fichier de ton prompt : poses en `<g id>`, objets, et
une séquence en cinq vignettes). Tu **recopies** les poses, tu ne les
redessines pas, et tu **n'articules aucun membre** : on échange des poses
figées et on déplace les personnages sur la ligne de sol. Seul le marteau
pivote, au poignet.

## Ce que tu écris, et rien d'autre

Tout dans `src/components/scene/` et une page d'essai
`src/pages/labo/scene.astro`. Ne touche à aucun autre fichier du projet
(d'autres chantiers écrivent `tests/`, `package.json`, les gabarits et les
styles).

- **Les poses**, extraites de la bibliothèque, une fois, sous une forme
  réutilisable (un composant `Personnage.astro` avec les props `pose`,
  `jean` (lunettes orange) et `miroir`, ou un fichier de fragments SVG :
  à toi de choisir ce qui reste le plus simple).
- **`Scene.astro`** : la scène d'une parcelle (ligne de sol, tréteau à
  gauche, dalle à droite, Jean à gauche avec ses lunettes, trois
  coéquipiers), qui porte les deux animations.
- **Couleurs** par variables CSS avec repli : `var(--encre, #2A1F1A)`,
  `var(--ivoire, #FEFAF2)`, `var(--ambre, #F2A33A)`, `var(--orange,
  #B54E19)`, `var(--ardoise, #5E7488)`.

## Les deux animations

**1. Par défaut, l'impatience** (environ 1,2 s). Jouée **une fois** au
chargement, puis **une fois** chaque fois que la parcelle entre à l'écran
(`IntersectionObserver` qui retire puis remet une classe). **Jamais en
boucle.** Deux gestes distincts, pour varier :
- un coéquipier **sautille** deux fois (la pose de sautillement) ;
- un autre **fait tourner son marteau** dans la main : un tour complet du
  marteau autour du poignet, puis il le rattrape (pivot déjà prévu dans la
  bibliothèque) ;
- le porteur garde sa poutre sur l'épaule ; Jean tient le plan roulé sous
  le bras.

**2. Au survol ou au focus du lien projet** (le lien est la parcelle
entière, fournie par le parent via un `<slot>` ou une prop : la scène
réagit à `:hover` et `:focus-within` de son conteneur `.parcelle`, environ
2 s) : **on regarde le plan.**
1. Jean passe en bras tendus, le plan se déroule sur le tréteau (échelle
   horizontale depuis la gauche).
2. Jean se penche ; les deux coéquipiers aux mains libres marchent jusqu'à
   lui (alternance des deux temps de marche pendant le déplacement).
3. Trois personnes penchées sur le plan, sans se chevaucher (comme en
   vignette 5, le troisième derrière le tréteau) ; le porteur pose sa poutre
   sur la dalle.
4. Un point ambre se pose **sur le plan**.

Quand le survol cesse, la scène revient au repos. Sur un écran tactile
(`@media (hover: none)`), la séquence 2 se joue une fois après
l'impatience, quand la parcelle est entièrement visible.

**Sans animation** (`prefers-reduced-motion: reduce`) : rien ne bouge ; au
survol, la scène passe **directement** à l'image finale de la séquence 2.
Chaque feuille de style qui contient un `@keyframes` contient aussi cette
règle.

Les illustrations sont décoratives : `aria-hidden="true"` sur le SVG. Une
seule chose importante bouge à la fois, sans rebond. JavaScript : le strict
nécessaire (l'observateur), en script inline du composant, sans
bibliothèque.

## La page d'essai

`src/pages/labo/scene.astro` : deux parcelles côte à côte (« 01 ·
UserVoice » et « 02 · Audit contenu »), chacune un vrai `<a href="#">`
contenant `Scene`, avec `<meta name="robots" content="noindex">`. Fond
ivoire. Pas besoin d'en-tête ni de pied de page.

## La preuve attendue

`npx astro build --outDir .dist-anim` doit réussir : rends la commande et
la fin de sa sortie, la liste des fichiers créés et leur nombre de lignes
(500 au plus par fichier). Supprime `.dist-anim` à la fin. Ne commite rien,
ne publie rien, n'ouvre aucun navigateur.

Environnement : Windows, Git Bash ; Node s'ajoute au PATH par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

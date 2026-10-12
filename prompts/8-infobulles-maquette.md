# Brief — la maquette des infobulles (registre/0088)

Le portfolio de Jean (site statique Astro, FR et EN) garde dans son texte des
termes du métier produit (backlog, user stories, epics, grooming, delivery…)
qu'un recruteur produit attend, mais qu'un lecteur non initié ne comprend
pas. Une infobulle les explique. Tu fais **la maquette seule**, pour que Jean
valide le rendu : **aucune modification des pages du site**. Deux fichiers à
lire d'abord : `src/contenu/projets/fr/matrice-competences.md` (le texte
réel) et `src/layouts/Projet.astro` (la mise en page et les styles d'une
page projet).

## Ce que tu construis

Une page de labo `src/labo/infobulles.astro`, servie par le serveur de dev
seul à `/labo/infobulles/`. Ajoute sa route dans l'intégration `labo` de
`astro.config.mjs`, sur le modèle de `/labo/scene` (en dev seulement, jamais
construite ni publiée). La page reprend **le corps de la page Matrice en FR**
dans la mise en page des pages projet : même typographie, mêmes jetons de
couleur, même largeur de texte, les listes du haut comprises.

Les infobulles, sur la **première occurrence par page** de : backlog, user
stories, epics, grooming, delivery. Les occurrences suivantes restent du
texte simple.

## Le mécanisme (choix de Jean)

- Le terme est un vrai `<button type="button">` dans le fil du texte, relié
  par `popovertarget` à un élément `popover` (popover HTML natif). Pas de
  bibliothèque, aucune requête tiers, aucun cookie. Le moins de JavaScript
  possible, idéalement aucun.
- On l'ouvre au clic, au toucher, et au clavier par Tab puis Entrée. Échap ou
  un clic ailleurs le ferme. Un lecteur d'écran annonce le terme et la
  définition.
- **Marque** : soulignement pointillé (distinct des liens, soulignés plein),
  curseur d'aide, contour visible au survol et au focus. Le bouton ne doit pas
  casser la ligne : même police, même taille, pas de fond ni de marge.
- **Position** : la bulle s'ouvre sous le terme, sans sortir de l'écran. Au
  téléphone (375 px de large), elle ne déborde pas. Si l'ancrage CSS
  (`anchor-name` / `position-anchor`) n'est pas pris en charge, prévois un
  repli propre sous `@supports`. Dans un navigateur sans popover, la
  définition doit rester lisible et ne pas casser la mise en page.
- La bulle : le terme en gras, puis la définition. Couleurs par les jetons
  du site, lisible en clair comme en sombre si le site gère le sombre.

## Les définitions (brouillon, une phrase, vingt mots au plus, sans jargon)

Rédige-les pour un lecteur qui n'y connaît rien. Pour guider le ton :
« Backlog : la liste ordonnée de ce que l'équipe prévoit de développer. »
N'emploie dans une définition aucun autre terme de la liste. Ces textes
passeront ensuite un relevé : fais-les justes et simples, sans les polir.

## Ce que tu rends

La page, la route, et en réponse finale : l'adresse de la page, les cinq
définitions, et trois lignes sur les choix de positionnement et de repli.
Vérifie que `npm run build` passe et que la page n'est pas dans `dist/`. Ne
commite rien. Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

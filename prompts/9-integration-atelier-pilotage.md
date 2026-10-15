# Brief — intégrer le projet 07 « Tableau de bord client » (registre/0090)

Le portfolio (Astro 7) a six projets. Un septième est rédigé et validé par
Jean, FR et EN, avec ses schémas. Tu le fais entrer dans le site. Deux
fichiers à lire d'abord : `src/contenu/projets.ts` (la liste des projets) et
`src/contenu/projets/fr/fusion-plateformes.md` (le modèle d'une page avec
figures `<picture>` large / étroite). Suis ensuite ce qu'ils appellent
(`src/content.config.ts`, `src/i18n/routes.ts`, `src/layouts/Projet.astro`,
les pages de `src/pages/projets/` et `src/pages/en/projects/`).

## 1. Les textes (validés : ne change aucun mot, seulement la mise en forme)

- `redaction/atelier-pilotage.fr.md` → `src/contenu/projets/fr/tableau-de-bord-client.md` ;
  `redaction/atelier-pilotage.en.md` → `src/contenu/projets/en/client-dashboard.md`.
- Adresses `/projets/tableau-de-bord-client/` et `/en/projects/client-dashboard/` ;
  clé de page `atelierPilotage` (routes, `CLES` de `content.config.ts`).
- Le commentaire HTML de fin du fichier FR n'entre pas dans le site.
- Chaque page a sa jumelle (hreflang, bascule FR | EN) et une description,
  comme les autres pages projet. Description FR : « Un atelier avec cinq
  clients avant de construire un tableau de bord : partir des décisions à
  prendre, puis livrer. » EN : “A workshop with five clients before building
  a dashboard: starting from the decisions they make, then shipping.”

## 2. La carte de l'accueil

Dans `PROJETS` : numéro `07`, groupe `a-part` (après la Matrice, sans
flèche), nom « Tableau de bord client » / “Client dashboard”, fait = le
`fait` de la page, tags « Facilitation · Data produit · B2B » /
“Facilitation · Product data · B2B”. Scène : `aucune` pour l'instant (une
scène est en cours de dessin ; ne touche pas à `src/components/scene/`).
Vérifie la mise en page de l'accueil avec sept cartes, au-dessus et
au-dessous de 960 px.

## 3. Les illustrations

- **Schémas** : `ops/images/atelier-pilotage/{frise,donnee-decision,niveaux}`,
  FR et EN, large et `.etroit.`, copiés dans `public/illustrations/atelier-pilotage/`,
  à la place des marqueurs `<!-- SCHÉMA … -->` / `<!-- DIAGRAM … -->`, en
  `<figure class="schema-dessine"><picture>` comme la Fusion (bascule à
  48,5rem). Textes : prends l'`aria-label` ou le `<title>` de chaque SVG
  pour l'`alt`. Légendes FR : « Les trois temps de l'atelier » ; « Le temps
  passé ne dit rien seul ; face à un objectif, il montre où agir (exemple
  fictif) » ; « Le même écart, du contrat à l'apprenant ». EN : “The three
  parts of the workshop” ; “Time spent says little on its own; against a
  target, it shows where to act (fictional example)” ; “The same gap, from
  contract to learner”.
- **Photo et captures** : Jean les dépose dans
  `C:\Users\Jean PERRIER\.portfolio\atelier-pilotage\` (`photo-atelier.jpg`,
  `capture-graphique.jpg`, `capture-tableau.jpg`). **Si elles y sont** :
  avec `sharp`, réduis la photo à 1 600 px de large, retire toutes les
  métadonnées (EXIF : lieu, appareil), et coupe en haut des deux captures
  la barre d'en-tête de l'application (icônes de recherche et de
  notification) ; publie dans `public/captures/atelier-pilotage/`. La photo
  va dans « L'atelier », avant la frise : alt « Jean Perrier debout devant
  le mur de l'atelier : des paperboards découpés par temps, couverts de
  post-its » / “Jean Perrier standing by the workshop wall: flip-chart
  sheets split by stage, covered in sticky notes” ; légende « Le mur de
  l'atelier, découpé en trois temps » / “The workshop wall, split into
  three stages”. Les deux captures vont à la place du marqueur
  `<!-- CAPTURE … -->`, ouvertes par la visionneuse comme les autres
  captures du site ; alt et légende : « Le tableau de bord, sur des données
  fictives » / “The dashboard, with dummy data”. **Si elles n'y sont pas** :
  laisse le marqueur et dis-le dans ton rapport.

## 4. Les vérifications

`npm run build` doit passer. Lance les tests (`npm test` ou ce que
`package.json` prévoit) : **ne modifie aucun test** ; liste ceux qui
échouent à cause du septième projet (nombre de projets, de pages), un autre
agent les mettra à jour. Passe le vérificateur de confidentialité sur
chaque fichier ajouté ou modifié (chemins Windows, depuis
`C:\Users\Jean PERRIER\Portfolio` :
`python ops/hooks/verifier_confidentialite.py <chemin>`) : il doit se taire.

Tu ne touches ni à `redaction/`, ni à `ops/images/` (sauf lecture), ni à
`src/components/scene/`. Ne commite rien. Rapport de 300 mots au plus :
fichiers créés et modifiés, sortie du build, tests en échec, ce qui reste.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

# Brief — l'intégration des infobulles (registre/0088)

Le portfolio de Jean (site statique Astro 7, FR par défaut, EN en miroir sous
`/en/`) reçoit des infobulles sur les termes du métier produit. Le rendu est
**validé par Jean** sur une maquette ; les définitions sont **arrêtées**. Tu
portes les deux dans le site. Deux fichiers à lire d'abord :
`src/labo/infobulles.astro` (la maquette validée : balisage, CSS, replis,
marquage de la première occurrence) et `redaction/lexique.md` (les douze
termes, leurs pages, leurs définitions FR et EN, **à reprendre mot pour
mot**).

## Ce que tu construis

- **Un module réutilisable** pour le marquage et le lexique (par exemple
  `src/components/infobulles/`) : le lexique FR/EN en données, une fonction
  qui pose la bulle sur la **première occurrence de chaque terme dans la
  page**, tous blocs confondus, dans l'ordre où le lecteur les rencontre
  (encadré du haut, fait clé, trois phrases, corps, « Pour aller plus loin »).
  Les occurrences suivantes restent du texte. Jamais dans un titre, un lien,
  un attribut (`alt`, `title`…), une légende d'image remplacée ni dans le
  `<head>` (title, meta, données structurées).
- **Le CSS** de la maquette, tel quel, dans les styles du site (un seul
  endroit), replis compris.
- **Les pages** : toutes les pages projet FR et EN (par
  `src/layouts/Projet.astro`) et À propos FR et EN (`src/pages/a-propos.astro`,
  `src/pages/en/about.astro`). Les termes de la colonne « Pages » du lexique
  doivent y recevoir leur bulle ; s'ils apparaissent ailleurs dans une page
  traitée, la bulle s'y pose aussi (première occurrence). Variantes à
  reconnaître : pluriels (learning designers, Product Designers), « lead
  développeur » / « lead developer », « scale-up SaaS B2B » / « B2B SaaS
  scale-up » (l'expression entière, une seule bulle), casse indifférente. Le
  mot du texte reste tel quel dans le bouton ; la bulle affiche le terme du
  lexique.
- **Pas sur** l'accueil, les cartes, les étiquettes, le pied de page, la 404.
- **Le Design Sprint** : supprime la parenthèse qui l'explique dans
  `src/contenu/projets/fr/mises-en-situation.md` et
  `src/contenu/projets/en/speaking-practice.md` (« (quelques jours
  d'ateliers pour aboutir à un prototype) » et son jumeau EN) ; la bulle la
  remplace. Ne touche à aucun autre texte.
- **Les identifiants** des bulles sont uniques dans la page et stables.
- **La maquette** : supprime `src/labo/infobulles.astro` et sa route dans
  `astro.config.mjs` ; la vraie page Matrice devient la preuve.

## Règles

Aucune bibliothèque, aucune requête tiers, aucun cookie, le moins de
JavaScript possible (la maquette n'en a pas). Module 500 lignes au plus.
Commentaires en français, au ton du code voisin, avec `registre/0088`. N'écris
**pas les tests** : un autre agent s'en charge ; décris en fin de réponse ce
qu'il doit vérifier.

## Ce que tu rends

`npm run build` et `npm test` passent (53 tests aujourd'hui). Réponse finale :
les fichiers touchés, pour chaque page construite la liste des termes qui ont
reçu leur bulle (relevée dans `dist/`, pas supposée), les écarts éventuels au
lexique, et la liste des vérifications pour l'agent des tests. Ne commite
rien, ne laisse aucun serveur ouvert. Environnement : Windows, Git Bash, Node
par `export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

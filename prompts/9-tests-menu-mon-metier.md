# Brief — les tests de l'entrée « Mon métier » du menu (registre/0101)

Un autre agent a ajouté « Mon métier » / « My job » au menu, entre Projets
et À propos. Tu n'as pas écrit ce code : tu écris ses tests. Deux fichiers à
lire : `registre/0101-menu-mon-metier.md` (la spec) et `git diff` de
`src/components/EnTete.astro` et `src/i18n/textes.ts`.

Dans le style des tests existants (`tests/`, y compris ceux qui passent par
Chromium) :
- **jumelles et liens** : sur chaque page construite, le menu porte trois
  entrées dans l'ordre Projets, Mon métier, À propos (Projects, My job,
  About en EN), et « Mon métier » mène à la page de la langue de la page ;
- **page active** : sur `/mon-metier/` et `/en/my-job/`, c'est cette entrée
  qui porte `aria-current`, et elle seule ; sur « À propos », ce n'est pas
  elle ;
- **largeur téléphone** (375 px) : menu fermé, aucun débordement ; ouvert,
  les trois entrées visibles dans l'ordre ; à 1280 px, les entrées tiennent
  sur une ligne ;
- un test qui casse vraiment : vérifie-le une fois en inversant deux entrées
  à la main, puis remets le fichier identique.

`npm test` vert à la fin, avec le nombre de tests. Ne touche ni au code du
menu, ni à `public/usecase/`, ni aux registres. **Ne commite pas.** Rapport
de 150 mots au plus. Environnement : Windows, Git Bash.

# Brief — relevé des lourdeurs de la page 06 réécrite (registre/0116, règle 0072)

Le portfolio de Jean (Head of Product) s'adresse à des recruteurs qui lisent
vite, spécialistes du produit ou RH généralistes. Un agent vient de réécrire
la page 06, la matrice de compétences, pour qu'elle raconte l'accompagnement
d'un Product Manager plutôt que la relecture d'un document. Tu fais un
**relevé en lecture seule** : tu ne modifies aucun fichier, Jean trie avant.

## Ce que tu lis

1. La ligne éditoriale et la relecture : skills `ligne-editoriale` et
   `relecture-non-initie` (charge les deux ; le second prime pour juger ce
   qu'un lecteur non initié comprend).
2. `src/contenu/projets/fr/matrice-competences.md`, puis sa jumelle
   `src/contenu/projets/en/skills-matrix.md`. Le `fait` et les `tags` de la
   carte 06 dans `src/contenu/projets.ts` reprennent ceux de la page.

## Ce que tu cherches, par ordre d'importance

1. **Le récit** : la page se lit-elle comme un accompagnement (un écart, un
   cadre pour en parler, un entretien, un suivi, ce qui a bougé), avec le
   manager en acteur ? Où retombe-t-elle dans la description d'un document ?
2. **Les règles** : un niveau (junior, intermédiaire, senior) attribué à la
   personne accompagnée, une compétence nommée comme sa faiblesse, un
   prénom, l'employeur nommé, un nom interne. Seule forme permise de
   l'écart : il se voyait plus avancé que ce que la grille a montré. Un
   résultat affirmé sans preuve, ou une réutilisation présentée comme faite
   (une seule personne a été accompagnée ainsi).
3. **La cohérence** avec le projet 01 (`src/contenu/projets/fr/mises-en-situation.md`,
   lecture du seul front matter) : la page 06 dit que le Product Manager
   porte aujourd'hui ce projet ; rien ne doit laisser croire qu'il l'a pris
   après l'entretien de janvier 2026, le projet 01 ayant commencé en mai 2025.
4. **Les lourdeurs** : phrases de plus de 25 mots, redites entre le fait
   clé, la synthèse, le corps et « Pour aller plus loin », tics de la ligne
   éditoriale, termes non expliqués (OKR, grooming, backlog…).
5. **L'anglais** : écarts de sens avec le français, tournures calquées.

N'ajoute aucun fait. Si un fait manque, écris [À COMPLÉTER].

## Ce que tu rends

Dans ton message final uniquement : en tête, les **cinq changements qui
comptent le plus**, une ligne chacun ; puis un tableau **extrait → ce qui
gêne → réécriture proposée → fichier:ligne**, du plus gênant au moins
gênant, 25 lignes au plus, FR puis EN. Ne commite rien, ne modifie rien.

Worktree : `C:\Users\Jean PERRIER\Portfolio\.claude\worktrees\chantier-0116-matrice-654181`.

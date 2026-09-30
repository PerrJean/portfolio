# Brief — le projet Matrice passe de « Product Owner » à « Product Manager » (registre/0059)

Jean confirme que la personne accompagnée dans le projet Matrice est le **PM**
de son équipe, la même que dans un autre projet. Il demande **tout en PM** :
la personne, le titre de la page, le nom de la grille, et la grille elle-même.

## Ce que tu changes

1. **Les pages** `src/contenu/projets/fr/matrice-competences.md` et
   `src/contenu/projets/en/skills-matrix.md`, et `redaction/matrice.fr.md`
   (au-dessus du filet) : « Product Owner » → « Product Manager », « PO » →
   « PM », titre « Matrice de compétences : faire grandir un Product
   Manager » (EN : « Skills matrix: helping a Product Manager grow »), le
   fait clé, les légendes et textes alternatifs des figures, le libellé du
   téléchargement. Vérifie aussi `src/contenu/projets.ts` (nom, fait clé de la
   carte 03) et les descriptions des pages `src/pages/projets/matrice-competences.astro`
   et `src/pages/en/projects/skills-matrix.astro`.
2. **La grille** : elle est produite hors du dépôt par
   `~/.portfolio/matrice/generer.py` depuis `grille.json`. **Ne lis jamais**
   l'export brut (`*.xlsx`, `lecture.txt`) : il contient une évaluation de
   personne. Ajoute aux corrections du générateur le passage de « PO » à
   « PM » et de « Product Owner » à « Product Manager » (mot entier ; attention
   aux sigles voisins comme « PO juniors » → « PM juniors », et à ne pas
   toucher des mots qui contiennent « po »). Régénère
   `public/captures/matrice/grille-extrait.png`, `grille-complete.png` et
   `public/telechargements/grille-competences-po.pdf`, **renommé**
   `grille-competences-pm.pdf` (mets à jour le lien et le **poids affiché** :
   le build refuse un poids faux). Supprime l'ancien PDF de `public/`.
3. Relis les images et la première page du PDF : plus aucun « PO », aucun
   prénom, aucune évaluation.

## Ce que tu ne touches pas

Les tests, `src/components/`, les autres pages, `redaction/` hors
`matrice.fr.md`, `ops/images/`. D'autres agents travaillent en parallèle sur
`redaction/fusion.fr.md` et `redaction/mises-en-situation.fr.md`.

## La preuve attendue

`npx astro build --outDir .dist-pm` puis `DIST=.dist-pm npm test` (`fail 0`) ;
grep à zéro de « Product Owner » et du mot « PO » dans les pages construites
de la matrice et sur les accueils ; vérificateur de confidentialité avec des
**chemins Windows** sur les pages HTML de la grille ; dimensions et poids des
images et du PDF. Supprime `.dist-pm`. Ne commite rien.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

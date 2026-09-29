# Brief — le relevé des lourdeurs sur tout le site (registre/0044)

Le portfolio de Jean s'adresse à des recruteurs qui lisent vite. Jean trouve
le texte encore lourd par endroits. Tu fais un **relevé en lecture seule** :
tu ne modifies aucun fichier du site, Jean valide avant.

## Ce que tu lis

1. La ligne éditoriale : `C:\Users\Jean PERRIER\.claude\skills\ligne-editoriale\SKILL.md`.
2. Le texte **tel que le recruteur le lit** : construis le site
   (`npx astro build --outDir .dist-releve`) et lis le texte visible des huit
   pages (accueil, deux projets, à propos, en FR et en EN). Retrouve ensuite
   le fichier source de chaque extrait (`src/contenu/`, `src/pages/`,
   `src/i18n/textes.ts`) pour le citer.

## Ce que tu cherches

Ce qui ralentit la lecture : phrases de plus de 25 mots, subordonnées
empilées, noms à la place de verbes, parenthèses qui cassent la phrase,
précisions qui ne servent pas un recruteur, redites entre la synthèse du haut
et le corps de la page, verbes mous. Premier cas relevé par Jean :
« 1 retour sur 3 **porte sur** le contenu » devient « **concerne** le
contenu », partout où la phrase apparaît (compte-les). Garde les faits, les
chiffres et les termes fixés (« réponse », jamais « clé » ; les trois
contrôles nommés d'Audit contenu ; « Son résultat ne présume pas de la
qualité du reste du contenu du site. » reste tel quel).

## Ce que tu rends

`redaction/releve-lourdeurs.md` : un tableau par page, **extrait → ce qui
pèse → réécriture proposée → fichier:ligne**, classé du gain le plus fort au
plus faible, 30 lignes au plus en tout, FR puis EN (l'anglais suit le
français quand la même phrase change). En tête, les trois changements qui
comptent le plus, en une ligne chacun. Supprime `.dist-releve`, ne commite
rien.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

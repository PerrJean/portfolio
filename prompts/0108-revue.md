# 0108 — Brief : revue du test du plafond de 800 lignes

Worktree : `C:\Users\Jean PERRIER\Portfolio\.claude\worktrees\chantier-0108-plafond-800-82639d`.
Windows : Git Bash ou PowerShell 7, `node` dans le PATH.

Tu n'as vu ni la spec s'écrire ni le test s'écrire. Lis :

1. `registre/0108-plafond-800-lignes.md` : la section `## Spec` fait foi.
2. `tests/plafond-lignes.test.mjs` : le test à revoir.

## À faire

1. Confronte le test à chaque point de la spec. Cherche ce qui le ferait
   passer à tort (fichier manqué, comptage faux d'une ligne, binaire texte
   mal classé, fichier texte classé binaire, chemin à espace ou accent,
   fichier suivi supprimé du disque, exception trop large) ou le rendrait
   lent.
2. Casse-le de trois façons au moins, **dans une copie jetable** sous
   `$TEMP` (`git clone` du worktree) et jamais dans le worktree : par
   exemple un fichier de 801 lignes sans saut de ligne final, un fichier de
   801 lignes dans un dossier à espace, l'exception DentalSoft retirée,
   DentalSoft raccourcie à 100 lignes. Note pour chaque cassure si le test
   rougit et ce que dit le message. Une cassure qui ne rougit pas est un
   problème. Supprime la copie ensuite.
3. Relève la durée du test sur le worktree.

Rends **PASSE** ou **NE PASSE PAS**, puis la liste des problèmes, chacun
avec la ligne du test en cause.

## Interdits

Lecture seule dans le worktree : aucun fichier modifié, ni `git commit`,
`stash`, `checkout`, `reset`.

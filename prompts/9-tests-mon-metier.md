# Brief — les tests de « Mon métier en clair » (0094)

Un autre agent a intégré la page `/mon-metier/` (`/en/my-job/`) et une
ligne-lien sur les deux accueils. Toi, tu n'as pas écrit ce code : tu écris
ses tests. Deux fichiers à lire : `registre/0094-mon-metier-en-clair.md` (ce
que la page doit être) et `git diff` + `git status` (ce qui a été fait).

## 1. D'abord, une décision de Jean sur les infobulles

`npm test` est rouge sur 1 test : `tests/infobulles.test.mjs` refuse des
bulles sur une page que la colonne « Pages » du lexique ne nomme pas. Jean
a tranché : **les bulles restent**, et
- « Mon métier » s'ajoute à la colonne Pages de **Product Designer**,
  **learning designer**, **lead développeur** et **discovery** dans
  `redaction/lexique.md` (et partout où le code recopie cette colonne) ;
- **discovery** reçoit sa définition FR, mot pour mot : « le travail
  d’écouter les utilisateurs et de tester des idées avant de décider quoi
  construire ». La bulle doit alors apparaître sur « projets de discovery »
  de la page française.
Lis `.claude/rules/infobulles.md` avant de toucher au composant ou à ses
données. Ne change aucune autre définition.

## 2. Les tests

Dans le style des tests existants (`tests/`), ce qui protège la page :
- les deux pages se construisent, se répondent en jumelles (bascule,
  hreflang) et figurent au plan du site ;
- chaque accueil porte la ligne-lien, juste après le sous-titre, vers la
  page de sa langue, avec le texte retenu ;
- chaque page : un `h1` (« Mon métier en clair » / « My job in plain
  English »), quatre `h2`, les liens vers les quatre projets et « À propos »
  de sa langue, tous résolus vers une page construite ;
- la bulle discovery présente en FR et en EN ;
- un test qui casse vraiment : vérifie-le en cassant une fois la ligne-lien
  à la main, puis remets-la.

`npm test` vert à la fin, avec le nombre de tests. Ne touche ni à
`public/usecase/`, ni aux registres, ni au texte des pages. **Ne commite
pas.** Rapport de 200 mots au plus. Environnement : Windows, Git Bash.

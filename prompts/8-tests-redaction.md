# Brief — deux contrôles de rédaction sur le site construit (registre/0086)

Le portfolio de Jean se construit avec Astro dans `dist/` (ou dans le
dossier donné par la variable `DIST`). Les tests sont dans `tests/`, en
`node:test`, sans dépendance. Deux fichiers à lire d'abord :
`tests/outils.mjs` (les outils partagés) et `ops/hooks/pre-commit` (le hook
qui construit puis lance les tests).

## 1. Un test bloquant : aucun gabarit oublié

`tests/gabarits.test.mjs` : dans le texte visible de chaque page HTML du
site construit (hors `labo/`), aucun reste de rédaction : `[À COMPLÉTER`,
`[A COMPLETER`, `[TO COMPLETE`, `XX %`, `XX%`, `[Nom`, `[Name`, `TODO`,
`N'hésitez pas` / `N’hésitez pas`. Le message d'échec donne la page et
l'extrait. Le texte visible exclut les balises, les scripts et les styles.

## 2. Une alerte non bloquante : les phrases de plus de 30 mots

Jean veut **une alerte, pas un blocage** : une phrase longue n'est pas
toujours fautive. `ops/alertes/phrases-longues.mjs` lit le texte visible des
pages du site construit (hors `labo/`), coupe en phrases (point, point
d'exclamation, point d'interrogation, deux-points suivi d'une majuscule ;
une ligne de liste ou une cellule de tableau compte comme une phrase), compte
les mots (une apostrophe ne coupe pas un mot ; un nombre compte pour un mot)
et affiche, page par page, chaque phrase de plus de 30 mots avec son nombre
de mots, puis un total. Il sort toujours avec le code 0. Ajoute son appel
dans `ops/hooks/pre-commit`, **après** les tests, sous un titre
`-> alertes de redaction (non bloquantes)`, sans jamais faire échouer le
commit. Pense aussi à `sh ops/hooks/install.sh` si le hook installé est une
copie.

## La preuve

`npx astro build --outDir .dist-tests`, `DIST=.dist-tests npm test`
(`fail 0` attendu ; si le test des gabarits échoue sur le site actuel, dis
où, sans corriger le contenu), puis `DIST=.dist-tests node
ops/alertes/phrases-longues.mjs` et rends sa sortie. Supprime
`.dist-tests`. Ne touche à aucun contenu (`src/`, `redaction/`). Ne commite
rien.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

# Brief — stabiliser le test des infobulles en navigateur (registre/0104)

Un seul fichier à modifier : `tests/infobulles-navigateur.test.mjs`. Lis
d'abord `registre/0104-infobulles-test-instable.md` (le constat et la spec).

## Ce que tu fais

1. **Reproduire.** `npx astro build --outDir .dist-104`, puis lance
   `DIST=.dist-104 npm test` trois fois et le fichier seul
   (`DIST=.dist-104 node --test tests/infobulles-navigateur.test.mjs`) trois
   fois. Note pour chaque lancement les cas qui échouent et la durée.
2. **Trouver la cause.** Pour un cas qui échoue, mesure ce qui consomme les
   2 s (défilement, attente de stabilité de Playwright, charge des passes
   parallèles). Ne retiens pas l'hypothèse du registre sans preuve.
3. **Corriger au plus petit** dans le seul fichier de test : délai plus
   large, seconde tentative après `scrollIntoViewIfNeeded`, ou limite de
   passes simultanées. Durée du fichier dans `npm test` : pas plus de 20 %
   au-dessus d'aujourd'hui (~170 s).

## La preuve

- `DIST=.dist-104 npm test` **cinq fois de suite**, tout vert ; donne la
  durée de chaque lancement.
- **Le test voit encore** : dans une copie jetable de `.dist-104`, recouvre
  une bulle du site et une de la présentation par un élément posé
  par-dessus ; le test doit échouer sur ces deux-là et nommer ce qui
  recouvre. Script jetable sous `.canevas/0104/`.
- Supprime `.dist-104` et la copie.

Ne touche ni à `src/`, ni à `public/`. Pas de `git stash`, ne commite rien.
Rapport de 150 mots au plus : la cause trouvée, la correction, les cinq
durées, le résultat du contrôle « le test voit encore ». Environnement :
Windows, Git Bash.

# Brief — un bouton « Redémarrer les démos » (registre/0103)

Un seul fichier : `public/usecase/dentalsoft/index.html`. Lis d'abord
`registre/0103-dentalsoft-redemarrer-demos.md` (la spec et la place), puis
`.claude/rules/infobulles.md`.

## Ce que tu fais

- Ajoute le bouton dans `.plan-tete`, juste après `#btnCourt`, même classe
  visuelle (`court-btn`, sans `aria-pressed`).
- Au clic : remets les trois prototypes à leur état d'ouverture. Réutilise
  les gestionnaires existants (`#a1Reset`, `#mpRejouer`, `#atReset`) ; si
  le plus propre est d'en extraire une fonction par prototype, appelle-la
  depuis les deux endroits. Complète ce qu'ils oublient : panneau
  « validation envisagée » refermé (bouton et `aria-expanded` compris),
  analyse Migration Preview en cours annulée (minuteur, barre, bouton),
  recherche de l'Atlas vidée. Compare à l'état d'une page fraîchement
  chargée pour trouver le reste.
- Ne change ni l'écran, ni le dévoilement, ni le Sommaire (il reste
  ouvert).
- Retour : un court texte « Démos remises à zéro » à côté du bouton, dans
  une zone `aria-live="polite"`, effacé après ~2 s.

## La preuve

Script Playwright **jetable** sous `.canevas/0103/`, sur `public/` servi en
local (`python -m http.server 8795 --directory public`) : pour chaque
prototype, le manipuler (valider le compte rendu et ouvrir la validation ;
avancer Migration Preview jusqu'à la synthèse, et un cas pendant
l'analyse ; changer mode, pays, ouvrir une règle et taper une recherche
dans l'Atlas), ouvrir le Sommaire, cliquer le bouton, puis comparer le
HTML de chaque prototype à celui d'une page fraîche (ou ses états
visibles, si les attributs dynamiques diffèrent). Vérifier aussi : écran
inchangé, Sommaire toujours ouvert, le retour s'affiche puis disparaît,
aucune erreur console, et un clic sur le bouton n'avance pas la
présentation. Puis `npx astro build --outDir .dist-103` et
`DIST=.dist-103 npm test` : tout vert. Supprime `.dist-103`, arrête le
serveur.

Ne touche à rien d'autre. Pas de `git stash`, ne commite rien. Rapport de
150 mots au plus : ce que la remise à zéro couvre et le résultat de chaque
contrôle. Environnement : Windows, Git Bash.

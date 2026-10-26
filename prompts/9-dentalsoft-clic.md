# Brief — un clic fait avancer la présentation (registre/0102)

Un seul fichier : `public/usecase/dentalsoft/index.html`. Lis d'abord
`registre/0102-dentalsoft-clic-pour-avancer.md` (la spec : ce qui avance,
ce qui n'avance pas), puis `.claude/rules/infobulles.md` (le tap ailleurs
ferme une bulle : il ne doit pas aussi avancer).

## Ce que tu fais

- Trouve ce que fait le bouton « Suivant » (dévoilement puis écran) et
  appelle **la même fonction** au clic : pas de seconde logique.
- Un seul écouteur sur la scène, qui sort sans rien faire si la cible est
  dans un élément interactif (`closest()` sur une liste écrite en un seul
  endroit et commentée : `button, a, input, select, textarea, label,
  [role=button], [tabindex], [data-info], [data-aller], [data-i],
  .capsule`, … complète-la en lisant la page), dans un prototype, ou si
  un panneau, le Sommaire ou une infobulle est ouvert (alors le clic ne
  fait que ce qu'il faisait déjà).
- Ignore un clic qui termine une sélection de texte
  (`getSelection().toString()` non vide) et un clic avec modificateur.

## La preuve

Un script Playwright **jetable** (hors du dépôt, sous `.canevas/0102/`),
sur `public/` servi en local (`python -m http.server 8794 --directory public`) :
- un clic sur une zone vide de trois écrans (un avec dévoilements) avance
  comme « Suivant » ;
- un clic sur : Précédent, Suivant (un seul pas, pas deux), Sommaire,
  une capsule à bulle, un onglet pays, un bouton Approfondir, le soleil,
  un bouton et une zone vide **dans chaque prototype** : n'avance pas ;
- bulle ouverte, clic ailleurs : la bulle se ferme, l'écran ne change pas ;
- au dernier écran : rien ; aucune erreur console.
Puis `npx astro build --outDir .dist-102` et `DIST=.dist-102 npm test` :
tout vert. Supprime `.dist-102`, arrête le serveur.

Ne touche à rien d'autre. Pas de `git stash`, ne commite rien. Rapport de
150 mots au plus : la liste d'exclusion retenue et le résultat de chaque
contrôle. Environnement : Windows, Git Bash.

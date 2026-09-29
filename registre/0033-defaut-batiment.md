# 0033 — Défaut du 2d : le bâtiment ne suit pas la lecture

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `defaut` | `structure` | 60 | — | — |

**Relevé par Jean le 2026-09-29**, dans le navigateur : le bâtiment ne grandit
pas au rythme de la lecture des H2. Cause probable : un étage se pose dès
que son H2 entre à l'écran par le bas ; avec les textes provisoires courts,
plusieurs H2 sont visibles ensemble. Correctif : une ligne de lecture au
tiers haut de l'écran. **Demandes de Jean dans la même passe** : deux
bonhommes seulement, un à gauche et un à droite du bâtiment (Jean est l'un
des deux) ; le bâtiment fixe à l'écran du haut au bas de la page. Brief :
`prompts/2d-batiment-correctifs.md`.

Défaut non vu à la clôture de `0030` : la session a regardé des positions
de défilement, pas la succession des poses. À retenir pour les prochaines
vérifications d'animations liées au défilement.

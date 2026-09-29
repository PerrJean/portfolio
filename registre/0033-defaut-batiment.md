# 0033 — Défaut du 2d : le bâtiment ne suit pas la lecture

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `defaut` | `structure` | 60 | 97 | claude-opus-5-5 |

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

**Clos le 2026-09-29.** Ligne de lecture au tiers haut (`rootMargin
-67 %`), deux ouvriers (Jean à gauche, l'autre à droite, en miroir), les
deux sur le toit en fin de page, colonne en `position: fixed` sous
l'en-tête, estompée quand le pied de page arrive. **Preuve par la session,
dans le navigateur à 1 280 × 900** : en amenant chaque H2 au quart haut de
l'écran, les étages passent à « posé » un par un (1, 2, 3, 4, 5), puis le
toit descend. `npm test` → `pass 29 | fail 0`. Ratio 1,62. Limite vue : dans
une fenêtre très basse (panneau de 200 px), le toit se pose trop tôt.

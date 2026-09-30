# 0062 — La scène d'accueil du projet matrice : l'échelle à trois barreaux

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `ligne` | 70 | — | — |

**Choix de Jean (2026-10-01)** : sur la carte du troisième projet, une
échelle à trois barreaux (les trois niveaux de la grille) contre un mur ; au
repos, un ouvrier au pied, Jean à côté avec le plan ouvert (la grille) ; au
survol, Jean montre le barreau suivant sur le plan, l'ouvrier monte d'un
barreau, point ambre sur le barreau atteint. Le leader fait monter, il ne
note pas. Par étapes : images clés (ce chantier), puis animation.
Brief : `prompts/5-echelle-images-cles.md`.

**Images clés faites (coût 118, ratio 1,7)** : `ops/images/matrice/planche.png`,
`repos.svg`, `intermediaire.svg`, `fin.svg`, `planche.mjs`. Deux poses
nouvelles à reporter dans `poses.ts` (`sur-echelle`, `montre`), mêmes
segments ; mur et échelle en objets de planche. Lisible à 335 px. En attente
du go de Jean.

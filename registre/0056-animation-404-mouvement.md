# 0056 — L'animation 404, étape 3 : le mouvement

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `structure` | 110 | 132 | `claude-opus-5-5` |

**Go de Jean (2026-09-30)** sur les quatre images clés de 0055. On anime
« Le chantier a déménagé » dans `src/pages/404.astro`, à la place du portrait
fixe : une fois au chargement, 2 à 3 secondes, poses échangées et
translations comme sur l'accueil, marteau qui pivote à l'épaule ; dernière
image fixe si l'utilisateur réduit les animations. Le titre de la page
devient « Le chantier a déménagé. ».
Brief : `prompts/4-404-animation.md`.

**Clôture** : 2,8 s, CSS seul, sans script : entrée, huit pas (`marche-1` /
`marche-2`), frappe à l'épaule avec l'arc et le point ambre, pivot du cadre
(`scaleX`), pas en arrière, `bras-tendus`. Animations déclarées sous
`no-preference` seulement ; au repos et en mouvement réduit, l'image 4.
EN : « The worksite has moved. » (et non « This site has moved on », qui
laisserait croire à un changement d'adresse du site). Vérifié en figeant
l'animation par `document.getAnimations()` à 0,7, 1,8 et 2,8 s. Ratio 1,2.

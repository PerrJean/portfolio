# 0055 — L'animation de la page 404 : « Le chantier a déménagé »

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `ligne` | 60 | — | — |

**Choix de Jean (2026-09-30)**, par étapes : script, puis images, puis
animation, un go à chaque étape.

**Script retenu** : 1. Un panneau de chantier à angles droits, posé sur le
sol, une flèche « → ». 2. Jean (lunettes orange) arrive de la gauche. 3. Il
s'arrête et tape le panneau du marteau. 4. Le panneau pivote vers les liens.
Texte : « Le chantier a déménagé. » Une fois au chargement, 2 à 3 secondes ;
image fixe (dernière pose) si l'utilisateur réduit les animations.

**Étape 2 (ce chantier)** : les quatre images clés, fixes, pour valider le
dessin. L'animation (étape 3) aura sa propre entrée après le go de Jean.
Brief : `prompts/4-404-images-cles.md`.

**Étape 2 faite (coût 102, ratio 1,7)** : `ops/images/404/planche.png` et
`1.svg` à `4.svg`, dans le repère de `Scene.astro`, par
`ops/images/404/planche.mjs`. Poses reprises : `marche-1`, `frappe-2`,
`bras-tendus` ; ajoutés : le marteau en main sur les deux poses qui n'en
tiennent pas, le panneau (nouvel objet), un point ambre à l'impact, un
demi-tour en ardoise au pivot. Jean recule d'un pas entre 3 et 4.
En attente : le go de Jean sur les images, puis l'étape 3 (animation).

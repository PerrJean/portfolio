# 0067 — Les illustrations du projet fusion

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `ligne` | 90 | — | — |

**Demande de Jean (2026-10-01)** : « il faut avoir des illustrations aussi,
très important ». Pour la fusion des plateformes (0065), trois schémas au
trait, dans le style du site (comme le schéma de la chaîne d'Audit contenu) :
1. **avant / après** : trois plateformes (interface, gabarits, données), puis
   deux sur un design system commun, la troisième en pointillés
   (« second temps, non engagé : arbitrage ») ;
2. **les trois trajectoires** valeur / temps (celle retenue, les deux écartées) ;
3. **les gabarits** : une trentaine de vignettes ramenées à quatre communs.
Aucun nom de marque, de site ni de chiffre absolu interne ; aucune capture
réelle (C5). Par étapes : dessins fixes (ce chantier), intégration après le
go de Jean sur le texte et les dessins.
Brief : `prompts/6-illustrations-fusion.md`.

**Dessins faits (coût 127, ratio 1,4)** : `ops/images/fusion/`, trois schémas
FR et EN, en deux dispositions (736 px et 350 px, car aucun ne se lit réduit
au téléphone), planche et `planche.mjs` ; texte en chemins, vérificateur muet.
À l'intégration : un `<picture>` qui bascule à 48,5rem, un `alt` par image.

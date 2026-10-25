# 0095 — Le soleil de la présentation DentalSoft mène à l'accueil

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `publication` | 50 | | `claude-sonnet-5-5` |

**Demande de Jean (2026-10-25)** : un moyen d'aller de la présentation
`/usecase/dentalsoft/` à l'accueil du portfolio.

**Spec (questionnaire du 2026-10-25, recommandation retenue)** : le soleil
du coin haut droit devient un lien vers `/`, nommé « Accueil du
portfolio » au survol et pour les lecteurs d'écran. Rien n'est ajouté à
l'écran. Écartés : le logo et le nom en bas (un élément de plus sur chaque
diapositive), une ligne dans le Sommaire seulement (trop cachée).

Le lien va de la page cachée vers le site, jamais l'inverse : le test
`tests/usecase.test.mjs` reste vrai.

Brief : `prompts/9-dentalsoft-soleil.md`.

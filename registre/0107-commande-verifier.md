# 0107 — Une seule commande de vérification : `verifier`

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `outil` | 50 | | `claude-opus-5-5` |

**Demande de Jean (2026-11-05)**, dans la mise en conformité avec les
commandements v4 (règle 11) : une seule commande, la même pour Jean, pour
l'agent, pour le hook et pour la CI.

**Constat** : `npm test` suppose un site déjà construit (`tests/outils.mjs`,
variable `DIST`). Le hook (`ops/hooks/pre-commit`) et la CI
(`.github/workflows/tests.yml`) enchaînent chacun à leur façon le build puis
les tests.

**Périmètre** : une commande `verifier` (build dans un dossier jetable, puis
tous les tests), appelée telle quelle par le hook, la CI et l'agent ; la
vitesse rapide des branches `chantier/*` (0106) reste au hook.

**Hors périmètre** : le contrôle du poste, couvert par la skill globale
`verification-prealable`.

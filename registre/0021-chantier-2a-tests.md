# 0021 — Chantier 2a : les tests, avant le code

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `structure` | 60 | — | — |

Sept tests sur `node:test`, sans dépendance, lus sur `dist/` : jumelles
FR/EN et bascule, aucune ressource tierce ni cookie, termes interdits (par
le vérificateur du hook), `prefers-reduced-motion` pour tout `@keyframes`,
liens internes, contrastes des jetons, accessibilité de base (un `h1`, lien
d'évitement, `alt`). Marqués `todo` avec le chantier qui les fera passer.
Brief : `prompts/2a-tests.md`. Écrits par un autre sous-agent que le code.

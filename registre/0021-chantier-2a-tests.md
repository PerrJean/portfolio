# 0021 — Chantier 2a : les tests, avant le code

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `structure` | 60 | 104 | claude-opus-5-5 |

Sept tests sur `node:test`, sans dépendance, lus sur `dist/` : jumelles
FR/EN et bascule, aucune ressource tierce ni cookie, termes interdits (par
le vérificateur du hook), `prefers-reduced-motion` pour tout `@keyframes`,
liens internes, contrastes des jetons, accessibilité de base (un `h1`, lien
d'évitement, `alt`). Marqués `todo` avec le chantier qui les fera passer.
Brief : `prompts/2a-tests.md`. Écrits par un autre sous-agent que le code.

**Clos le 2026-09-29.** 29 tests dans `tests/` (sept familles, un fichier
d'outils), `npm test` ajouté. **Preuve, rejouée par la session** :
`npx astro build --outDir .dist-verif` puis `DIST=.dist-verif npm test` →
`tests 29 | pass 1 | fail 0 | todo 28`. Le test vert vérifie la formule
WCAG. Ratio 1,73.

Ce que 2b devra corriger, relevé par les tests : cinq pages manquantes
(les EN, et les deux projets sous leurs nouvelles adresses), ni bascule ni
`hreflang`, ni lien d'évitement, pas de `jetons.css`, et **les polices
chargées depuis Google Fonts** (C6) par le brouillon du 7 septembre.
Écarts acceptés : motif `tests/**/*.test.mjs` (Node 24 refuse un dossier),
C6 plus large que le brief, domaine du site lu dans `astro.config.mjs`
(encore `example.com`). Les tests entreront dans le hook au chantier 2b,
quand un build sera possible à chaque commit.

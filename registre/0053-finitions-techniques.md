# 0053 — Finitions techniques avant le lancement

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `publication` | 60 | 122 | `claude-opus-5-5` |

Constats de la revue 0050, validés par Jean (2026-09-30) :
1. `/labo/scene/` est publiée : la sortir du site construit.
2. Pas de page 404 propre au site.
3. Les pages anglaises partagent l'aperçu en français : un `apercu-en.png`.

Côté Jean, dans GitHub Pages : cocher « Enforce HTTPS » et faire couvrir
`www` par le certificat (aujourd'hui `https://www…` échoue).
Brief : `prompts/4-finitions-techniques.md`.

**Clôture** : le labo déplacé dans `src/labo/`, servi en dev seulement par une
petite intégration de `astro.config.mjs` ; `src/pages/404.astro` bilingue
(`page` devenu facultatif dans `Base`, `EnTete`, `PiedDePage`, `Bascule`) ;
`public/og/apercu-en.png` choisi par `Base` selon la langue, espaces
insécables après « I » pour éviter un « I » seul en fin de ligne. Images
inchangées vérifiées par empreinte. Enforce HTTPS coché par Jean : `http`,
`www` et `https://www` redirigent en 301 vers `https://jeanperrier.pm/`.
Ratio 2,0 : la 404 sans jumelle a demandé de rendre `page` facultatif.

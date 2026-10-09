# 0085 — La scène « sonder le terrain » (carte UserVoice)

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `structure` | 60 | — | `claude-opus-5-5` |

**Choix de Jean (2026-10-09)** : UserVoice construit la sonde ; sa carte
reçoit une nouvelle scène, le carottage. L'actuelle (dérouler le plan sur le
tréteau) passe à l'analyse du NPS. Étapes : images clés (ce chantier), go de
Jean, puis animation. Brief : `prompts/8-sonder-images-cles.md`.

**Planche validée (Jean, 2026-10-09)** : on anime. Brief : `prompts/8-animation-sonde.md` (nouvelle variante `sonde` ; `SceneUservoice`, le plan déroulé, ira à l'analyse du NPS).

**Animation (2026-10-09)** : variante `sonde` (`SceneSonde.astro`), 600 ms en quatre temps, poses et objets dans `poses.ts`, visible sur `/labo/scene`. Preuve : 48 tests, captures figées à 1280 et 390 px, relevé des bras tous les 50 ms sans faute (marge minimale 3 au temps 3). Câblage sur la carte UserVoice avec l'intégration de l'analyse du NPS.

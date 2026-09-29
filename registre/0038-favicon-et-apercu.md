# 0038 — Le favicon et l'aperçu LinkedIn

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `contenu` | 90 | 126 | claude-opus-5-5 |

**Demande de Jean (2026-09-29)**, en parallèle de `0037` : le favicon
(logo-lunettes, lisible à 16 px, SVG et PNG) et l'image d'aperçu 1200 × 630
(soleil en coin, bâtiment terminé avec les deux personnages sur le toit, nom,
phrase signature, « Head of Product · IA appliquée · Data »), validée en
`0015`. Sans nouveau paquet : `sharp` et la police `.woff` convertie à la
volée. Un seul sous-agent, parce que les deux touchent le `<head>` commun.
Brief : `prompts/3-favicon-et-apercu.md`.

**Clos le 2026-09-30.** `public/favicon.svg` (variante sombre),
`favicon-32.png`, `apple-touch-icon.png`, `og/apercu.png` (1200 × 630,
58 Ko), script `ops/images/apercu.mjs` relançable, balises `og:image*` et
`twitter:card` dans le gabarit. Pas de `favicon.ico` (`sharp` ne l'écrit
pas). Aperçu regardé par la session. Ratio 1,40.

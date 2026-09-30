# 0076 — Le soleil sur la page « À propos »

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `arbitrage` | `structure` | — | — | — |

**Demande de Jean (2026-09-30)** : ajouter le soleil sur « À propos ». **Tri
en questionnaire** : le même quart de disque que l'accueil, plus petit
(`clamp(5rem, 3rem + 8vw, 9rem)`), dans le coin haut droit, au-dessus du
personnage ; `Soleil.astro` prend `reserve={false}` (le dessin seul, sans
réserve flottante, qui casserait la grille de la fiche). À partir de 760 px,
le personnage descend sous le dernier anneau. Vérifié à 500, 800, 1024, 1280
et 1440 px, FR et EN.

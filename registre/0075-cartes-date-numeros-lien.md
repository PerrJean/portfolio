# 0075 — Cartes de l'accueil : la date, des numéros plus petits, « Lire le projet »

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `arbitrage` | `structure` | — | — | — |

**Demandes de Jean (2026-09-30)** : la date du projet sous son nom, sur
l'accueil ; une designeuse trouve les numéros trop gros, et rien ne montre
au repos que les cartes sont cliquables. **Tri en questionnaire** : la date
en toutes lettres, comme les pages projet (« Février 2026 », ardoise, 19 px
en 700), tirée de la page projet (`src/i18n/date.ts`, commun aux deux) ;
les numéros à peu près divisés par deux (`clamp(3rem, 2rem + 2.5vw, 4rem)`,
48 px au téléphone, 64 px au plus) ; « Lire le projet → » (EN « Read the
project → ») en orange sous le fait clé, souligné au survol avec le nom.
Vérifié à 1280 et 390 px (aucun débordement, couleurs des jetons).

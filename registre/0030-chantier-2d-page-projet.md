# 0030 — Chantier 2d : la page projet et son bâtiment

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `structure` | 150 | 202 | claude-opus-5-5 |

**Go de Jean (2026-09-29).** Collection Markdown par projet et par langue
(en-tête à schéma, H2 libres, texte provisoire), synthèse recruteur, corps,
« Pour aller plus loin » replié, fin de page (toit posé, projet suivant).
Bâtiment en colonne 1 : 4 collée à droite, un étage par H2, grue fixe,
étage qui descend au câble, trois bonhommes qui tapent du marteau pendant la
pose, toit et équipe sur le toit en fin de page ; indicateur de lecture au
téléphone. Brief : `prompts/2d-page-projet.md`.

Jean a aussi confirmé : secrets créés (Actions et Dependabot), alertes
Dependabot activées, domaine vérifié dans GitHub.

**Clos le 2026-09-29.** Collection `src/content.config.ts` (schéma strict :
`titre`, `fait`, `probleme`, `action`, `resultat`, `plusLoin`, `langue`,
`cle`), quatre Markdown provisoires, gabarit `src/layouts/Projet.astro`,
`batiment/Batiment.astro` (347 lignes) et `batiment/Lecture.astro`. Garde-fous
au build : un fichier par projet et par langue, au moins un H2. Preuve :
`npm test` → `pass 29 | fail 0` (rejoué par le hook) ; **vu dans le
navigateur** à 1 280 px (grue et étage qui descend en haut de page, étages
posés et fenêtre ambre au milieu, toit et équipe sur le toit en bas, lien
« Projet suivant : Audit contenu ») et au téléphone (indicateur de lecture
collé en haut). Ratio 1,35. Les personnages restent petits dans la colonne.

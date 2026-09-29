# 0022 — Les animations de l'accueil, en composants

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `structure` | 150 | 134 | claude-opus-5-5 |

Demande de Jean (2026-09-29) : poursuivre les animations **en parallèle** des
tests. Composants dans `src/components/scene/` à partir de la bibliothèque
(`0018`), page d'essai `/labo/scene/`. Par défaut, l'impatience (sautillement
et marteau qui tourne), une fois au chargement et à l'entrée dans l'écran ;
au survol ou au focus, on regarde le plan, point ambre sur le plan. Brief :
`prompts/2c-animations.md`.

**Clos le 2026-09-29.** Quatre fichiers, 441 lignes : `poses.ts` (poses
extraites de la bibliothèque, couleurs en variables), `Personnage.astro`,
`Scene.astro` (SVG, 21 `@keyframes`, observateur), `pages/labo/scene.astro`.
**Preuve, rejouée par la session** : build réussi ; `npm test` → `29 | pass
1 | fail 0 | todo 28` ; aucune URL externe dans la page d'essai ; **vue dans
le navigateur** (serveur de dev) : l'état de repos et la fin du survol se
rendent comme le script, sans erreur de console. Ratio 0,89 : la
bibliothèque paie enfin dans le vrai site.

**À trancher par Jean** : le marteau disparaît quand son porteur marche
(pas de pose « marche avec marteau ») ; au repos, les deux coéquipiers se
touchent presque ; le point ambre est petit à cette taille. Variable
`--dalle` ajoutée hors des cinq jetons.

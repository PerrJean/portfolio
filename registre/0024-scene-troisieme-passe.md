# 0024 — La scène, troisième passe

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `structure` | 100 | 126 | claude-opus-5-5 |

**Retours de Jean (2026-09-29).** Plus d'effet « jupe » sur les silhouettes
(jambes séparées dès les hanches). Le sauteur regarde à droite au début. Le
marteau un peu plus petit (1,2), tête vers le haut à la fin du tour. La
poutre lancée plus haut, et le bras du porteur bouge (nouvelle pose
« lancer la poutre »). Au survol, le porteur lance la poutre à côté de lui
puis rejoint la table, derrière le coéquipier au marteau. Brief :
`prompts/2c-scene-v3.md`.

**Clos le 2026-09-29.** `Scene.astro` 417 lignes, `poses.ts` 107 (poses
construites par de petites fonctions ; nouvelle pose `lancer-poutre`).
Preuve rejouée : build réussi, `npm test` → `pass 1 | fail 0 | todo 28`.
**Vu dans le navigateur**, figé à 0, 0,12, 1,0 et 1,55 s (impatience) puis
1,5 et 2,5 s (survol) : silhouettes sans jupe, marteau tête en haut, poutre
lancée bras levés ; au survol, le porteur lance sa poutre sur la dalle et
rejoint la table ; quatre personnes autour du plan, point ambre dessus.
Ratio 1,26.

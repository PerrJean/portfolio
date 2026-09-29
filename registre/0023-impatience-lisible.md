# 0023 — L'impatience, rendue lisible

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `structure` | 70 | 100 | claude-opus-5-5 |

**Constat de la session, vu dans le navigateur (2026-09-29)** : à la taille
réelle, l'impatience ne se lit pas. **Retouches validées par Jean** : un
vrai saut (deux fois), un marteau plus grand avec l'arc du geste, environ
2 s jouées une fois, les coéquipiers écartés. **Ajouts de Jean** : celui qui
tient le marteau fait face au porteur ; le porteur lance un peu sa poutre et
la rattrape. Trois gestes successifs, une chose à la fois. La séquence du
survol garde ses positions finales. Brief : `prompts/2c-impatience-v2.md`.

**Clos le 2026-09-29.** `Scene.astro` 366 lignes, `poses.ts` 42. Preuve
rejouée par la session : build réussi, `npm test` → `pass 1 | fail 0 | todo
28`. **Vu dans le navigateur**, animations figées à 0, 0,12, 0,95 et 1,6 s :
le saut, le tour de marteau (B tourné vers le porteur, arc du geste) et la
poutre lancée se lisent. A et B écartés de 14 px. Limites : le marteau passe
un instant derrière la poutre en haut de son tour ; à la taille réelle,
les gestes restent petits. Ratio 1,43.

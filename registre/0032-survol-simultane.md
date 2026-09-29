# 0032 — Le survol : les gestes convergent en même temps

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `structure` | 50 | 77 | claude-opus-5-5 |

**Idée de Jean, go le 2026-09-29.** Un survol dure souvent moins d'une
seconde : la séquence « on regarde le plan » passe de 2,5 s pas à pas à
environ 1,3 s, les gestes en parallèle (Jean déroule le plan, A et B
marchent, le porteur lance sa poutre et arrive, tous penchés vers 1,2 s,
point ambre en dernier). L'impatience garde « une chose à la fois ». Seul
`Scene.astro` change.

**Livré le 2026-09-29.** Survol en 1,3 s : Jean déroule le plan de 0 à
0,4 s ; A, B et le porteur partent à 0,1 s (le porteur lance sa poutre au
sol puis marche) ; tous penchés à 1,13 s ; point ambre de 1,17 à 1,3 s.
Aucun chevauchement. Preuve : build et `npm test` → `pass 29 | fail 0` ;
**vu dans le navigateur**, figé à 0,6 et 1,3 s. Ratio 1,54. Commité avec le
2d (le hook construit tout l'arbre de travail).

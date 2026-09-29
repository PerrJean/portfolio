# 0032 — Le survol : les gestes convergent en même temps

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `structure` | 50 | — | — |

**Idée de Jean, go le 2026-09-29.** Un survol dure souvent moins d'une
seconde : la séquence « on regarde le plan » passe de 2,5 s pas à pas à
environ 1,3 s, les gestes en parallèle (Jean déroule le plan, A et B
marchent, le porteur lance sa poutre et arrive, tous penchés vers 1,2 s,
point ambre en dernier). L'impatience garde « une chose à la fois ». Seul
`Scene.astro` change.

# 0083 — Des tags de compétences sur les projets

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `arbitrage` | `structure` | — | — | — |

**Demande de Jean (2026-10-09)** : sous chaque projet, quelques mots clés
qui résonnent avec les rubriques « Compétences » du CV. **Tri en
questionnaire** : deux ou trois tags par projet, aussi dans l'encadré des
pages (ligne « Compétences ») ; « Voice of Customer » et « Qualité du
contenu » écartés ; pour Mises en situation, le pilotage de l'équipe
(« Management d'équipe ») ; « Data analysis » en anglais dans les deux
langues, plutôt que « Product Analytics », pour l'analyse statistique.
**Maquette à valider avant implémentation.**

**Maquette validée (Jean, 2026-10-09)** : étiquettes à contour fin sous la date des cartes ; ligne « Compétences » dans l'encadré des pages. Tags : Mises en situation « Discovery · IA appliquée · Management d'équipe » ; Fusion « Pilotage de projet · Priorisation · Design system » ; UserVoice « IA appliquée · Product Analytics » ; Audit « IA appliquée · LLM-as-judge » ; Matrice « Management · Leadership » ; l'analyse du NPS recevra « Data analysis » à son intégration. Tags dans `src/contenu/projets.ts` (champ `tags`, FR et EN).

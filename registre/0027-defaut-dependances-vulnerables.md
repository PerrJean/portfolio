# 0027 — Dépendances signalées vulnérables

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `defaut` | `outil` | 60 | — | — |

**Relevé le 2026-09-29** par `npm audit` après le chantier 2b : `astro`
(5.18, critique, correctif en version majeure 7), `esbuild` (lecture de
fichiers par le serveur de dev sous Windows), `sharp` (bibliothèques
d'images). Le site publié est statique : ces failles touchent le poste de
développement (serveur de dev) et le traitement d'images, pas les visiteurs.
**À faire avant la mise en ligne** : montée d'Astro en version 7 dans un
chantier dédié, tests à l'appui. Ne pas lancer `npm audit fix --force` à
l'aveugle.

**Lancé le 2026-09-30** à la demande de Jean, dans un worktree (branche
dédiée, fusion après revue). Brief : `prompts/4-astro-7.md`. Coût estimé
revu : 120 (deux versions majeures, 5 → 7, et la comparaison des builds).

# 0110 — Le registre au format commun

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `outil` | 70 | | `claude-opus-5-5` |

**Demande de Jean (2026-11-05)**, commandements v4 (partie 2, la mesure) : un
statut ouvert ou clos explicite, jamais un champ vide qui peut vouloir dire
les deux, et cinq chiffres d'arrêt au lieu de trois.

**Constat** : `registre/0000-convention.md` lit le statut dans `cout_reel`
vide ; l'audit qualité du 2026-11-05 compte 39 fiches dont le statut est
ambigu à la lecture automatique.

**Périmètre** : appliquer au Portfolio le format commun des registres (en
cours d'écriture dans une autre session, à attendre). Un script traite les
cas sûrs ; pour les fiches ambiguës, une liste avec un statut proposé pour
chacune, que Jean valide.

# 0060 — Défaut : le vérificateur se taisait sur un chemin introuvable

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `defaut` | `outil` | 5 | — | — |

**Relevé le 2026-10-01** par le sous-agent de la capture de la grille (0059) :
`ops/hooks/verifier_confidentialite.py` sautait sans rien dire un fichier
qu'il ne trouvait pas (par exemple un chemin mal converti entre Git Bash et
Windows). Le contrôle pouvait donc répondre « rien à signaler » sans avoir
rien lu, ce que sa doctrine interdit (« le contrôle ne se tait jamais »).

**Correction** (session principale, coût non mesurable) : un chemin
introuvable est désormais un refus (« fichier introuvable, rien n'a été
vérifié »). Le hook ne passe que des fichiers ajoutés ou modifiés, qui
existent : il n'est pas gêné. **Contre-vérification** : les pages rendues des
cinq captures (UserVoice, Audit contenu, grille) et les PNG de
`public/captures/` repassés avec des chemins Windows : tous muets.

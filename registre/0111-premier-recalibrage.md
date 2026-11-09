# 0111 — Premier recalibrage

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `arbitrage` | `outil` | `ouvert` | 50 | | `claude-opus-5-5` |

**Demande de Jean (2026-11-05)** : le recalibrage tous les 30 points clos
(`registre/0000`, commandements v4 partie 2) n'a jamais été fait.

**Constat** : au 2026-11-05, 56 points clos portent un coût estimé et un coût
réel ; ratio réel sur estimé médian 1,42 (1,19 sur les 15 derniers).

**Périmètre** : après 0110, les cinq chiffres de la v4 (ratio réel sur estimé,
part de défauts, plus gros fichier, exécution la plus lente, lignes
supprimées par ligne ajoutée), et la décision de s'arrêter ou non. On y
rouvre aussi le linter, reporté par Jean pour tenir le budget de l'outil
(plafond 15 %).

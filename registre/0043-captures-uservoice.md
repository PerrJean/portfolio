# 0043 — Les captures d'écran de UserVoice, sur données synthétiques

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `contenu` | 180 | 216 | `claude-opus-5-5` |

**Demande de Jean (2026-09-29), choix « 1 a+c, 2a, 3a »** : deux captures,
le bilan du lundi et le tableau de bord NPS, produites par le vrai code de
UserVoice tournant sur une base **inventée de toutes pièces** (C5 : ni données
réelles anonymisées, ni distributions calquées). Une capture par section
concernée, en cadre, avec une légende et la mention « données synthétiques ».
Le générateur et la base synthétique vivent **hors des deux dépôts** (ils
portent le schéma interne de UserVoice, C4). Phase 1 en sous-agent : les
images et leurs légendes ; l'intégration dans la page suit le schéma 0041.
Brief : `prompts/3-captures-uservoice.md`.

**Clôture de la phase 1** : deux images par le vrai code (bilan hebdo, baromètre
NPS) sur une base inventée (~1 500 retours, ~10 000 notes, segments « Parcours
A », « Marché B »…), post-traitée pour retirer noms internes et polices
tierces, vérificateur muet, témoin positif refusé. L'en-tête du bilan est
ajouté pour la capture (Streamlit exige un clic). Ratio 1,2.
**Retour de Jean** : le baromètre NPS est retenu ; la page Analyse remplace
le bilan hebdo ; recadrer ; les chiffres synthétiques restent tels quels.
Suite : 0047.

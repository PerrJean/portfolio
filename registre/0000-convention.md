# 0000 — Convention

Reprise de `UserVoice/registre/0000`. Un point de décision = un fichier.
Cinq champs obligatoires en tête :

| champ | valeurs |
|---|---|
| **nature** | `chantier` · `defaut` · `arbitrage` |
| **etape** | `ligne` · `structure` · `contenu` · `publication` · `outil` |
| **cout_estime** | en milliers de tokens, avant de commencer |
| **cout_reel** | en milliers de tokens, à la clôture |
| **modele** | le modèle qui a fait le chantier |

`cout_reel` reste vide tant que le point est ouvert. Un chantier mené en
session principale n'a **aucun coût mesurable** : il passe par un sous-agent.

**Recalibrage tous les 30 points clos**, avec trois chiffres et un arrêt
possible : ratio réel/estimé (seuil 2), part de défauts parmi les points clos
(seuil 30 %), taille du plus gros module (seuil : toute croissance continue).

Budget de l'outil qui sert à faire l'outil : **plafond 15 %**.

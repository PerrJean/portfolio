# 0049 — Une capture d'Audit contenu, sur données synthétiques

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `contenu` | 180 | 217 | `claude-opus-5-5` |

**Décision de Jean (2026-09-29), « 2a »** : le carnet de relecture (une
question, son verdict, ce qui lui est reproché, la correction proposée), par
le vrai code d'AuditContenu sur des questions **inventées de toutes pièces**.
Le dépôt AuditContenu contient des contenus réels presque partout (sorties,
lots, verdicts, pages rendues) : le sous-agent ne lit que le code Python.
Phase 1 : l'image, sa légende et son texte alternatif ; l'intégration suit
0048.

Brief : `prompts/3-capture-audit.md`.

**Clôture** : le carnet n'a pas d'écran propre (sortie console) ; son rendu
est l'onglet « Échantillon · famille » du tableau de bord, capturé sur 8
questions d'anglais inventées (1 bloquant, 1 majeur, 2 mineurs, 4 rien à
corriger). Post-traitement : police distante, liens vers l'outil d'édition
interne, noms de commandes et commentaire nommant l'employeur retirés ;
« clé stockée » → « réponse enregistrée » (choix de Jean) ; onglets
techniques retirés. `carnet-relecture.png` 1360 × 1230, 58 Ko, à la fin de
« Corriger sans casser », FR et EN. Coût réel mesuré (reprise du même
sous-agent comprise). Ratio 1,2.

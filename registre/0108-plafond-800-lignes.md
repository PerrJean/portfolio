# 0108 — Aucun fichier de code au-delà de 800 lignes, tous langages

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `outil` | 50 | | `claude-opus-5-5` |

**Demande de Jean (2026-11-05)**, commandements v4 (partie 2, la forme du
code) : le plafond de 500 lignes, 800 en limite dure, vaut pour tous les
langages et tous les dossiers. `CLAUDE.md` l'écrit, rien ne le contrôle.

**Constat** : `public/usecase/dentalsoft/index.html` fait 2 612 lignes (c'est
l'exemple que cite la v4) ; `tests/infobulles-navigateur.test.mjs` 526.

**Périmètre** : un test dans `tests/` qui refuse tout fichier suivi de plus de
800 lignes (code, HTML, CSS, scripts annexes), branché dans les deux vitesses
du hook (0106).

**Arbitrage de Jean (2026-11-05)** : la page DentalSoft est figée. Elle reçoit
une **exception nommée et définitive** ; son découpage (estimé à 300) n'est
pas ouvert. On ne découpe que ce qu'on va encore modifier.

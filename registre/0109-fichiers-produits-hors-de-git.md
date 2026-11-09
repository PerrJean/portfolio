# 0109 — Les fichiers produits jetables et le `.pyc` hors de git

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `outil` | `clos 2026-11-09` | 60 | — | `claude-opus-5-5` |

**Demande de Jean (2026-11-05)**, commandements v4 (règle 10) : le dépôt
contient du code, pas de fichiers produits.

**Constat** : 14 planches de travail `ops/images/**/planche.png`, sorties des
scripts `planche.mjs`, sont suivies (3,44 Mo d'images dans `ops/images/`) ;
`ops/hooks/__pycache__/verifier_confidentialite.cpython-312.pyc` aussi.

**Périmètre** : les sortir de l'index (`git rm --cached`), les ajouter au
`.gitignore`, et un test qui refuse un fichier produit jetable suivi.

**Hors périmètre** (registre/0105) : `public/illustrations/` est un dossier de
générés **livrés**, qui reste dans git. Le brief se rédige après lecture de
0105.

## Tranché

- 2026-11-09, Jean : mené **avec 0112** dans un même chantier, une seule
  prise en main de `ops/images/` ; les planches PNG sont les sorties des
  scripts `planche.mjs` que 0112 factorise.

## Clôture (2026-11-09)

Mené avec 0112, même branche ; **coût réel compté dans 0112**.

- Sortis de l'index (`git rm --cached`), restés sur le disque : les **10**
  planches `ops/images/**/planche.png` et
  `ops/hooks/__pycache__/verifier_confidentialite.cpython-312.pyc`. Le
  constat comptait 14 PNG : les 4 autres sont les bannières LinkedIn
  d'`ops/images/couverture/`, livrables d'`apercu.mjs`, qui restent suivies.
- `.gitignore` : `ops/images/**/planche.png`, `__pycache__/`, `*.py[co]`.
- `tests/produits.test.mjs` : aucun fichier produit jetable dans l'index
  (`git ls-files`), et `.gitignore` les écarte (`git check-ignore
  --no-index`). Joué avant le correctif : 2 rouges (les 11 fichiers suivis ;
  la règle absente) ; après : 2 verts. Il ne demande pas de site construit.

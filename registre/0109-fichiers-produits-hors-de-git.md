# 0109 — Les fichiers produits jetables et le `.pyc` hors de git

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `outil` | `en cours` | 60 | | `claude-opus-5-5` |

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

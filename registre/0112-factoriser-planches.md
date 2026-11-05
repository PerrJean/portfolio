# 0112 — Factoriser les scripts `planche.mjs`

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `outil` | 250 | | `claude-opus-5-5` |

**Demande de Jean (2026-11-05)** : c'est le principal défaut de conception
relevé par l'audit qualité du 2026-11-05 (lignes dupliquées dans les scripts
d'images). 12 scripts dans `ops/images/`, 3 360 lignes.

**Périmètre, dans cet ordre** :
1. **D'abord, reporter dans `ops/images/fusion/planche.mjs` les retouches
   faites à la main** au point 0087 sur 4 SVG de `public/illustrations/fusion/`
   (`gabarits.en`, `gabarits.etroit.en`, `trajectoires.fr`,
   `trajectoires.etroit.fr` : `<title>` et `aria-label`), décrites en 0105.
   Sinon, relancer le script les efface.
2. Puis factoriser ce qui est commun aux scripts.

**Test de non-régression** : les sorties du script sont comparées aux SVG
**actuels** de `public/illustrations/`, pas aux anciennes sorties du script.

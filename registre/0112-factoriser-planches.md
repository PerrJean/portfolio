# 0112 — Factoriser les scripts `planche.mjs`

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `outil` | `en cours` | 250 | | `claude-opus-5-5` |

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

## Tranché

- 2026-11-09, Jean : mené **avec 0109** (les planches PNG et le `.pyc` hors
  de git) dans un même chantier, sur une même branche.

## Exécution

**État de référence** (2026-11-09, worktree du chantier, sur `6450366`) :
`npx astro build --outDir .dist-ref` vert, puis `DIST=.dist-ref npm test` :
287 tests, 287 verts. Les 12 scripts relancés deux fois de suite donnent
des sorties identiques à l'octet, PNG compris : la comparaison est possible.

**Constats avant toute modification** :
- les 24 SVG de `public/illustrations/` : 20 identiques à la sortie du
  script, les 4 retouchés à la main au point 0087 divergent (comme dit 0105) ;
- `mises-en-situation-scene/planche.mjs` écrit `undefined` dans `fin.svg` à
  la place du post-it retenu : l'objet `postit-retenu` a quitté `poses.ts`
  en 0090 (`c18d99a`) ; le `fin.svg` suivi est le bon ;
- `public/favicon-32.png`, `accueil/planche.png` et
  `mises-en-situation-scene/planche.png` sortent différents des fichiers
  suivis (rendu de sharp) : non versés.

**Étape 1** : `fusion/planche.mjs` porte les textes accessibles retouchés au
point 0087 (« piece of material » ; « monte d’abord, puis s’aplatit sous le
code à reprendre »). Relancé, il sort les 24 SVG de `public/illustrations/`
à l'octet (`cmp`, 24 sur 24).

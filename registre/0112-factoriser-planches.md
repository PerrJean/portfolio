# 0112 — Factoriser les scripts `planche.mjs`

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `outil` | `clos 2026-11-09` | 250 | 462 | `claude-opus-5-5` |

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

**Correctif hors spec, avant la factorisation** :
`mises-en-situation-scene/planche.mjs` dessine lui-même le post-it retenu
(`POSTIT_RETENU`, le dessin de `poses.ts` avant 0090) : relancé, il sort de
nouveau le `fin.svg` suivi, à l'octet. Sans quoi la comparaison de ce script
se ferait sur une sortie fausse.

**Étape 2** : brief `prompts/0112-factorisation.md`, confié à un sous-agent.
Preuve : un script hors dépôt relance les 12 scripts et compare chaque
sortie (SVG et PNG) à l'octet à une base figée juste avant, et, pour
`fusion` et `atelier-pilotage`, chaque SVG à `public/illustrations/`.
Résultat : `ops/images/commun/` (`svg`, `police` déplacé d'`accueil/`,
`personnage`, `planche`, `schema`) ; 3 367 lignes avant, 3 083 après,
modules communs compris (`wc -l`). Plus gros module : `apercu.mjs`, 354
lignes ; plus longue fonction : 72 lignes (deux fonctions de plus de 80
scindées). Restent locaux, avec leur raison dans le rapport : les pièces de
pose que `poses.ts` n'exporte pas (une copie dans `commun/personnage.mjs`,
sous le garde-fou de `fusion-scene`), le `perso` d'`uservoice-sonde` (sans
enveloppe de classe), les gabarits propres à la 404 et à la matrice.

**Preuve** : les 11 commandes (12 scripts, `police.mjs` compris) rendent
« diff vide », SVG et PNG, et les 24 SVG de `public/illustrations/` sont
identiques à la sortie de leur script. Les chemins à argument (planches EN
des schémas, maquette de l'accueil à 960, 1280 et 390, `--poses`) sortent
identiques à l'octet entre `9d08c8d` (avant) et la branche (après).

**Revue** (sous-agent neuf, un tour) : PASSE. Elle a montré que la preuve ne
voyait pas une sortie qui cesse d'être écrite (l'ancienne restait sur le
disque) : corrigé, la preuve efface les sorties avant de relancer, et la
même cassure rougit (6 « MANQUE » par script de schémas). Suites faites : la
404 passe par `scene()` commun, deux exports inutilisés retirés, un
commentaire qui citait un composant supprimé en 0090. Laissées : `r2` importé
sous le nom `r1` dans `uservoice-sonde` (un nom), la police lue à l'import
(moins d'une seconde).

**Hors spec** : le correctif de `mises-en-situation-scene` (plus haut). Le
script de preuve reste hors du dépôt : `apercu.mjs` réécrit des fichiers de
`public/`, il ne peut pas tourner dans les tests.

**Coût réel** : 462, la somme des deux sous-agents relevée au harnais
(factorisation 291, revue 171) ; la session principale n'est pas comptée
(convention). Il couvre aussi 0109, mené dans la même session.

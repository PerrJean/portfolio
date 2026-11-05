# 0105 — `public/illustrations/` : des fichiers générés livrés, qui restent dans git

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `arbitrage` | `outil` | — | — | — |

**Décision de Jean (2026-11-05)** : `public/illustrations/` est un dossier de
fichiers **générés livrés**. Ses SVG sortent des scripts
`ops/images/*/planche.mjs`, puis sont copiés à la main dans `public/`, d'où
Astro les sert tels quels. Ils sont versionnés **volontairement** : le
chantier « fichiers produits et `.pyc` hors de git » (F) **ne les sort pas de
git**. Il ne vise que les générés jetables, comme les planches de travail
d'`ops/images/` et le `.pyc` d'`ops/hooks/__pycache__/`.

**Ce qu'a mesuré l'audit qualité du 2026-11-05** (en lecture seule, sur
`2301d32`, rapport hors dépôt) : 24 SVG dans `public/illustrations/`. 20 sont
identiques, octet pour octet, à une sortie d'`ops/images/` (`atelier-pilotage`
en entier, `fusion/avant-apres`, `gabarits.fr`, `gabarits.etroit.fr`,
`trajectoires.en`, `trajectoires.etroit.en`).

**Les 4 autres ont divergé du script** : `fusion/gabarits.en`,
`gabarits.etroit.en`, `trajectoires.fr` et `trajectoires.etroit.fr`.
Identiques à la sortie du script à leur entrée (`e24cf58`, 2026-09-30), leur
texte accessible (`<title>`, `aria-label`) a été retouché à la main, dans
`public/` seulement, par le relevé du 2026-10-09 (`db75ad4`, point 0087) :
« media block » devient « piece of material », « vite » devient « d’abord »,
« la dette » devient « le code à reprendre ». `ops/images/fusion/planche.mjs`
porte toujours l'ancien texte. **Relancer le script et recopier ses sorties
effacerait ces retouches** : à reporter dans le script avant toute
régénération, et dans le chantier N (factoriser les `planche.mjs`).

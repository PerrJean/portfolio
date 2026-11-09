# 0114 — Les failles signalées par npm et GitHub : tri

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `outil` | `en cours` | 30 | | `claude-opus-5-5` |

Ouvert en `arbitrage` (le tri, 2026-11-05, en lecture seule), devenu
`chantier` le 2026-11-09 sur le choix de Jean.

**Demande de Jean (2026-11-05)** : avant D (0107), un tri en lecture seule
des failles que GitHub signale à chaque push ; séparer ce qui part sur le site
publié de ce qui ne sert qu'au build. Rien n'est mis à jour.

**Le compte** : `npm audit` et `npm audit --omit=dev` donnent le même
résultat, **5 paquets, 23 avis** (11 hauts, 10 moyens, 2 bas). C'est le
chiffre de GitHub : il compte par avis, npm par paquet. `--omit=dev` ne retire
rien parce que les cinq viennent d'`astro` et de `@astrojs/sitemap`, déclarés
en dépendances ; aucun ne vient de Playwright, `@astrojs/check` ni TypeScript.

| paquet | avis | arrive par | sert à |
|---|---|---|---|
| `devalue` 5.9.2 | 7 | `astro` | sérialiser des données au build |
| `undici` 8.10.2 | 8 | `astro` → `unifont` | requêtes HTTP au build (polices) |
| `vite` 8.3.1 | 6 | `astro` | serveur de dev et bundler |
| `source-map-js` 1.2.1 | 1 | `vite`, `svgo`, `magicast` | cartes de source au build |
| `zod` 4.6.5 | 1 | `astro`, `@astrojs/sitemap` | valider la configuration au build |

**Ce qui part sur le site publié : rien.** `dist/` ne contient **aucun
fichier JS** ; les seuls scripts sont ceux du site, écrits en ligne dans le
HTML. Un visiteur n'exécute le code d'aucun de ces paquets. Les avis portent
sur un serveur qui reçoit des requêtes hostiles (déni de service, mémoire,
redirections) : le site publié est statique, servi par GitHub Pages.

**La seule exposition réelle** : le serveur de dev (`dev.cmd`, `vite`), sur
le poste de Jean, en local. Deux avis de `vite` visent `launch-editor` sous
Windows (échappement des arguments) ; il faut une requête forgée vers
`localhost:4321` pendant que le serveur tourne. Risque faible, mais réel, et
c'est précisément ce poste.

**Le correctif est à portée** : les cinq ont une version corrigée **dans la
même version majeure** (`devalue` 5.9.4, `vite` 8.3.6, `undici` 8.12.4,
`zod` 4.6.7, `source-map-js` 1.2.2). `npm audit fix` ne toucherait que
`package-lock.json`, pas `package.json`.

**Recommandation : un chantier, à ouvrir demain en premier**, petit
(~30 k) : `npm audit fix`, puis la preuve que le site publié n'a pas bougé
(build avant et après, `dist/` comparé fichier à fichier) et `npm test` vert.
Pas d'urgence pour les visiteurs, d'où « demain » plutôt que tout de suite ;
pas de raison d'attendre non plus, le correctif est sans montée de version
majeure et GitHub le rappelle à chaque push.

## Tranché

- 2026-11-09, Jean : « lance 0114 ». La recommandation est retenue : un petit
  chantier (~30 k), `npm audit fix` sur `package-lock.json` seul, sans
  `package.json` ni version majeure, preuve par `dist/` comparé avant et
  après, `npm test` vert.

## Le chantier

**État de référence** (2026-11-09, worktree du chantier, avant tout
changement) : `npm test` donne 287 tests, 287 verts, 0 rouge.

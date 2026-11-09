# 0114 — Les failles signalées par npm et GitHub : tri

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `outil` | `clos 2026-11-09` | 30 | 116 | `claude-opus-5-5` |

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

**Ce qui a bougé** : `npm audit fix` a changé 11 paquets, aucun ajouté ni
retiré, aucun changement de version majeure ; `package.json` est intact (même
empreinte git avant et après), seul `package-lock.json` change. Les cinq
visés : `devalue` 5.9.2 → 5.9.4, `vite` 8.3.1 → 8.3.7, `undici` 8.10.2 →
8.12.4, `zod` 4.6.5 → 4.6.7, `source-map-js` 1.2.1 → 1.2.2. Entraînés avec
eux : `rolldown` et ses binaires 1.2.11 → 1.2.18, `@rolldown/pluginutils`
1.0.1 → 1.1.0, `@oxc-project/types` 0.151.0 → 0.156.0, `postcss` 8.5.28 →
8.5.32, `nanoid` 3.3.18 → 3.3.20.

**La preuve sur le site publié** : deux builds avant le correctif donnent un
`dist/` identique (le build est reproductible, la comparaison a donc un
sens). Après le correctif, sur 78 fichiers, **64 identiques, 14 différents** :
les 14 pages projet (7 FR, 7 EN). Chacune diffère au même endroit, deux blocs
du script écrit en ligne, 11 octets de moins. C'est le minifieur (`rolldown`
1.2.18) qui écrit autrement le même code :

- le bâtiment animé (`src/components/batiment/Batiment.astro`) :
  `if(c){X;return} Y` devient `if(c)X;else{Y}`, en fin de fonction ;
- la visionneuse (`src/components/Visionneuse.astro`) : `if(c){P;return} Q`
  devient `c?(P):Q`, en fin de gestionnaire de clic.

Les deux formes font la même chose. Aucun texte, aucune image, aucun style,
aucun lien ne change. Aucun test navigateur n'exerce ces deux gestionnaires :
l'équivalence est établie à la lecture, pas par un test.

**Vérification** : `npm test` 287 tests, 287 verts, comme l'état de
référence. `npm audit` et `npm audit --omit=dev` : **0 vulnérabilité** (avant :
5 paquets, 23 avis côté GitHub).

**Coût relevé au harnais** : 116 k, le contexte de la session à la clôture
(`get_usage`), dont environ 82 k de charge fixe (outils, consigne système,
skills) et 34 k de messages. Mené en session sans sous-agent (petite
correction, pas de relais). Ratio 3,9 pour 30 estimés : l'estimation ne
comptait que le travail, pas la charge fixe d'une session, qui à elle seule
dépasse 30.

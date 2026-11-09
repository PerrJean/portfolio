# 0111 — Premier recalibrage

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `arbitrage` | `outil` | `en cours` | 50 | | `claude-opus-5-5` |

**Demande de Jean (2026-11-05)** : le recalibrage tous les 30 points clos
(`registre/0000`, commandements v4 partie 2) n'a jamais été fait.

**Constat** : au 2026-11-05, 56 points clos portent un coût estimé et un coût
réel ; ratio réel sur estimé médian 1,42 (1,19 sur les 15 derniers).

**Périmètre** : après 0110, les cinq chiffres de la v4 (ratio réel sur estimé,
part de défauts, plus gros fichier, exécution la plus lente, lignes
supprimées par ligne ajoutée), et la décision de s'arrêter ou non. On y
rouvre aussi le linter, reporté par Jean pour tenir le budget de l'outil
(plafond 15 %).

## Déroulé (2026-11-09)

- **Doctrine lue** : vibe-coding 4.2, guide partie E (« tous les 30 points
  clos, cinq chiffres et un arrêt possible ») et `registre/0000`. La 4.3,
  parue le même jour, ne touche pas à la mesure.
- **État de référence** dans le worktree (`npm ci`, `npm run verifier`) :
  320 tests, 320 verts.
- Mesuré sur `b06b087` (la fiche passée `en cours`), 115 points clos.

### Les cinq chiffres

| chiffre | valeur | seuil | lecture |
|---|---|---|---|
| 1. ratio réel sur estimé, médiane | 1,57 sur 68 points ; **2,95 sur les 15 derniers** | 2 | franchi sur les 15 derniers |
| 2. part de défauts | 9 sur 115 clos (7,8 %) ; 4 sur les 30 derniers | 30 % | sous le seuil |
| 3. plus gros fichier | page DentalSoft, 2 612 lignes, figée (exception de 0108) ; en code, `tests/infobulles-navigateur.test.mjs`, 531 | croissance continue | pas de croissance continue |
| 4. exécution la plus lente | `verifier` complet 66 s (build 7, tests 59), `--rapide` 9 à 12 s ; le test le plus lent, les infobulles en navigateur, 65 s | aucun | voir plus bas |
| 5. lignes supprimées par ligne ajoutée | 0,17 (code 0,23) ; 0,14 avant le 9 novembre, 0,38 le 9 | aucun | voir plus bas |

**1. Deux périodes mal comparables.** Avant le 9 novembre : 56 points,
médiane 1,43, 8 au-delà de 2. Le coût réel y est celui des sous-agents, la
session principale n'est jamais comptée. Le 9 novembre : 12 points, médiane
3,15, 9 au-delà de 2. Le coût est relevé au harnais, et cinq fiches (0107,
0113, 0114, 0119, 0120) y ajoutent le contexte de la session (`get_usage`),
dont 82 à 87 k de charge fixe que l'estimation ne comptait pas. Les 15
derniers mêlent les deux (3 + 12) : leur médiane mesure surtout le
changement de mesure. Ce qui ne dépend pas de la mesure : 0107 et 0120 ont
eu deux tours de revue, et chaque commit d'étape jouait le hook complet
(65 à 170 s) avant l'élargissement de la vitesse rapide (0106).

```
grep -h -m1 '^| `' registre/0*.md | awk -F'|' '{gsub(/ /,"",$5); gsub(/ /,"",$6)} $4~/clos/ && $5~/^[0-9]+$/ && $6~/^[0-9]+$/ && $5>0 {match($4,/[0-9-]{10}/); print substr($4,RSTART,10), $6/$5}' | sort -s -k1,1
```

Une ligne par point chiffré (date de clôture, ratio) ; `| tail -15` pour les
15 derniers, `grep 2026-11-09` ou `grep -v` pour les périodes, puis
`sort -k2 -g` et la valeur du milieu. Deux en-têtes écrivent le coût réel
avec une espace (« 1 220 » en 0090, « 1 070 » en 0094) : la commande la
retire, sans quoi awk lit 1.

**2.** `grep -h -m1 '^| `' registre/0*.md | awk -F'|' '$4~/clos/ {n++; if ($2~/defaut/) d++} END {print d, n}'`.
Les 49 clos sans coût chiffré comptent ici : la nature est écrite partout.

**3.** Le plus gros fichier texte, hors `package-lock.json` (généré) :
`git grep -I -c '' <commit> -- . ':!package-lock.json' | sort -t: -k3 -rn | head`.
Au premier commit de chaque semaine : 424 (30 sept.), 439, 470, 471, puis
2 612 dès le 28 octobre (DentalSoft, figée depuis). En code
(`-- '*.mjs' '*.js' '*.astro' '*.css'`) : 424, 439, 470, 471, 526, 531. Le
maximum change de fichier à chaque fois, aucun ne grossit d'un relevé à
l'autre ; le plus gros dépasse le seuil de module (500) sans atteindre la
limite dure (800, tenue par le test de 0108).

**4.** La dernière ligne de `npm run verifier` et de
`npm run verifier -- --rapide` (« build X s, tests Y s, total Z s »). Le
test le plus lent se lit dans la sortie complète (durées en ms par test).
Le complet mesuré seul sur le poste (80 s pendant une autre tâche git) ;
`--rapide`, deux mesures (9 et 12 s). Le hook en vitesse rapide (0106) ne
paie plus que ces 10 s environ à chaque commit d'étape, contre 65 à 170 s
avant : c'est la durée qui pesait sur les sessions, et elle a baissé.

**5.** `git log HEAD --no-merges --numstat --format= -- . ':!package-lock.json' | awk '$1!="-" {a+=$1; s+=$2} END {print s/a}'`,
avec `-- src ops tests` pour le code, `--until=2026-11-08T23:59` ou
`--since=2026-11-09T00:00` pour les périodes. 0,23 en code, c'est le chiffre
du premier projet audité par le guide ; le 9 novembre (0,38) est une
journée de consolidation (factorisation, registre), pas une tendance.

**Budget de l'outil** (plafond 15 %, `registre/0000`) : part de l'étape
`outil` dans le coût réel des points clos chiffrés.

```
grep -h -m1 '^| `' registre/0*.md | awk -F'|' '{gsub(/ /,"",$6)} $4~/clos/ && $6~/^[0-9]+$/ {t+=$6; if ($3~/outil/) o+=$6} END {print o, t}'
```

19,2 % sur tout le registre (2 974 sur 15 522), 27,1 % sur les 30 derniers
points chiffrés, 61 % le 9 novembre. Au-dessus du plafond.

### Règle d'estimation proposée

Un sous-agent coûte presque toujours la même chose, quelle que soit la
taille du travail : médiane 103 k sur les 26 relevés au harnais le 9
novembre (76 à 171 ; 291 pour la factorisation de 0112, seule exception).
Une session coûte sa charge fixe (82 à 87 k) plus son travail.

- **100 par sous-agent prévu** (tests, code, revue, relevé, rédaction…) ;
- **150 pour la session** quand son contexte est compté (85 de charge fixe,
  65 de travail) ;
- **100 de plus par tour de revue prévisible** au-delà du premier, quand le
  point touche à la sécurité ou à l'outillage du commit.

À rebours sur les 12 points du 9 novembre, avec les sous-agents réellement
lancés (script hors dépôt, données recopiées des fiches) :

| point | estimé | règle | réel | ratio avant | ratio règle |
|---|---|---|---|---|---|
| 0107 | 50 | 450 | 563 | 11,26 | 1,25 |
| 0108 | 50 | 200 | 153 | 3,06 | 0,77 |
| 0110 | 70 | 200 | 227 | 3,24 | 1,14 |
| 0112+0109 | 310 | 200 | 462 | 1,49 | 2,31 |
| 0113 | 25 | 150 | 145 | 5,80 | 0,97 |
| 0114 | 30 | 150 | 116 | 3,87 | 0,77 |
| 0115 | 100 | 400 | 462 | 4,62 | 1,16 |
| 0116 | 120 | 200 | 229 | 1,91 | 1,15 |
| 0117 | 200 | 500 | 474 | 2,37 | 0,95 |
| 0118 | 150 | 300 | 282 | 1,88 | 0,94 |
| 0119 | 80 | 250 | 236 | 2,95 | 0,94 |
| 0120 | 30 | 350 | 344 | 11,47 | 0,98 |

Médiane 3,15 avant, **0,97** avec la règle ; au-delà de 2 : 9 sur 12 avant,
1 sur 12 avec la règle ; somme du réel sur somme de la règle 1,10. Limite :
la vérification est faite sur les points qui ont servi à la régler, avec
le nombre de sous-agents connu après coup (le second tour de revue de 0120
y compte pour un sous-agent). Elle se juge sur les 30 prochains points.

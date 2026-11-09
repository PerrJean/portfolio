# 0110 — Le registre au format commun

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `outil` | `clos 2026-11-09` | 70 | 227 | `claude-opus-5-5` |

**Demande de Jean (2026-11-05)**, commandements v4 (partie 2, la mesure) : un
statut ouvert ou clos explicite, jamais un champ vide qui peut vouloir dire
les deux, et cinq chiffres d'arrêt au lieu de trois.

**Constat** : `registre/0000-convention.md` lit le statut dans `cout_reel`
vide ; l'audit qualité du 2026-11-05 compte 39 fiches dont le statut est
ambigu à la lecture automatique.

**Périmètre** : appliquer au Portfolio le format commun des registres (en
cours d'écriture dans une autre session, à attendre). Un script traite les
cas sûrs ; pour les fiches ambiguës, une liste avec un statut proposé pour
chacune, que Jean valide.

## Déroulé

- **Lecture de la tension** (2026-11-09) : 0000 dit que les fiches
  antérieures au 2026-11-05 gardent leur forme, leurs coûts et leur numéro,
  et que le statut est toujours écrit. On n'ajoute donc que la colonne
  `statut` ; coûts, numéros, texte et autres cellules restent tels quels.
- **État de référence (2026-11-09)**, dans le worktree, après `npm ci` :
  `npm run verifier` → 318 tests, 318 verts, 0 rouge (build 12 s, tests 52 s).
- **Vitesse du hook** : le premier commit d'étape (`0c9afe1`) passe le hook,
  mais sa sortie a été tronquée par la session et la ligne de vitesse n'a pas
  été relevée. Dès le deuxième (`adb1b98`, sortie complète gardée) : « vitesse
  rapide (claude/chantier-0110-registre-4f4bc8) », vert en 10 s, contre 63 s
  pour la vérification complète. Première session à en profiter depuis
  l'élargissement de 0106.
- **Cas sûrs** (script hors dépôt, à usage unique) : 57 fiches au coût réel
  chiffré passent `clos`, à la date « Clos le » du texte, sinon à celle du
  commit qui a écrit le coût réel. Contrôle : 57 fichiers, chacun 3 lignes
  changées, toutes dans l'en-tête (`git diff --numstat`, `git diff -U0`).
- **Classement des 49 autres** (sous-agent, brief `prompts/0110-classement.md`) :
  37 sûrs, prouvés par le texte ou une suite close ; 12 ambigus. Coût relevé
  au harnais : 137. Il signale que les dates du texte et celles des commits
  divergent d'un jour autour du 30 septembre ; cinq fiches du lot sûr
  (0027, 0061, 0063, 0070, 0071) avaient reçu la date git, antérieure à une
  décision qu'elles contiennent.
- **Test** `tests/registre-statut.test.mjs` : chaque fiche sauf 0000 écrit un
  statut permis, `remplacé par NNNN` vers une fiche existante. Rouge avant la
  migration (107 fiches sans colonne), vert après.
- **`CLAUDE.md`** : « Ce qui reste ouvert » ne cite plus 0003 et renvoie au
  registre, avec la commande qui calcule la liste.
- Hors périmètre, relevé : `SPEC.md` (« La forme ») présente encore la
  direction visuelle comme « à trancher sur trois maquettes (0003) » ; 0082
  a `etape` = `mise-en-ligne`, absent de la liste de 0000 (non renormalisé).
- **Revue** (sous-agent neuf, brief `prompts/0110-revue.md`) : **PASSE** au
  premier tour. Contrôle par script, octet par octet : les 107 fiches
  modifiées n'ont changé que leurs trois lignes d'en-tête, et l'en-tête
  d'origine revient à l'identique sans la colonne `statut`. Statuts non clos
  (0004, 0005 à 0007, 0111) d'accord avec `CLAUDE.md`. Aucune date de
  clôture contredite par le texte. Toutes les cassures demandées rougissent.
  Quatre remarques mineures. Coût relevé au harnais : 90.
- **Suites de la revue** (petite correction, session principale) : le test
  refuse une date impossible (`clos 2026-13-45`, `écarté 2026-02-31`) et
  tout fichier de `registre/` hors du motif `NNNN-titre.md`. Rejoué dans un
  clone jetable : rouge, avec le message, sur chacun. Laissés en l'état : le
  message « pas de colonne statut » quand une fiche sans tableau d'en-tête en
  a un plus bas (le test rougit quand même) ; le `grep` de `CLAUDE.md` lit
  toute la fiche, pas seulement l'en-tête (exact aujourd'hui).
- **Clôture** : coût réel 137 + 90 = 227 pour 70 estimés (ratio 3,2),
  sous-agents seuls ; la session principale (script, test, questionnaire,
  corrections) n'est pas mesurable. Aucune remontée.

## Tranché

- **2026-11-09, Jean** (questionnaire) : 0003 `clos 2026-09-28` ; 0005,
  0006, 0007 `gelé` (reportés au temps 2) ; 0013, 0015 `clos 2026-09-28` et
  0016 `clos 2026-09-29`, non `remplacé`, car une partie de chacun
  s'applique encore ; 0029 et 0035 `clos 2026-09-29` ; 0106
  `clos 2026-11-09` ; quand le texte et le commit divergent, la date du
  texte : 0027, 0061, 0063, 0069, 0070, 0071 `clos 2026-10-01`.
- **2026-11-09, Jean** (déjà écrit dans 0004, via 0116) : l'acte III reste
  ouvert ; 0004 `ouvert` sans question.

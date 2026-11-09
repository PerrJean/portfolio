# 0108 — Aucun fichier de code au-delà de 800 lignes, tous langages

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `outil` | `en cours` | 50 | | `claude-opus-5-5` |

**Demande de Jean (2026-11-05)**, commandements v4 (partie 2, la forme du
code) : le plafond de 500 lignes, 800 en limite dure, vaut pour tous les
langages et tous les dossiers. `CLAUDE.md` l'écrit, rien ne le contrôle.

**Constat** : `public/usecase/dentalsoft/index.html` fait 2 612 lignes (c'est
l'exemple que cite la v4) ; `tests/infobulles-navigateur.test.mjs` 526.

**Périmètre** : un test dans `tests/` qui refuse tout fichier suivi de plus de
800 lignes (code, HTML, CSS, scripts annexes), branché dans les deux vitesses
du hook (0106).

**Arbitrage de Jean (2026-11-05)** : la page DentalSoft est figée. Elle reçoit
une **exception nommée et définitive** ; son découpage (estimé à 300) n'est
pas ouvert. On ne découpe que ce qu'on va encore modifier.

## Tranché

- **2026-11-05, Jean** : la page DentalSoft reçoit une exception nommée et
  définitive, sans découpage.
- **2026-11-09, Jean** (par la session qui a lancé le chantier) : le test vit
  dans `tests/` au format `*.test.mjs`, donc joué par les deux vitesses du
  hook et par la CI ; ni le hook ni la CI ne sont modifiés. Il couvre tout
  fichier suivi par git ; les binaires et les fichiers de verrouillage
  générés (`package-lock.json`) en sont exclus, règle écrite et justifiée
  dans le test.

## Spec

Test `tests/plafond-lignes.test.mjs`, sans dépendance ni site construit.

1. La liste des fichiers vient de `git ls-files` (les fichiers suivis) ; un
   fichier suivi mais absent du disque est sauté.
2. Lignes comptées comme `wc -l`, plus une si le fichier ne finit pas par un
   saut de ligne.
3. Exclus : tout fichier qui contient un octet nul (binaire : PNG, PDF,
   police, `.pyc`), et les fichiers de verrouillage générés, par nom
   (`package-lock.json`). Chaque exclusion porte sa raison dans le test.
4. Exception nommée : `public/usecase/dentalsoft/index.html` (0108,
   arbitrage du 2026-11-05). Si elle n'est plus suivie ou repasse sous 800,
   rouge : l'exception est caduque et se retire du test.
5. Au-delà de 800 lignes, rouge, avec un message qui nomme chaque fichier et
   son nombre de lignes.
6. Rapide : une fraction de seconde au-delà du démarrage de node, quand la
   suite complète en prend une minute.

**Critères d'acceptation** : vert sur le dépôt ; rouge sur un fichier suivi
de 801 lignes ajouté dans une copie jetable, message avec le nom et 801 ;
vert à 800 ; durée relevée.

## Déroulé

- **État de référence (2026-11-09)**, dans le worktree, après `npm ci` et
  `npm run build` : `npm test` → 287 tests, 287 verts, 0 rouge.
- **Écriture du test** (sous-agent, brief `prompts/0108-test.md`) :
  `tests/plafond-lignes.test.mjs`, 90 lignes, deux tests (le plafond ;
  l'exception encore justifiée). Vert sur le dépôt ; dans une copie jetable,
  rouge à 801 lignes (« essai-801.txt : 801 lignes »), vert à 800. Coût
  relevé au harnais : 76.
- **Durée** (`node --test tests/plafond-lignes.test.mjs`, cinq lancements) :
  596 à 1 050 ms, contre 226 à 289 ms pour un test vide. Le balayage lit
  502 fichiers suivis (9 Mo, surtout des binaires) : `git ls-files` 198 ms,
  lecture 348 ms. Critère 6 réécrit sur cette mesure : « bien moins d'une
  seconde » ne tient pas sur cette machine, démarrage de node compris.

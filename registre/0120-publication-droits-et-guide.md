# 0120 — La publication : droits réduits au job qui publie, listes après l'installation, guide à jour

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `outil` | `clos 2026-11-09` | 30 | 344 | `claude-opus-5-5` |

**Demande de Jean (2026-11-09)** : les suites relevées à la clôture de 0119,
à lancer **après la fusion de 0107**, qui modifie aussi `deploy.yml`.

**Constat** (`.github/workflows/deploy.yml`, après 0119) :
1. `pages: write` et `id-token: write` sont donnés à **tout le workflow**,
   `tester` compris. Or `tester` lance `npm ci` (des centaines de paquets
   tiers et leurs scripts d'installation) puis Playwright : un paquet
   compromis y aurait le droit de publier sur GitHub Pages, donc de mettre
   en ligne un autre site à l'adresse du portfolio.
2. L'étape « Listes de confidentialité » écrit `~/.portfolio/interdits.txt`
   et `employeur.txt` **avant** `npm ci` : les scripts d'installation
   peuvent les lire.
3. `docs/GUIDE_MISE_EN_LIGNE.md` (section 2) dit encore que
   `withastro/action` construit le site, et donne les trois droits sans
   dire à quel job.

**Périmètre** :
1. `permissions` du workflow ramenées à `contents: read` ; `pages: write`
   et `id-token: write` posés sur le seul job `publier` (le dépôt de
   l'artefact par `actions/upload-pages-artifact` dans `tester` n'en a pas
   besoin : à vérifier sur la documentation de l'action, puis par une
   publication réelle).
2. L'étape « Listes de confidentialité » déplacée après `npm ci` et
   l'installation de Chromium, juste avant le build. Même chose dans
   `tests.yml`.
3. Le guide mis à jour : un seul build, dans `tester`, publié tel quel ; les
   droits, job par job.

**Preuve** : une publication réelle qui passe après la fusion (page Actions
du dépôt public), le site en ligne inchangé ; le YAML relu ; la limite dite
honnêtement (le build et les tests chargent du code tiers alors que les
listes sont présentes : la protection porte sur l'installation seulement).

**Hors périmètre** : la commande `verifier` (0107).

## Déroulé (2026-11-09)

- **Référence** dans le worktree (`npm ci` puis `npm run verifier`) :
  312 tests, 312 verts.
- **Documentation vérifiée** : `actions/deploy-pages` exige `pages: write` et
  `id-token: write` sur le job qui publie (son exemple les pose au niveau de
  ce job) ; `actions/upload-pages-artifact` (action composite : `tar` puis
  `actions/upload-artifact`) ne lit ni `github.token` ni `id-token`.
- **Fait** : `deploy.yml` ne donne au workflow que `contents: read`, et
  `pages: write` et `id-token: write` au seul job `publier`. Dans
  `deploy.yml` et `tests.yml`, l'étape des listes vient après `npm ci` et
  Chromium, juste avant `npm run verifier`. Guide, section 2, réécrit.
  Nouveau test `tests/publication-droits.test.mjs` (6 tests), rouge sur
  l'ancien YAML pour la bonne raison, vert sur le nouveau.
- **Revue**, deux tours (sous-agents neufs, lecture seule) :
  - tour 1, NE PASSE PAS : le YAML est juste, mais 7 cassures sur 13
    passaient le test (droits de `tester` en flux, entre guillemets,
    `contents: write`, secrets en `env` du job, seconde étape écrivant
    `~/.portfolio` avant `npm ci`, `publier` sans `needs` ou sans
    environnement), et le guide disait « seuls les tests l'arrêtent ».
    Test durci ; les 7 cassures rejouées, toutes rouges.
  - tour 2, NE PASSE PAS : un processus laissé en arrière-plan par un script
    d'installation survit jusqu'à la fin du job (la limite était
    sous-estimée), et `toJSON(secrets)` passait le test. Corrigé mot pour
    mot ; la cassure `toJSON(secrets)` rejouée, rouge. Pas de tour 3.
- **Avant la fusion** : `main` intégré (hook, `e4cf22f`), puis
  `npm run verifier` : 318 tests, 318 verts.
- **Première publication** (`0403839`, run `42672146625`) : **échec sans
  aucun job lancé**, « Internal server error » de GitHub. GitHub Actions
  était en panne majeure (githubstatus.com, incident ouvert à
  18:14:58Z, run lancé à 18:13:34Z). Rien n'indique un refus de droits :
  l'état d'avant n'est pas rétabli, la publication est rejouée après la
  panne.

## Clôture (2026-11-09)

- **Publication réelle verte** après la panne : run `42676757965`
  (commit `9c6ad1c`), 85 s (`tester` 65 s, `publier` 9 s). Ordre des étapes
  relevé sur l'API publique des Actions : `npm ci`, Chromium, « Listes de
  confidentialité », `verifier`, envoi du site. `publier` passe avec ses
  seuls `pages: write` et `id-token: write` : pas besoin d'`actions: read`
  (point à surveiller relevé au tour 1 de revue).
- **Site en ligne inchangé** : les 78 fichiers en ligne sont identiques
  octet pour octet à un build local de `9c6ad1c` (`npx astro build`, `curl`
  puis `cmp`) ; `/`, `/en/`, `/projets/audit-contenu/`, `/a-propos/`,
  `sitemap-index.xml` en 200.
- **Limite, dite honnêtement** (guide, section 2, et commentaires des deux
  workflows) : la protection des listes ne couvre que le temps de
  l'installation. Un processus laissé en arrière-plan par un script
  d'installation survit jusqu'à la fin du job, et le build et les tests
  chargent du code tiers alors que les listes sont présentes. De même,
  `tester` n'a plus le droit de publier, mais un paquet compromis peut
  encore altérer le site construit, avant comme après les tests, et ce site
  part tel quel.
- **Tests** : 318, 318 verts (`npm run verifier`), dont 6 nouveaux.
  Hook vert à chaque commit et aux fusions.
- **Coût relevé au harnais** : 344 = 165 k de contexte de la session à la
  clôture (`get_usage`, dont environ 86 k de charge fixe) + 96 k (revue,
  tour 1) + 83 k (revue, tour 2). Ratio 11,5 pour 30 estimés : l'estimation
  ne comptait ni la charge fixe d'une session, ni la revue, ni ses deux
  tours ; la panne d'Actions a ajouté une attente et une seconde fusion.
- **Hors spec** : le test `tests/publication-droits.test.mjs` (règle
  vérifiable devenue test, `CLAUDE.md`) ; la durée de publication corrigée
  dans le guide (section 2, point 3).

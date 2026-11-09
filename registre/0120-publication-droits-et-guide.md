# 0120 — La publication : droits réduits au job qui publie, listes après l'installation, guide à jour

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `outil` | `en cours` | 30 | | `claude-opus-5-5` |

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

# 0097 — Un test, dans un navigateur, que chaque infobulle s'ouvre et se voit

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `outil` | 300 | | `claude-opus-5-5` |

**Demande de Jean (2026-10-25)** : vérifier que toutes les infobulles
s'ouvrent et ne sont pas masquées, et en faire un test pour tout le site.

**Pourquoi un navigateur** : `tests/infobulles.test.mjs` (registre/0088)
lit le HTML construit — une bulle par terme, la bonne définition, au bon
endroit. Qu'une bulle s'ouvre, reste dans l'écran et ne soit couverte ni
coupée dépend de la mise en page : seul un navigateur la calcule.

**Spec (arbitrage de Jean du 2026-10-25 : test permanent)** :
- Playwright (bibliothèque, Chromium) en dépendance de développement,
  piloté depuis `node --test` comme les autres tests : un seul lanceur.
- Toutes les pages du site, plus la présentation `/usecase/dentalsoft/`
  vue par vue ; trois largeurs (375, 768, 1280) et 1600 × 900 pour la
  présentation ; une passe en mode sombre.
- Chaque bulle ouverte au survol, au clavier et au toucher (largeur
  téléphone), puis : visible, dans l'écran, coupée par aucun ancêtre,
  couverte par aucun élément.
- Les deux workflows installent Chromium avant `npm test`.
- **Celui qui écrit le test ne corrige pas** : les bulles masquées qu'il
  trouve sont listées, puis corrigées dans un chantier à part.

Brief : `prompts/9-test-infobulles.md`.

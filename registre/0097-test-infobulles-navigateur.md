# 0097 — Un test, dans un navigateur, que chaque infobulle s'ouvre et se voit

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `outil` | 300 | 180 | `claude-opus-5-5` |

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

**Test écrit le 2026-10-25** (180 k), commité avec la correction 0099 : le hook
rejoue les tests. Site : 34 bulles, 290 cas, vert. Présentation : 56 bulles,
468 cas ; échouent les bulles de `#pratiques-metiers` et `#pratiques-etape`
couvertes par la frise (contexte d'empilement de la capsule), et 17 capsules
hors focus de `#pratiques-etape` à 25 % d'opacité héritée. 45 s seul, 58 s
dans `npm test`. Correction et règles : chantier suivant, après validation
des règles par Jean.

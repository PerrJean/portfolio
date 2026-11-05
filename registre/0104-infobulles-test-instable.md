# 0104 — Le test des infobulles en navigateur échoue au hasard

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `defaut` | `outil` | 80 | | `claude-opus-5-5` |

**Constat (2026-11-05)** : `npm test` lancé deux fois, deux échecs
différents dans `tests/infobulles-navigateur.test.mjs` (registre/0097), tout
le reste vert (245 sur 246). Premier lancement : deux bulles de
`/usecase/dentalsoft/#pratiques-metiers`, 1280 × 720 sombre, au survol
(« Analyse céphalométrique », « Contrôle selon indication »), plus une passe
du site. Second lancement : « learning designers » sur `/en/my-job/`,
375 × 812, au toucher. Même message chaque fois : le déclencheur ne reçoit
pas l'action en 2 s (`ATTENTE_ACTION`).

**Le site n'est pas en cause** : vérifié à la main dans un navigateur en
375 × 812, rien ne recouvre « learning designers », la bulle s'ouvre et reste
dans l'écran.

**Hypothèse, à vérifier** : les sept passes tournent en parallèle
(`concurrency: true`) dans `npm test` à côté des autres tests ; sous cette
charge, 2 s ne suffisent pas toujours à Chromium pour défiler jusqu'au
déclencheur et agir. Un échec qui change d'un lancement à l'autre est le
signe d'un délai, pas d'une bulle masquée.

**Spec** :
- D'abord reproduire et mesurer : où passe le temps, et la passe seule
  échoue-t-elle aussi.
- Corriger au plus petit : délai plus large, ou une seconde tentative après
  défilement, ou moins de passes à la fois. Le test ne doit pas devenir plus
  lent de plus de 20 %.
- **Le test garde sa vue** : une bulle réellement couverte doit toujours
  échouer, avec le même message. On le prouve.
- Ni le site ni la présentation ne changent.

Brief : `prompts/9-infobulles-test-stable.md`.

# 0057 — L'accueil : une scène par projet, l'impatience sous le soleil

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `ligne` | 70 | — | — |

**Constat** (recruteur 0051) : les deux cartes de l'accueil portent la même
illustration, « ça fait gabarit ». **Choix de Jean (2026-09-30)** :
1. **L'impatience** (saut, marteau qui tourne, poutre lancée), aujourd'hui
   dans les cartes, passe **sous le soleil**, à droite de la phrase signature,
   **à partir de 960 px seulement**, une fois au chargement. Au téléphone,
   elle n'apparaît pas en haut (les projets restent dans le premier écran).
2. **On divise l'animation « on regarde le plan »** entre les deux cartes, qui
   se lisent à la suite comme la flèche « Alors j'ai agi dessus » :
   - **UserVoice** : Jean, seul, ouvre le plan.
   - **Audit contenu** : les ouvriers rejoignent Jean, qui a le plan ouvert.
   Chaque carte est déjà différente **au repos**.
3. Survol et focus sur grand écran ; au téléphone, une fois à l'entrée de la
   carte à l'écran. 0,5 à 0,7 s. Image fixe en mouvement réduit.

Par étapes, un go de Jean à chacune : images clés (ce chantier), puis
animation (entrée suivante).
Brief : `prompts/4-accueil-images-cles.md`.

**Étape 2 faite (coût 160, ratio 2,3)** : `ops/images/accueil/planche.png`,
cinq SVG dans le repère de `Scene.astro`, `planche.mjs` et `police.mjs`
(mesure de la phrase en 800, que sharp ne rendait pas). Retours de Jean : en
en-tête, l'équipe reste anonyme (trois ouvriers, sans lunettes) et suit le
soleil au-delà de 1280 px ; dans la carte 02, **ce sont les trois ouvriers de
l'en-tête qui rejoignent Jean** au plan (une reprise des images 4 et 5).
Lisible à 480, 384 et 335 px de carte. Ratio élevé : la mesure de la phrase
et la reprise de la carte 02.

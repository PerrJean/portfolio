# 0019 — L'accueil animé à partir de la bibliothèque

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `ligne` | 60 | — | — |

**Go de Jean (2026-09-28)** sur la bibliothèque (`0018`). Le script 1 de
l'accueil (Jean pose le plan, l'équipe s'impatiente, on regarde ensemble,
point ambre), animé par échange de poses et déplacements horizontaux, une
fois au survol ou au focus ; soleil fixe en anneaux ; deux parcelles avec
leurs faits clés. Premier test de la promesse de `0017` : une scène montée
avec des pièces existantes doit coûter bien moins qu'une scène dessinée.

**Livrée le 2026-09-28**, page « Première animation : l'accueil », sous A1,
jouable. Coût : **147 k** pour 60 estimés : **ratio 2,45, second
dépassement du seuil de 2 d'affilée** (après `0017`). La promesse de `0017`
ne s'est pas vérifiée sur le canevas : lire la bibliothèque (65 Ko) et
recopier les poses attribut par attribut coûte presque autant que les
dessiner. Le gain de la bibliothèque viendra dans Astro, où une pose devient
un composant lu une fois. **Signal d'arrêt** pour les esquisses animées sur
canevas : passer à l'étape 2 (structure Astro) pour la suite.

**Retouche de Jean (2026-09-29)** : l'impatience d'abord (0 à 0,4 s), puis
Jean ouvre le plan (0,4 à 1,0 s) ; le point ambre se pose **sur le plan**.
Faite à la main dans l'esquisse (minutages et position du point), sans
sous-agent : coût négligeable.

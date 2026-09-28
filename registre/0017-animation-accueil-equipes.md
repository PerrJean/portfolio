# 0017 — Première animation : l'équipe au travail sur l'accueil

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `ligne` | 90 | — | — |

**Demande de Jean (2026-09-28)** : commencer par l'animation la plus simple.
Deux parcelles (UserVoice, Audit contenu) reliées par la flèche ; au survol
ou au focus, l'équipe travaille environ 3 s, une fois (poutre posée, plan
déroulé, Jean tend l'outil) ; soleil fixe en anneaux dans le coin. CSS
seul, un `IntersectionObserver` au téléphone. Faits clés provisoires.
Brief : `prompts/animation-accueil.md`.

**Livrée le 2026-09-28**, page « Première animation : l'accueil » du
canevas, jouable. Coût : **219 k** pour 90 estimés : **ratio 2,4, au-dessus
du seuil de 2.** Causes : la phase « réflexion » ajoutée en cours de route,
et surtout l'articulation des bonhommes à la main (genoux, bras, passage de
l'outil), environ 95 lignes de CSS pour l'esquisse. Leçon : une scène de
personnages animés s'estime à ~200 k, pas comme une planche. Pour la suite,
dessiner les personnages **une fois**, en bibliothèque réutilisable (poses
et articulations), avant d'animer d'autres scènes.

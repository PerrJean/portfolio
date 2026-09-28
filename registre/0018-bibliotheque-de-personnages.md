# 0018 — Bibliothèque de personnages et scripts d'animation

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `ligne` | 110 | — | — |

**Décisions de Jean (2026-09-28)**, après la première esquisse (`0017`).

- **Personnages plus simples, unisexes** : tête en disque, corps en gélule,
  membres en traits épais ; même taille ; Jean seulement distingué par ses
  lunettes rondes orange.
- **Faisabilité en 2D d'abord** : on échange des poses figées et on déplace
  sur la ligne de sol ; aucune articulation (cause du dépassement de
  `0017`). Seul le marteau pivote.
- **Script 1, accueil, sans l'étape « on bâtit »** pour commencer : Jean, à
  gauche, pose le plan ; l'équipe s'impatiente (sautillements) ; les deux
  mains libres le rejoignent ; on regarde ensemble ; un point ambre se fixe.
  Environ 2,2 s.
- **Script 2, page projet** : les trois bonhommes au pied du bâtiment tapent
  du marteau **seulement pendant la pose d'un étage** (~1,5 s).
- **Plus tard** : la fin de page (équipe sur le toit, puis « Projet
  suivant ») et la page 404. **Validé** : l'aperçu LinkedIn (équipe sur le
  toit, soleil en coin, phrase signature).

**Chantier** : la bibliothèque (dix poses, trois en version Jean, les
objets) et la séquence du script 1 en cinq vignettes. Chaque pose est un
`<g>` SVG autonome, prêt à extraire. Brief :
`prompts/bibliotheque-personnages.md`.

**Livrée le 2026-09-28**, page « Bibliothèque de personnages » du canevas.
Coût : **117 k** pour 110 estimés (ratio 1,06). 25 `id` : dix poses, trois
poses de Jean, sept objets, cinq vignettes. À valider par Jean : en
vignette 5, le troisième personnage se tient derrière le tréteau (seul moyen
d'avoir trois personnes penchées sans chevauchement en 2D) ; la poutre est
posée sur la dalle.

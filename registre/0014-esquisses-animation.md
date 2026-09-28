# 0014 — Trois esquisses d'animation

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `ligne` | 240 | — | — |

**Demande de Jean (2026-09-28)** : trois propositions d'animation, pas
complètes, sympas et simples à intégrer, avec leur complexité de code.

- **M-1 · Le lever du jour** : accueil, au chargement ; CSS seul ; faible.
- **M-2 · Le trait qui se dessine** : page projet, piloté par le défilement
  (`animation-timeline` ou quelques lignes de JS) ; faible à moyenne.
- **M-3 · L'équipe pose l'étage** : page projet, par section franchie
  (`IntersectionObserver` et transitions CSS) ; moyenne.

Brief : `prompts/animations.md`. Trois sous-agents. M-2 et M-3 sont
interactifs sur le canevas (curseur « Progression de lecture »).

**Livrées le 2026-09-28**, page « Animations : trois esquisses » du canevas,
les trois jouables (bouton Play). Coût : 78 + 79 + 104 = **261 k** pour 240
estimés (ratio 1,09). M-3 ajoute une échelle pour que l'équipier monte, et
un réglage d'aplat des étages (léger ou encre).

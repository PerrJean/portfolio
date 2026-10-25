---
paths:
  - "src/components/infobulles/**"
  - "src/styles/infobulles.css"
  - "public/usecase/**"
---

# Les infobulles : six règles

Validées par Jean le 2026-10-25 (registre/0099). Le juge est `tests/infobulles-navigateur.test.mjs`
(registre/0097) : il ouvre chaque bulle dans Chromium et la mesure. Deux formes coexistent :
- **le site** : `<button class="terme" popovertarget>` suivi de `<span class="infobulle" popover>`
  (`src/components/infobulles/marquer.ts`, `src/styles/infobulles.css`) ;
- **les présentations** (`public/usecase/`) : la bulle est le `::after` du terme
  (`[data-info]`, `.capsule[data-precision]`). Le test mesure ce `::after` : il doit le rester.

## 1. Une bulle s'affiche dans la couche supérieure, jamais par un z-index local
- **Pourquoi** : le 2026-10-25 (0097), dans `/usecase/dentalsoft/`, les bulles de 4 capsules de
  `#pratiques-metiers` et de 4 de `#pratiques-etape` passaient sous la frise. La capsule porte un
  `transform`, donc son propre contexte d'empilement : le `z-index: 4` de son `::after` n'y valait rien.
- **Comment** : site, un popover natif. Présentations, c'est le **terme** qui passe dans la couche
  supérieure le temps de l'ouverture (`popover="manual"` puis `showPopover()`), posé en `fixed` à ses
  coordonnées d'écran (`getBoundingClientRect`), avec `transform: scale(k)` (l'échelle de la scène).
  Un terme pris dans le flux laisse à sa place une cale (son clone, invisible et `inert`). Code :
  `ouvrirBulle` et `fermerBulle`. Un `<div popover role="tooltip">` séparé serait plus simple, mais le
  test lit le `::after` de l'hôte : une bulle détachée échouerait partout (« ne s'ouvre pas »).
- **Vérifié par** : le contrôle « couverte » (centre et quatre coins, `elementFromPoint`).

## 2. Jamais dans un élément atténué
L'opacité se multiplie, bulle comprise : un élément qui porte une bulle s'atténue par la couleur.
- **Pourquoi** : le 2026-10-25 (0097), 17 capsules hors focus à `opacity: .25` dans
  `#pratiques-etape` : leur bulle s'affichait à 25 %. La couche supérieure échappe à l'opacité des
  ancêtres, pas à celle de l'hôte lui-même.
- **Comment** : `color-mix(in srgb, X 25%, var(--ivoire))` sur le texte, le bord et le fond. Sur le
  fond ivoire, c'est le même rendu que `opacity: .25`, en clair comme en sombre.
- **Vérifié par** : le contrôle « visible » (opacité effective, produit des ancêtres, au moins 0,9).

## 3. Jamais dans un ancêtre qui coupe (`overflow` autre que `visible`)
- **Pourquoi** : pas d'échec mesuré, mais la scène des présentations est en `overflow: clip` et
  plusieurs panneaux (`.pro`, `.mp`, `.at`) en `hidden` ou `auto`.
- **Comment** : la couche supérieure n'a pas d'ancêtre qui coupe. Le test compte encore la scène
  (elle porte un `transform`) : le placement garde la bulle dans la scène visible.
- **Vérifié par** : le contrôle « coupée ».

## 4. Dans l'écran : retournement au bord, largeur maximale relative à l'écran
- **Comment** : site, `position-try-fallbacks: flip-block` et
  `max-width: min(24rem, calc(100vw - 2 * var(--gouttiere)))` ; sans ancrage CSS, une feuille en bas
  de l'écran. Présentations, `placerInfobulle` retourne la bulle (`data-cote` g ou d, `data-vert` b)
  aux bords de la partie visible de la scène, qui tient dans l'écran ;
  `max-width: calc((100vw - 16px) / var(--k, 1))`. Limite : la hauteur d'un `::after` ne se mesure
  pas en script, le retournement vertical part d'une estimation (150 px de scène).
- **Vérifié par** : le contrôle « dans l'écran » (2 px de marge), en 1280 × 720 et 1600 × 900.

## 5. Survol, clavier, toucher ; Échap ou un tap ailleurs ferme ; reliée à son terme
- **Comment** : site, popover `auto` (Échap et clic ailleurs sont natifs), `aria-describedby`
  permanent vers `<id>-texte`. Présentations, `mouseover`, `focusin` et le toucher ouvrent ; Échap
  (écouté en capture, avant les panneaux), un `pointerdown` ailleurs, le défilement du conteneur, le
  redimensionnement et le changement de vue ferment ; le terme ouvert porte `aria-describedby`
  vers `#texte-bulle` (masqué, rempli à l'ouverture).
- **Vérifié par** : l'ouverture est testée (survol et clavier en présentation ; clic, clavier et
  toucher sur le site). La fermeture et la liaison **ne sont pas testées** (vérifiées une fois à la
  main le 2026-10-25, par un script jetable).

## 6. Texte court, sans lien ni bouton, lisible en clair et en sombre
- **Comment** : texte seul (`content: attr(...)` ou le lexique) ; couleurs par `--encre` et
  `--ivoire`, redéfinies en sombre. Définitions du lexique : 128 caractères au plus ; bulles de la
  présentation DentalSoft : jusqu'à ~200.
- **Vérifié par** : en partie. Le test tourne en sombre (visibilité) ; `tests/infobulles.test.mjs`
  refuse le balisage dans un attribut. La longueur et le contraste de la bulle ne sont pas testés.

## Le site face aux règles (relevé du 2026-10-25, rien modifié)
Règles 1 à 4 et 6 : respectées. **Règle 5 : écart**, la bulle du site ne s'ouvre pas au survol
(clic, Entrée et toucher seulement).

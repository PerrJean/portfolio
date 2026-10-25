# 0099 — Les règles des infobulles, et la correction des bulles masquées

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `defaut` | `outil` | 250 | 189 | `claude-opus-5-5` |

**Demande de Jean (2026-10-25)** : corriger les bulles que le test 0097
trouve masquées, et tirer des règles pour construire les infobulles à
l'avenir.

**Les échecs (0097)**, tous dans `/usecase/dentalsoft/` : les bulles des
capsules de `#pratiques-metiers` et `#pratiques-etape` couvertes par la
frise (la bulle est un `::after` de la capsule, son z-index ne vaut que
dans le contexte d'empilement de la capsule) ; 17 capsules hors focus à
`opacity: .25`, que leur bulle hérite.

**Les six règles, validées par Jean le 2026-10-25** :
1. Une bulle s'affiche dans la couche supérieure du navigateur (popover),
   jamais par un z-index local. — testée (couverte)
2. Jamais dans un élément atténué : l'opacité se multiplie ; atténuer par
   la couleur un élément qui porte une bulle. — testée (visible)
3. Jamais dans un ancêtre qui coupe (`overflow` autre que `visible`). —
   testée (coupée)
4. Dans l'écran : retournement au bord, largeur maximale relative à
   l'écran. — testée (dans l'écran)
5. Survol, clavier, toucher ; Échap ou un tap ailleurs ferme ; reliée à
   son terme (`aria-describedby`). — ouverture testée ; fermeture et
   liaison non testées
6. Texte court, sans lien ni bouton, lisible en clair et en sombre. — en
   partie

**Domicile des règles** : `.claude/rules/infobulles.md`, à portée de
chemin (composant, styles, `public/usecase/`), chargée quand un chantier
touche une bulle.

**Écrit par un autre agent que le test** (registre/0097).

Brief : `prompts/9-infobulles-correction.md`.

**Clos le 2026-10-25** (189 k). La bulle reste un `::after` (le test mesure
celui du terme) ; c'est le terme qui passe en couche supérieure le temps de
l'ouverture (`popover="manual"`, `fixed`, à l'échelle de la scène), un
clone invisible gardant sa place. Échap, tap ailleurs, défilement et
changement de vue ferment ; `aria-describedby` posé. Capsules hors focus
atténuées par `color-mix`, même rendu. 211 tests verts (avant : 58 échecs).
**Écart du site, non corrigé** : règle 5, la bulle du site s'ouvre au clic,
à Entrée et au toucher, pas au survol.

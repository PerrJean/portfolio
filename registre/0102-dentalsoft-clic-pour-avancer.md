# 0102 — Un clic sur la présentation DentalSoft fait avancer

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `publication` | 200 | | `claude-opus-5-5` |

**Demande de Jean (2026-10-26)** : sur `/usecase/dentalsoft/`, un clic sur
la page passe à la suite, sauf sur les boutons existants.

**Spec (défauts posés par la session, à corriger par Jean s'il le veut)** :
- Un clic **fait la même chose que « Suivant »** : le dévoilement suivant
  d'un écran, puis l'écran suivant. Rien ne recule au clic (Précédent et
  la flèche gauche restent pour cela).
- **Ne fait rien** sur tout ce qui réagit déjà au clic : boutons, liens
  (dont le soleil), champs, onglets, capsules et termes à infobulle,
  éléments `[data-aller]`, `[data-i]`, et **toute la surface des trois
  prototypes** (espace famille, Migration Preview, Atlas métier), où un
  clic sert la démonstration.
- **Ne fait rien** quand quelque chose est ouvert : une infobulle (le clic
  la ferme, règle 5 de `.claude/rules/infobulles.md`), le Sommaire, « Choix
  de méthode », un panneau « Approfondir » : le premier clic ferme.
- **Ne fait rien** après une sélection de texte (glisser pour copier) ni
  au dernier écran.
- Au toucher : un tap fait comme un clic ; le balayage existant, s'il y en
  a un, ne change pas.
- Le curseur ne change pas (pas de main sur toute la page) ; aucun texte
  ajouté à l'écran.

Brief : `prompts/9-dentalsoft-clic.md`.

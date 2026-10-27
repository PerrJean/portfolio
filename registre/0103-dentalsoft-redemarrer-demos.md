# 0103 — Un bouton « Redémarrer les démos » dans la présentation DentalSoft

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `publication` | 120 |  | `claude-opus-5-5` |

**Demande de Jean (2026-10-27)** : un bouton « Redémarrer les démos », à
droite de « Sommaire » ou à un autre endroit pertinent.

**Place retenue par la session** : dans l'en-tête du **Sommaire complet**,
à côté de « Parcours intégral », et non dans la barre du haut. La barre du
haut est vue par l'auditoire à chaque écran ; le panneau Sommaire porte
déjà les réglages du présentateur. Jean peut demander la barre du haut.

**Spec** :
- Un clic remet les trois prototypes (compte rendu pour la famille,
  Migration Preview, Atlas métier) dans leur état d'ouverture de page,
  sans recharger la page ni changer d'écran ni de dévoilement.
- Il réutilise les remises à zéro existantes de chaque prototype
  (`a1Reset`, `mpRejouer`, `atReset`) : pas de seconde logique. Ce
  qu'elles oublient (le panneau « validation envisagée », une analyse
  Migration Preview en cours, les champs de recherche de l'Atlas) est
  remis aussi.
- Un retour discret confirme le geste (« Démos remises à zéro »), annoncé
  aux lecteurs d'écran, qui s'efface seul.
- Même style que « Parcours intégral » ; le bouton suit la règle 5 du clic
  (registre/0102) : il est un bouton, donc inerte pour « clic = Suivant ».

Brief : `prompts/9-dentalsoft-redemarrer-demos.md`.

# 0092 — Une page cachée pour présenter le cas DentalSoft

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `publication` | 150 | | `claude-opus-5-5` |

**Demande de Jean (2026-10-25)** : publier la présentation DentalSoft (un
fichier HTML autonome, 16:9, faite à partir des jetons du site) sur le
site, pour la partager par lien et s'en servir en entretien. Invisible
depuis l'accueil dans un premier temps, et non référencée.

**Spec (questionnaire du 2026-10-25)** :
- **Adresse** : `/usecase/dentalsoft/`, choisie par Jean : lisible, se
  dicte à l'oral, laisse la place à d'autres cas. `/usecase/` seul rend
  la 404 : rien n'y liste les cas.
- **Forme** : le fichier tel quel, sous `public/usecase/dentalsoft/`.
  Astro le copie sans le passer au gabarit ; il n'entre donc pas dans le
  plan du site (le sitemap ne liste que `src/pages`).
- **Non référencée** : `<meta name="robots" content="noindex, nofollow">`
  dans la page (GitHub Pages ne permet pas d'en-tête HTTP). **Pas** dans
  `robots.txt`, qui est public et donnerait l'adresse. Aucun lien depuis
  le site.
- **C6** : la police Atkinson Hyperlegible Next est servie par le site, au
  lieu de Google Fonts.
- **Les tests** : confidentialité et tiers couvrent la page ; les tests du
  gabarit du site (jumelles, relief, scènes…) ne s'appliquent pas à une
  présentation autonome, et l'exclusion se fait en un seul endroit.
- **Limite dite à Jean** : non référencée ne veut pas dire privée. Qui a le
  lien voit la page et peut le transmettre ; pas de mot de passe possible
  sur GitHub Pages.

**Contrôle fait avant** : `ops/hooks/verifier_confidentialite.py` sur le
fichier source, aucun terme interdit (2026-10-25).

**Écarté** : la jumelle anglaise (C7) — une présentation d'entretien, en
français, hors du parcours du site.

Brief : `prompts/9-usecase-dentalsoft.md`.

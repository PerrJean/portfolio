# 0115 — La phrase d'accroche : dire ce que Jean apporte, pas seulement comment il travaille

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `contenu` | `ouvert` | 100 | | `claude-opus-5-5` |

**Demande de Jean (2026-11-09)**, sur le retour d'une proche : la phrase
« ne me valorise pas suffisamment », elle est « trop terre à terre » et
« pas assez prise de hauteur ».

**Constat** : la phrase de l'accueil (`src/pages/index.astro`, reprise dans
`src/layouts/Base.astro`) est « J'écoute, je pose des hypothèses, je teste
et je construis là où ça compte. » (EN « I listen, I form hypotheses, I test
and I build where it counts. »), issue de 0045. Elle décrit une méthode en
quatre verbes ; elle ne dit ni le niveau (Head of Product, CPO) ni ce que
l'entreprise y gagne. À confirmer avec Jean : c'est bien cette phrase que
visait le retour.

**Périmètre** :
1. Questionnaire avec Jean (séries de 4 questions à options, une
   recommandation) : ce que la phrase doit porter, ton, longueur, place de la
   méthode actuelle (gardée en sous-titre ou abandonnée). Spec consolidée,
   puis go.
2. Remplacement partout où vit la phrase : accueil, À propos, `<head>`,
   texte alternatif et images Open Graph, bannières LinkedIn, FR et EN.
3. Relevé des lourdeurs par un agent qui ne l'a pas écrite (0072), Jean trie.

**Risque connu** : la longueur de la phrase a coûté une passe d'images en
0045 (bannière coupée à la main, titre qui touchait le dessin à 1280 px).
Vérifier à 960, 1280 et 1440 px.

# 0045 — La phrase signature réécrite, la date sous le titre des projets

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `contenu` | 50 | 99 | `claude-opus-5-5` |

**Décisions de Jean (2026-09-29)** :
1. « … puis je dose l'effort » sonnait dilettante. La phrase devient
   « Je bâtis sur des hypothèses : j'écoute, je teste, puis j'investis là où
   ça compte. » ; EN « I build on hypotheses: I listen, I test, then I invest
   where it counts. » Partout : accueil, À propos, `<head>`, aperçu LinkedIn,
   bannières.
2. Une date en mois et année sous le titre de chaque page projet, portée par
   le gabarit : septembre 2026 pour les deux projets.
3. Le schéma 0041 est validé tel quel, libellés compris.

Brief : `prompts/3-phrase-et-date.md`.

**Clôture** : phrase remplacée sur 8 pages, dans l'`og:image:alt` et les
images ; bannière FR sur trois lignes coupées à la main (« compte. » restait
seul), EN sur deux ; aperçu en cinq lignes, serré mais lisible. Champ `date`
(`AAAA-MM`) obligatoire, affiché en ardoise 19 px gras sous le `<h1>`.
Ratio 2,0 : la longueur de la nouvelle phrase a coûté une passe d'images.

**Révision (Jean, 2026-09-30)** : « J'écoute, je pose des hypothèses, je teste, puis je construis là où ça compte. » (EN « I listen, I form hypotheses, I test, then I build where it counts. »), écouter d'abord. Accueil, À propos, texte alternatif de l'aperçu, aperçus Open Graph et bannières LinkedIn régénérés.

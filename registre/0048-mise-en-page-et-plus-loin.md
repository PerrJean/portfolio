# 0048 — Colonne pleine, « Pour aller plus loin » structuré, UserVoice corrigé

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `contenu` | 110 | 113 | `claude-opus-5-5` |

**Décisions de Jean (2026-09-29), « mise en page ok, 1a 3a »** :
1. **Mise en page** : sur grand écran, ~200 px d'ivoire restaient entre le
   texte et le bâtiment (plafonds du titre à 22ch, du fait à 26ch, du texte à
   46rem). Le texte prend toute la colonne ; texte courant à 19 px pour garder
   ~80 signes par ligne ; titre sans plafond, fait clé équilibré. Maquette
   validée à 1500 px. Même traitement pour À propos.
2. **UserVoice** : avant l'outil, les retours **n'étaient pas qualifiés** (et
   non « qualifiés à la main »). Synthèse et « Le point de départ » corrigés,
   FR et EN.
3. **« Pour aller plus loin »** : de vrais sous-titres et des listes courtes,
   sans redite avec le corps ; l'annexe ne garde que les détails ajoutés.

Brief : `prompts/3-mise-en-page-et-plus-loin.md`.

**Clôture** : à 1500 px, titre, fait clé et texte vont au bord de la colonne
(851 px) en 19 px ; rien ne change sous 1280 px. `plusLoin` en sections
`{ titre, points }`, rendues en `<h3>` + `<ul>` ; 12 points retirés pour
redite (liste dans le compte rendu), deux sous-titres ajoutés à Audit contenu
(« Les verdicts », « Les contrôles automatiques »), les six critères gardés
en entier. UserVoice : « jamais lus ensemble », « n'étaient pas qualifiés ».
Piège : le serveur de dev garde l'ancien schéma en cache, vider
`.astro/data-store.json`. Ratio 1,0.

# 0047 — Captures dans la page UserVoice, colonne de texte élargie

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `contenu` | 120 | 214 | `claude-opus-5-5` |

**Décisions de Jean (2026-09-29)** : la page Analyse de UserVoice remplace le
bilan hebdo, sous « Écouter chaque lundi » ; le baromètre NPS va sous « Ce que
j'ai construit » ; les deux recadrées ; chiffres synthétiques gardés, légende
« Données synthétiques ». Le texte est jugé trop étroit sur grand écran : la
colonne passe de 40rem (640 px) à 46rem (736 px, ~80 signes), par un jeton
`--mesure`, sur les pages projet et À propos.
Brief : `prompts/3-captures-integration.md`.

**Clôture** : `analyse.png` (1360 × 1406) sous « Écouter chaque lundi »,
`tableau-nps.png` (1360 × 1327, sans « Par rôle ») sous « Ce que j'ai
construit », chacune en lien vers l'image pleine, légende en encre 15 px ;
`bilan-lundi.png` abandonné. Base synthétique complétée d'un ancien sondage
inventé ; la page Analyse ouvrait par défaut des fichiers réels, remplacés
dans le processus du script par des fichiers inventés. Colonne à `--mesure`
46rem (736 px à 1280). Défaut repris en session : la marge latérale par
défaut des `<figure>` (40 px) décalait les captures. Deux actions refusées
par les permissions (lister la racine de UserVoice, renommer les catégories
synthétiques) : les catégories restent en minuscules. Ratio 1,8.

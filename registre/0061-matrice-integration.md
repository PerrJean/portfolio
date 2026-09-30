# 0061 — Le projet matrice dans le site, FR et EN

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `contenu` | 150 | 194 | `claude-opus-5-5` |

**Choix de Jean (2026-10-01)** : le troisième projet (texte validé dans
`redaction/matrice.fr.md`, 0059) entre dans le site, en français et en
anglais, comme projet **à part** sur l'accueil (sans la flèche de la paire).
Dans la page : l'**extrait** de la grille (bloc Delivery) ; dans « Pour aller
plus loin » : la **grille complète** en image, ouverte par la visionneuse, et
un lien **« Télécharger la grille (PDF) »**. Coquilles de la grille corrigées
(orthographe seulement). Excel écarté : le hook refuse les `.xlsx`, le PDF
suffit. La scène d'accueil du projet (l'échelle à trois barreaux) est menée à
part (0062) ; rien n'est poussé avant elle.
Brief : `prompts/5-matrice-integration.md`.

**Clôture** : pages `/projets/matrice-competences/` et `/en/projects/skills-matrix/`,
carte 03 à part sur les deux accueils (sans scène pour l'instant). Schéma de
« Pour aller plus loin » étendu (`image`, `fichier`, optionnels) ; le build
refuse un poids affiché qui ne correspond pas au fichier. Grille : coquilles
corrigées dans le générateur hors dépôt ; `grille-extrait.png`,
`grille-complete.png`, PDF A4 paysage de 7 pages (169 Ko). Vérificateur muet
en chemins Windows. Session coupée en cours de chantier, reprise par le même
sous-agent. Reste : la paire dans les tests (autre agent), l'accroche de
l'accueil qui dit « Deux projets ». Ratio 1,3.

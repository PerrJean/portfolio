# 0117 — Rendre visible « point de départ → ce que j'ai fait → impact » sur chaque projet

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `structure` | `ouvert` | 200 | | `claude-opus-5-5` |

**Demande de Jean (2026-11-09)**, sur le retour d'une relectrice extérieure :
rendre le flux « problème, solution, résultat ou impact » beaucoup plus
explicite sur chaque projet ; l'information est là, mais implicite, alors
qu'un lecteur pressé ne cherche que ça.

**Constat** : chaque page projet porte déjà trois phrases `probleme`,
`action`, `resultat` (`src/content.config.ts`), affichées l'une sous
l'autre **sans titre** (`src/layouts/Projet.astro`, bloc
`synthese__phrases`). Les cartes de l'accueil n'affichent que le fait clé.
Certains résultats disent un impact mesurable (Fusion), d'autres une issue
qualitative (Matrice).

**Périmètre** :
1. Questionnaire avec Jean : les libellés (un « Problème » risque de lire le
   constat comme un défaut de l'employeur, C8 ; pistes : « Le point de
   départ », « L'enjeu »), la forme (étiquettes, trois colonnes, frise), la
   place sur l'accueil (cartes inchangées ou trois temps).
2. Gabarit : les trois temps titrés dans `Projet.astro`, FR et EN, test qui
   vérifie leur présence sur les 7 pages.
3. Relecture des sept `resultat` pour qu'ils disent un impact, relatif ou en
   ordre de grandeur (C2), FR et EN.
4. Relevé des lourdeurs par un agent qui ne l'a pas écrit (0072), Jean trie.

**Ordre** : la page Matrice se traite après la clôture de 0116.

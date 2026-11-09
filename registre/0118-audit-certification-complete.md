# 0118 — Audit contenu : dire l'échelle atteinte sur une certification complète

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `contenu` | `ouvert` | 150 | | `claude-opus-5-5` |

**Demande de Jean (2026-11-09)**, dans la suite de 0117 : la page Audit
contenu ne parle que du premier parcours audité. En novembre 2026, l'audit a
couvert une certification complète, tous niveaux (release interne du
3 novembre 2026). Jean a choisi de garder cette release pour le corps de la
page, dans un chantier à part de 0117.

**Constat** : le corps de la page (`src/contenu/projets/fr/audit-contenu.md`,
`src/contenu/projets/en/content-audit.md`) dit « nous avons commencé par le
plus ancien » et ne chiffre que le premier parcours (1 question sur 20
bloquante). Rien ne dit que la méthode a passé l'échelle.

**Périmètre** :
1. Relire la release (recollée par Jean dans la conversation, **jamais
   versée au dépôt**) et n'en tirer que du relatif (C2), sans nom de
   personne (C3), sans nom interne (C4).
2. Questionnaire avec Jean : place dans le corps de la page, nommer ou non la
   certification, capture avant / après sur données synthétiques (C5).
3. Rédaction FR puis EN, corps de la page seulement.
4. Relevé des lourdeurs par un agent qui ne l'a pas écrit (0072), Jean trie.

**Hors périmètre** : l'en-tête `synthese` et le fait clé (0117), le gabarit
`src/layouts/Projet.astro` (0117).

**Coût estimé** : 150 (rédaction 60, relevé 50, capture éventuelle 40).

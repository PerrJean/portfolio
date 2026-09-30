# 0050 — La revue complète du site, en contexte neuf

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `publication` | 120 | 217 | `claude-opus-5-5` |

**Demande de Jean (2026-09-29)** : avant le lancement, une relecture de tout
le site par un agent qui n'a rien écrit (commandement : le relecteur n'est
pas l'auteur). Deux regards, menés en parallèle et sans se voir :
1. **La revue technique et éditoriale** : le contrat (C1 à C8), l'accessibilité,
   les jumelles FR / EN, la ligne éditoriale, les redites, les liens, les
   images, le rendu sur trois largeurs. Brief : `prompts/4-revue-complete.md`.
2. **Le regard du recruteur** : un agent sans aucun contexte, qui ne voit que
   le site publié, dans la peau d'un recruteur (0051).

Les deux rendent un rapport ; rien n'est modifié avant le tri de Jean.

**Clôture** : `redaction/revue-complete.md`. Aucun bloquant, aucune fuite
constatée sur C1 à C6. Cinq majeurs : HTTPS non forcé (et `www` hors du
certificat), contrôles automatiques décrits de trois façons, chiffres de tête
plus larges que le corps, accueil sans rôle, captures illisibles au
téléphone. Ratio 1,8.
**Retours de Jean sur le regard recruteur** : couper le bruit technique mais
garder « j'apprends à construire avec l'IA, je suis en chemin » ; le titre
dans le premier écran n'est pas nécessaire (le CV le porte) ; les dates de
septembre 2026 restent (le site est récent) ; le leadership viendra d'un
prochain projet, la matrice de compétences ; ajouter l'effet sur un client
B2B (recoupement des retours B2B et B2B2C).

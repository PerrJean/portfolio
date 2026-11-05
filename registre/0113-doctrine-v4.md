# 0113 — La doctrine passe en v4

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `outil` | 25 | | `claude-opus-5-5` |

**Demande de Jean (2026-11-05)** : adopter les commandements v4, sans en
garder de copie dans le dépôt (la copie vieillirait).

**Périmètre** :
- retirer `COMMANDEMENTS.md` (copie de la v2) et renvoyer à l'original ;
- ajouter à `CLAUDE.md` la règle des 80 lignes par fonction ;
- remplacer la section « Ouvrir un chantier » de `CLAUDE.md` par un renvoi à
  la skill globale `chantier`, **une fois celle-ci livrée** (en cours
  d'écriture dans une autre session).

**Hors du dépôt** : les trois lignes de comportement (lire le registre avant
toute question, tout compte cité sort d'une commande, s'arrêter à 80 % de
contexte) et la règle du worktree vont dans le `CLAUDE.md` global de Jean.

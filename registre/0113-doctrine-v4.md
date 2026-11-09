# 0113 — La doctrine passe en v4

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `outil` | `clos 2026-11-09` | 25 | 145 | `claude-opus-5-5` |

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

**Référence (2026-11-09)** : le dépôt public
[PerrJean/vibe-coding](https://github.com/PerrJean/vibe-coding), version
**4.2** (commit `1df92e2`), lu par clone superficiel.

## Inventaire et comparaison (2026-11-09)

| Copie ou renvoi | Écart avec la 4.2 | Propre au projet | Fait |
|---|---|---|---|
| `COMMANDEMENTS.md` (v2, 218 lignes) | 25 commandements contre 14 règles et parties A à G ; chiffres « Payé » tous dans `ANNEXE.md` | rien | supprimé |
| ↳ v2 n°12, brief à deux fichiers au plus | retirée en 4.2 | oui | gardée dans `CLAUDE.md` |
| ↳ v2 n°20, correctifs d'une ligne en session | retirée en 4.2 | pratiquée (0064, 0116) | laissée tomber |
| ↳ v2 n°19, l'entrée n'est jamais de confiance | absente des règles 4.2 | sans objet (site statique, C6) | laissée tomber |
| `CLAUDE.md` : « commandement 11 », ligne `COMMANDEMENTS.md`, « cinq champs » | numérotation v2, convention à six champs | — | renvoi au dépôt public, version suivie 4.2 ; « partie B » ; « six champs » |
| `CLAUDE.md` « Ouvrir un chantier » | recopie la skill `chantier` (identique à la 4.2) | brief `prompts/`, recalibrage, push | renvoi à la skill + règles du projet |
| `CLAUDE.md` « Les règles de code » | manque la règle des 80 lignes | — | ajoutée |
| `registre/0000-convention.md` | tampon 4.1, sinon identique au modèle | les six étapes | tampon 4.2 |
| `ops/hooks/verifier_confidentialite.py` | `EXEMPTES` nommait `COMMANDEMENTS.md` | — | entrée retirée |

Sans copie ni renvoi à changer : `README.md`, `prompts/`, `ops/` (hors le
vérificateur), `.claude/rules/`. Pas de `PASSATION.md` ni de skill propre au
projet ; les skills globales `chantier`, `passation`,
`verification-prealable` et `chercher-l-existant` sont identiques à la 4.2.
Les fiches anciennes qui citent un numéro v2 ou v4 (0002, 0050, 0107 à 0111)
gardent leur forme.

## Tranché

- 2026-11-09, Jean, tableau validé : supprimer `COMMANDEMENTS.md`, le renvoi
  vit dans `CLAUDE.md`.
- 2026-11-09, Jean : la nuance v2 « correctifs d'une ligne en session après
  30 points » est laissée tomber, on suit la 4.2.
- 2026-11-09, Jean : « Ouvrir un chantier » devient un renvoi à la skill
  `chantier` suivi des seules règles du portfolio.
- 2026-11-09, Jean : la règle des 80 lignes par fonction entre dans
  `CLAUDE.md`.

## Clôture (2026-11-09)

- **Coût réel** : 145 milliers de tokens, compteur de contexte de la session
  qui a mené le chantier (`get_usage`, 144 591 tokens à la clôture). Pas de
  sous-agent.
- **Reste hors du dépôt, non fait** : le `CLAUDE.md` global de Jean ne porte
  ni les trois lignes de comportement ni la règle du worktree (vérifié le
  2026-11-09). C'est à Jean de les ajouter, ou à un chantier de sa
  configuration personnelle.
- **Observé, hors périmètre** : la page Audit contenu parle de « 25 règles »
  (`redaction/audit-contenu.fr.md`, `src/`), alors que le guide 4.2 en compte
  14. C'est une question de contenu, pas de copie.

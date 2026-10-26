# 0101 — « Mon métier » dans le menu

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `structure` | 330 | 349 | `claude-opus-5-5` |

**Décision de Jean (2026-10-26)**, transmise par la session de la
présentation dentaire, en réponse à « Ajouter “Mon métier en clair” au menu
du site ? » : « Oui, “Mon métier” (Recommandé) ». Suite de 0094, qui avait
écarté l'entrée de menu : la page n'était joignable que depuis l'accueil, et
le RH de 0080 décrochait sur les pages projet.

**Spec** : menu `Projets · Mon métier · À propos`, en anglais `Projects · My
job · About`, à la place qu'occupe aujourd'hui le menu (en-tête, et menu
replié sur téléphone). La ligne-lien de l'accueil reste. Page active marquée
comme les autres entrées.

**Étapes** : 1. code (brief `prompts/9-menu-mon-metier.md`) ; 2. tests par
un autre agent (jumelles, liens, page active, largeur téléphone) ; 3. revue
en contexte neuf ; 4. push si publiable, vérification en ligne.

**Coût estimé** : 330 k (code 110, tests 110, revue 110), calé sur 0094 :
une étape en sous-agent coûte au moins 110 k.

**Clôture (2026-10-26)** : menu `Projets · Mon métier · À propos` /
`Projects · My job · About`, en-tête et menu replié, adresse par la clé de
route, page active par `aria-current`. Tests écrits par un autre agent :
`tests/menu.test.mjs` et `tests/menu-navigateur.test.mjs` (21 pages, 375 et
1280 px), 5 tests, 246 au total ; trois cassent quand deux entrées sont
inversées. Revue en contexte neuf : publiable, rien à corriger ; clavier
vérifié (Tab, Entrée, Échap rend le focus au bouton). Laissés, en le sachant :
entre 720 et 759 px, en français, l'en-tête passe sur deux lignes (le menu
sous le nom, sans débordement) ; les tests ne couvrent ni cette plage ni le
clavier. **Coût réel** : 349 k (code 104, tests 132, revue 113), ratio 1,06 :
l'estimé calé sur 0094 (110 k par étape en sous-agent) tient.

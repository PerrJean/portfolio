# 0086 — Un skill de relecture pour le lecteur non initié

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `arbitrage` | `contenu` | — | — | — |

**Demande de Jean (2026-10-09)** : extrapoler de ses corrections des règles
de relecture, dans un skill. Le portfolio s'adresse à quelqu'un qui n'y
connaît rien : explicite, clair, sans jargon d'IA ni d'outillage. Skill
`relecture-non-initie` (hors dépôt, `~/.claude/skills/`), dix familles :
supprimer avant de réécrire ; aucun jargon d'IA ni d'outillage ; sigles et
termes expliqués une fois ; une phrase, une idée ; le positif et le gain ;
la précision du chiffre ; aucune redite entre les étages ; un mot par
notion ; le rôle juste, une seule humilité ; rester dans le sujet. La règle
0072 (`CLAUDE.md`) l'applique avec `ligne-editoriale`.

**Enrichissement (Jean, 2026-10-09)**, après une recherche (Wikipédia FR « Identifier l'usage d'une IA générative », humaniseur-fr, Labbé et Savoy, ISO 24495-1, FALC, guides canadien et luxembourgeois, Services publics +) : `ligne-editoriale` reçoit les tics français (remplissage, participe présent greffé, copule évitée, inflation **supprimée** et non reformulée, verbes passe-partout, langue de bois, anglicismes, doublets, défis et perspectives, attributions vagues, « nous » + devoir, titres en question, typographie et nombres à la française, gabarits), un « miroir anglais » pour les pages EN, et la méthode (trois tics = signal, une seule passe) ; `relecture-non-initie` reçoit le langage clair (sujet-verbe, voix active, verbes plutôt que noms, du connu au nouveau, forme affirmative, longueur variée, exemple concret, ni idiome, titres, liens et visuels), garde les règles de Jean contre le « vous », la répétition et les titres en question, permet « car / mais / donc ». Contrôles : gabarits oubliés bloquants, phrases de plus de 30 mots en alerte non bloquante (brief `prompts/8-tests-redaction.md`) ; deux lecteurs non initiés avant toute nouvelle page.

**Contrôles en place** : `tests/gabarits.test.mjs` (bloquant, 49 tests au vert) et `ops/alertes/phrases-longues.mjs` (alerte non bloquante, après les tests dans le hook). Sur le site actuel : 26 phrases de plus de 30 mots, à trier avec Jean.

**Test à l'aveugle (2026-10-09)** : un agent construit un jeu de 32 phrases
(16 corrigées par Jean, dans leur version d'avant ; 16 jamais relevées), un
autre, neuf, les juge avec les deux skills sans la clé. Repérées : 15 sur 16
(raté : un constat négatif chiffré hors fait clé ; la règle 5 est précisée).
Signalées en plus : 6 témoins ; Jean les juge toutes à corriger, donc aucun
faux positif. Les six corrections appliquées, FR et EN : deux phrases
d'outillage retirées de UserVoice (registre, tests, seuil) ; Matrice
« L'entretien nous a d'abord montré que… » et « Une fois écrits, ces critères
nous ont donné, au Product Manager et à moi, la même grille pour lire sa
progression. » ; Fusion, une phrase coupée en deux ; Audit, « une décision
prise au fil d'une conversation… » retirée. Jeu et clé hors dépôt
(scratchpad). À refaire avec un nouveau jeu quand le skill évolue.

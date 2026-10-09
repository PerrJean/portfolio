# 0087 — Le skill de relecture passé sur tout le site, par lots

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `contenu` | 320 | — | `claude-opus-5-5` |

**Demande de Jean (2026-10-09)** : passer `relecture-non-initie` et
`ligne-editoriale` sur la nouvelle page d'analyse du NPS, puis sur tout le
contenu existant, par lots. Chaque relevé classe ses propositions en « sûr »
(une règle nettement enfreinte, comme dans le test à l'aveugle) ou « à
juger ». Jean valide un échantillon des « sûrs » (appliqués en bloc si
l'échantillon tient) et tranche les « à juger » un par un. Quatre lots :
1. analyse du NPS ; 2. accueil, À propos, UserVoice ; 3. Mises en situation,
Fusion ; 4. Audit contenu, Matrice. FR puis EN. Brief :
`prompts/8-releve-site-lots.md`.

**Clôture des « sûrs » (2026-10-09)** : lot 1, 87 remplacements ; lot 2, accueil, À propos, UserVoice ; lot 3, 63 ; lot 4, Audit et Matrice, schéma de l'Audit aligné sur le texte. Refusés par Jean et gardés : « scale-up SaaS B2B », « Bénéfices et impact business », « churn », « Le point de départ », les volets « Pour aller plus loin », « levier », « la solution ». UserVoice réécrit selon Jean : l'IA dit quand elle doute, un humain tranche, sa réponse l'aide à mieux distinguer les cas suivants. Au passage : fait clé de l'analyse identique sur la carte et la page ; descriptions de l'accueil à six projets ; textes alternatifs des schémas de la Fusion alignés (« code à reprendre », « piece of material »). Les « à juger » des lots 2 à 4 restent à trier. Le skill note ce que Jean garde.

**Tri des « à juger » (Jean, quinze retenus)** : flèche « Alors je me suis attaqué à la qualité du contenu. » ; fait clé de la Matrice en deux phrases, sujet en tête ; « Le cadre dépasse ce seul entretien » supprimé ; À propos : « de l'écoute des utilisateurs à la mise en ligne », la phrase des services publics coupée, la signature retirée ; Fusion : retours des apprenants ayant répondu à l'enquête NPS, deux raisons qui se cumulent, Product Manager junior dans l'encadré ; Mises en situation : les learning designers ont écrit les premières mises en situation, un seul mot « mise en situation » (EN « role-play ») ; Audit : titre « …avant que l'apprenant la voie », « mis en ligne » ; UserVoice : « L'équipe pensait surtout aux bugs… ». Refusé : expliquer backlog, grooming, discovery, delivery dans le texte (infobulles, registre 0088). Les brouillons de `redaction/` ne suivent plus toutes ces retouches : les sources du site font foi.

# 0118 — Audit contenu : dire l'échelle atteinte sur une certification complète

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `contenu` | `en cours` | 150 | | `claude-opus-5-5` |

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

## Tranché

- 2026-11-09, Jean : release recollée dans la conversation, hors du dépôt.
- 2026-11-09, Jean : l'échelle va dans la partie impact du corps de la page
  (H2 « Bénéfices et impact business »), pas dans un H2 neuf.
- 2026-11-09, Jean : « une certification d'espagnol complète, cinq niveaux
  de A1 à C1 », sans la nommer.
- 2026-11-09, Jean : une capture avant / après d'un corrigé, sur une
  question inventée (C5).
- 2026-11-09, Jean : chiffres publiés : environ 9 questions sur 10 corrigées
  sur les cinq niveaux ; au niveau A1, 6 sur 10 avec un défaut grave, dit en
  levier (C8) ; chaque corrigé justifie la bonne réponse, dit pourquoi
  chaque autre est fausse, et existe dans les quatre langues de l'interface.
- 2026-11-09, Jean : go sur la spec ci-dessous, deux images.

## Spec

Fichiers : `src/contenu/projets/fr/audit-contenu.md`,
`src/contenu/projets/en/content-audit.md` (corps seulement), une ou deux
images neuves dans `public/captures/audit-contenu/`.

1. **« Bénéfices et impact business »** s'ouvre sur l'échelle : après le
   premier parcours, la méthode a couvert une certification d'espagnol
   complète, cinq niveaux de A1 à C1, en cinq semaines (fin septembre à
   début novembre 2026) ; environ 9 questions sur 10 corrigées. À l'A1,
   6 questions sur 10 avaient un défaut grave, le plus souvent un corrigé
   qui n'aidait pas l'apprenant : c'est là que la correction rapporte le
   plus. Chaque corrigé dit pourquoi la bonne réponse est juste et pourquoi
   chaque autre est fausse, dans les quatre langues de l'interface.
2. **La figure avant / après** suit ce paragraphe : une question d'espagnol
   de niveau A1 inventée ; avant, un corrigé d'une ligne en espagnol ;
   après, le corrigé complet. Visuel neutre, aux couleurs du portfolio, qui
   n'imite pas l'interface de l'employeur (C1). Deux images : le corrigé
   « après » en français sur la page FR, en anglais sur la page EN, ce qui
   montre la traduction. Légende finie par « Données synthétiques. ».
3. **Le paragraphe de l'école cliente** suit, inchangé ; sa dernière phrase
   (« la méthode s'applique aux parcours suivants ») est reprise pour ne
   pas redire l'échelle, et annonce la suite : une autre certification.
4. « Ce résultat ne préjuge pas de la qualité des autres parcours » reste :
   il porte sur le 1 sur 20 du premier parcours.
5. Ni nom de personne, ni nom d'outil, de produit ou d'offre, ni chiffre
   absolu (C2 à C4). EN en miroir.
6. Relevé des lourdeurs par un agent neuf, trié par Jean ; build et tests
   verts.

**Coût réestimé** : 200 (rédaction 50, deux images 90, relevé 60).

## Point d'étape (2026-11-09)

- **Rédaction** (sous-agent, brief `prompts/0118-redaction.md`) : 89. Le mot
  de la page est « explication » (celui de la grille), pas « corrigé ».
- **Images** (sous-agent, brief `prompts/0118-images.md`) : 89.
  `corrige-avant-apres-fr.png` et `-en.png`, 1360 × 827, 36 Ko et 35 Ko ;
  fichiers de travail hors du dépôt (`~/.portfolio/captures-audit-0118/`).
- **Relevé des lourdeurs** : brief `prompts/0118-releve.md`.

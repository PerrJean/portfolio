# Brief — l'échelle de l'audit dans la page Audit contenu (registre/0118)

Le portfolio de Jean (Head of Product) s'adresse à des recruteurs qui lisent
vite. La page Audit contenu ne raconte que le premier parcours audité. Tu
ajoutes ce que l'audit a fait ensuite sur une certification complète, dans
le **corps** de la page, FR puis EN.

## Ce que tu lis

1. `registre/0118-audit-certification-complete.md` : le tranché et la spec
   font foi.
2. `src/contenu/projets/fr/audit-contenu.md`, puis sa jumelle
   `src/contenu/projets/en/content-audit.md` (même structure).

Charge le skill `ligne-editoriale` avant d'écrire.

## Les faits publiables (tirés de la release interne, rien d'autre)

- Après le premier parcours, la méthode a couvert une certification
  d'espagnol complète, cinq niveaux de A1 à C1, de fin septembre à début
  novembre 2026 (cinq semaines).
- Environ 9 questions sur 10 de la certification ont été corrigées.
- Au niveau A1, 6 questions sur 10 avaient un défaut grave. Le plus souvent,
  le corrigé n'aidait pas l'apprenant : une ligne, en espagnol seulement,
  sans un mot sur les mauvaises réponses. À dire **en levier** (c'est là que
  la correction rapporte le plus), jamais comme une faute de l'employeur.
- Chaque corrigé réécrit donne la bonne réponse et sa justification, puis
  pourquoi chaque autre réponse est fausse. Il existe dans les quatre
  langues de l'interface ; avant, presque aucun n'existait hors de
  l'espagnol.
- Bénéfice : l'apprenant comprend son erreur dans sa langue, et une
  question fausse ne le pénalise plus.
- La suite : une autre certification.

## Ce que tu écris

Dans le H2 « Bénéfices et impact business » / « Benefits and business
impact » seulement :

1. Un paragraphe d'ouverture sur l'échelle (spec, point 1), trois ou quatre
   phrases courtes, chiffres en relatif.
2. Juste après, la figure, sur le modèle exact de la figure existante
   (`<figure>`, lien vers l'image, `width`, `height`, `loading="lazy"`,
   `decoding="async"`, `alt`, `<figcaption>`) :
   - FR : `/captures/audit-contenu/corrige-avant-apres-fr.png`
   - EN : `/captures/audit-contenu/corrige-avant-apres-en.png`
   - `width="1360" height="900"` (provisoire, corrigé à l'intégration).
   - Le contenu de l'image (inventé) : une question d'espagnol de niveau
     A1, « Marta trabaja en un hospital. Cuida a los enfermos. ¿Cuál es su
     profesión? », réponses A profesora, B enfermera, C cocinera,
     D camarera, bonne réponse B. À gauche « Avant » : un corrigé d'une
     ligne en espagnol, « Respuesta correcta: B. » À droite « Après » : le
     corrigé complet, en français sur l'image FR (en anglais sur l'EN) : la
     bonne réponse et sa justification tirée du texte (elle soigne les
     malades, à l'hôpital), puis pourquoi A, C et D sont fausses.
   - `alt` qui décrit cela ; légende d'une phrase finie par « Données
     synthétiques. » / « Synthetic data. »
3. Le paragraphe de l'école cliente reste. Sa dernière phrase est reprise
   pour ne pas redire l'échelle : elle garde le churn et annonce la suite
   (une autre certification).

Ne touche ni au front matter (`synthese`, `fait`, `cadre`, `plusLoin`), ni
aux autres H2. La phrase « Ce résultat ne préjuge pas… » reste.

## Interdits

Aucun nom de personne, de collègue, d'outil, de produit, d'offre ni de
certification, ni le sigle de celle-ci ni celui de la suivante ; aucun chiffre absolu (pas de
nombre de questions) ; l'employeur jamais nommé ; pas les noms des quatre
langues. Le tiret long est banni ; apostrophe typographique ’ comme le
reste du fichier.

## Ce que tu rends

Lance `python ops/hooks/verifier_confidentialite.py` sur les deux fichiers
(muet attendu). Ne commite rien. Dans ton message final : le texte ajouté
ou changé, FR puis EN, et la sortie du contrôle.

Worktree : `C:\Users\Jean PERRIER\Portfolio\.claude\worktrees\chantier-0116-matrice-654181`.

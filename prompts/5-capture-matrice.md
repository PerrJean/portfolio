# Brief — la grille de compétences en capture, sans aucune évaluation (registre/0059)

Jean veut montrer, dans son troisième projet, la grille de compétences qu'il a
construite pour faire grandir un Product Owner. **La grille, pas
l'évaluation** : aucune donnée sur la personne ne doit sortir.

## La source, et ce qui n'en sort jamais

La source est une feuille Google Sheets, identifiant
`1e_uH7aM_3CPqVIT-Bfz4td1s_FIzL4jPcNGOWfI6HFU`, onglet **« Séniorité PO »**
(la version structurée ; ignore les onglets « Proposition », « matrice »,
« Feuille 4 »). Lis-la avec les outils Google Drive de ta session
(`read_file_content`, ou `download_file_content` pour l'export complet si le
texte des cellules est tronqué). Tout fichier brut va dans
`~/.portfolio/matrice/` (hors des dépôts), jamais dans le portfolio.

**Ne sortent jamais**, ni dans l'image ni dans ton rapport :
- le **titre du fichier** et tout **prénom** ;
- les colonnes **« Evaluation ou Observation de la compétence »** (Oui /
  Partiellement / Non, NOK) et **« Commentaire »** ;
- la ligne **« Validation Prérequis »** avec ses résultats ;
- toute colonne ou mention « Matrice » suivie d'initiales (le nom de
  l'employeur, C1), et tout nom interne (C4).

Gardent leur place : pondération, macro-compétence, compétence, et les trois
textes « Application de la compétence » pour les niveaux junior,
intermédiaire, senior. Recopie ces textes **tels quels** ; si tu repères une
erreur de la source (par exemple une cellule qui répète celle d'une autre
compétence), ne la corrige pas : signale-la.

## L'image

- Une page HTML locale (dans `~/.portfolio/matrice/`) qui met la grille en
  tableau dans le style du site : fond ivoire `#FEFAF2`, texte encre
  `#2A1F1A`, filets `#D9D4CC`, intitulés de niveau en ardoise `#5E7488` gras,
  police Atkinson Hyperlegible Next (fichiers du paquet
  `@fontsource/atkinson-hyperlegible-next` du portfolio, en local), aucune
  ressource tierce. En tête du tableau : « Junior », « Intermédiaire »,
  « Senior » ; à gauche, la macro-compétence et la compétence.
- Passe cette page au vérificateur du portfolio :
  `python ops/hooks/verifier_confidentialite.py <fichier>` depuis
  `C:\Users\Jean PERRIER\Portfolio` : il doit se taire. N'affiche ni ne cite
  aucun terme de ses listes.
- Capture avec Edge sans interface (profil jetable, chemins Windows) :
  `"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new
  --disable-gpu --hide-scrollbars --user-data-dir="$(cygpath -w <dossier>)"
  --window-size=1360,<hauteur> --screenshot="$(cygpath -w <png>)" <url>`.
- Deux sorties dans `public/captures/matrice/` :
  - `grille-extrait.png` : la macro-compétence « Delivery & exécution
    produit » seule, 1360 px de large, 1450 px de haut au plus ;
  - `grille-complete.png` : toute la grille, 1360 px de large (hauteur libre).
  Chacune 400 Ko au plus (`sharp`, déjà installé dans le portfolio).
- Regarde les deux images (outil Read) : aucun prénom, aucune évaluation,
  texte lisible.

## Ce que tu rends

Chemins, dimensions, poids ; la sortie du vérificateur ; la liste des
compétences reprises ; les erreurs de la source que tu as vues ; une légende
FR et EN pour chaque image et un texte alternatif FR et EN. Ne touche à
aucun fichier de `src/` ni de `redaction/`, ne commite rien.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

# Brief — l'avant / après d'un corrigé, deux images (registre/0118)

Le portfolio de Jean (Head of Product) montre à des recruteurs ce que son
audit de contenu a changé pour l'apprenant : un corrigé d'une ligne devient
un corrigé complet, dans la langue de l'apprenant. Tu produis **deux
images**, sur une question **inventée** (règle C5 : données synthétiques
seulement).

## Ce que tu lis

1. `src/styles/jetons.css` : les couleurs et polices du portfolio.
2. `src/contenu/projets/fr/audit-contenu.md`, la figure existante
   (`carnet-relecture.png`), pour la légende et la place. Lecture seule.

Tu ne lis rien d'autre, et rien hors de ce dépôt.

## Ce que montre l'image

Deux cartes côte à côte, titrées « Avant » et « Après » (EN : « Before »,
« After »), au-dessus d'elles la question, en espagnol dans les deux
images :

> Marta trabaja en un hospital. Cuida a los enfermos. ¿Cuál es su profesión?
> A. profesora · B. enfermera · C. cocinera · D. camarera

- **Avant** : un corrigé d'une ligne, en espagnol dans les deux images :
  « Respuesta correcta: B. »
- **Après**, en français sur l'image FR, en anglais sur l'EN :
  - Bonne réponse : B, « enfermera » (infirmière).
  - Pourquoi : le texte dit que Marta « cuida a los enfermos » : elle
    soigne les malades, à l'hôpital. C'est le métier d'infirmière.
  - Pourquoi pas les autres : A, « profesora » (professeure), enseigne dans
    une école ; C, « cocinera » (cuisinière), prépare les repas ;
    D, « camarera » (serveuse), sert dans un restaurant ou un café. Le
    texte ne parle ni d'école, ni de cuisine, ni de restaurant.
  - Même contenu en anglais pour l'image EN (nurse, teacher, cook,
    waitress).

Visuel **neutre, aux couleurs et polices du portfolio** : il n'imite
l'interface d'aucune plateforme réelle, ne porte ni logo, ni nom de marque,
de produit, d'examen, d'entreprise ou de personne, ni identifiant. Lisible
réduit à 850 px de large (corps de texte ≥ 22 px à 1360 px). Polices
locales ou système seulement : aucune ressource tierce.

## Comment

Travail dans `C:\Users\Jean PERRIER\.portfolio\captures-audit-0118\` (hors du
dépôt) : une page HTML autonome par langue. Capture par Edge sans
interface (`C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`,
`--headless --screenshot`, profil jetable `--user-data-dir` dans ton
dossier), puis `sharp` (dans `node_modules` du dépôt) pour recadrer et
compresser. Node : `export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

Sorties : `public/captures/audit-contenu/corrige-avant-apres-fr.png` et
`corrige-avant-apres-en.png`, 1360 px de large, ≤ 1100 px de haut,
≤ 200 Ko chacune, même hauteur pour les deux. Regarde chaque image (Read)
et corrige ce qui déborde ou se lit mal. Passe chaque HTML à
`python ops/hooks/verifier_confidentialite.py` : muet attendu.

## Ce que tu rends

Ne touche à aucun fichier de `src/`, ne commite rien. Dans ton message
final : chemins, dimensions exactes, poids ; un texte alternatif FR et EN
d'une à deux phrases ; la sortie du contrôle.

Worktree : `C:\Users\Jean PERRIER\Portfolio\.claude\worktrees\chantier-0116-matrice-654181`.

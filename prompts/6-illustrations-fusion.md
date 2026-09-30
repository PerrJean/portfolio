# Brief — les trois schémas du projet « fusion des plateformes » (registre/0067)

Le portfolio de Jean prépare un quatrième projet, la fusion des plateformes
(brouillon : `redaction/fusion.fr.md`, à lire au-dessus du filet ; sous le
filet, ce sont des notes). Jean veut des **illustrations**, jugées très
importantes. Tu dessines **trois schémas fixes**, dans le style du schéma déjà
publié sur la page Audit contenu. Deux fichiers à lire d'abord :
`redaction/fusion.fr.md` et `src/components/schemas/chaine-audit.css` (le
style d'un schéma du site ; son contenu est dans `chaine-audit.mjs`).

## Les trois schémas

1. **Avant / après.**
   - Avant : trois colonnes (« Préparation aux examens », « Entreprises »,
     « Apprentissage général », ou les libellés du brouillon), chacune avec
     trois couches empilées : interface, gabarits d'activité, données ; trois
     styles de trait différents, pour dire trois façons de faire.
   - Après : deux colonnes (examens, apprentissage général) ; le contenu
     « Entreprises » entre dans la généraliste (une flèche) ; sous les deux,
     une seule bande « Design system commun » ; dans la généraliste, les
     gabarits deviennent « quatre gabarits communs ». Une troisième colonne
     en **pointillés**, « Plateforme unique : second temps, non engagé
     (arbitrage) ».
2. **Les trois trajectoires** (valeur apportée dans le temps, sans chiffre) :
   la trajectoire retenue monte par paliers (une étape qui rapporte chacune) ;
   « livrer vite » monte vite puis s'aplatit (la dette) ; « construire
   proprement » reste à plat longtemps. Légende directe sur chaque courbe.
3. **Les gabarits** : à gauche une grille d'**une trentaine** de petites
   vignettes toutes différentes, à droite **quatre** gabarits communs
   (support + question), une flèche entre les deux.

## Les règles

- Au trait, fond ivoire `--ivoire`, trait `--encre`, liaisons et flèches
  `--ardoise` ; l'**ambre** `--ambre` comme seule lumière (un aplat ou un
  point sur l'élément qui compte : la trajectoire retenue, les quatre
  gabarits, le design system), jamais du texte en ambre ; l'orange réservé
  aux lunettes de Jean (inutile ici). Texte en Atkinson Hyperlegible Next,
  15 px au moins à la taille d'affichage (colonne de 736 à 851 px).
- **Aucun nom** de marque, de site, d'outil ni de personne, **aucun chiffre
  absolu** interne (« une trentaine » et « quatre » viennent du brouillon
  validé), aucune capture réelle.
- Libellés **FR et EN** (l'anglais américain, court).
- Lisible au téléphone (390 px) : dis pour chaque schéma s'il se lit tel quel
  réduit, ou s'il lui faut une disposition verticale, et propose-la.

## Ce que tu rends

Dans `ops/images/fusion/` : les SVG de chaque schéma, FR et EN
(`avant-apres.fr.svg`, `avant-apres.en.svg`, `trajectoires.*.svg`,
`gabarits.*.svg`), une planche `planche.png` qui les montre (FR, grand écran,
et au moins un en largeur 390 px), et le script `planche.mjs` (SVG composé
puis `sharp`, déjà installé, aucun paquet ; la police en chemins comme
`ops/images/accueil/police.mjs`). Regarde la planche (outil Read). Passe les
SVG au vérificateur avec des **chemins Windows**
(`python ops/hooks/verifier_confidentialite.py <chemin>` depuis
`C:\Users\Jean PERRIER\Portfolio`) : il doit se taire.
Tu ne touches pas à `src/` ni aux tests, ni à `redaction/`. Ne commite rien.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

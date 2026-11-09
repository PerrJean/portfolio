# Brief — relevé des lourdeurs, l'échelle de l'audit (registre/0118, règle 0072)

Le portfolio de Jean (Head of Product) s'adresse à des recruteurs qui lisent
vite, spécialistes du produit ou RH généralistes. Un agent vient d'ajouter
à la page Audit contenu, dans le H2 « Bénéfices et impact business », ce
que l'audit a fait sur une certification d'espagnol complète : un paragraphe,
une figure avant / après d'un corrigé, la dernière phrase du paragraphe
suivant. Tu fais un **relevé en lecture seule** : tu ne modifies aucun
fichier, Jean trie avant.

## Ce que tu lis

1. Les skills `ligne-editoriale` et `relecture-non-initie` (charge les
   deux ; le second prime pour juger ce qu'un lecteur non initié comprend).
2. `src/contenu/projets/fr/audit-contenu.md`, puis sa jumelle
   `src/contenu/projets/en/content-audit.md`. La page entière, mais le
   relevé porte sur le H2 « Bénéfices et impact business » ; signale le
   reste seulement s'il contredit l'ajout. Les deux images citées sont dans
   `public/captures/audit-contenu/corrige-avant-apres-fr.png` et `-en.png` :
   regarde-les (Read).

## Ce que tu cherches, par ordre d'importance

1. **Le recruteur** : en dix secondes, comprend-il l'échelle atteinte
   (une certification entière, cinq niveaux, environ 9 questions sur 10
   corrigées) et ce que l'apprenant y gagne ? L'ajout se lit-il comme un
   impact, à sa place dans ce H2 ?
2. **Les règles** : un constat formulé comme un défaut de l'employeur au
   lieu d'un levier (C8) ; un chiffre absolu (C2) ; un nom de personne,
   d'outil, de produit ou de certification, ou l'employeur nommé (C1, C3,
   C4) ; une réutilisation présentée comme faite alors qu'elle est à venir.
3. **La cohérence** : avec « Ce que nous avons trouvé » (1 question sur 20
   bloquante sur le premier parcours) et la grille (bloquant, majeur) ; un
   lecteur peut-il croire que 6 sur 10 contredit 1 sur 20 ? Le mot
   « explication » (celui de la grille) contre « corrigé » : lequel un
   lecteur extérieur comprend-il ? L'image, l'`alt` et la légende disent-ils
   la même chose que le texte ?
4. **Les lourdeurs** : phrases de plus de 25 mots, redites avec le reste de
   la page et le front matter (`synthese`, `fait`), tics de la ligne
   éditoriale, termes non expliqués.
5. **L'anglais** : écarts de sens avec le français, tournures calquées.

N'ajoute aucun fait. Si un fait manque, écris [À COMPLÉTER].

## Ce que tu rends

Dans ton message final uniquement : en tête, les **cinq changements qui
comptent le plus**, une ligne chacun ; puis un tableau **extrait → ce qui
gêne → réécriture proposée → fichier:ligne**, du plus gênant au moins
gênant, 20 lignes au plus, FR puis EN. Ne commite rien, ne modifie rien.

Worktree : `C:\Users\Jean PERRIER\Portfolio\.claude\worktrees\chantier-0116-matrice-654181`.

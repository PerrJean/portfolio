# Brief — relevé du texte de la présentation DentalSoft (registre/0096)

Tu relis, tu ne modifies rien. Lis `registre/0096-dentalsoft-releve-texte.md`
(le lecteur, la forme), puis charge les skills `ligne-editoriale` et
`relecture-non-initie`.

## Ce que tu lis

La présentation **telle qu'on la voit** : sers `public/`
(`python -m http.server 8792 --directory public`, en arrière-plan) et
parcours `/usecase/dentalsoft/` vue par vue, dans l'ordre du parcours,
puis les quatre vues de Réserve (constante `RESERVE`), le Sommaire, les
dévoilements successifs d'une vue, « Choix de méthode », « Approfondir »
et les notes de bas de vue. Le source (`public/usecase/dentalsoft/index.html`,
les objets `T.vues`, `sousTitre`, `notesBas`…) sert à retrouver la ligne,
pas à lire à la place de la page. Les maquettes (Atlas métier, espace
famille) se relisent aussi : leur texte est du faux contenu d'interface,
juge-le comme tel (juste, cohérent, crédible pour un cabinet).

## Ce que tu cherches, du plus grave au moins grave

1. **La justesse** : une phrase qui dit autre chose que ce que la vue
   montre, ou un mot que le métier n'emploierait pas. Exemple donné par
   Jean, à traiter en premier : « Huit repères communs, pas un protocole
   clinique unique. » (sous-titre de la vue « Un parcours de référence
   pour comparer les pratiques ») — la frise montre huit étapes du
   parcours du patient, de la prise de contact à la contention ; dis ce
   qui ne va pas et propose.
2. **La clarté** pour un lecteur qui découvre la page seul : mot vague,
   phrase à relire, sigle non dit, négation, nom d'action, jargon de
   méthode.
3. **La cohérence** : un même objet nommé de deux façons (étape / repère
   / jalon ; cabinet / structure ; praticien / dentiste…), titres et
   sous-titres qui se redisent, typographie (espaces insécables avant
   `: ; ? !`, guillemets « », majuscules).
4. **La longueur** : ce qui pourrait sortir sans perte (règle 1 de
   `relecture-non-initie` : la suppression d'abord).

Ne relève pas ce qui est un choix assumé du registre 0093 (couleurs,
tailles). N'invente aucun fait : un fait manquant devient `[À COMPLÉTER]`.

## Ce que tu rends

`.canevas/0096/releve.md` : un tableau par vue, dans l'ordre du parcours,
colonnes `vue | extrait exact | ce qui gêne | proposition (et « supprimer »
quand c'est possible) | ligne du source`. En tête, les **dix** lignes les
plus gênantes de toute la présentation, classées. Puis les incohérences de
vocabulaire en une liste (le mot, ses variantes, où, le mot proposé).

Arrête le serveur. Ne modifie aucun fichier du dépôt, pas de `git stash`,
ne commite rien. Rapport de 150 mots au plus : le nombre de lignes
relevées par catégorie et les trois plus graves. Environnement : Windows,
Git Bash.

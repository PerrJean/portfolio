# Brief — second relevé : lourdeurs et phrases peu claires (registre/0071)

Le portfolio de Jean (Head of Product) s'adresse à des recruteurs qui lisent
vite. Il compte maintenant cinq projets, en français et en anglais. Jean veut
un contrôle de **tout le contenu** : les lourdeurs, et surtout **les phrases
difficiles à comprendre** pour quelqu'un qui ne connaît ni l'entreprise ni
le projet. Tu fais un **relevé en lecture seule** : tu ne modifies aucun
fichier du site, Jean trie avant.

## Ce que tu lis

1. La ligne éditoriale : `C:\Users\Jean PERRIER\.claude\skills\ligne-editoriale\SKILL.md`.
2. Le texte **tel que le recruteur le lit** : construis le site
   (`npx astro build --outDir .dist-releve2`) et lis le texte visible des
   quatorze pages (deux accueils, cinq projets et leurs jumelles, deux « À
   propos »), dont les légendes des figures et les volets « Pour aller plus
   loin ». Retrouve ensuite le fichier source de chaque extrait
   (`src/contenu/`, `src/pages/`, `src/i18n/textes.ts`,
   `src/components/schemas/`) pour le citer.

## Ce que tu cherches, par ordre d'importance

1. **Les phrases qu'un lecteur extérieur ne comprend pas du premier coup** :
   un lien logique qui manque entre deux phrases, un terme interne ou de
   jargon non expliqué, un sujet flou (« il », « ce », « cela » sans
   antécédent clair), une idée qui suppose de connaître le projet.
2. **Les lourdeurs** : phrases de plus de 25 mots, subordonnées empilées,
   noms à la place de verbes, parenthèses qui cassent la phrase, redites
   (entre la synthèse, le corps et « Pour aller plus loin », et d'un projet à
   l'autre), tics de la ligne éditoriale.
3. **Les incohérences entre projets** : un même fait dit deux fois
   différemment, un rôle nommé de deux façons, une date qui ne colle pas.
4. **L'anglais** : les mêmes critères, et ce qui sonne traduit.

Garde les faits, les chiffres et les formulations fixées par Jean : la phrase
signature, l'accroche de l'accueil (« J'ai réuni deux plateformes en une… »),
« réponse » et jamais « clé », « Son résultat ne présume pas de la qualité du
reste du contenu du site. » N'ajoute aucun fait.

## Ce que tu rends

`redaction/releve-lourdeurs-2.md` : en tête, les **cinq changements qui
comptent le plus**, une ligne chacun. Puis un tableau par page : **extrait →
ce qui gêne (incompréhensible, lourd, redite, incohérence) → réécriture
proposée → fichier:ligne**, classé du plus gênant au moins gênant, 40 lignes
au plus en tout, FR puis EN (l'anglais suit le français quand la même phrase
change). Supprime `.dist-releve2`. Ne commite rien. Un autre agent anime en
parallèle des scènes dans `src/components/scene/` : n'y touche pas.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

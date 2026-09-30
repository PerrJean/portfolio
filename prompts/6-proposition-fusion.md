# Brief — proposer le projet « fusion des plateformes » (registre/0065)

Le portfolio de Jean (Head of Product) compte trois projets. Les recruteurs
disent qu'il montre surtout quelqu'un qui construit, pas quelqu'un qui dirige
une équipe produit. Jean veut un **quatrième projet** qui montre qu'il **prend
de la hauteur** : la **fusion des plateformes** qu'il a menée (sur son CV :
une plateforme sur trois supprimée). Tu fais une **proposition** de page, à
valider par Jean.

## Tes sources

Quatre documents Google Drive, à lire avec les outils Drive de ta session
(`mcp__252a9ef2-2634-4953-9b9e-5671c02e018f__read_file_content`, à charger
par ToolSearch) :
- document `1IvHuMc4W0Cu44ejOFXlfCsUK_8mi2bQ6`
- document `11b7GhRPAtoP4gRQ9EZAEjHLmAuN3B3Mp`
- présentation `1630qEb3HtMjPFonZLp5SAsyJ79QwYg5Zz6BVxlHfWV0`
- présentation `1BUez7CzSV_W46a4eX2LPqtn1N10v4bcUmpjDqQeUnn4`

Et, pour la forme d'une page projet validée :
`redaction/audit-contenu.fr.md` et
`C:\Users\Jean PERRIER\.claude\skills\ligne-editoriale\SKILL.md`.

## Ce qui ne sort jamais des documents

Ces documents sont internes. Dans tout ce qui entre dans le dépôt, et dans ton
rapport :
- **aucun nom** d'entreprise, de marque, de site, de produit, d'examen, de
  client, d'outil interne ni d'URL (dis « trois plateformes », « la
  plateforme principale », « une plateforme dédiée aux entreprises »… selon
  ce qu'elles sont) ;
- **aucun nom de personne** ;
- **aucun chiffre absolu interne** (chiffre d'affaires, trafic, effectifs,
  budget, nombre d'utilisateurs) : des proportions, des évolutions relatives
  ou des ordres de grandeur seulement ;
- le constat se dit **en levier**, jamais comme un défaut de l'employeur.
Tes notes de lecture détaillées (qui peuvent citer les documents) vont dans
`~/.portfolio/fusion/notes.md`, **hors du dépôt**.

## Ce que tu cherches dans les documents

Ce qui fait voir un Head of Product : la situation de départ et pourquoi elle
coûtait (expérience client, coût technique, business) ; les options étudiées
et celle retenue ; les **arbitrages** (ce qu'on a sacrifié, pourquoi) ; qui a
été embarqué (équipes, métiers, direction) et comment ; le plan (étapes,
jalons, risques) ; les résultats, en relatif ; ce que Jean en retient. Relève
ce qui est **fait** et ce qui n'est que **prévu** : ne présente jamais un
projet comme accompli s'il ne l'est pas. Date du projet, en mois et année.

## Ce que tu rends

1. `redaction/fusion.fr.md`, sur le modèle de `audit-contenu.fr.md` : en-tête
   (`titre`, `date`, `fait` : la phrase clé, `synthese` problème / action /
   résultat, `plusLoin` en sections `{ titre, points }`), puis 4 ou 5 H2
   courts, dont « Bénéfices et impact business » et « Ce que j'en retiens »
   (voix « je », mode apprentissage). Lisible en deux minutes par un
   recruteur. Sous un filet `---` : l'audit des tics repérés et réécrits,
   puis **ce que Jean doit trancher ou confirmer** (faits incertains, chiffres
   à convertir en relatif, ce qui est fait ou seulement prévu).
2. Une proposition d'**illustration** (un schéma au trait « avant / après »
   des plateformes, ou autre), décrite en quelques lignes, sans la dessiner.
3. Passe `redaction/fusion.fr.md` au vérificateur, avec un **chemin Windows** :
   `python ops/hooks/verifier_confidentialite.py <chemin Windows>` depuis
   `C:\Users\Jean PERRIER\Portfolio` ; il doit se taire. Ne cite aucun terme
   de ses listes.

Ne touche à aucun autre fichier du dépôt, ne commite rien.

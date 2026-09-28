# Contrat — Portfolio

Plafond 100 lignes, tenu par le hook. Le pourquoi est dans `SPEC.md`.

## Ce qui entre

- **La matière des projets** : les dépôts UserVoice et Audit contenu, lus
  sur le poste, jamais copiés. Seul ce qui est réécrit pour le site entre.
- **Les captures**, uniquement sur données synthétiques.
- **Plus tard** (`registre/0004`) : matière leadership fournie par Jean
  (Drive, Slack, JSON n8n), lue en lecture seule.

## Ce qui sort

- **Un site statique bilingue**, FR par défaut, EN en miroir : chaque page FR
  a sa jumelle EN, et la bascule mène de l'une à l'autre.
- **L'accueil** : accroche, acte I, acte II, « Ce que j'apporte », portes.
- **Une page par projet** : synthèse recruteur, puis « pour aller plus loin »
  replié.
- **Les pages secondaires** : Méthode IA, Erreurs payées, À propos.

## Ce qui ne sort jamais

Le hook (`ops/hooks/pre-commit`) refuse le commit sinon.

- **Le nom de l'employeur, ses produits et ses examens** hors de la page
  « À propos ».
- **Un chiffre interne en absolu** : volumes, NPS, taux, effectifs.
- **Un verbatim, un nom, un e-mail, un identifiant** de personne.
- **Un nom de table, de champ, une URL interne**, un schéma de base.
- **Un secret** : clé, jeton, mot de passe.
- **Un fichier de données** : csv, xlsx, jsonl, db.

La liste des termes interdits vit **hors du dépôt**, sur le poste
(`~/.portfolio/interdits.txt`, `~/.portfolio/employeur.txt`) : la publier
reviendrait à publier ce qu'elle protège.

## Les règles du site

- **Aucune requête vers un tiers** au chargement : polices, scripts et images
  sont servis par le site.
- **Aucun cookie, aucun traceur.** La mesure d'audience est reportée
  (`registre/0006`).
- **Lisible au téléphone** : un recruteur ouvre souvent le lien depuis
  LinkedIn.
- **Accessible** : contraste 4,5:1, vrais liens et boutons,
  `prefers-reduced-motion` respecté.

## Hors périmètre

- **Le blog**, les articles, la newsletter.
- **Un CMS** : le contenu est en Markdown, dans le dépôt.
- **Toute écriture** dans les dépôts UserVoice et Audit contenu.
- **Un formulaire de contact** : il collecterait des données personnelles.

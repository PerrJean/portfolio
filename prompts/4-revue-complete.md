# Brief — la revue complète du site, en contexte neuf (registre/0050)

Tu relis un portfolio que tu n'as pas écrit : un site statique Astro, en
français par défaut, avec son miroir anglais, publié sur
https://jeanperrier.pm. Il présente un Head of Product à des recruteurs, en
deux projets. Tu ne modifies **rien** : tu rends un rapport.

## Ce que tu lis

1. `CONTRAT.md` : ce qui entre, ce qui sort, ce qui ne sort jamais (les règles
   C1 à C8).
2. `C:\Users\Jean PERRIER\.claude\skills\ligne-editoriale\SKILL.md` : la ligne
   éditoriale (français et anglais).

Puis le site lui-même : construis-le (`npx astro build --outDir .dist-revue`)
et lis les huit pages construites (accueil, deux projets, à propos, en FR et en
EN), leurs images (`public/captures/`, `public/og/apercu.png`) et leur
`<head>`. Remonte aux sources (`src/`) seulement pour citer un fichier:ligne.

## Ce que tu vérifies

- **Le contrat** : chaque règle C1 à C8, page par page. L'employeur n'est
  nommé que dans « À propos ». Aucun chiffre interne en absolu. Aucune donnée
  de personne. Aucun nom interne visible (y compris **dans les captures** :
  regarde chaque image). Captures sur données synthétiques, et dites telles.
  Aucune requête vers un tiers. Chaque page FR a sa jumelle EN. Le constat
  formulé en levier. Les listes de termes interdits vivent hors du dépôt :
  ne les cherche pas, et ne cite aucun nom d'employeur dans ton rapport.
- **Les jumelles** : les faits, chiffres, dates et structure identiques en FR
  et en EN ; rien qui n'existe que d'un côté.
- **La ligne éditoriale** : tics d'écriture, jargon, oppositions fabriquées,
  redites entre la synthèse, le corps et « Pour aller plus loin », phrases de
  plus de 25 mots, cohérence des termes (« réponse », jamais « clé »).
- **L'accessibilité** : titres, textes alternatifs, légendes, contraste,
  focus, cibles, langue des pages, `prefers-reduced-motion`.
- **Le rendu** : si ta session a un navigateur, regarde les pages à 390, 1280
  et 1500 px (débordements, images, bâtiment, schéma) ; sinon, dis-le.
- **Les liens et le `<head>`** : titres, descriptions, canonical, hreflang,
  aperçu de partage, `noindex` (attendu : le site n'est pas encore lancé).

## Ce que tu rends

`redaction/revue-complete.md` : en tête, les **cinq points qui comptent le
plus avant le lancement**, une ligne chacun. Puis un tableau par thème :
**constat → gravité (bloquant, majeur, mineur) → preuve (fichier:ligne ou
page et extrait) → correction proposée**. Sépare ce que tu as vérifié de ce
que tu n'as pas pu vérifier. Supprime `.dist-revue`. Ne commite rien.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

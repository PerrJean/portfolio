# Brief — « Mon métier » dans le menu (registre/0101)

Jean veut la page « Mon métier en clair » (`/mon-metier/`, `/en/my-job/`)
dans le menu du site, entre Projets et À propos. Deux fichiers à lire :
`src/components/EnTete.astro` (le menu) et `src/i18n/textes.ts` (ses
libellés).

## Ce que tu fais

- Le menu devient `Projets · Mon métier · À propos` ; en anglais
  `Projects · My job · About`. Libellé dans `textes.ts`, adresse par la clé
  de route `monMetier` (déjà dans `src/i18n/routes.ts`), jamais en dur.
- La page active est marquée comme pour les autres entrées (même attribut,
  même style) quand on est sur `/mon-metier/` ou `/en/my-job/`.
- Le menu replié du téléphone porte la même entrée, au même rang.
- Rien d'autre ne change : la ligne-lien des accueils reste, l'ordre et le
  style des autres entrées aussi.

## Vérifier

`npm run build` vert ; `npm test` vert (si un test existant fige le menu à
deux entrées, adapte-le à trois et dis-le) ; l'en-tête regardé à 1280, 500
et 375 px, fermé et ouvert sur téléphone, en FR et en EN (Chromium est
installé, sers-toi de l'outillage de test existant pour les captures) :
rien ne passe à la ligne ni ne déborde à 1280 px, et le menu replié
s'ouvre.

N'écris pas de nouveaux tests : un autre agent les écrira. Ne touche ni à
`public/usecase/`, ni aux registres. **Ne commite pas.** Rapport de 200 mots
au plus : fichiers touchés, mesures, chemins des captures. Environnement :
Windows, Git Bash.

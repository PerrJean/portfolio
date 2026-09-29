# Brief — chantier 2a : les tests, écrits avant le code (registre/0021)

Tu écris les tests du site **avant** que le code existe. Ce n'est pas toi qui
écriras le code : un autre sous-agent le fera, et tes tests seront son
critère de « fini ». Ils doivent donc être précis, lisibles, et dire en
clair ce qu'ils attendent quand ils échouent.

## Le site visé

Un site statique **Astro** (`npm run build` produit `dist/`), bilingue :
français à la racine, anglais sous `/en/`. Les pages et leurs jumelles,
qui font foi :

| FR | EN |
|---|---|
| `/` | `/en/` |
| `/projets/uservoice/` | `/en/projects/uservoice/` |
| `/projets/audit-contenu/` | `/en/projects/content-audit/` |
| `/a-propos/` | `/en/about/` |

Chaque page est un `index.html` dans son dossier (barre oblique finale).
Tout ce qui est sous `dist/labo/` est une page d'essai : **ignore-la** dans
tous les tests.

Les couleurs sont des variables CSS déclarées dans `src/styles/jetons.css` :
`--ivoire`, `--encre`, `--ambre`, `--orange`, `--ardoise`,
`--texte-sur-orange`.

## Les tests à écrire

Avec le **lanceur intégré de Node** (`node:test`, `node:assert`), **aucune
dépendance nouvelle**, en JavaScript (`.mjs`), dans `tests/`. Ils lisent le
site construit dans le dossier donné par la variable `DIST` (défaut :
`dist`). Parse le HTML avec des expressions simples et robustes, sans
bibliothèque.

1. **Jumelles (C7).** Les huit pages du tableau existent. Chaque page porte
   `<html lang="fr">` ou `lang="en"` selon sa langue. Sur chaque page, le
   lien de bascule de langue (un `<a>` portant `hreflang`) mène à sa jumelle
   exacte, et `<link rel="alternate" hreflang="…">` déclare les deux
   versions.
2. **Aucune ressource tierce (C6).** Dans tout le HTML et tout le CSS de
   `dist/` : aucun `src`, aucun `<link href>`, aucun `url(…)`, aucun
   `@import` qui pointe vers un autre domaine. Seuls les liens `<a href>`
   sortants sont permis, et le seul attendu est
   `https://www.linkedin.com/in/jean-perrier-b01b3281/`. Aucun `document.cookie`
   ni `Set-Cookie` dans les scripts.
3. **Aucun terme interdit (C1–C4).** Appelle
   `python ops/hooks/verifier_confidentialite.py` sur tous les fichiers de
   `dist/` (sauf `labo/`) et attends un code de sortie 0. Ce script gère déjà
   l'exception des pages « à propos » ; ne recopie jamais les termes.
4. **Animations sobres.** Tout CSS de `dist/` (fichiers et balises `<style>`
   du HTML) qui déclare un `@keyframes` contient aussi une règle
   `@media (prefers-reduced-motion: reduce)`.
5. **Liens internes.** Tout `<a href>` qui commence par `/` mène à un fichier
   existant de `dist/` (dossier avec `index.html`, ou fichier).
6. **Contrastes.** Lis les valeurs hex de `src/styles/jetons.css` et vérifie
   par la formule WCAG de luminance relative : `--encre` sur `--ivoire`,
   `--orange` sur `--ivoire`, `--texte-sur-orange` sur `--orange`,
   `--ardoise` sur `--ivoire` à 3:1 (grand texte seulement), chaque paire à
   4,5:1 sauf la dernière.
7. **Accessibilité de base.** Chaque page a exactement un `<h1>`, un lien
   d'évitement vers le contenu (`href="#contenu"`) et un élément
   `id="contenu"`, et chaque `<img>` a un attribut `alt`.

**Les tests sont rouges tant que le code n'existe pas.** Pour qu'ils ne
bloquent pas les commits en attendant, marque chaque test avec l'option
`todo` de `node:test`, accompagnée du chantier qui le fera passer au vert :
`{ todo: '2b' }` pour 1, 2, 5, 6, 7 ; `{ todo: '2c' }` pour 4 ; `{ todo:
'2b' }` pour 3. Un chantier retire le `todo` des tests qu'il fait passer.

Ajoute au `package.json` **uniquement** le script `"test": "node --test
tests/"`. Ne touche à rien d'autre du projet.

## La preuve attendue

Construis dans ton propre dossier pour ne pas gêner l'autre chantier en
cours : `npx astro build --outDir .dist-2a`, puis `DIST=.dist-2a npm test`.
Rends la commande exacte et sa sortie (les tests seront en `todo` : c'est
l'attendu). Supprime `.dist-2a` à la fin. Ne commite rien, ne publie rien.

Environnement : Windows, Git Bash ; Node s'ajoute au PATH par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

# Guide — hébergement et référencement

Pour mettre le portfolio en ligne sur GitHub Pages, sous un domaine à soi,
et le rendre trouvable. Les étapes marquées **Jean** se font à la main (compte,
achat, paiement) ; les étapes **session** sont faites dans le dépôt.

## 1. Le compte et le dépôt

1. **Jean** — Créer un compte GitHub **personnel**, distinct du compte de
   travail : son nom d'utilisateur apparaîtra dans l'adresse provisoire.
2. **Jean** — GitHub › Settings › Emails : cocher « Keep my email addresses
   private » et « Block command line pushes that expose my email ». Copier
   l'adresse `…@users.noreply.github.com` affichée.
3. **Session** — Réécrire l'historique local avec cette adresse, et retirer
   de l'historique ce qui ne doit pas être public (vérifié par le hook).
4. **Jean** — Créer un dépôt **public**, vide (sans README, sans licence),
   nommé **`<compte>.github.io`**. Avec ce nom exact, le site est servi à la
   racine (`https://<compte>.github.io/`) : pas de préfixe à gérer dans les
   liens. Avec un autre nom, il faudrait un `base` dans la configuration,
   puis le retirer au passage au domaine.
5. **Jean** — Envoyer le dépôt :

   ```bash
   git remote add origin https://github.com/<compte>/<compte>.github.io.git
   ```

   ```bash
   git push -u origin main
   ```

   GitHub demande de se connecter dans le navigateur au premier envoi.

## 2. La publication automatique

1. **Session** — Ajouter `.github/workflows/deploy.yml`, le flux officiel
   d'Astro : à chaque envoi sur `main`, `withastro/action` construit le site
   et `actions/deploy-pages` le publie. Droits : `contents: read`,
   `pages: write`, `id-token: write`.
2. **Jean** — Dépôt › Settings › Pages › Source : **GitHub Actions**.
3. Chaque envoi sur `main` publie en une à deux minutes ; l'onglet
   **Actions** montre le résultat, en vert ou en rouge.

Le hook de pre-commit reste le premier garde-fou : les tests tournent avant
chaque commit, donc avant chaque publication.

## 3. Le domaine

1. **Jean** — Vérifier la disponibilité et acheter le domaine chez un
   registraire (OVHcloud, Gandi : français, gèrent `.fr` et `.pm`). Pour un
   particulier, les annuaires du `.fr` et du `.pm` masquent les coordonnées
   par défaut. Compter de l'ordre de 10 à 20 € par an ; activer le
   renouvellement automatique, un domaine expiré se rachète mal.
2. **Jean** — GitHub › Settings (du compte) › Pages › **Add a verified
   domain** : GitHub donne un enregistrement `TXT` à ajouter chez le
   registraire. Il empêche un tiers de rattacher le domaine à son propre
   site si le dépôt venait à disparaître.
3. **Jean** — Dans la zone DNS du registraire, pour le domaine nu
   (`jeanperrier.pm`) :

   | Type | Nom | Valeur |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | AAAA | @ | 2606:50c0:8000::153 |
   | AAAA | @ | 2606:50c0:8001::153 |
   | AAAA | @ | 2606:50c0:8002::153 |
   | AAAA | @ | 2606:50c0:8003::153 |
   | CNAME | www | `<compte>.github.io.` |

   Pour un sous-domaine seul (`product.jeanperrier.fr`) : un unique `CNAME`
   `product` vers `<compte>.github.io.`.
4. **Session** — Mettre `site: 'https://<domaine>'` dans
   `astro.config.mjs` et un fichier `public/CNAME` qui contient le domaine
   seul.
5. **Jean** — Dépôt › Settings › Pages › Custom domain : saisir le domaine,
   attendre la vérification DNS (de quelques minutes à 24 h), puis cocher
   **Enforce HTTPS**.

## 4. Le référencement

**Ce que le site porte, construit à l'étape 2 :**

- Un `<title>` et une `<meta name="description">` propres à chaque page, en
  français et en anglais : c'est ce que montrent Google et LinkedIn.
- `<html lang>`, et sur chaque page les liens `hreflang` vers sa jumelle et
  un `x-default` vers la version française.
- Une adresse canonique par page (`<link rel="canonical">`), toujours avec
  la barre oblique finale.
- Un plan du site (`sitemap-index.xml`, extension `@astrojs/sitemap`) et un
  `robots.txt` qui le signale ; `/labo/` exclu et marqué `noindex`.
- Les balises Open Graph (`og:title`, `og:description`, `og:image` en
  1200 × 630, `og:locale`) : l'aperçu LinkedIn, validé en `0015`.
- Des données structurées `schema.org/Person` (nom, métier, lien LinkedIn
  en `sameAs`) : elles aident Google à relier le site à la personne.
- Du texte réel dans le HTML, un seul `h1` par page, des titres dans
  l'ordre, des pages légères : les moteurs lisent comme un lecteur d'écran.

**Ce qui se fait à la main, après la mise en ligne :**

1. **Jean** — **Google Search Console** : ajouter le domaine, le vérifier
   par un `TXT` chez le registraire, soumettre le plan du site. Faire de
   même sur **Bing Webmaster Tools** (qui peut importer depuis Google).
2. **Jean** — **LinkedIn Post Inspector**
   (`linkedin.com/post-inspector`) : coller l'adresse pour vérifier l'aperçu
   et forcer LinkedIn à le rafraîchir après une modification.
3. **Jean** — Faire pointer vers le site ce qui existe déjà : la section
   « Sélection » et le lien de contact du profil LinkedIn, le CV, la page de
   profil GitHub. Pour un portfolio, ce sont ces liens qui comptent, plus
   que le classement dans Google.

**Ce qu'on ne change plus ensuite :** les adresses. Une adresse partagée
doit répondre pour toujours ; si l'une change, l'ancienne redirige.

## 5. Avant chaque mise en ligne

- `npm run build` puis `npm test` passent, et le hook aussi.
- Les faits datés sont toujours vrais (les corrections d'Audit contenu sont
  bien en production, `registre/0016`).
- L'aperçu LinkedIn est vérifié dans le Post Inspector.

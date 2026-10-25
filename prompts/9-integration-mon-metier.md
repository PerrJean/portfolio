# Brief — tri anglais, puis intégration de « Mon métier en clair » (0094)

Les deux textes sont validés par Jean, sauf le tri anglais ci-dessous, qu'il
a validé en entier et que tu appliques d'abord. Deux fichiers à lire :
`redaction/mon-metier.fr.md` et `redaction/mon-metier.en.md`. La page se
construit **sur le modèle de `src/pages/a-propos.astro`** (et
`src/pages/en/about.astro`), que tu copies plutôt que tu ne l'étudies.

## 1. Le tri anglais, dans `redaction/mon-metier.en.md`, mot pour mot

- Titre et `titre:` : « My job in plain English » ; `description:` : « in
  plain words » → « in plain English » ; ligne-lien (commentaire de tête) :
  « My job and my strengths, in plain English (2 min) ».
- l.15 : « I am Head of Product » → « I’m Head of Product » ; « the designers
  draw the screens » → « the designers design the screens » ; « like the
  producer, the leadership team has the final say on the big decisions » →
  « as with a film producer, the leadership team has the final say on major
  decisions ».
- l.19 : « I meet each of them one-to-one every week » → « I have a
  one-on-one with each of them every week » ; « so that we agree on what
  “becoming senior” means » → « so that we would mean the same thing by
  “becoming senior” ».
- l.21 : « I then presented two candidates to the CEO and to my manager, the
  Chief Product Officer (CPO), and explained which one I preferred and
  why. »
- l.23 : « I give them whole projects to run. I also teach them to speak up
  for learners when working with the developers: start from what learners
  say they need, and keep coming back to it. On their discovery projects, I
  decide with them what is worth producing, and we approve it together. »
- l.27 : « I adjust how we work, meetings included » → « I adjust the way we
  work, including how we run meetings ».
- l.29 : « I take every request to the developers, and we weigh the cost of
  each change against its benefits. »
- l.31 : « With the learning designers, who create the teaching content, I
  start with what they need, and we build the tools they are missing
  together. One of them, the content audit, checks every exercise
  question. »
- l.35 : « With the CEO, I prepare the product committee meeting, where the
  leadership team approves major decisions, and the presentation for it. »
- l.39 : « …in a workshop, so the dashboard would be built around the
  decisions they have to make. It went live in June, and clients use it:
  more than half of the organisations that opened it in September came back
  in October. »
- l.41 : « an AI plays the other person in the conversation » → « an AI
  takes the part of the person the learner is talking to » ; « the Product
  Manager and the Product Designer » → « the Product Manager and a Product
  Designer ».
- l.43 : « **Using AI to improve content quality.** In the [content
  audit](/en/projects/content-audit/), a learning designer and I started
  with one course and had an AI check every exercise question in it. One
  question in 20 made learners fail through no fault of their own. All of
  them are now fixed. »

## 2. L'intégration

- **Routes** : clé `monMetier` dans `src/i18n/routes.ts`, `/mon-metier/` et
  `/en/my-job/`. Suis tout ce qui dérive de la table (bascule FR | EN,
  hreflang, plan du site, tests de jumelles) : rien ne doit rester orphelin.
- **Pages** : `src/pages/mon-metier.astro` et `src/pages/en/my-job.astro`,
  gabarit d'« À propos » (soleil, colonne de texte, enveloppe
  `<Infobulles>`), sans portrait. Le texte des deux brouillons, ni plus ni
  moins : titre, `description`, quatre sections `h2`, attaques en gras des
  points forts, liens. Pas d'entrée de menu.
- **Ligne-lien** : sur `src/pages/index.astro` et `src/pages/en/index.astro`,
  un paragraphe juste après `accroche__sous-titre`, à sa taille, avec la
  ligne retenue de chaque brouillon, entièrement cliquable vers la page. Pas
  un bloc, pas un bouton : un lien de texte dans le style des liens du site.
- **Infobulles** : l'enveloppe fait son travail sur les termes du lexique ;
  ne touche pas au lexique. Lis `.claude/rules/infobulles.md` si tu touches
  au composant.
- **Vérifier** : `npm run build` vert ; `npm test` vert ; les deux pages et
  les deux accueils regardés à 1280 et 500 px (Chromium est installé, sers-
  toi de l'outillage de test existant pour les captures), rien qui déborde ;
  sur téléphone, dis de combien la ligne-lien repousse le premier projet.

N'écris pas de tests : un autre agent les écrira. Ne touche ni à
`public/usecase/`, ni aux registres. **Ne commite pas.** Rapport de 250
mots au plus : fichiers touchés, ce qui dérive des routes, les mesures, et
les captures enregistrées dans le scratchpad (chemins). Environnement :
Windows, Git Bash.

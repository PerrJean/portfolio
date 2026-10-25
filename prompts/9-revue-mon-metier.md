# Brief — revue en contexte neuf de « Mon métier en clair » (0094)

Une page vient d'être ajoutée au portfolio, `/mon-metier/` et
`/en/my-job/`, avec une ligne-lien sous le sous-titre des deux accueils et
une définition FR de « discovery » dans le lexique des infobulles. Tu n'as
rien écrit de ce chantier : tu le relis, **en lecture seule**, avant sa mise
en ligne. Deux fichiers à lire d'abord : `registre/0094-mon-metier-en-clair.md`
(ce qui était voulu) et la sortie de `git status` + `git diff` limitée aux
fichiers du chantier : `src/pages/mon-metier.astro`,
`src/pages/en/my-job.astro`, `src/pages/index.astro`,
`src/pages/en/index.astro`, `src/styles/base.css`, `src/i18n/routes.ts`,
`src/components/infobulles/lexique.ts`, `redaction/lexique.md`,
`tests/outils.mjs`, `tests/infobulles.test.mjs`, `tests/mon-metier.test.mjs`.
Le reste de l'arbre appartient à une autre session : ignore-le.

## Ce que tu cherches, du plus grave au moins grave

1. **Les règles du site** (CLAUDE.md, C1 à C8) : nom de l'employeur, chiffre
   absolu, nom de personne ou interne, jumelle EN manquante ou divergente.
2. **Ce qui casse** : un lien mort, une page qui ne se construit pas, une
   régression sur les autres pages (le CSS de `base.css` est partagé : la
   classe ajoutée à la fiche change-t-elle « À propos » ?), une bulle mal
   placée.
3. **L'accessibilité** : titres dans l'ordre, lien de l'accueil lisible au
   clavier et au lecteur d'écran, contraste, focus visible, langue de la
   page.
4. **L'écart avec la spec** : ce que la page fait de plus ou de moins.
5. **Les tests** : couvrent-ils ce qui compte, cassent-ils vraiment ?

Lance `npm run build` et `npm test`. Regarde les pages construites (dans
`dist/`), pas seulement la source. N'écris aucun fichier hors du scratchpad.

## Ce que tu rends

Dans ton message final : un verdict en une ligne (on peut publier, ou non),
puis les constats classés **grave / à corriger / mineur**, chacun avec
`fichier:ligne`, le défaut et la correction proposée. 200 mots au plus.
Ne commite rien. Environnement : Windows, Git Bash.

# Brief — revue en contexte neuf de l'entrée « Mon métier » du menu (registre/0101)

« Mon métier » / « My job » vient d'entrer dans le menu, entre Projets et
À propos. Tu n'as rien écrit de ce chantier : tu le relis, **en lecture
seule**, avant sa mise en ligne. Deux fichiers à lire d'abord :
`registre/0101-menu-mon-metier.md` (ce qui était voulu) et `git diff` +
`git status` limités au chantier : `src/components/EnTete.astro`,
`src/i18n/textes.ts`, `tests/menu.test.mjs`,
`tests/menu-navigateur.test.mjs`. Le reste de l'arbre appartient à une
autre session : ignore-le.

Ce que tu cherches, du plus grave au moins grave : une règle du site
enfreinte (C1 à C8 de CLAUDE.md, jumelle EN) ; ce qui casse (lien, page
active fausse, menu replié qui ne s'ouvre plus, débordement à 1280 ou
375 px, régression d'une autre page) ; l'accessibilité (ordre, focus,
`aria-current`, lecture au clavier du menu replié) ; l'écart avec la spec ;
des tests qui ne protègent pas ce qui compte ou ne cassent jamais.

Lance `npm run build` et `npm test`. Regarde les pages construites, pas
seulement la source. N'écris aucun fichier dans le dépôt.

Dans ton message final : un verdict en une ligne (publiable ou non), puis
les constats classés **grave / à corriger / mineur**, avec `fichier:ligne`,
le défaut et la correction proposée. 150 mots au plus. Ne commite rien.
Environnement : Windows, Git Bash.

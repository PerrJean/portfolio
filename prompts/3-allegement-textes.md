# Brief — appliquer le relevé des lourdeurs (registre/0046)

Jean a validé **les 30 propositions** de `redaction/releve-lourdeurs.md`
(le seul fichier à lire, avec les sources qu'il cite). Applique-les telles
qu'écrites, aux fichier:ligne indiqués (les numéros de ligne ont pu bouger :
retrouve l'extrait). Points précis :

- n°17 est exacte : « Sans suivi de version dès le premier fichier, deux
  semaines de travail sont restées hors historique. » entre telle quelle.
- n°18 et n°30 : le relevé écrit « […] » à la place du nom de l'employeur ;
  **garde le nom en place** dans `a-propos.astro` et `en/about.astro`, ne
  l'écris nulle part ailleurs.
- « porte sur le contenu » devient « concerne le contenu » aux 6 endroits
  listés ; l'anglais garde « is about ».
- Garde les espaces insécables en place (avant « : », « ; », « ? »).
- Ne touche pas à la phrase signature ni à la date sous le titre (registre
  0045, déjà fait).
- Reporte les mêmes changements dans `redaction/uservoice.fr.md`,
  `redaction/audit-contenu.fr.md` et `redaction/a-propos.fr.md` (la partie
  au-dessus du filet), qui restent la référence du texte.
- Les H2 ne changent pas (le bâtiment en fait ses étages).

Ne touche ni aux tests, ni à `src/components/`, ni à `public/captures/`
(un autre chantier), ni à `src/i18n/publication.ts`.

## La preuve attendue

`npx astro build --force --outDir .dist-0046` puis `DIST=.dist-0046 npm test`
(`fail 0`) ; `grep -c "porte sur le contenu"` à 0 dans les pages construites ;
pour chaque numéro du relevé, « appliqué » ou la raison de l'écart. Supprime
`.dist-0046`. Ne commite rien, n'ouvre aucun navigateur.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

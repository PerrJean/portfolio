# Brief — le schéma de l'échange, projet « mises en situation orales » (registre/0066)

Le portfolio de Jean prépare un cinquième projet, des mises en situation
orales avec l'IA (brouillon : `redaction/mises-en-situation.fr.md`, au-dessus
du filet). Jean veut une **illustration** : le **schéma d'un échange**. Tu le
dessines, fixe, dans le style du schéma publié sur la page Audit contenu. Deux
fichiers à lire d'abord : `src/components/schemas/chaine-audit.css` (le style)
et `src/components/schemas/chaine-audit.mjs` (sa construction, FR et EN).

## Le contenu, exact (libellés validés)

Trois blocs de gauche à droite, deux flèches ; **en colonne au téléphone**.
L'exemple est fictif ; la conversation reste en anglais dans les deux langues.

1. **« L'entrée » / "Getting started"**
   - « L'IA joue : la réceptionniste de l'hôtel » / "The AI plays: the hotel receptionist"
   - « Votre rôle : un client de l'hôtel » / "Your role: a hotel guest"
   - « Votre mission : signaler un problème dans votre chambre » / "Your mission: report a problem in your room"
   - « Durée : environ 2 min » / "About 2 min"
2. **« La conversation » / "The conversation"**
   - bulle de l'IA : "Good evening, front desk. How can I help you?"
   - bulle de l'apprenant, avec une petite icône de micro (réponse orale transcrite) : "Hello, the thing that is supposed to make the room warm is not doing what it should do since this morning."
   - mention discrète : « Les attendus de chaque question restent cachés » / "Each question's expected points stay hidden"
3. **« Le retour en trois temps » / "Three-step feedback"**, trois vignettes numérotées :
   1. « Signal » / "Signal" : « Vous avez signalé le problème et dit depuis quand : la réceptionniste sait ce qu'il vous faut. » / "You reported the problem and said since when: the receptionist knows what you need."
   2. « Indice » / "Hint" : « Le message passe, mais il demande un effort. Nommez directement l'objet et ce qui ne va pas. » / "Your message gets across, but it takes effort. Name the object and what's wrong directly."
   3. « Modèle » / "Model" : « “Hello, the heater hasn't been working since this morning.” On nomme l'objet et le problème. » / "“Hello, the heater hasn't been working since this morning.” Name the object and the problem."
   - badge : « Critère travaillé : vocabulaire » / "Focus: vocabulary"

Légende, FR : « Un échange, sur un exemple fictif : l'IA joue la
réceptionniste, et le retour ne travaille qu'un critère, celui qui gêne le
plus la compréhension. » EN : "One exchange, on a fictional example: the AI
plays the receptionist, and the feedback works on a single criterion, the one
that most hinders understanding."

## Les règles

Au trait : fond ivoire, cadres encre à angles droits, flèches ardoise ; l'ambre
comme seule lumière (un aplat ou un point sur le « Modèle », la réponse qui
aide), jamais du texte en ambre ; bulles de dialogue carrées ou très peu
arrondies, au trait ; Atkinson Hyperlegible Next, 15 px au moins à la largeur
de la colonne (736 à 851 px). Aucun nom de marque, de produit ni de personne.

## Ce que tu rends

Un **composant de schéma du site**, sur le modèle exact de la chaîne d'Audit
contenu : `src/components/schemas/echange-oral.mjs` (textes FR / EN et HTML)
et `echange-oral.css`, enregistrés dans le plugin
`src/components/schemas/rehype-schemas.mjs` sous le nom `echange-oral`, avec
son texte accessible (liste ordonnée masquée) et sa légende. **Ne l'insère
dans aucune page** (le projet n'est pas encore dans le site) : montre-le dans
la page de labo `src/labo/scene.astro` si c'est simple, sinon dans une page
HTML de démonstration hors du dépôt. Capture-le à 1280 et à 390 px (Edge ou
Chrome sans interface, profil jetable, chemins Windows) dans le dossier
temporaire de la session, regarde les captures. Build (`npx astro build
--outDir .dist-echange`) et tests (`DIST=.dist-echange npm test`, `fail 0`),
puis supprime `.dist-echange`. Ne touche pas aux tests ni à `redaction/`, ne
commite rien.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

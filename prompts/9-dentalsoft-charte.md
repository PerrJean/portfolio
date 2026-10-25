# Brief — la présentation DentalSoft : charte du site, sans ses notes (registre/0093)

Un seul fichier à modifier : `public/usecase/dentalsoft/index.html` (une
présentation 16:9, scène de 1600 × 900 mise à l'échelle, une vingtaine de
vues dans `T.vues`, dont quatre en « Réserve » : la constante `RESERVE`).
Lis d'abord `registre/0093-dentalsoft-charte.md` (la spec, sept points),
puis `src/styles/jetons.css` (le sens de chaque couleur).

## Avant toute modification : les captures « avant »

Sers la page (`python -m http.server 8790 --directory public`, en
arrière-plan) et capture chaque vue en 1600 × 900, en mode clair, sous
`.canevas/0093/avant/<n>-<id>.png`. Edge sans fenêtre le fait :
`"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new --disable-gpu --hide-scrollbars --window-size=1600,900 --virtual-time-budget=6000 --screenshot=<fichier> "http://localhost:8790/usecase/dentalsoft/#<id>"`.
Vérifie sur deux captures que la vue demandée s'affiche bien et que les
animations sont finies. `.canevas/` est ignoré par git.

## Les modifications, dans cet ordre

0. **Notes présentateur : tout sort.** L'`<aside id="notes">`, ses styles
   `.notes…`, `majNotes`, les deux `notes()`, le raccourci Maj+N,
   `notesGabarit`, `notesData`, `T.notes` et tout texte qui ne sert
   qu'aux notes (« À dire », « Faits utilisés et sources », « Limites »,
   « Méthode », « Transition », « Objectif de l'écran »…). Une phrase
   visible qui renvoie aux notes (« Sources dans les notes. ») perd ce
   renvoi. **Ne touche pas** à « Choix de méthode » ni aux notes de bas de
   vue (`.note`, `notesBas`, `notePratiques`) : ce ne sont pas les notes
   présentateur. Preuve : le grep de chaque titre retiré rend 0, et la
   console reste sans erreur sur chaque vue.
1. **Une couleur, un sens.** L'ambre seul met en avant (étape en cours,
   case qui bifurque, pastille choisie) ; l'orange ne reste que sur ce qui
   se clique (Suivant, Approfondir, liens). Mêmes règles en mode sombre.
   Hors maquettes (sections « Démonstration » et « Atlas métier »).
2. **L'ardoise en grand texte seulement** : sous 24 px, le texte en
   `var(--ardoise)` passe à `var(--encre)` ; garde la hiérarchie par la
   graisse ou la taille. Hors maquettes.
3. **Tailles : mesure d'abord.** Pour chaque règle CSS sous 16 px (hors
   sources, qui peuvent rester à 12-13 px), essaie 16 px et mesure sur
   **toutes** les vues où elle s'applique : un texte qui déborde de sa
   boîte (`scrollWidth > clientWidth` ou `scrollHeight > clientHeight`),
   sort de la scène, ou chevauche un voisin. Ne garde le changement que si
   rien ne casse. Rends un tableau : règle, taille avant, appliquée ou
   non, et la vue qui casse.
4. **Diapositives chargées : propositions seulement**, pour les vues du
   parcours (pas la Réserve) qui empilent plus de trois couches —
   `eco-postures`, `opp-conquerir`, `opp-etendre` au moins. Écris
   `.canevas/0093/propositions.md` : pour chacune, ce qui charge et une ou
   deux options (couches qui apparaissent une à une, coupe en deux…).
   Ne les applique pas.
5. **La frise réduite** quand elle n'est qu'un repère (grisée) : une
   ligne fine avec ses étapes, au lieu du bandeau. La frise pleine reste
   quand elle est le sujet de la vue.
6. **Pastilles au trait** : les pastilles noires pleines (noms de
   logiciels, groupes) passent en contour encre sur fond clair. Aucun
   dessin ajouté à la première vue.

## Les captures « après », et la preuve

- Recapture toutes les vues sous `.canevas/0093/apres/`, mêmes noms, et
  les vues touchées par 1 et 5 en mode sombre sous `apres-sombre/`.
- Fais `.canevas/0093/avant-apres.html` : pour chaque vue modifiée, les
  deux images côte à côte, avec une ligne qui dit ce qui a changé. Chemins
  relatifs, aucune ressource extérieure.
- `npx astro build --outDir .dist-93` puis `DIST=.dist-93 npm test` :
  vert. Supprime `.dist-93`. Arrête le serveur.

Ne modifie rien d'autre que ce fichier (hors `.canevas/`). Pas de
`git stash`, ne commite rien. Rapport de 250 mots au plus : ce qui est
appliqué, le tableau du point 3 en résumé, ce qui a été laissé et
pourquoi. Environnement : Windows, Git Bash.

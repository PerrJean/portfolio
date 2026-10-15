# 0089 — Du relief sur l'accueil, sans effet

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `structure` | 350 | 656 | `claude-opus-5-5` |

**Question de Jean (2026-10-15)** : le site lui plaît pour son côté simple et
harmonieux, mais manque peut-être de relief et de profondeur ; une couche de
CSS vaut-elle le coup ?

**Constat** : tout est posé sur un seul plan (même fond, même grille, six
cartes identiques) ; seule la taille du texte fait la hiérarchie, et le fil
UserVoice → NPS → Audit ne tient qu'à deux petites phrases. **Écartés** :
ombres portées, dégradés, effet de verre, parallaxe, coins très arrondis —
ils casseraient le trait des pictogrammes et ramèneraient au portfolio
générique (SPEC, « Ce qu'on a écarté »). Le relief vient de **plusieurs
plans**, pas d'effets.

**Go visuel de Jean (2026-10-15)** sur une maquette de l'accueil (copie de
`dist/`, une feuille par-dessus, un panneau pour activer chaque proposition),
les cinq propositions retenues :

1. **La bande du récit** : 03, 04 et 05 (UserVoice, NPS, Audit) sur un fond
   sable `#F7F0E2`, pleine largeur d'écran. La Matrice en sort et redevient
   le projet à part, sous la bande, à la mise en page à part (texte à gauche,
   scène à droite) — retour sur la remontée de 0084. La colonne vide à droite
   de l'Audit, dans la bande, est acceptée telle quelle.
2. **Le pied de page sombre**, sur tout le site : fond encre, texte ivoire
   souligné pour les liens, filet ambre de 4 px au-dessus (l'horizon qui
   répond au soleil), 3 rem de marge intérieure.
3. **Le sol des dessins** : la bande sous la ligne de sol des scènes des
   cartes et de l'équipe de l'accroche, teintée `#EFE5D2` sur l'ivoire,
   `#E6D9C1` dans la bande.
4. **La surface au survol** des cartes : fond `#F7F0E2` et filet `--dalle`
   de 1 px, coins de 6 px, sans ombre ; ivoire dans la bande. Même effet au
   focus clavier.
5. **Les numéros en ardoise** (`--ardoise`, grand texte : 4,28:1 sur le
   sable, 4,66:1 sur l'ivoire). L'option « contour » est écartée par Jean.

Contrastes mesurés : orange sur sable 4,55:1 (seuil 4,5 tenu de justesse,
d'où ce sable-là et pas un plus soutenu) ; ivoire sur encre 15,4:1.

**Revue en contexte neuf (2026-10-15)** : rien de bloquant ; débordement
mesuré nul à 375, 760, 960 et 1440 px. **Arbitrages de Jean** sur ce qu'elle
remonte : le sol sous l'équipe de l'accroche, absent de la maquette (son
sélecteur ne visait rien), est **gardé** ; dans le pied, la langue courante
garde son trait et **l'autre langue n'est soulignée qu'au survol**, comme
dans l'en-tête ; **fond encre sur `html`** pour que le rebond d'iOS ne montre
pas d'ivoire sous le pied. Corrigés en plus : l'en-tête périmé de
`Parcelles.astro` (la paire devenue trio), le commentaire de `--ivoire`
(l'inversion dans la bande), le filet du projet à part posé sur le bloc et
non sur la carte ; côté tests, la cascade évaluée à une largeur donnée, le
décalage du contour de focus tenu, le couplage aux sélecteurs dit en tête.

Étapes : 1. intégration (brief `prompts/8-relief-integration.md`) ;
2. tests par un autre agent ; 3. revue en contexte neuf ; 4. captures
ordinateur et téléphone, FR et EN, avant mise en ligne.

**Clôture (2026-10-15)** : intégré (`201bc29`), testé (`5092dec`), corrigé
après revue (`013ab51`). Tests : 141 → 175, dont `tests/relief.test.mjs` et
un lecteur du CSS construit (`tests/css.mjs`) qui juge chaque règle sur le
DOM réel, `@media` évaluées à 375 et 1440 px ; vu casser sur la Matrice
remise dans le trio, le fond du pied retiré, le soulignement remis sur
l'autre langue et la bande passée sous `min-width: 960px`. Vérifié dans le
navigateur par la session : aucun défilement horizontal à 375, 640 et
1440 px, la bande enveloppe les trois cartes empilées au téléphone. Écarts à
la maquette, voulus : 4 rem au-dessus de la bande (la valeur de la maquette
ne s'appliquait pas), la Matrice 20 px plus bas (sa surface au survol garde
sa marge du haut), le contour de focus dans la surface (il serait coupé au
bord de l'écran au téléphone). Laissés, en le sachant : le rebond d'iOS en
**haut** de page montre maintenant de l'encre au-dessus de l'en-tête ; la
place réservée à la barre de défilement, visionneuse ouverte, devient encre ;
la surface d'une carte du trio déborde de 4 px dans la colonne de la flèche,
sans rien masquer. **Coût réel** : 656 k (intégration et corrections 188,
tests et leur reprise 285, revue 183), ratio 1,9 : comme pour 0088, les tests
et la revue pèsent plus que le code.

# 0089 — Du relief sur l'accueil, sans effet

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `structure` | 350 | | `claude-opus-5-5` |

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

Étapes : 1. intégration (brief `prompts/8-relief-integration.md`) ;
2. tests par un autre agent ; 3. revue en contexte neuf ; 4. captures
ordinateur et téléphone, FR et EN, avant mise en ligne.

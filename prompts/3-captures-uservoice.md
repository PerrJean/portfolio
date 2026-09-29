# Brief — deux captures de UserVoice sur données synthétiques (registre/0043)

Le portfolio de Jean montre son projet UserVoice à des recruteurs. Il veut
deux captures d'écran de l'outil : **le bilan du lundi** et **le tableau de
bord NPS**. Elles doivent être produites par **le vrai code** de UserVoice
(`C:\Users\Jean PERRIER\UserVoice`, en lecture seule), tournant sur une
**base synthétique inventée de toutes pièces**. Cette phase produit les images
et leurs légendes ; elle ne touche à aucune page du site.

## Les interdits, avant tout

- **Ne lis jamais** les données réelles de UserVoice : ni `data/`, ni une base,
  ni un export, ni un `.env` ou un fichier de secrets dans `config/`. Tu lis
  le **code** (`vues/`, `app/`, `ops/`, le `README.md`) pour savoir comment
  les pages se construisent et quel schéma de base elles attendent.
- **Ne modifie rien** dans le dépôt UserVoice. S'il faut une modification pour
  pointer le code vers ta base, arrête-toi et dis-le.
- **Tout ton travail vit dans `~/.portfolio/captures/`** (hors des deux
  dépôts) : le générateur, la base synthétique, les pages rendues. Ils portent
  le schéma interne de UserVoice, ils n'entrent jamais dans le portfolio.
- **Données inventées** : volumes et tendances plausibles mais faux, verbatims
  écrits par toi, génériques (« L'explication de la question 12 ne dit pas
  pourquoi la réponse B est fausse. »). Aucun nom de personne, d'examen, de
  produit, de marque, d'entreprise, d'école ; aucune URL interne. Le contenu
  peut ressortir comme premier thème (c'est le fait publié : 1 retour sur 3),
  rien d'autre n'est calqué sur le réel.

## Le contrôle avant chaque capture

1. Passe chaque page rendue (HTML) au vérificateur du portfolio :
   `python ops/hooks/verifier_confidentialite.py <fichier>` depuis
   `C:\Users\Jean PERRIER\Portfolio` : il doit se taire. Il compare aux listes
   de `~/.portfolio/` ; **ne les affiche pas, ne cite aucun terme**.
2. Relis la page : aucun nom de table, de champ, de schéma ni d'outil interne
   visible (C4). Si un libellé l'est, remplace-le dans ta copie rendue (par ton
   post-traitement), pas dans UserVoice.
3. Après la capture, **regarde l'image** (outil Read) : aucun logo, aucun nom.

## Les images

- Capture sans nouveau paquet : Edge sans interface
  (`msedge --headless --screenshot=… --window-size=…`, avec
  `--virtual-time-budget` si la page a besoin de temps), ou le navigateur que
  ta session propose. Réseau : la page ne doit charger aucune ressource tierce ;
  si elle en appelle (CDN), sers une copie locale ou retire-la de ta copie.
- Sortie : `public/captures/uservoice/bilan-lundi.png` et `tableau-nps.png`
  dans le portfolio, largeur **1360 px** (la colonne de texte fait 680 px),
  recadrées sur l'essentiel (pas de page entière de 4 000 px : le haut utile,
  ou la zone la plus parlante), **300 Ko au plus** chacune (`sharp`, déjà
  installé dans le portfolio, pour réduire et compresser).
- L'interface reste en français, y compris pour la page anglaise.

## Ce que tu rends

Les deux chemins et leurs dimensions et poids ; pour chaque image une
**légende** FR et EN (une phrase, finie par « Données synthétiques. » /
« Synthetic data. ») et un **texte alternatif** FR et EN qui dit ce que
l'image montre ; la section de la page UserVoice où elle irait (les H2 sont
dans `src/contenu/projets/fr/uservoice.md`). Ne touche à aucun fichier de
`src/`, ne commite rien.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.

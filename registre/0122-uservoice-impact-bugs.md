# 0122 — Page UserVoice : l'impact mesuré, la baisse des bugs

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `contenu` | `clos 2026-11-10` | 350 | 387 | `claude-opus-5-5` |

**Demande de Jean (2026-11-10)**, depuis une session du dépôt UserVoice :
donner à la page UserVoice un impact mesuré plutôt que « le projet Audit
contenu est né de ce constat ». L'impact : la baisse des bugs, obtenue en
repérant et délimitant les bugs avec l'IA (dès mars 2026), corrigés par les
développeurs, puis en automatisant les remontées (UserVoice, septembre 2026).

**Faits fournis par Jean (2026-11-10)** :
- il a poussé à créer le formulaire de retour libre présent sur toutes les
  pages du site, puis l'a travaillé lui-même ;
- mars 2026 : il repère et délimite les bugs avec l'IA (lequel, sur quels
  exercices, depuis quand) ; les développeurs corrigent ;
- septembre 2026 : il automatise les remontées (UserVoice, qui reprend le
  moteur de qualification des bugs de Feedback Loop) ; une seule démarche ;
- bugs audio, première catégorie des retours depuis le printemps : leur part
  est divisée par 17 depuis son pic (semaine 22 à semaine 33), par 5 depuis
  mars ; le support a confirmé les bénéfices ;
- signalements d'affichage cassé : part divisée par 8 de mars-juin à août,
  après le chantier d'harmonisation des activités (correction menée par une
  autre personne) ;
- le coût : d'abord la qualité perçue par les apprenants, ensuite le temps
  d'analyse ; aucun chiffre d'heures.

**Écart à 0117** : 0117 limitait les résultats aux chiffres déjà publiés.
Jean autorise ici ces nouveaux chiffres **relatifs** (rapports seulement,
C2) ; aucune part absolue n'entre dans la page.

**Périmètre** : `src/contenu/projets/fr/uservoice.md` et sa jumelle EN :
`cadre.duree`, synthèse, « Le point de départ », « Bénéfices et impact
business », redites entre fait clé, synthèse et corps. Avant / après trié par
Jean en questionnaire ; relevé des lourdeurs (0072) et relevé anglais par
des agents qui n'ont pas écrit.

**Garde-fous de rédaction** : créditer les développeurs (« j'ai repéré et
délimité, ils ont corrigé ») ; aucun contrefactuel (« sans moi… ») ;
« signaux faibles » ne désigne pas l'audio ; l'alerte rejouée (registre 0097
du dépôt UserVoice) au conditionnel seulement.

**Coût estimé** (convention 0000, arbitrage 0111) : session 150, relevé FR
100, relevé EN 100.

## Tranché

- 2026-11-10, Jean : la création du formulaire **n'est pas datée** dans la
  page.
- 2026-11-10, Jean : sur le formulaire, il s'est fait aider des Product
  Designers, mais c'est lui qui a porté le sujet ; il demande si c'est
  important de le dire. Proposé au tri : une demi-phrase qui les crédite,
  ou rien.
- 2026-11-10, Jean : le **fait clé de l'accueil reste tel quel**.
- 2026-11-10, Jean : **aucun facultatif** (ni l'affichage cassé ÷8, ni
  l'alerte rejouée au conditionnel).
- 2026-11-10, Jean (consignes relayées par la session qui a lancé ce
  chantier) : **la validation des avant / après est déléguée** à un
  relecteur en contexte neuf ; ce qu'il valide s'applique, ce qu'il refuse
  se réécrit une fois et repasse devant lui. Jean contrôle après coup.
  **Commit local, sans push** jusqu'à ce contrôle. Restitution dans
  `redaction/uservoice-avant-apres.md`.
- 2026-11-10, Jean : le formulaire date de mars 2026 ; la page reste non
  datée, comme il l'a répondu.
- 2026-11-10 : le changement de fait clé était un avis de l'autre session,
  pas une décision de Jean ; **fait clé gardé**, la piste est relue et
  rangée en « option non appliquée » (2.2 et 4.7 de la restitution).
- 2026-11-16, Jean, au contrôle (« Oui, corrige et publie ») : la phrase
  du support allait plus loin que sa source, qui parle des bénéfices du
  travail et non d'une baisse. FR « Le support en a constaté les
  bénéfices. », EN « The support team saw the benefits. » ; mineur, sans
  nouveau cycle de relecture. Fusion dans `main` et publication.

## Contenu

- v1 FR, puis relevé des lourdeurs (sous-agent neuf, brief
  `prompts/0122-releve.md`) : accord « les / lequel », « ce travail » flou,
  redites avec la synthèse et « Ce que j'ai construit », contre-chronologie,
  « porté » plus fort que les faits. Écartés : « dix-sept » (l'arrondi
  prudent « plus de quinze » est voulu) et une définition inventée de « bug
  massif » (remplacé par « un bug signalé par beaucoup d'apprenants »).
- v2 FR et EN, puis validation (sous-agent neuf, brief
  `prompts/0122-validation.md`) : 16 entrées, 9 validées au premier
  passage, 7 refusées (« au printemps » manquant, l'option de fait clé sans
  son pic, calques anglais), réécrites selon ses propositions, **toutes
  validées au second passage**.
- Chiffres : ÷17 du pic (semaine 22) à la semaine 33, écrit « plus de
  quinze » ; ÷5 depuis la semaine 10, écrit « cinq fois plus faible » ;
  aucune part absolue.

## Hors spec

- « Product Designers » (phrase du formulaire, validée) est un terme du
  lexique des infobulles : sa bulle apparaît sur UserVoice, que le test
  `infobulles` voulait sans bulle. UserVoice est ajouté à la ligne
  « Product Designer » de `redaction/lexique.md`, et le test passe de 14 à
  16 pages à bulles. Pour revenir en arrière : retirer la demi-phrase sur le
  formulaire, la ligne du lexique et le compte du test.
- Le premier commit de la branche (ouverture de la fiche) a été poussé
  avant la consigne « sans push » ; rien d'autre ne l'est.

## Preuve

`npm run verifier` (build jetable puis tous les tests, navigateur compris) :
`tests 326 | pass 326 | fail 0`, VERT, build 6 s, tests 45 s. Un premier
passage avait donné 319 / 320, le rouge étant la bulle inattendue ci-dessus.
Alerte phrases longues : une par page (36 mots FR, 39 EN), la phrase des
quatre sources, déjà en ligne avant ce chantier.

## Coûts relevés (milliers de tokens, harnais)

Session principale 195,8 (`get_usage` à la clôture) ; relevé des lourdeurs
95,4 ; validation, deux passages, 95,9. Total 387,1, arrondi à 387, pour
350 estimés (ratio 1,1). Un tour de validation de plus que prévu.

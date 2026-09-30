# Portfolio — règles du projet

Plafond 300 lignes (commandement 11), on en tient ~100. Ce qui ne sert que
parfois part dans un skill, pas ici.

## Le projet

Le portfolio de Jean, **pour un recruteur** (PM, Head of Product, CPO, AI /
Data PM). Une histoire en deux actes : UserVoice (écouter) et Audit contenu
(agir sur la qualité du contenu). Site statique Astro, FR par défaut, EN en
miroir.

## Par où on entre

| Fichier | Ce qu'il porte |
|---|---|
| `CONTRAT.md` | Ce qui entre, ce qui sort, ce qui ne sort jamais. **Plafond 100 lignes, tenu par le hook.** |
| `SPEC.md` | Le pourquoi : lecteur, récit, forme, ce qu'on a écarté. |
| `registre/` | Un point de décision par fichier, cinq champs. Convention en `0000`. |
| `COMMANDEMENTS.md` | La doctrine dont on cite les numéros. Copie de `AuditContenu/COMMANDEMENTS_VIBE_CODING.md` v2 du 2026-09-22 : **l'original fait foi**. |
| `prompts/` | Les briefs des chantiers confiés aux sous-agents. |

## Les étapes

1. **Ligne** : direction visuelle, éditoriale, structure. Sur maquettes.
2. **Structure** Astro dans la direction retenue.
3. **Contenu** des deux actes, FR puis EN.
4. **Mise en ligne.**
5. **Temps 2** : acte III, OST, audience, scrollytelling.

**Rien ne se développe avant le go de Jean sur l'étape en cours.**

## Les règles non négociables

- **C1** L'employeur n'est nommé **que dans « À propos »**. Ailleurs : « une
  plateforme EdTech », ou « une entreprise EdTech » quand « plateforme »
  prêterait à confusion (page Fusion).
- **C2** Chiffres **relatifs ou ordres de grandeur**. Jamais un chiffre
  interne en absolu.
- **C3** **Aucune donnée de personne** : ni verbatim, ni nom, ni e-mail.
- **C4** **Aucun nom interne** : table, champ, URL, schéma.
- **C5** Captures **sur données synthétiques** uniquement.
- **C6** **Aucune requête vers un tiers**, aucun cookie.
- **C7** Chaque page FR a **sa jumelle EN**.
- **C8** Le constat se formule **en levier**, jamais en défaut de l'employeur.

C1 à C4 sont tenues par le hook, sur une liste de termes **hors du dépôt**.

## Les règles de spécification

- **Toute page, toute refonte se spécifie par questionnaire** avec Jean
  (séries de 4 questions à options, une recommandation), puis spec consolidée
  et go. Une hypothèse non commentée **n'est pas validée**.
- **Le recruteur d'abord** : chaque ajout répond à la question « que
  cherche-t-il, en combien de secondes ? ». Pas long et technique.
- **Tout contenu ajouté ou réécrit passe un relevé des lourdeurs** avant
  publication : phrases peu claires pour un lecteur extérieur, lourdeurs,
  redites, incohérences entre projets, FR et EN. En lecture seule, par un
  agent qui ne l'a pas écrit, selon le skill `ligne-editoriale` ; Jean trie
  en avant / après avant toute modification (registre/0072).

## Les règles de code

- Module **500 lignes**, 800 en limite dure.
- **Ni secret ni donnée dans le dépôt.** Le hook refuse.
- Une règle vérifiable devient un **test**, une règle de processus un **hook**.

## Comment on lance

```bash
dev.cmd                       # serveur de dev Astro, port 4321
npm run build                 # le site dans dist/
sh ops/hooks/install.sh       # (re)poser le hook de pre-commit
```

## Ouvrir un chantier

1. L'inscrire au registre **avant**, avec son coût estimé.
2. Le mener dans un **sous-agent**, sur un brief de `prompts/` qui ne nomme
   pas plus de deux fichiers à lire.
3. Le clore avec son coût réel. **Recalibrage tous les 30 points.**
4. **Revue en contexte neuf** ; celui qui écrit le code n'écrit pas les tests.
5. **Exiger la preuve**, pas l'affirmation.
6. **Pousser sur GitHub** (compte personnel de Jean) à chaque chantier clos.

## Ce qui reste ouvert

`0003` direction visuelle (maquettes livrées, choix de Jean attendu),
`0004` acte III leadership, `0005` contact, `0006` mesure d'audience,
`0007` schéma OST. Tous reportés après la ligne, sauf `0003`.

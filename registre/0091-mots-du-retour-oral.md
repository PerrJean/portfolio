# 0091 — Mises en situation : des mots qui disent les étapes du parcours

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `defaut` | `contenu` | 60 | 175 | `claude-sonnet-5-5` |

**Demande de Jean (2026-10-25)** : sur la page « Mises en situation », les
mots du schéma — « Signal », « Indice », « Modèle », et les titres des
étapes — ne disent pas clairement au lecteur les étapes du parcours de
l'apprenant. Ils viennent de la recherche en acquisition des langues, pas
du parcours.

**Spec (questionnaire du 2026-10-25, recommandations retenues)** :
- **Les trois étapes** : « La consigne » → « L'échange avec l'IA » →
  « Le retour ». Sans numéro devant : les trois temps du retour portent
  déjà les numéros 1, 2, 3, et deux suites de numéros se confondraient.
- **Les trois temps du retour** : « Bilan de la mission » → « Une piste pour
  progresser » → « Un exemple de formulation ».
- **Portée** : le schéma et le texte de la page (les trois puces « Le retour
  en trois temps », le paragraphe qui les cite), en FR et en EN : un seul
  mot par notion (relecture-non-initie, règle 8).
- **EN** : « The brief » → « The exchange with the AI » → « The feedback » ;
  « Mission check » → « A tip to improve » → « An example phrasing ».

**Fichiers** : `src/components/schemas/echange-oral.mjs`,
`src/contenu/projets/fr/mises-en-situation.md`,
`src/contenu/projets/en/speaking-practice.md`.

Brief : `prompts/9-mots-retour-oral.md`.

**Clos le 2026-10-25.** Coût réel : 116 k (chantier, Sonnet) + la moitié de
la revue commune avec 0092 (118 k). Revue : schéma, page FR et EN disent la
même chose ; plus aucun ancien mot affiché. **Reste ouvert, à trancher par
Jean** : la puce « L’exemple de formulation reste à la portée de
l’apprenant : ce n’est pas celle d’un locuteur natif » (le « celle » ne
renvoie à rien ; la faute vient du brief).

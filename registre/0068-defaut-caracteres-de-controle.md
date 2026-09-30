# 0068 — Défaut : des caractères de contrôle dans un brouillon commité

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `defaut` | `outil` | 5 | — | — |

**Relevé le 2026-10-01** par le sous-agent de la fusion (0065) lui-même : un
script de typographie écrit en ligne dans le shell avait changé le `\1` d'une
substitution en caractère `\x01`, qui remplaçait 45 signes (« : », « ; »,
« ? », et les chiffres devant « % ») dans `redaction/fusion.fr.md`. La
version a été commitée (non poussée) ; le hook ne l'a pas vue.

**Correction** (session principale) : le vérificateur refuse désormais tout
fichier texte qui porte un caractère de contrôle (hors tabulation et fins de
ligne). Tous les fichiers suivis du dépôt passés au crible : aucun. Le commit
suivant remplace la version corrompue avant tout envoi sur GitHub.

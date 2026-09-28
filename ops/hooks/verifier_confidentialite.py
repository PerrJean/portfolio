"""Refuse tout fichier indexe qui contient un terme interdit (CONTRAT, C1-C4).

Deux listes, hors du depot (les publier publierait ce qu'elles protegent) :
  ~/.portfolio/interdits.txt  refuses partout ;
  ~/.portfolio/employeur.txt  refuses hors des pages "A propos".
Un terme par ligne, compare sans casse, en mot entier. Liste absente ou vide :
refus, le controle ne se tait jamais. Le message nomme les fichiers, jamais
les termes. Remplace grep, qui plante sous Git for Windows avec -i.

Usage (depuis le hook) : python ops/hooks/verifier_confidentialite.py $INDEX
"""
import re
import sys
from pathlib import Path

LISTES = Path.home() / ".portfolio"
EXEMPTES = ("COMMANDEMENTS.md", "registre/", "ops/hooks/")
PAGES_A_PROPOS = ("a-propos", "about")


def charger(nom):
    chemin = LISTES / nom
    if not chemin.is_file():
        return []
    lignes = chemin.read_text(encoding="utf-8").splitlines()
    return [l.strip() for l in lignes if l.strip() and not l.startswith("#")]


def motif(termes):
    if not termes:
        return None
    alternance = "|".join(re.escape(t) for t in termes)
    return re.compile(rf"(?<!\w)(?:{alternance})(?!\w)", re.IGNORECASE)


def fautes(chemins, interdits, employeur):
    """Liste de (chemin, raison) pour chaque fichier fautif."""
    m_interdits, m_employeur = motif(interdits), motif(employeur)
    sortie = []
    for chemin in chemins:
        norme = chemin.replace("\\", "/")
        if norme.startswith(EXEMPTES) or not Path(chemin).is_file():
            continue
        texte = Path(chemin).read_bytes().decode("utf-8", errors="ignore")
        if m_interdits and m_interdits.search(texte):
            sortie.append((chemin, "terme interdit"))
        a_propos = any(p in norme for p in PAGES_A_PROPOS)
        if m_employeur and not a_propos and m_employeur.search(texte):
            sortie.append((chemin, "employeur nomme hors de 'A propos'"))
    return sortie


def main(argv):
    interdits, employeur = charger("interdits.txt"), charger("employeur.txt")
    if not interdits or not employeur:
        print(f"REFUS : listes introuvables ou vides dans {LISTES}.", file=sys.stderr)
        return 1
    trouvees = fautes(argv, interdits, employeur)
    for chemin, raison in trouvees:
        print(f"REFUS : {raison} dans {chemin}", file=sys.stderr)
    if trouvees:
        print(f"        (termes : voir {LISTES}, jamais affiches ici)", file=sys.stderr)
    return 1 if trouvees else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))

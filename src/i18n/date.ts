// La date d'un projet, « AAAA-MM », en toutes lettres dans la langue de la
// page, première lettre en capitale (« Septembre 2026 », « August 2024 »).
// Sert sous le titre des pages projet (registre/0045) et sous le nom des
// cartes de l'accueil (registre/0075).
import type { Langue } from './routes';

export function moisEnLettres(date: string, langue: Langue): string {
  const [annee, mois] = date.split('-').map(Number);
  const moisAnnee = new Intl.DateTimeFormat(langue, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(annee, mois - 1, 1)),
  );
  return moisAnnee.charAt(0).toLocaleUpperCase(langue) + moisAnnee.slice(1);
}

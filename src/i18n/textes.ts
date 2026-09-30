/** Les libellés communs (gabarit, en-tête, pied de page, pages projet), par langue. */
import type { Langue } from './routes';

export const NOM = 'Jean Perrier';
export const LINKEDIN = 'https://www.linkedin.com/in/jean-perrier-b01b3281/';

export const UI: Record<
  Langue,
  {
    evitement: string;
    navigation: string;
    menu: string;
    projets: string;
    aPropos: string;
    langue: string;
    locale: string;
    plusLoin: string;
    projetSuivant: string;
    lireProjet: string;
    cadre: { role: string; equipe: string; duree: string };
    fermer: string;
    agrandir: string;
    toucherPourAgrandir: string;
  }
> = {
  fr: {
    evitement: 'Aller au contenu',
    navigation: 'Navigation principale',
    menu: 'Menu',
    projets: 'Projets',
    aPropos: 'À propos',
    langue: 'Langue',
    locale: 'fr_FR',
    plusLoin: 'Pour aller plus loin',
    lireProjet: 'Lire le projet',
    cadre: { role: 'Rôle', equipe: 'Équipe', duree: 'Durée' },
    fermer: 'Fermer',
    agrandir: 'Agrandir',
    toucherPourAgrandir: 'Toucher pour agrandir',
    projetSuivant: 'Projet suivant :',
  },
  en: {
    evitement: 'Skip to content',
    navigation: 'Main navigation',
    menu: 'Menu',
    projets: 'Projects',
    aPropos: 'About',
    langue: 'Language',
    locale: 'en_US',
    plusLoin: 'Going further',
    projetSuivant: 'Next project:',
    lireProjet: 'Read the project',
    cadre: { role: 'Role', equipe: 'Team', duree: 'Duration' },
    fermer: 'Close',
    agrandir: 'Enlarge',
    toucherPourAgrandir: 'Tap to enlarge',
  },
};

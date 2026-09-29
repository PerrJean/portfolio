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
  },
};

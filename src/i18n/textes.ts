/** Les libellés communs (gabarit, en-tête, pied de page), par langue. */
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
  },
  en: {
    evitement: 'Skip to content',
    navigation: 'Main navigation',
    menu: 'Menu',
    projets: 'Projects',
    aPropos: 'About',
    langue: 'Language',
    locale: 'en_GB',
  },
};

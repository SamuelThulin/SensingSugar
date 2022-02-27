import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './locales/en-CA.json';
import fr from './locales/fr-CA.json';
import pt from './locales/pt-BR.json';

export const resources = { en, fr, pt } as const;

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({defaultNS: 'common', ns: ['common'], resources });

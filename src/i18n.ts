import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './locales/en-CA.json';
import fr from './locales/fr-CA.json';
import br from './locales/pt-BR.json';

const resources = { en, fr, br } as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // debug: true,
    defaultNS: 'common',
    fallbackLng: {
      'pt': ['br'],
      'fr': ['fr', 'en'],
      default: ['en'],
    },
    // interpolation: { escapeValue: false /* not needed for react!! */ },
    // lng: 'en-CA',
    ns: ['common'],
    resources,
  });

export default i18n;

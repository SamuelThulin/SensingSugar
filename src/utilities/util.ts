import type { Language } from '@/@types';

export const Languages = new Map<string, Language>();

export const supportedLanguages: typeof Languages = new Map([
  ['en-CA', { code: 'en-CA', name: 'English', shortName: 'en' }],
  ['fr-CA', { code: 'fr-CA', name: 'Français', shortName: 'fr' }],
]);

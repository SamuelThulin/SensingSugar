export interface Language {
  code: string;
  name: string;
  shortName: string;
}

export const Languages: Map<string, Language> = new Map();

export const supportedLanguages: typeof Languages = new Map([
  ['en-CA', { code: 'en-CA', name: 'English', shortName: 'en' }],
  ['fr-CA', { code: 'fr-CA', name: 'Français', shortName: 'fr' }],
  ['pt-BR', { code: 'pt-BR', name: 'Português', shortName: 'pt' }],
]);

export interface Language {
  code: string;
  name: string;
  shortName: string;
}

export const Languages: Map<string, Language> = new Map();

export const supportedLanguages: typeof Languages = new Map([
  ['en-CA', { code: 'en-CA', name: 'english', shortName: 'en' }],
  ['fr-CA', { code: 'fr-CA', name: 'français', shortName: 'fr' }],
  ['pt-BR', { code: 'pt-BR', name: 'portugues', shortName: 'pt' }],
]);

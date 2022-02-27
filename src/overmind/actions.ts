import { Context } from './';

//* INIITIALIZE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const onInitializeOvermind = async ({ state }: Context, overmind: any) => {
  // LANGUAGE
  const prefLanguageCode = localStorage.getItem('i18nextLng');
  if (prefLanguageCode) {
    const prefLanguage = supportedLanguages.get(prefLanguageCode);
    state.language = prefLanguage
      ? prefLanguage
      : { code: 'en-CA', name: 'english', shortName: 'en' };
  }
};

export const switchLanguage = ({ state }: Context, value: string) => {
  const language = supportedLanguages.get(value) ?? {
    code: 'en-CA',
    name: 'english',
    shortName: 'en',
  };
  state.language = language;
  return value;
};


  //LANGUAGE
  // const prefLanguageCode = localStorage.getItem('i18nextLng');
  // if (prefLanguageCode) {
  //   const prefLanguage = supportedLanguages.get(prefLanguageCode);
  //   state.language = prefLanguage
  //     ? prefLanguage
  //     : { code: 'en-CA', name: 'english', shortName: 'en' };
  // }
};


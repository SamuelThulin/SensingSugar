import Papa, { ParseError, ParseMeta, ParseResult } from 'papaparse';
import { supportedLanguages } from '../utilities/util';
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

export const parseData = async ({ state, actions }: Context, file: File | string) => {
  const response = await actions.parse(file);
  if (response.errors.length > 0) response.errors[0].message;

  state.data = response.data;
  return true;
};

export const parse = async (
  { actions }: Context,
  file: File | string
): Promise<ParseResult<{ data: unknown[]; errors: ParseError[]; meta: ParseMeta }>> => {
  const remote = typeof file === 'string' ? true : false;

  return new Promise((resolve, reject) => {
    //@ts-ignore
    Papa.parse(file, {
      complete: (
        results: ParseResult<{ data: unknown[]; errors: ParseError[]; meta: ParseMeta }>
      ) => resolve(results),
      download: remote,
      dynamicTyping: true,
      error: (error) => reject(error),
      header: true,
      skipEmptyLines: true,
      // transform: (value: string) => {},
      transformHeader: (header: string) => {
        if (header === 'Date and Time' || header === 'Time' || header === 'Local Time') {
          header = 'timestamp';
        }

        if (header === 'BGValue[mmol/L]' || header === 'mmol/L' || header === 'Value') {
          if (header.includes('mmol/L')) actions.setGlucoseUnit('mmol/L');
          header = 'glucose';
        }

        if (header.includes('Meal[g]')) {
          if (header.includes('[g]')) actions.setMealUnit('g');
          header = 'meal';
        }

        header = header.toLocaleLowerCase();
        header = header.replace(' ', '_');

        return header;
      },
    });
  });
};

export const setGlucoseUnit = ({ state }: Context, value: string) => {
  state.unitGlucose = value;
};

export const setMealUnit = ({ state }: Context, value: string) => {
  state.unitMeal = value;
};

export const removeData = ({ state }: Context) => {
  state.data = [];
};

export const getDataGallery = async ({ effects }: Context) => {
  return await effects.api.getGallery();
};

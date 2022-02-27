import type { Language } from '../utilities/util';

type State = {
  data: any[];
  language: Language;
  unitGlucose: string;
  unitMeal: string;
};

export const state: State = {
  data: [],
  language: { code: 'en-CA', name: 'english', shortName: 'en' },
  unitGlucose: 'mmol/2',
  unitMeal: 'm',
};

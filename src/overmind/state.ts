import type { Language } from '../utilities/util';
import { IData } from '../@types'

type State = {
  data: IData[];
  language: Language;
  unitGlucose: string;
  unitMeal: string;
};

export const state: State = {
  data: [],
  language: { code: 'en-CA', name: 'english', shortName: 'en' },
  unitGlucose: 'mmol/L',
  unitMeal: 'm',
};

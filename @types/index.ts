export interface Language {
  code: string;
  name: string;
  shortName: string;
}

export type DataCollectionItem = {
  background?: string;
  dataFile: string;
  id: string;
  name: string;
};

export interface Data {
  '#'?: string;
  glucose: number;
  timestamp?: string;
  activity?: string | null;
  data_source?: string;
  location?: string | null;
  meal?: number;
  meal_marker?: string | null;
  medication?: string;
  notes?: string;
  [x: string]: any;
}

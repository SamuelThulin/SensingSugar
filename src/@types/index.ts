export interface FileDetail {
  fileName: string;
  name: string;
  path: string;
}

export interface IData {
  '#'?: string;
  glucose?: number;
  timestamp?: "25/10/2021 08:23:36"
  activity?: string | null;
  data_source?: string;
  location?: string | null;
  meal?: number;
  meal_marker?: string | null;
  medication?: string;
  notes?: string;
}
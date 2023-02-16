export interface IData {
	'#'?: string;
	glucose?: number;
	timestamp?: string;
	activity?: string | null;
	data_source?: string;
	location?: string | null;
	meal?: number;
	meal_marker?: string | null;
	medication?: string;
	notes?: string;
}

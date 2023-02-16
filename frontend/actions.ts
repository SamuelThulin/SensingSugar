import { IData } from '@/@types';
import Papa, { ParseError, ParseMeta, ParseResult } from 'papaparse';

export const useLocalstorage = () => {
	const isBrowser = () => window !== undefined;

	const getUserData = () => {
		if (!isBrowser()) return;

		const data = window.localStorage.getItem('data');
		if (!data) return;

		return JSON.parse(data) as IData[];
	};

	const setUserData = (data: IData[]) => {
		if (!isBrowser()) return;
		window.localStorage.setItem('data', JSON.stringify(data));
	};

	const clearData = () => {
		if (!isBrowser()) return;
		window.localStorage.clear();
	};

	return {
		getUserData,
		setUserData,
		clearData,
	};
};

export const parseCSVData = async (rawdata: string) => {
	const response = await parse(rawdata);
	if (response.errors.length > 0) response.errors[0].message;

	let data = response.data as IData[];

	if (!isMmol(data)) data = convertGrToMmol(data);

	return data;
};

export const parse = async (
	rawdata: string
): Promise<ParseResult<{ data: unknown[]; errors: ParseError[]; meta: ParseMeta }>> => {
	return new Promise((resolve, reject) => {
		Papa.parse(rawdata, {
			complete: (results: ParseResult<{ data: unknown[]; errors: ParseError[]; meta: ParseMeta }>) => {
				resolve(results);
			},
			dynamicTyping: true,
			//@ts-ignore
			error: (error) => reject(error),
			header: true,
			skipEmptyLines: true,
			// transform: (value: string) => {},
			transformHeader: (header: string) => {
				if (header === 'Date and Time' || header === 'Time' || header === 'Local Time') {
					header = 'timestamp';
				}

				if (header === 'BGValue[mmol/L]' || header === 'mmol/L' || header === 'Value') {
					header = 'glucose';
				}

				if (header.includes('Meal[g]')) {
					header = 'meal';
				}

				header = header.toLocaleLowerCase();
				header = header.replace(' ', '_');

				return header;
			},
		});
	});
};

export const parseJsonData = async (rawdata: string) => {
	let jsonData = JSON.parse(rawdata);
	const parsedData: IData[] = [];

	jsonData.forEach((item: { [x: string]: any }) => {
		if (!item.glucose) return;

		parsedData.push({
			glucose: item.glucose,
			timestamp: item['timestamp_(yyyy-mm-ddthh:mm:ss)'],
		});
	});

	if (!isMmol(parsedData)) jsonData = convertGrToMmol(jsonData);

	return parsedData;
};

const isMmol = (data: IData[]) => {
	let total = 0;
	let count = 0;

	data.forEach((item, index) => {
		total += item.glucose ?? 0;
		count++;
	});

	const average = total / count;

	if (average > 36) return false;
	return true;
};

// gr: range: 0-648
// mmol: range 0-36
const convertGrToMmol = (data: IData[]) => {
	const convertedData = data.map((item) => {
		return {
			...item,
			glucose: scale([0, 648], [0, 36])(item.glucose ?? 0),
		};
	});

	return convertedData;
};

const scale = (fromRange: [number, number], toRange: [number, number]) => {
	const d = (toRange[1] - toRange[0]) / (fromRange[1] - fromRange[0]);
	return (from: number) => (from - fromRange[0]) * d + toRange[0];
};

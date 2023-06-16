import { Data } from '@/@types';
import Papa, { ParseError, ParseMeta, ParseResult } from 'papaparse';

interface rawDataObject {
  [x: string]: any;
}

/**
 * This function provides a set of methods to interact with the browser's local storage for storing and
 * retrieving data.
 * @returns An object with three functions: `getUserData`, `setUserData`, and `clearData`.
 */
export const useLocalstorage = () => {
  const isBrowser = () => window !== undefined;

  const getUserData = () => {
    if (!isBrowser()) return;

    const data = window.localStorage.getItem('data');
    if (!data) return;

    return JSON.parse(data) as Data[];
  };

  const setUserData = (data: Data[]) => {
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

const glucoseColumnNamesSupported = ['glucose', 'BGValue[mmol/L]', 'mmol/L', 'Value'];
const dateColumnNamesSupported = ['Date and Time', 'Time', 'Local Time'];

/**
 * The function parses raw data into an array of objects containing glucose and timestamp information,
 * and can also convert the glucose unit from grams to millimoles.
 * @param {string} rawdata - The raw data is a string that contains the data to be parsed. It is
 * expected to be in JSON format, but if it cannot be parsed as JSON, it will be passed to a parsing
 * function.
 * @returns The function `parseData` returns a string "no glucose" or an array
 * of objects of type `Data`. The array contains the parsed data from the input `rawdata`, where each
 * object in the array represents a row of data with properties `timestamp` and `glucose`. If the input
 * `rawdata` is not in JSON format, the function tries to parse
 */
export const parseData = async (rawdata: string) => {
  let rawDataObject: rawDataObject[] | undefined = undefined;

  try {
    rawDataObject = JSON.parse(rawdata);
  } catch {
    const response = await parse(rawdata);
    //Errors
    if (response.errors.length > 0) return response.errors[0].message;
    rawDataObject = response.data as rawDataObject[];
  }

  if (rawDataObject === undefined) return 'no glucose';

  //get Glucose and timestamp
  let data: Data[] = rawDataObject.map((item) => {
    let glucose = undefined;
    let timestamp = undefined;

    //check glucose
    for (const glucoseColumn of glucoseColumnNamesSupported) {
      if (item.hasOwnProperty(glucoseColumn)) {
        glucose = Number(item[glucoseColumn]);
        break;
      }
    }

    if (glucose === null) glucose = 0;

    //check timestamp
    for (const timestampColumn of dateColumnNamesSupported) {
      if (item.hasOwnProperty(timestampColumn)) {
        timestamp = item[timestampColumn];
        break;
      }
    }

    return { ...item, timestamp, glucose } as Data;
  });

  //Errors: No glucose
  if (!('glucose' in data[0]) || data[0].glucose === undefined) return 'no glucose';

  //Convert unit
  if (!isMmol(data)) data = convertGrToMmol(data);

  return data;
};

type ParseResponse = ParseResult<{ data: unknown[]; errors: ParseError[]; meta: ParseMeta }>;

/**
 * This is a TypeScript function that parses a string of data using the Papa library and returns a
 * Promise that resolves with the parsed data or rejects with an error.
 * @param {string} rawdata - The rawdata parameter is a string that represents the data that needs to
 * be parsed. It could be a CSV file, a string of comma-separated values, or any other format that can
 * be parsed by the Papa.parse library.
 * @returns The `parse` function is returning a Promise that resolves to a `ParseResponse` object. The
 * `ParseResponse` object is the result of parsing the `rawdata` string using the Papa Parse library.
 * The `ParseResponse` object contains the parsed data in a structured format, as well as any errors
 * that occurred during parsing.
 */
export const parse = async (rawdata: string): Promise<ParseResponse> => {
  return new Promise((resolve, reject) => {
    Papa.parse(rawdata, {
      complete: (results: ParseResponse) => resolve(results),
      dynamicTyping: true,
      error: (error: unknown) => reject(error),
      header: true,
      skipEmptyLines: true,
    });
  });
};

/**
 * The function checks if the average glucose level in an array of data is in mmol or not.
 * @param {Data[]} data - The `data` parameter is an array of objects of type `Data`. Each object in
 * the array represents a glucose reading and has a `glucose` property that is a number representing
 * the glucose level in mmol/L. The `??` operator is used to provide a default value of 0
 * @returns The function `isMmol` returns a boolean value (`true` or `false`) based on whether the
 * average glucose value in the `data` array is greater than 36 or not. If the average is greater than
 * 36, it returns `false`, otherwise it returns `true`.
 */
const isMmol = (data: Data[]) => {
  let total = 0;
  let count = 0;

  data.forEach((item) => {
    total += item.glucose ?? 0;
    count++;
  });

  const average = total / count;

  if (average > 36) return false;
  return true;
};

//*  gr: range: 0-648
//*  mmol: range 0-36
/**
 * This function converts glucose values from grams per deciliter (g/dL) to millimoles per
 * liter (mmol/L).
 * @param {Data[]} data - The `data` parameter is an array of objects of type `Data`. Each object in
 * the array represents a data point and has a `glucose` property that stores the glucose level in
 * milligrams per deciliter (mg/dL). The `convertGrToMmol` function takes this
 * @returns The function `convertGrToMmol` takes an array of `Data` objects as input and returns a new
 * array of `Data` objects where the `glucose` property of each object has been converted from
 * milligrams per deciliter (mg/dL) to millimoles per liter (mmol/L). The conversion is done using a
 * scaling function that maps the range of possible glucose
 */
const convertGrToMmol = (data: Data[]) => {
  const convertedData = data.map((item) => {
    return {
      ...item,
      glucose: scale([0, 648], [0, 36])(item.glucose ?? 0),
    };
  });

  return convertedData;
};

/**
 * The function "scale" takes two ranges and returns a function that scales a number from the first
 * range to the second range.
 * @param fromRange - `fromRange` is an array of two numbers representing the minimum and maximum
 * values of the input range. For example, if `fromRange` is `[0, 100]`, it means that the input values
 * can range from 0 to 100.
 * @param toRange - The `toRange` parameter is an array of two numbers representing the desired output
 * range for the scaling function. The first number in the array is the minimum value of the output
 * range, and the second number is the maximum value of the output range.
 * @returns The `scale` function returns a closure that takes a `from` number as input and returns a
 * scaled value based on the `fromRange` and `toRange` parameters passed to the `scale` function.
 */
const scale = (fromRange: [number, number], toRange: [number, number]) => {
  const d = (toRange[1] - toRange[0]) / (fromRange[1] - fromRange[0]);
  return (from: number) => (from - fromRange[0]) * d + toRange[0];
};
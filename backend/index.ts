import type { DataCollectionItem } from '@/@types';
import { promises as fs } from 'fs';
import path from 'path';

export const allowedFileTypes = ['.csv', '.json'];

/**
 * This function reads and returns the contents of a JSON file containing a collection of data.
 * @returns The `getGalleryCollection` function is returning a Promise that resolves to an array of
 * `DataCollectionItem` objects.
 */
export const getGalleryCollection = async () => {
  const fullPath = path.join(process.cwd(), 'data', 'collection.json');
  const content = await fs.readFile(fullPath, 'utf8');
  const collection: DataCollectionItem[] = JSON.parse(content);

  return collection;
};

/**
 * This function reads the content of a markdown file in a specified language and returns it along with
 * the language code.
 * @param {string} filename - The name of the markdown file (without the extension) that you want to
 * read the content from.
 * @param {string} [locale=en] - The `locale` parameter is a string that specifies the language or
 * region for which the markdown content is being retrieved. It has a default value of `'en'` (English)
 * if no value is provided.
 * @returns an object with two properties: `locale` and `content`. The `locale` property is set to the
 * `locale` parameter passed to the function, or to the default value of `'en'` if no `locale`
 * parameter is provided. The `content` property is the content of the Markdown file with the specified
 * `filename` and `locale`
 */
export const getMarkdownContent = async (filename: string, locale: string = 'en') => {
  const fullPath = path.join('public', 'content', `${filename}.${locale}.md`);
  const content = await fs.readFile(fullPath, 'utf8');

  return { locale, content };
};

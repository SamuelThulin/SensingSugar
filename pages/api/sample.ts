import { getGalleryCollection } from '@/backend';
import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

interface Data {
  sugar: string;
}

export const allowedFileTypes = ['.csv', '.json'];
const regexFileType = /\.[0-9a-z]+$/i; //Match the end of a string after the . (inclusive)

/**
 * This is an async function that handles requests to retrieve data from a gallery collection based on
 * an ID parameter, and returns the contents of a file associated with the item if it exists and is of
 * an allowed file type.
 * @param {NextApiRequest} req - The `req` parameter is an object that represents the incoming HTTP
 * request in a Next.js API route. It contains information about the request, such as the HTTP method,
 * headers, query parameters, and request body.
 * @param res - `res` is an object representing the HTTP response that will be sent back to the client.
 * It is of type `NextApiResponse<Data | void>`, where `Data` is the type of data that will be sent in
 * the response body (if any), and `void` indicates that the response
 * @returns a JSON object with a property "sugar" that contains the contents of a file. The HTTP status
 * code of the response depends on the outcome of several checks performed on the request parameters
 * and file contents. If any of these checks fail, the function returns a 404 status code and no
 * content.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string | void>,
) {
  const id = req.query.id;

  // No ID
  if (!id) {
    res.status(400).send('Missing `id` property');
    return;
  }

  const collection = await getGalleryCollection();
  const item = collection.find((item) => item.id === id);

  // No item found
  if (!item) {
    res.status(404).send('Item not found');
    return;
  }

  const fileType = item.dataFile.match(regexFileType)?.[0] ?? '';

  // No file type not allowed
  if (!allowedFileTypes.includes(fileType)) {
    res.status(404).send('File extension not allowed');
    return;
  }

  const filePath = path.join(process.cwd(), 'data', 'files', item.dataFile);
  const fileContents = await fs.readFile(filePath, 'utf8').catch(() => null);

  // File not foound
  if (!fileContents) {
    res.status(404).send(`File not found.`);
    return;
  }

  res.status(200).json({ sugar: fileContents });
}

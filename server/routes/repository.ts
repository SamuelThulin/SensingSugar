import express from 'express';
import fs from 'fs';
import path from 'path';

interface FileDetail {
  fileName: string;
  name: string;
  path: string;
}

const router = express.Router();

const isFile = (file: FileDetail) => fs.lstatSync(path.join(file.path, file.fileName)).isFile();
const isCSV = (file: FileDetail) => file.fileName.slice(-4) === '.csv';
const getName = (fileName: string) => fileName.slice(0, -4);

router.get('/gallery', async (req, res) => {
  const folderPath = './data';

  const folderExists = fs.existsSync(folderPath);

  if (!folderExists) return res.status(200).json([]);

  const files = fs
    .readdirSync(folderPath)
    .map((fileName) => {
      return {
        fileName,
        name: getName(fileName),
        path: folderPath,
      };
    })
    .filter(isFile)
    .filter(isCSV);

  res.status(200).json(files);
});

export default router;

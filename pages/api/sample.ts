import { allowedFileTypes } from '@/backend';
import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	sugar: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const filename = req.query.id;

	if (!filename) {
		res.status(404);
		return;
	}

	const dataFolder = 'data';
	let fileType = '';

	for (const type of allowedFileTypes) {
		const exists = await fs.access(`${dataFolder}/${filename}${type}`).catch(() => null);
		if (exists !== null) {
			fileType = type;
			break;
		}
	}

	if (fileType === '') {
		res.status(404);
		return;
	}

	const fileContents = await fs.readFile(`${dataFolder}/${filename}${fileType}`, 'utf8').catch(() => null);

	if (!fileContents) {
		res.status(404);
		return;
	}

	res.status(200).json({ sugar: fileContents });
}

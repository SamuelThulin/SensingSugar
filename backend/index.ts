import { promises as fs } from 'fs';
import path from 'path';

type GalleryFile = {
	filename: string;
	name: string;
};

export const allowedFileTypes = ['.csv', '.json'];
const regexFileType = /\.[0-9a-z]+$/i;

export const getGallery = async () => {
	const folderPath = path.join(process.cwd(), 'data');

	const files = await fs.readdir(folderPath);

	if (files.length === 0) return [];

	const data: GalleryFile[] = files
		.filter((filename) => {
			const match = filename.match(regexFileType);
			if (match && allowedFileTypes.includes(match[0])) return filename;
		})
		.map((filename) => {
			const match = filename.match(regexFileType);
			const fileType = match?.[0] ?? '';
			const name = filename.slice(0, -fileType.length);
			return {
				filename,
				name: name,
			};
		});

	return data;
};

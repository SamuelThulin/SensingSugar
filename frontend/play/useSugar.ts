import { IData } from '@/@types';
import { parseCSVData, useLocalstorage } from '@/frontend/actions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useSugar = () => {
	const { getUserData, clearData } = useLocalstorage();
	const router = useRouter();

	const [data, setData] = useState<IData[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		//load data from gallery
		if (router.query.id) {
			const sample = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
			loadGalleryData(sample);
			return;
		}

		//load user data
		loadUserData();

		//remove data when unloading the page
		if (window !== undefined) {
			window.addEventListener('unload', () => clearData());
		}

		return () => {
			window.removeEventListener('unload', () => clearData());
		};
	}, []);

	const loadGalleryData = async (id: string) => {
		const res = await fetch(`/api/sample?id=${id}`);
		// if (!res.ok)
		const sampleData = await res.json();

		const parsedData = await parseCSVData(sampleData.sugar);
		if (!!parsedData !== true) return returnHome();

		setLoading(false);
		setData(parsedData);
	};

	const loadUserData = async () => {
		const userData = getUserData();
		if (!userData) return returnHome();

		setLoading(false);
		setData(userData);
	};

	const returnHome = () => router.push('/');

	return {
		data,
		loading,
	};
};

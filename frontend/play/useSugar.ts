import { Data } from '@/@types';
import { parseData, useLocalstorage } from '@/src/dataParser';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useSugar = () => {
  const { getUserData, clearData } = useLocalstorage();
  const router = useRouter();

  const [data, setData] = useState<Data[] | null>(null);
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

    if (res.status >= 400) {
      const error = await res.text()
      console.log(error)
      return router.push('/404');
    }

    const sampleData = await res.json();

    const parsedData = await parseData(sampleData.sugar);
    if (typeof parsedData === 'string') return router.push('/404');;

    setLoading(false);
    setData(parsedData);
  };

  const loadUserData = async () => {
    const userData = getUserData();
    if (!userData) return returnHome();

    setLoading(false);
    setData(() => {
      clearData();
      return userData;
    });
  };

  const returnHome = () => router.push('/');

  return { data, loading };
};

import axios, { AxiosResponse } from 'axios';
import type { FileDetail } from '../@types';

export const api = {
  getGallery: async (): Promise<FileDetail[]> => {
    const response: AxiosResponse<FileDetail[]> = await axios.get('/api/gallery');
    return response.data;
  },
};

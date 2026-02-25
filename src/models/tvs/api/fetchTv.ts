import { axiosInstance } from '@/shared/axiosCreate';
import type { TvId } from './tv';

type FetchTvProps = {
  tvId: string;
  language?: string;
};

export const fetchTv = async ({ tvId, language = 'en-US' }: FetchTvProps): Promise<TvId> => {
  const response = await axiosInstance.get(`/tv/${tvId}?language=${language}`);

  if (response.status === 404) {
    throw new Error('Ошибка запроса');
  }

  return response.data;
};

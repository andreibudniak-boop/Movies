import { axiosInstance } from '@/shared/axiosCreate';
import type { TvListType } from './tv';

export const fetchTvList = async ({
  pageParam = 1,
  listType,
  language = 'en-US',
}: {
  pageParam?: number;
  listType: TvListType;
  language?: string;
}) => {
  const response = await axiosInstance.get(
    `/tv/${listType}?language=${language}&page=${pageParam}`
  );

  if (response.status === 404) {
    throw new Error('Ошибка запроса');
  }

  return {
    results: response.data.results,
    nextPage: response.data.page < response.data.total_pages ? response.data.page + 1 : undefined,
  };
};

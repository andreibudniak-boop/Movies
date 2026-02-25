import { axiosInstance } from '@/shared/axiosCreate';
import type { MovieListType } from './movie';

export const fetchMovieList = async ({
  pageParam = 1,
  listType,
  language = 'en-US',
}: {
  pageParam?: number;
  listType: MovieListType;
  language?: string;
}) => {
  const response = await axiosInstance.get(
    `/movie/${listType}?language=${language}&page=${pageParam}`
  );

  if (response.status === 404) {
    throw new Error('Ошибка запроса');
  }

  return {
    results: response.data.results,
    nextPage: response.data.page < response.data.total_pages ? response.data.page + 1 : undefined,
  };
};

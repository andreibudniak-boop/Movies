import { axiosInstance } from '@/shared/axiosCreate';
import type { MovieListType } from './movie';
import { type MovieFilters } from '../queries/filterValues';
import { buildDiscoverParams } from './buildDiscoverParams';

export const fetchMovieList = async ({
  pageParam = 1,
  listType,
  language = 'en-US',
  filters,
  useDiscover,
}: {
  pageParam?: number;
  listType: MovieListType;
  language?: string;
  filters?: MovieFilters;
  useDiscover?: boolean;
}) => {
  if (useDiscover) {
    return fetchDiscoverMovies({ pageParam, language, filters });
  }
  return fetchStandardList({ pageParam, listType, language });
};

const fetchStandardList = async ({
  pageParam,
  listType,
  language,
}: {
  pageParam: number;
  listType: MovieListType;
  language: string;
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

const fetchDiscoverMovies = async ({
  pageParam,
  language,
  filters,
}: {
  pageParam: number;
  language: string;
  filters?: MovieFilters;
}) => {
  const discoverParams = buildDiscoverParams({ language, pageParam, filters });
  const response = await axiosInstance.get('/discover/movie', {
    params: discoverParams,
  });

  if (response.status === 404) {
    throw new Error('Ошибка запроса');
  }

  return {
    results: response.data.results,
    nextPage: response.data.page < response.data.total_pages ? response.data.page + 1 : undefined,
  };
};

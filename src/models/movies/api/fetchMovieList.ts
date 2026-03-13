import { axiosInstance } from '@/shared/axiosCreate';
import type { MovieListType, DiscoverParams } from './movie';
import { initialFilters, type Filters } from '../queries/filterValues';

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
  filters?: Filters;
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
  filters?: Filters;
}) => {
  const discoverParams: DiscoverParams = {
    language,
    page: pageParam,
    include_adult: filters?.include_adult,
    sort_by: filters?.sort_by,
  };

  if (
    filters?.vote_average_gte !== undefined &&
    filters?.vote_average_gte !== initialFilters.vote_average_gte
  ) {
    discoverParams['vote_average.gte'] = filters.vote_average_gte;
  }
  if (
    filters?.vote_average_lte !== undefined &&
    filters?.vote_average_lte !== initialFilters.vote_average_lte
  ) {
    discoverParams['vote_average.lte'] = filters.vote_average_lte;
  }

  if (
    filters?.vote_count_gte !== undefined &&
    filters?.vote_count_gte !== initialFilters.vote_count_gte
  ) {
    discoverParams['vote_count.gte'] = filters.vote_count_gte;
  }

  if (
    filters?.with_runtime_gte !== undefined &&
    filters?.with_runtime_gte !== initialFilters.with_runtime_gte
  ) {
    discoverParams['with_runtime.gte'] = filters.with_runtime_gte;
  }
  if (
    filters?.with_runtime_lte !== undefined &&
    filters?.with_runtime_lte !== initialFilters.with_runtime_lte
  ) {
    discoverParams['with_runtime.lte'] = filters.with_runtime_lte;
  }

  if (filters?.with_genres && filters.with_genres.length > 0) {
    discoverParams.with_genres = filters.with_genres.join(',');
  }

  if (filters?.release_date_gte) {
    discoverParams['release_date.gte'] = filters.release_date_gte;
  }
  if (filters?.release_date_lte) {
    discoverParams['release_date.lte'] = filters.release_date_lte;
  }

  Object.keys(discoverParams).forEach((key) => {
    if (discoverParams[key as keyof DiscoverParams] === undefined) {
      delete discoverParams[key as keyof DiscoverParams];
    }
  });

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

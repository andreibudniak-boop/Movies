import { axiosInstance } from '@/shared/axiosCreate';
import type { DiscoverParams, TvListType } from './tv';
import { initialTVFilters, type TVFilters } from '../queries/filterValues';

export const fetchTvList = async ({
  pageParam = 1,
  listType,
  language = 'en-US',
  filters,
  useDiscover,
}: {
  pageParam?: number;
  listType: TvListType;
  language?: string;
  filters?: TVFilters;
  useDiscover?: boolean;
}) => {
  if (useDiscover) {
    return fetchDiscoverTVs({ pageParam, language, filters });
  }
  return fetchStandartList({ pageParam, listType, language });
};

const fetchStandartList = async ({
  pageParam,
  listType,
  language,
}: {
  pageParam: number;
  listType: TvListType;
  language: string;
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

const fetchDiscoverTVs = async ({
  pageParam,
  language,
  filters,
}: {
  pageParam: number;
  language: string;
  filters?: TVFilters;
}) => {
  const discoverParams: DiscoverParams = {
    language,
    page: pageParam,
    include_adult: filters?.include_adult,
    sort_by: filters?.sort_by,
  };

  if (
    filters?.vote_average_gte !== undefined &&
    filters?.vote_average_gte !== initialTVFilters.vote_average_gte
  ) {
    discoverParams['vote_average.gte'] = filters.vote_average_gte;
  }
  if (
    filters?.vote_average_lte !== undefined &&
    filters?.vote_average_lte !== initialTVFilters.vote_average_lte
  ) {
    discoverParams['vote_average.lte'] = filters.vote_average_lte;
  }

  if (
    filters?.vote_count_gte !== undefined &&
    filters?.vote_count_gte !== initialTVFilters.vote_count_gte
  ) {
    discoverParams['vote_count.gte'] = filters.vote_count_gte;
  }

  if (
    filters?.with_runtime_gte !== undefined &&
    filters?.with_runtime_gte !== initialTVFilters.with_runtime_gte
  ) {
    discoverParams['with_runtime.gte'] = filters.with_runtime_gte;
  }
  if (
    filters?.with_runtime_lte !== undefined &&
    filters?.with_runtime_lte !== initialTVFilters.with_runtime_lte
  ) {
    discoverParams['with_runtime.lte'] = filters.with_runtime_lte;
  }

  if (filters?.with_genres && filters.with_genres.length > 0) {
    discoverParams.with_genres = filters.with_genres.join('|');
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

  const response = await axiosInstance.get('/discover/tv', {
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

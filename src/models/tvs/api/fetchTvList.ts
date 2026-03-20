import { axiosInstance } from '@/shared/axiosCreate';
import type { TvListType } from './tv';
import { type TVFilters } from '../queries/filterValues';
import { buildDiscoverParams } from './buildDiscoverParams';

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
  const discoverParams = buildDiscoverParams({ language, pageParam, filters });

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

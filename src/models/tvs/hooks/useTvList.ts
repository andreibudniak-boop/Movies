import { useInfiniteQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../shared/axiosCreate';
import { tvKeys } from '../queries/tvKeys';
import type { TvListType } from '../api/tv';

interface UseTvListProps {
  listType: TvListType;
  language?: string;
}
const fetchTvList = async ({
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
    totalPages: response.data.total_pages,
    totalResults: response.data.total_results,
    currentPage: response.data.page,
    nextPage: response.data.page < response.data.total_pages ? response.data.page + 1 : undefined,
  };
};

export const useTvList = ({ listType, language = 'en-US' }: UseTvListProps) => {
  return useInfiniteQuery({
    queryKey: tvKeys.list({
      sort: listType,
      language,
    }),
    queryFn: ({ pageParam = 1 }) => fetchTvList({ pageParam, listType, language }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

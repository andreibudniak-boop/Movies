import type { Tv, TvListType } from '../api/tv';
import type { CardType } from '@/shared/types/types';
import { InfiniteList } from '@/shared/components/InfiniteList';
import { tvKeys } from '../queries/tvKeys';
import { axiosInstance } from '@/shared/axiosCreate';

type TvProps = {
  listType: TvListType;
  language?: string;
};

type TvPage = {
  results: Tv[];
  nextPage?: number;
};

const normalizeItem = (item: Tv): CardType => {
  return {
    id: item.id,
    title: item.original_name,
    poster_path: item.poster_path,
    vote_average: item.vote_average,
    date: item.first_air_date,
    link: `/tv/${item.id}`,
  };
};

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
    nextPage: response.data.page < response.data.total_pages ? response.data.page + 1 : undefined,
  };
};

export function Tvs({ listType, language = 'en-US' }: TvProps) {
  const tvListOptions = {
    queryKey: tvKeys.list({ sort: listType, language }),
    queryFn: ({ pageParam = 1 }) => fetchTvList({ pageParam, listType, language }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TvPage) => lastPage.nextPage,
  };

  return <InfiniteList<Tv> queryOptions={tvListOptions} normalizeItem={normalizeItem} />;
}

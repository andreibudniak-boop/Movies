import type { InfiniteQueryOptions } from '@/shared/components/InfiniteList';
import type { TvListType, TvPage } from '../api/tv';
import { tvKeys } from '../queries/tvKeys';
import { fetchTvList } from '../api/fetchTvList';

export function getTvListOptions({
  listType,
  language = 'en-US',
}: {
  listType: TvListType;
  language?: string;
}): InfiniteQueryOptions<TvPage> {
  return {
    queryKey: tvKeys.list({
      sort: listType,
      language,
    }),
    queryFn: ({ pageParam = 1 }) => fetchTvList({ pageParam, listType, language }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TvPage) => lastPage.nextPage,
  };
}

import type { InfiniteQueryOptions } from '@/shared/components/InfiniteList';
import type { TvListType, TvPage } from '../api/tv';
import { tvKeys } from '../queries/tvKeys';
import { fetchTvList } from '../api/fetchTvList';
import { initialTVFilters, type TVFilters } from '../queries/filterValues';

export function getTvListOptions({
  listType,
  language = 'en-US',
  filters,
}: {
  listType: TvListType;
  language?: string;
  filters?: TVFilters;
}): InfiniteQueryOptions<TvPage> {
  const hasActiveFilters =
    filters &&
    Object.keys(filters).some((key) => {
      const filterKey = key as keyof TVFilters;
      const value = filters[filterKey];
      const initialValue = initialTVFilters[filterKey];

      if (Array.isArray(value) && Array.isArray(initialValue)) {
        return JSON.stringify(value) !== JSON.stringify(initialValue);
      }
      return value !== initialValue;
    });
  return {
    queryKey: tvKeys.list({
      type: hasActiveFilters ? 'discover' : 'standard',
      listType,
      language,
      filters: hasActiveFilters ? JSON.stringify(filters) : undefined,
    }),
    queryFn: ({ pageParam = 1 }) =>
      fetchTvList({
        pageParam,
        listType,
        language,
        filters: hasActiveFilters ? filters : undefined,
        useDiscover: hasActiveFilters,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TvPage) => lastPage.nextPage,
  };
}

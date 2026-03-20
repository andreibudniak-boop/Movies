import type { InfiniteQueryOptions } from '@/shared/components/InfiniteList';
import type { TvListType, TvPage } from '../api/tv';
import { tvKeys } from '../queries/tvKeys';
import { fetchTvList } from '../api/fetchTvList';
import { initialTVFilters, type TVFilters } from '../queries/filterValues';

function hasActiveTvFilters(filters?: TVFilters): boolean {
  if (!filters) return false;

  for (const key in initialTVFilters) {
    const value = filters[key as keyof TVFilters];
    const initialValue = initialTVFilters[key as keyof TVFilters];

    if (Array.isArray(value) && Array.isArray(initialValue)) {
      if (value.length !== initialValue.length) return true;

      for (let i = 0; i < value.length; i++) {
        if (value[i] !== initialValue[i]) return true;
      }
    } else {
      if (value !== initialValue) return true;
    }
  }

  return false;
}

export function getTvListOptions({
  listType,
  language = 'en-US',
  filters,
}: {
  listType: TvListType;
  language?: string;
  filters?: TVFilters;
}): InfiniteQueryOptions<TvPage> {
  const hasActiveFilters = hasActiveTvFilters(filters);

  return {
    queryKey: tvKeys.list({
      type: hasActiveFilters ? 'discover' : 'standard',
      listType,
      language,
      filters: hasActiveFilters ? filters : undefined,
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

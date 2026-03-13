import type { InfiniteQueryOptions } from '@/shared/components/InfiniteList';
import type { MovieListType, MoviePage } from '../api/movie';
import { movieKeys } from '../queries/movieKeys';
import { fetchMovieList } from '../api/fetchMovieList';
import { initialFilters, type Filters } from '../queries/filterValues';

export function getMovieListOptions({
  listType,
  language = 'en-US',
  filters,
}: {
  listType: MovieListType;
  language?: string;
  filters?: Filters;
}): InfiniteQueryOptions<MoviePage> {
  const hasActiveFilters =
    filters &&
    Object.keys(filters).some((key) => {
      const filterKey = key as keyof Filters;
      const value = filters[filterKey];
      const initialValue = initialFilters[filterKey];

      if (Array.isArray(value) && Array.isArray(initialValue)) {
        return JSON.stringify(value) !== JSON.stringify(initialValue);
      }
      return value !== initialValue;
    });

  return {
    queryKey: movieKeys.list({
      type: hasActiveFilters ? 'discover' : 'standard',
      listType,
      language,
      filters: hasActiveFilters ? JSON.stringify(filters) : undefined,
    }),
    queryFn: ({ pageParam = 1 }) =>
      fetchMovieList({
        pageParam,
        listType,
        language,
        filters: hasActiveFilters ? filters : undefined,
        useDiscover: hasActiveFilters,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: MoviePage) => lastPage.nextPage,
  };
}

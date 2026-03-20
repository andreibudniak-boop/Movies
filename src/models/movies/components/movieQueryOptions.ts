import type { InfiniteQueryOptions } from '@/shared/components/InfiniteList';
import type { MovieListType, MoviePage } from '../api/movie';
import { movieKeys } from '../queries/movieKeys';
import { fetchMovieList } from '../api/fetchMovieList';
import { initialMovieFilters, type MovieFilters } from '../queries/filterValues';

function hasActiveMovieFilters(filters?: MovieFilters): boolean {
  if (!filters) return false;

  for (const key in initialMovieFilters) {
    const value = filters[key as keyof MovieFilters];
    const initialValue = initialMovieFilters[key as keyof MovieFilters];

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

export function getMovieListOptions({
  listType,
  language = 'en-US',
  filters,
}: {
  listType: MovieListType;
  language?: string;
  filters?: MovieFilters;
}): InfiniteQueryOptions<MoviePage> {
  const hasActiveFilters = hasActiveMovieFilters(filters);

  return {
    queryKey: movieKeys.list({
      type: hasActiveFilters ? 'discover' : 'standard',
      listType,
      language,
      filters: hasActiveFilters ? filters : undefined,
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

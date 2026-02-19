import type { InfiniteQueryOptions } from '@/shared/components/InfiniteList';
import type { MovieListType, MoviePage } from '../api/movie';
import { movieKeys } from '../queries/movieKeys';
import { fetchMovieList } from '../api/fetchMovieList';

export function getMovieListOptions({
  listType,
  language = 'en-US',
}: {
  listType: MovieListType;
  language?: string;
}): InfiniteQueryOptions<MoviePage> {
  return {
    queryKey: movieKeys.list({
      sort: listType,
      language,
    }),
    queryFn: ({ pageParam = 1 }) => fetchMovieList({ pageParam, listType, language }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: MoviePage) => lastPage.nextPage,
  };
}

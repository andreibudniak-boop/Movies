import type { UseQueryOptions } from '@tanstack/react-query';
import type { MovieId } from '../api/movie';
import { movieKeys } from './movieKeys';
import { fetchMovie } from '../api/fetchMovie';

export function getMovieOptions({
  movieId,
  language = 'en-US',
}: {
  movieId: string;
  language?: string;
}): UseQueryOptions<MovieId> {
  return {
    queryKey: movieKeys.movie({
      id: movieId,
      language,
    }),
    queryFn: () => fetchMovie({ movieId, language }),
  };
}

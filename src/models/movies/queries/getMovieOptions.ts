import type { UseQueryOptions } from '@tanstack/react-query';
import type { MovieId } from '../api/movie';
import { movieKeys } from './movieKeys';
import { fetchMovie } from '../api/fetchMovie';

type MovieOptionsProps = {
  movieId: string;
  language?: string;
};

export function getMovieOptions({
  movieId,
  language = 'en-US',
}: MovieOptionsProps): UseQueryOptions<MovieId> {
  return {
    queryKey: movieKeys.movie({
      id: movieId,
      language,
    }),
    queryFn: () => fetchMovie({ movieId, language }),
  };
}

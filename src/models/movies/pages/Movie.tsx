import { useParams } from '@tanstack/react-router';
import { MediaDetails } from '@/shared/components/MediaDetails';
import type { MediaDetailsType } from '@/shared/types/types';
import { getMovieOptions } from '../queries/getMovieOptions';
import { useQuery } from '@tanstack/react-query';

export function normalizeMovie(movie: any): MediaDetailsType {
  return {
    id: movie.id,
    title: movie.original_title,
    releaseDate: movie.release_date,
    posterPath: movie.poster_path,
    backdropPath: movie.backdrop_path,
    genres: movie.genres,
    overview: movie.overview,
    voteAverage: movie.vote_average,
    tagline: movie.tagline,
    runtime: movie.runtime,
  };
}

export default function Movie() {
  const { movieId } = useParams({ from: '/movie/$movieId' });
  const { data, error, isLoading } = useQuery(getMovieOptions({ movieId }));

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;
  if (!data) return <div>no data...</div>;

  const normalized = normalizeMovie(data);

  return <MediaDetails media={normalized} />;
}

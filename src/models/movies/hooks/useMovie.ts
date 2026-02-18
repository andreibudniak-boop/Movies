import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../shared/axiosCreate';
import { movieKeys } from '../queries/movieKeys';
import type { MovieId } from '../api/movie';

interface UseMovieProps {
  movieId: string;
  language?: string;
}
const fetchMovie = async ({
  movieId,
  language = 'en-US',
}: {
  movieId: string;
  language?: string;
}) => {
  const response = await axiosInstance.get(`/movie/${movieId}?language=${language}`);

  if (response.status === 404) {
    throw new Error('Ошибка запроса');
  }

  return response.data as MovieId;
};

export const useMovie = ({ movieId, language }: UseMovieProps) => {
  return useQuery({
    queryKey: movieKeys.movie({ id: movieId }),
    queryFn: () => fetchMovie({ movieId, language }),
  });
};

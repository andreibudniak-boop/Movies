import { axiosInstance } from '@/shared/axiosCreate';
import type { MovieId } from './movie';

type FetchMovieProps = {
  movieId: string;
  language?: string;
};

export const fetchMovie = async ({
  movieId,
  language = 'en-US',
}: FetchMovieProps): Promise<MovieId> => {
  const response = await axiosInstance.get(`/movie/${movieId}?language=${language}`);

  if (response.status === 404) {
    throw new Error('Ошибка запроса');
  }

  return response.data;
};

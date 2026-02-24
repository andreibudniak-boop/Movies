import { axiosInstance } from '@/shared/axiosCreate';
import type { MovieId } from './movie';

export const fetchMovie = async ({
  movieId,
  language = 'en-US',
}: {
  movieId: string;
  language?: string;
}): Promise<MovieId> => {
  const response = await axiosInstance.get(`/movie/${movieId}?language=${language}`);

  if (response.status === 404) {
    throw new Error('Ошибка запроса');
  }

  return response.data;
};

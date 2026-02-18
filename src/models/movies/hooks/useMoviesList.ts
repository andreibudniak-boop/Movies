import { useInfiniteQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../shared/axiosCreate';
import { movieKeys } from '../queries/movieKeys';
import type { MovieListType } from '../api/movie';

interface UseMovieListProps {
  listType: MovieListType;
  language?: string;
}
const fetchMovieList = async ({
  pageParam = 1,
  listType,
  language = 'en-US',
}: {
  pageParam?: number;
  listType: MovieListType;
  language?: string;
}) => {
  const response = await axiosInstance.get(
    `/movie/${listType}?language=${language}&page=${pageParam}`
  );

  if (response.status === 404) {
    throw new Error('Ошибка запроса');
  }

  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
    totalResults: response.data.total_results,
    currentPage: response.data.page,
    nextPage: response.data.page < response.data.total_pages ? response.data.page + 1 : undefined,
  };
};

export const useMovieList = ({ listType, language = 'en-US' }: UseMovieListProps) => {
  return useInfiniteQuery({
    queryKey: movieKeys.list({
      sort: listType,
      language,
    }),
    queryFn: ({ pageParam = 1 }) => fetchMovieList({ pageParam, listType, language }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

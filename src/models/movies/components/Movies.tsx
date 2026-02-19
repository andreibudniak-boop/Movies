import type { Movie, MovieListType } from '../api/movie';
import { InfiniteList } from '@/shared/components/InfiniteList';
import type { CardType } from '@/shared/types/types';
import { movieKeys } from '../queries/movieKeys';
import { axiosInstance } from '@/shared/axiosCreate';

type MovieProps = {
  listType: MovieListType;
  language?: string;
};

type MoviePage = {
  results: Movie[];
  nextPage?: number;
};

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
    nextPage: response.data.page < response.data.total_pages ? response.data.page + 1 : undefined,
  };
};

const normalizeItem = (item: Movie): CardType => {
  return {
    id: item.id,
    title: item.original_title,
    poster_path: item.poster_path,
    vote_average: item.vote_average,
    date: item.release_date,
    link: `/movie/${item.id}`,
  };
};

export function Movies({ listType, language = 'en-US' }: MovieProps) {
  const movieListOptions = {
    queryKey: movieKeys.list({
      sort: listType,
      language,
    }),
    queryFn: ({ pageParam = 1 }) => fetchMovieList({ pageParam, listType, language }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: MoviePage) => lastPage.nextPage,
  };
  return <InfiniteList<Movie> queryOptions={movieListOptions} normalizeItem={normalizeItem} />;
}

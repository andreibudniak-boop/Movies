import type { Movie, MovieListType } from '../api/movie';
import { InfiniteList } from '@/shared/components/InfiniteList';
import type { CardType } from '@/shared/types/types';
import { getMovieListOptions } from './movieQueryOptions';

type MovieProps = {
  listType: MovieListType;
  language?: string;
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
  const movieListOptions = getMovieListOptions({ listType, language });
  return <InfiniteList<Movie> queryOptions={movieListOptions} normalizeItem={normalizeItem} />;
}

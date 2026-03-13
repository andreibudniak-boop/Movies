import type { Movie, MovieListType } from '../api/movie';
import { InfiniteList } from '@/shared/components/InfiniteList';
import type { CardType } from '@/shared/types/types';
import { getMovieListOptions } from './movieQueryOptions';
import type { MovieFilters } from '../queries/filterValues';

type MovieProps = {
  listType: MovieListType;
  language?: string;
  filters: MovieFilters;
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

export function Movies({ listType, language = 'en-US', filters }: MovieProps) {
  const movieListOptions = getMovieListOptions({ listType, language, filters });
  return <InfiniteList<Movie> queryOptions={movieListOptions} normalizeItem={normalizeItem} />;
}

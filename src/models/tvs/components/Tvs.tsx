import type { Tv, TvListType } from '../api/tv';
import type { CardType } from '@/shared/types/types';
import { InfiniteList } from '@/shared/components/InfiniteList';
import { getTvListOptions } from './tvQueryOptions';

type TvProps = {
  listType: TvListType;
  language?: string;
};

const normalizeItem = (item: Tv): CardType => {
  return {
    id: item.id,
    title: item.original_name,
    poster_path: item.poster_path,
    vote_average: item.vote_average,
    date: item.first_air_date,
    link: `/tv/${item.id}`,
  };
};

export function Tvs({ listType, language = 'en-US' }: TvProps) {
  const tvListOptions = getTvListOptions({ listType, language });

  return <InfiniteList<Tv> queryOptions={tvListOptions} normalizeItem={normalizeItem} />;
}

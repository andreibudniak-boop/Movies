import type { CardType } from '../types/types';
import Card from './Card';
import type { Movie } from '@/models/movies/api/movie';
import type { Tv } from '@/models/tvs/api/tv';

type GridProps = {
  items: (Movie | Tv)[];
  ref?: React.RefObject<HTMLDivElement | null>;
};

export function Grid({ items, ref }: GridProps) {
  const normalizeItem = (item: Movie | Tv): CardType => {
    const isMovie = 'title' in item;
    if (isMovie) {
      return {
        type: 'movie',
        id: item.id,
        title: item.original_title,
        poster_path: item.poster_path,
        vote_average: item.vote_average,
        date: item.release_date,
      };
    } else {
      return {
        type: 'tv',
        id: item.id,
        title: item.original_name,
        poster_path: item.poster_path,
        vote_average: item.vote_average,
        date: item.first_air_date,
      };
    }
  };

  return (
    <div className="ml-[30px] max-w-[1030px]  flex flex-wrap gap-4 justify-between ">
      {items.map((item) => {
        const normalizedItem: CardType = normalizeItem(item);
        return <Card key={item.id} {...normalizedItem} />;
      })}

      <div ref={ref} className=" w-full h-10 flex justify-center"></div>
    </div>
  );
}

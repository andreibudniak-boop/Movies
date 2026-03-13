import { useMovieFilterStore, useTVFilterStore } from '@/shared/store/store';
import { Button } from '../ui/button';
import { cn } from '@/shared/lib/utils';
import type { ListType } from '@/shared/types/types';

const movieGenres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

const tvGenres = [
  { id: 10759, name: 'Action & Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 10762, name: 'Kids' },
  { id: 9648, name: 'Mystery' },
  { id: 10763, name: 'News' },
  { id: 10764, name: 'Reality' },
  { id: 10765, name: 'Sci-Fi & Fantasy' },
  { id: 10766, name: 'Soap' },
  { id: 10767, name: 'Talk' },
  { id: 10768, name: 'War & Politics' },
  { id: 37, name: 'Western' },
];

export function GenresFilter({ type }: { type: ListType }) {
  const store = type === 'movie' ? useMovieFilterStore() : useTVFilterStore();
  const genres = type === 'movie' ? movieGenres : tvGenres;
  const selected = store.draftFilters.with_genres ?? [];
  const setFilter = store.setFilter;

  const toggleGenre = (id: number) => {
    let updated: number[];

    if (selected.includes(id)) {
      updated = selected.filter((g: number) => g !== id);
    } else {
      updated = [...selected, id];
    }

    setFilter('with_genres', updated);
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium">Genres</p>

      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => {
          const active = selected.includes(genre.id);

          return (
            <Button
              key={genre.id}
              size="sm"
              variant="outline"
              onClick={() => toggleGenre(genre.id)}
              className={cn(
                'rounded-full px-3 py-1 text-xs',
                active && 'bg-blue-500 text-white border-sky-500 hover:bg-blue-400 hover:text-white'
              )}
            >
              {genre.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

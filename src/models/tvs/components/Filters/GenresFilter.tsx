import { useTVFilterStore } from '@/shared/store/store';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

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

export function GenresFilter() {
  const store = useTVFilterStore();
  const genres = tvGenres;
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

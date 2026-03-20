import { FiltersDropdown } from './FiltersDropdown';
import { SortDropdown } from './SortDropdown';
import { Button } from '@/shared/components/ui/button';
import { useMovieFilterStore } from '@/shared/store/store';

export function Filters() {
  const isDirty = useMovieFilterStore((state) => state.isDirty());
  const apply = useMovieFilterStore((state) => state.applyFilters);

  return (
    <div className="w-[260px] ">
      <SortDropdown />
      <FiltersDropdown />
      {isDirty && (
        <Button
          className="w-full mt-5 text-secondary bg-blue-500 hover:bg-blue-400 hover:text-secondary"
          onClick={apply}
        >
          Искать
        </Button>
      )}
    </div>
  );
}

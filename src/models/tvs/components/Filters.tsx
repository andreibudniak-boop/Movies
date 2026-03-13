'use client';
import { FiltersDropdown } from '@/shared/components/filters/FiltersDropdown';
import { SortDropdown } from '@/shared/components/filters/SortDropdown';
import { Button } from '@/shared/components/ui/button';
import { useTVFilterStore } from '@/shared/store/store';

export function Filters() {
  const isDirty = useTVFilterStore((state) => state.isDirty());
  const apply = useTVFilterStore((state) => state.applyFilters);

  return (
    <div className="w-[260px] ">
      <SortDropdown type="tv" />
      <FiltersDropdown type="tv" />
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

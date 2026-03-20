import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { ChevronDown } from 'lucide-react';
import FilterSlider from '@/shared/components/filters/FiltersSlider';
import { useTVFilterStore } from '@/shared/store/store';
import { GenresFilter } from './GenresFilter';

export function FiltersDropdown() {
  const [isOpen, setIsOpen] = useState(true);

  const store = useTVFilterStore();
  const draft = store.draftFilters;
  const setFilter = store.setFilter;

  return (
    <div className="w-full mt-[12px]">
      <Button
        variant="outline"
        className={`py-6 flex items-center gap-2 w-full justify-between ${isOpen ? 'rounded-b-none border-b-1' : 'rounded-lg'}  transition-none `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Фильтры</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? '-rotate-90' : ''}`}
        />
      </Button>

      <div
        className={`
          overflow-hidden transition-all duration-200 ease-in-out
          ${isOpen ? 'h-auto ' : 'max-h-0'}
        `}
      >
        <div className="w-full border border-t-0  bg-background shadow-sm p-3">
          <p className="mb-2 text-sm font-medium">Спецификация</p>

          <Select
            value={draft.include_adult === true ? 'include adult' : 'execute adult'}
            onValueChange={(value) => setFilter('include_adult', value === 'include adult')}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите сортировку" />
            </SelectTrigger>
            <SelectContent
              className="w-[235px]"
              position="popper"
              sideOffset={-4}
              alignOffset={-12}
            >
              <SelectItem value="include adult">Include Adult</SelectItem>
              <SelectItem value="execute adult">Execute Adult</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="p-6 space-y-8 max-w-md mx-auto w-full border border-t-0  bg-background shadow-sm p-3">
          <FilterSlider
            label="User Score"
            minValue={0}
            maxValue={10}
            defaultValue={[draft.vote_average_gte, draft.vote_average_lte]}
            tickValues={[0, 5, 10]}
            mode="range"
            onValueChange={(value) => {
              if (typeof value == 'object') {
                setFilter('vote_average_gte', value[0]);
                setFilter('vote_average_lte', value[1]);
              }
            }}
          />

          <FilterSlider
            label="Minimum User Votes"
            minValue={0}
            maxValue={500}
            step={10}
            defaultValue={draft.vote_count_gte}
            tickValues={[0, 100, 200, 300, 400, 500]}
            mode="single"
            onValueChange={(value) => {
              if (typeof value == 'number') setFilter('vote_count_gte', value);
            }}
          />

          <FilterSlider
            label="Runtime"
            minValue={0}
            maxValue={360}
            step={15}
            defaultValue={[draft.with_runtime_gte, draft.with_runtime_lte]}
            tickValues={[0, 120, 240, 360]}
            mode="range"
            onValueChange={(value) => {
              if (typeof value == 'object') {
                setFilter('with_runtime_gte', value[0]);
                setFilter('with_runtime_lte', value[1]);
              }
            }}
          />
        </div>

        <div className="w-full border border-t-0 bg-background  rounded-b-lg shadow-sm p-3">
          <GenresFilter />
        </div>
      </div>
    </div>
  );
}

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
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { useTVFilterStore } from '@/shared/store/store';

export function SortDropdown() {
  const [isOpen, setIsOpen] = useState(true);

  const store = useTVFilterStore();

  const draft = store.draftFilters;
  const setFilter = store.setFilter;

  const sortOptions = [
    { value: 'first_air_date.asc', label: 'Дате релиза (старые сначала)' },
    { value: 'first_air_date.desc', label: 'Дате релиза (новые сначала)' },
    { value: 'name.asc', label: 'Названию (А-Я)' },
    { value: 'name.desc', label: 'Названию (Я-А)' },
    { value: 'popularity.asc', label: 'Популярности (возрастание)' },
    { value: 'popularity.desc', label: 'Популярности (убывание)' },
    { value: 'vote_average.asc', label: 'Рейтингу (возрастание)' },
    { value: 'vote_average.desc', label: 'Рейтингу (убывание)' },
    { value: 'vote_count.asc', label: 'Кол-ву голосов (возрастание)' },
    { value: 'vote_count.desc', label: 'Кол-ву голосов (убывание)' },
  ];

  return (
    <div className="w-full">
      <Button
        variant="outline"
        className={`py-6 flex items-center gap-2 w-full justify-between ${isOpen ? 'rounded-b-none border-b-1' : 'rounded-lg'}  transition-none `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Сортировать</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? '-rotate-90' : ''}`}
        />
      </Button>

      <div
        className={`
          overflow-hidden transition-all duration-200 ease-in-out
          ${isOpen ? 'max-h-96 ' : 'max-h-0'}
        `}
      >
        <div className="w-full border border-t-0 rounded-b-lg bg-background shadow-sm p-3">
          <p className="mb-2 text-sm font-medium">Сортировать результаты по</p>

          <Select value={draft.sort_by} onValueChange={(value) => setFilter('sort_by', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите сортировку" />
            </SelectTrigger>
            <SelectContent
              className="w-[235px]"
              position="popper"
              sideOffset={-4}
              alignOffset={-12}
            >
              <ScrollArea className="h-[200px] w-[260px]  ">
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

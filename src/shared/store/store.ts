import { create } from 'zustand';
import { initialFilters, type Filters } from '@/models/movies/queries/filterValues';

type FilterStore = {
  draftFilters: Filters;
  appliedFilters: Filters;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  applyFilters: () => void;
  isDirty: () => boolean;
};

export const useFilterStore = create<FilterStore>((set, get) => ({
  draftFilters: initialFilters,
  appliedFilters: initialFilters,

  setFilter: (key, value) =>
    set((state) => ({
      draftFilters: {
        ...state.draftFilters,
        [key]: value,
      },
    })),

  applyFilters: () =>
    set((state) => ({
      appliedFilters: {
        ...state.draftFilters,
      },
    })),

  isDirty: () => {
    const { draftFilters, appliedFilters } = get();
    return JSON.stringify(appliedFilters) !== JSON.stringify(draftFilters);
  },

  // hasActiveFilters: () => {
  //   const { appliedFilters } = get();

  //   return (Object.keys(appliedFilters) as Array<keyof Filters>).some((key) => {
  //     const value = appliedFilters[key];
  //     const initialValue = initialFilters[key];

  //     if (Array.isArray(value) && Array.isArray(initialValue)) {
  //       return JSON.stringify(value) !== JSON.stringify(initialValue);
  //     }
  //     return value !== initialValue;
  //   });
  // },
}));

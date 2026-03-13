import { create } from 'zustand';
import { initialMovieFilters, type MovieFilters } from '@/models/movies/queries/filterValues';

import { initialTVFilters, type TVFilters } from '@/models/tvs/queries/filterValues';

type MovieFilterStore = {
  draftFilters: MovieFilters;
  appliedFilters: MovieFilters;
  setFilter: <K extends keyof MovieFilters>(key: K, value: MovieFilters[K]) => void;
  applyFilters: () => void;
  isDirty: () => boolean;
};

export const useMovieFilterStore = create<MovieFilterStore>((set, get) => ({
  draftFilters: initialMovieFilters,
  appliedFilters: initialMovieFilters,

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
}));

type TVFilterStore = {
  draftFilters: TVFilters;
  appliedFilters: TVFilters;
  setFilter: <K extends keyof TVFilters>(key: K, value: TVFilters[K]) => void;
  applyFilters: () => void;
  isDirty: () => boolean;
};

export const useTVFilterStore = create<TVFilterStore>((set, get) => ({
  draftFilters: initialTVFilters,
  appliedFilters: initialTVFilters,

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
}));

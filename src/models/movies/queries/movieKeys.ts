import type { MovieFilters } from './filterValues';

export const movieKeys = {
  all: ['movies'] as const,

  movie: (params: { id: string; language?: string }) => [{ ...params }] as const,

  lists: () => [...movieKeys.all, 'list'] as const,

  list: (params: {
    type?: 'standard' | 'discover';
    listType?: string;
    pagination?: number;
    language?: string;
    filters?: MovieFilters;
  }) => [...movieKeys.lists(), { ...params }] as const,
};

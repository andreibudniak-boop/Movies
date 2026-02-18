export const movieKeys = {
  all: ['movies'] as const,

  movie: (params: { id: string; language?: string }) => [{ ...params }] as const,

  lists: () => [...movieKeys.all, 'list'] as const,

  list: (params: { sort?: string; pagination?: number; language?: string; filters?: object }) =>
    [...movieKeys.lists(), { ...params }] as const,
};

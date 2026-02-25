export const tvKeys = {
  all: ['tvs'] as const,

  tv: (params: { id: string; language?: string }) => [{ ...params }] as const,

  lists: () => [...tvKeys.all, 'list'] as const,

  list: (params: { sort?: string; pagination?: number; language?: string; filters?: object }) =>
    [...tvKeys.lists(), { ...params }] as const,
};

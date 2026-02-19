export const tvKeys = {
  all: ['tvs'] as const,

  tv: (id: string) => ['tv', { id }] as const,

  lists: () => [...tvKeys.all, 'list'] as const,

  list: (params: { sort?: string; pagination?: number; language?: string; filters?: object }) =>
    [...tvKeys.lists(), { ...params }] as const,
};

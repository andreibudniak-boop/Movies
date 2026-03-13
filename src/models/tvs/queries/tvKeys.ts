export const tvKeys = {
  all: ['tvs'] as const,

  tv: (params: { id: string; language?: string }) => [{ ...params }] as const,

  lists: () => [...tvKeys.all, 'list'] as const,

  list: (params: {
    type?: 'standard' | 'discover';
    listType?: string;
    pagination?: number;
    language?: string;
    filters?: string;
  }) => [...tvKeys.lists(), { ...params }] as const,
};

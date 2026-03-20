import { initialMovieFilters, type MovieFilters } from '../queries/filterValues';
import type { DiscoverParams } from './movie';

type BuildDiscoverParamsProps = {
  pageParam: number;
  language: string;
  filters?: MovieFilters;
};

const filtersToParamsMap: Record<keyof MovieFilters, keyof DiscoverParams | null> = {
  include_adult: 'include_adult',
  sort_by: 'sort_by',
  vote_average_gte: 'vote_average.gte',
  vote_average_lte: 'vote_average.lte',
  vote_count_gte: 'vote_count.gte',
  with_runtime_gte: 'with_runtime.gte',
  with_runtime_lte: 'with_runtime.lte',
  with_genres: 'with_genres',
  release_date_gte: 'release_date.gte',
  release_date_lte: 'release_date.lte',
};

export function buildDiscoverParams({ language, pageParam, filters }: BuildDiscoverParamsProps) {
  const discoverParams: Partial<DiscoverParams> = {
    language,
    page: pageParam,
  };

  if (!filters) return discoverParams;

  (Object.keys(filters) as (keyof MovieFilters)[]).forEach((filterKey) => {
    const paramKey = filtersToParamsMap[filterKey];
    if (!paramKey) return;

    const value = filters[filterKey];
    const defaultValue = initialMovieFilters[filterKey];

    if (Array.isArray(value)) {
      if (value.length > 0) {
        discoverParams[paramKey as keyof DiscoverParams] = value.join('|') as any;
      }
    } else if (value !== defaultValue) {
      discoverParams[paramKey as keyof DiscoverParams] = value as any;
    }
  });

  return discoverParams;
}

export const initialTVFilters: TVFilters = {
  include_adult: false,
  sort_by: 'popularity.desc',
  vote_average_lte: 10,
  vote_average_gte: 0,
  vote_count_gte: 0,
  with_runtime_gte: 0,
  with_runtime_lte: 360,
  with_genres: [],
  air_date_gte: '',
  air_date_lte: '',
};

export type TVFilters = {
  include_adult: boolean;
  sort_by: string;
  vote_average_lte: number;
  vote_average_gte: number;
  vote_count_gte: number;
  with_runtime_gte: number;
  with_runtime_lte: number;
  with_genres: number[];
  air_date_gte: string;
  air_date_lte: string;
};

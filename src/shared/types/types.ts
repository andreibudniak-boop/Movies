export interface CardType {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  date: string;
  link: string;
}

export interface Page {
  results: [object];
}

export interface MediaDetailsType {
  id: number;
  title: string;
  releaseDate?: string;
  posterPath?: string | null;
  backdropPath?: string | null;
  genres: Array<{ id: number; name: string }>;
  overview: string;
  voteAverage: number;
  tagline?: string | null;
  runtime?: number;
}

export type ListType = 'tv' | 'movie';

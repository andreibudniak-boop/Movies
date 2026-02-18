export interface CardType {
  type: 'tv' | 'movie';
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  date: string;
  [key: string]: unknown;
}

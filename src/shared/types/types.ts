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

import { createFileRoute } from '@tanstack/react-router';
import TopRated from '@/models/movies/pages/TopRated';

export const Route = createFileRoute('/movie/top-rated')({
  component: TopRated,
});

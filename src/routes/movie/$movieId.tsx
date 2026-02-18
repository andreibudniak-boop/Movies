import { createFileRoute } from '@tanstack/react-router';
import Movie from '../../models/movies/pages/Movie';

export const Route = createFileRoute('/movie/$movieId')({
  component: Movie,
});

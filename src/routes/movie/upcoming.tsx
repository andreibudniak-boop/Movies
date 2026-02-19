import { createFileRoute } from '@tanstack/react-router';
import Upcoming from '../../models/movies/pages/Upcoming';

export const Route = createFileRoute('/movie/upcoming')({
  component: Upcoming,
});

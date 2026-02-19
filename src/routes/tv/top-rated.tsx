import TopRated from '@/models/tvs/pages/TopRated';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tv/top-rated')({
  component: TopRated,
});

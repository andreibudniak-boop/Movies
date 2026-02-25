import { createFileRoute } from '@tanstack/react-router';
import NowPlaying from '@/models/movies/pages/NowPlaying';

export const Route = createFileRoute('/movie/now-playing')({
  component: NowPlaying,
});

import OnTheAir from '@/models/tvs/pages/OnTheAir';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tv/on-the-air')({
  component: OnTheAir,
});

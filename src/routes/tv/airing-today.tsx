import AiringToday from '@/models/tvs/pages/AiringToday';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tv/airing-today')({
  component: AiringToday,
});

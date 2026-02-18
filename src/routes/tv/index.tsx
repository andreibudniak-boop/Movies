import { createFileRoute } from '@tanstack/react-router';
import Popular from '@/models/tvs/pages/Popular';

export const Route = createFileRoute('/tv/')({
  component: Popular,
});

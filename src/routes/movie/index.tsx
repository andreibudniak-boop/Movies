import { createFileRoute } from '@tanstack/react-router';
import Popular from '../../models/movies/pages/Popular';

export const Route = createFileRoute('/movie/')({
  component: Popular,
});

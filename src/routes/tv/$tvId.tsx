import { createFileRoute } from '@tanstack/react-router';
import Tv from '../../models/tvs/pages/Tv';

export const Route = createFileRoute('/tv/$tvId')({
  component: Tv,
});

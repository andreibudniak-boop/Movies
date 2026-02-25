import { useParams } from '@tanstack/react-router';
import type { MediaDetailsType } from '@/shared/types/types';
import { useQuery } from '@tanstack/react-query';
import { getTvOptions } from '../queries/getTvOptions';
import { MediaDetails } from '@/shared/components/MediaDetails';

function normalizeTv(tv: any): MediaDetailsType {
  return {
    id: tv.id,
    title: tv.original_name || tv.name,
    releaseDate: tv.first_air_date,
    posterPath: tv.poster_path,
    backdropPath: tv.backdrop_path,
    genres: tv.genres,
    overview: tv.overview,
    voteAverage: tv.vote_average,
    tagline: tv.tagline,
  };
}

export default function Tv() {
  const { tvId } = useParams({ from: '/tv/$tvId' });
  const { data, error, isLoading } = useQuery(getTvOptions({ tvId }));

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;
  if (!data) return <div>Нет данных</div>;

  const normalized = normalizeTv(data);

  return <MediaDetails media={normalized} />;
}

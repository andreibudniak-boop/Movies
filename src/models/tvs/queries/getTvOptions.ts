import type { UseQueryOptions } from '@tanstack/react-query';
import type { TvId } from '../api/tv';
import { tvKeys } from './tvKeys';
import { fetchTv } from '../api/fetchTv';

export function getTvOptions({
  tvId,
  language = 'en-US',
}: {
  tvId: string;
  language?: string;
}): UseQueryOptions<TvId> {
  return {
    queryKey: tvKeys.tv({ id: tvId, language }),
    queryFn: () => fetchTv({ tvId, language }),
  };
}

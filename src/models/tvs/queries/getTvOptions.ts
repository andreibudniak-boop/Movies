import type { UseQueryOptions } from '@tanstack/react-query';
import type { TvId } from '../api/tv';
import { tvKeys } from './tvKeys';
import { fetchTv } from '../api/fetchTv';

type TvOptionsProps = {
  tvId: string;
  language?: string;
};

export function getTvOptions({ tvId, language = 'en-US' }: TvOptionsProps): UseQueryOptions<TvId> {
  return {
    queryKey: tvKeys.tv({ id: tvId, language }),
    queryFn: () => fetchTv({ tvId, language }),
  };
}

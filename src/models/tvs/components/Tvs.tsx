import { useEffect, useRef } from 'react';
import { Grid } from '@/shared/components/Grid';
import type { TvListType } from '../api/tv';
import { useTvList } from '../hooks/useTvList';

type TvProps = {
  listType: TvListType;
};

export function Tvs({ listType }: TvProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useTvList({
    listType: listType,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allTvs = data?.pages.flatMap((page) => page.results) ?? [];

  return <Grid items={allTvs} ref={loadMoreRef} />;
}

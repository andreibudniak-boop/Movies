import { useEffect, useRef } from 'react';
import type { MovieListType } from '../api/movie';
import { useMovieList } from '../hooks/useMoviesList';
import { Grid } from '@/shared/components/Grid';

type MovieProps = {
  listType: MovieListType;
};

export function Movies({ listType }: MovieProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useMovieList({
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

  const allMovies = data?.pages.flatMap((page) => page.results) ?? [];

  return <Grid items={allMovies} ref={loadMoreRef} />;
}

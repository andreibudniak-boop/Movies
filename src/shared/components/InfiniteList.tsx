import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { CardType } from '@/shared/types/types';
import FilmCard from '@/shared/components/FilmCard';

type InfiniteQueryOptions<T> = {
  queryKey: readonly unknown[];
  queryFn: (context: { pageParam?: number }) => Promise<T>;
  initialPageParam: number;
  getNextPageParam: (lastPage: T) => number | undefined;
};

type InfiniteListProps<Item> = {
  queryOptions: InfiniteQueryOptions<{ results: Item[] }>;
  normalizeItem: (item: Item) => CardType;
};

export function InfiniteList<Item>({ queryOptions, normalizeItem }: InfiniteListProps<Item>) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      ...queryOptions,
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

  const allItem = data?.pages.flatMap((page) => page.results) ?? [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="ml-[30px] max-w-[1030px] flex flex-wrap gap-4 justify-between">
      {allItem.map((item) => {
        const card = normalizeItem(item);
        return <FilmCard key={card.id} {...card} />;
      })}

      <div ref={loadMoreRef} className=" w-full h-10 flex justify-center"></div>
    </div>
  );
}

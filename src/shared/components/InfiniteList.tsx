import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { CardType } from '@/shared/types/types';
import FilmCard from '@/shared/components/FilmCard';

export type InfiniteQueryOptions<T> = {
  queryKey: readonly unknown[];
  queryFn: (context: { pageParam?: number }) => Promise<T>;
  initialPageParam: number;
  getNextPageParam: (lastPage: T) => number | undefined;
};

type InfiniteListProps<Item> = {
  queryOptions: InfiniteQueryOptions<{ results: Item[] }>;
  normalizeItem: (item: Item) => CardType;
  emptyComponent?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
};

const DefaultLoading = () => (
  <div className="flex justify-center items-center min-h-[400px] w-full">
    <div className="text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
      <p className="mt-2 text-gray-600">Загрузка...</p>
    </div>
  </div>
);

const DefaultError = ({ message }: { message: string }) => (
  <div className="flex justify-center items-center min-h-[400px] w-full">
    <div className="text-center text-red-500">
      <p className="text-xl mb-2"> Ошибка загрузки </p>
      <p>{message}</p>
    </div>
  </div>
);

const DefaultEmpty = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] w-full  rounded-lg p-8">
    <div className="text-6xl mb-4">🎬</div>
    <h3 className="text-2xl font-bold text-gray-800 mb-2">Ничего не найдено</h3>
    <p className="text-gray-600 text-center max-w-md">
      По вашему запросу ничего не найдено. Попробуйте изменить параметры фильтрации.
    </p>
  </div>
);

export function InfiniteList<Item>({
  queryOptions,
  normalizeItem,
  emptyComponent = <DefaultEmpty />,
  loadingComponent = <DefaultLoading />,
  errorComponent,
}: InfiniteListProps<Item>) {
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

  if (isLoading) return loadingComponent;
  if (error) {
    if (errorComponent) {
      return errorComponent;
    }
    return <DefaultError message={error.message} />;
  }
  if (allItem.length === 0) {
    return emptyComponent;
  }

  return (
    <div className="ml-[30px] max-w-[1030px] flex flex-wrap gap-4 justify-between">
      {allItem.map((item) => {
        const card = normalizeItem(item);
        return <FilmCard key={card.id} {...card} />;
      })}
      <div ref={loadMoreRef} className=" w-full h-10 flex justify-center">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-solid border-blue-500 border-r-transparent"></div>
            <span className="text-sm text-gray-600">Загрузка...</span>
          </div>
        )}
      </div>
    </div>
  );
}

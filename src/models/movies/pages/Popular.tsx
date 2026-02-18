import { useMovieList } from '../hooks/useMoviesList';

import type { MovieListType } from '../api/movie';
import { Movies } from '../components/Movies';
import { Filters } from '../components/Filters';

export default function Popular() {
  const listType: MovieListType = 'popular';

  const { isLoading, error } = useMovieList({
    listType: listType,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  // if (!data) return <div>No data</div>;

  return (
    <div>
      <br />
      <h2 className="scroll-m-20  pb-2 text-2xl font-semibold tracking-tight first:mt-0">
        Популярные Фильмы
      </h2>
      <br />
      <div className="flex flex-row">
        <div className=" flex flex-col shadow">
          <Filters />
        </div>
        <Movies listType={listType} />
      </div>
    </div>
  );
}

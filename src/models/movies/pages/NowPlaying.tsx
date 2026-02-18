import { Filters } from '../components/Filters';
import { useMovieList } from '../hooks/useMoviesList';
import type { MovieListType } from '../api/movie';
import { Movies } from '../components/Movies';

export default function NowPlaying() {
  const listType: MovieListType = 'now_playing';

  const { isLoading, error } = useMovieList({
    listType: listType,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <br />
      <h2 className="scroll-m-20  pb-2 text-2xl font-semibold tracking-tight first:mt-0">
        Сейчас смотрят фильмы
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

import { useParams } from '@tanstack/react-router';
import { useMovie } from '../hooks/useMovie';

export default function Movie() {
  const { movieId } = useParams({ from: '/movie/$movieId' });

  const { data, error, isLoading } = useMovie({ movieId });

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;
  if (!data) return <div>no data...</div>;

  console.log(data);

  return (
    <div>
      <h1>{movieId}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w200${data.backdrop_path}`}
        alt=""
        className="w-full max-w-[200px] h-auto block cursor-pointer"
      />
    </div>
  );
}

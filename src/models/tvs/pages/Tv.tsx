import { useQuery } from '@tanstack/react-query';
import type { TvId } from '../api/tv';
import { useParams } from '@tanstack/react-router';
import { axiosInstance } from '@/shared/axiosCreate';
import { tvKeys } from '../queries/tvKeys';

const queryFunction = async (tvId: string) => {
  try {
    const response = await axiosInstance.get(`/tv/${tvId}?language=en-US`);
    if (response.status == 404) {
      throw new Error('ошибка запроса ');
    }
    console.log(response.data);
    return response.data as TvId;
  } catch (error) {
    throw new Error('Ошибка при загрузке данных');
  }
};

export default function Movie() {
  const { tvId } = useParams({ from: '/tv/$tvId' });

  const { data, error, isLoading } = useQuery({
    queryKey: tvKeys.tv(tvId),
    queryFn: () => queryFunction(tvId),
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <div>
      <h1>{tvId}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w200${data?.poster_path}`}
        alt=""
        className="w-full max-w-[200px] h-auto block cursor-pointer"
      />
    </div>
  );
}

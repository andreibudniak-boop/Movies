import { useTvList } from '../hooks/useTvList';
import type { TvListType } from '../api/tv';
import { Tvs } from '../components/Tvs';
import { Filters } from '../components/Filters';

export default function Popular() {
  const listType: TvListType = 'popular';

  const { isLoading, error } = useTvList({
    listType: listType,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  // if (!data) return <div>No data</div>;

  return (
    <div>
      <br />
      <h2 className="scroll-m-20  pb-2 text-2xl font-semibold tracking-tight first:mt-0">
        Популярные сериалы
      </h2>
      <br />
      <div className="flex flex-row">
        <div className=" flex flex-col shadow">
          <Filters />
        </div>
        <Tvs listType={listType} />
      </div>
    </div>
  );
}

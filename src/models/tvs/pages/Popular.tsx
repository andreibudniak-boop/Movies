import { Tvs } from '../components/Tvs';
import { Filters } from '../components/Filters';

export default function Popular() {
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
        <Tvs listType="popular" />
      </div>
    </div>
  );
}

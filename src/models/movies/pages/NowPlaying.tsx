import { Filters } from '../components/Filters';
import { Movies } from '../components/Movies';

export default function NowPlaying() {
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
        <Movies listType="now_playing" />
      </div>
    </div>
  );
}

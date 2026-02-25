import { ListTitle } from '@/shared/components/ListTitle';
import type { TvListType } from '../api/tv';
import { Filters } from '../components/Filters';
import { Tvs } from './Tvs';

type TvsLayoutProps = {
  title: string;
  listType: TvListType;
};

export function TvsLayout({ title, listType }: TvsLayoutProps) {
  return (
    <div className="max-w-[1400px] m-auto">
      <ListTitle title={title} />
      <div className="flex flex-row">
        <div className="flex flex-col shadow">
          <Filters />
        </div>
        <Tvs listType={listType} />
      </div>
    </div>
  );
}

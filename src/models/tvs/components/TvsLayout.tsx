import { ListTitle } from '@/shared/components/ListTitle';
import type { TvListType } from '../api/tv';
import { Filters } from './Filters/Filters';
import { Tvs } from './Tvs';
import { Container } from '@/shared/components/Container';
import { useTVFilterStore } from '@/shared/store/store';

type TvsLayoutProps = {
  title: string;
  listType: TvListType;
};

export function TvsLayout({ title, listType }: TvsLayoutProps) {
  const appliedFilters = useTVFilterStore((state) => state.appliedFilters);
  return (
    <Container>
      <ListTitle title={title} />
      <div className="flex flex-row">
        <div className="flex flex-col ">
          <Filters />
        </div>
        <Tvs listType={listType} filters={appliedFilters} />
      </div>
    </Container>
  );
}

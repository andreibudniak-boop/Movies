import { ListTitle } from '@/shared/components/ListTitle';
import type { TvListType } from '../api/tv';
import { Filters } from '../components/Filters';
import { Tvs } from './Tvs';
import { Container } from '@/shared/components/Container';

type TvsLayoutProps = {
  title: string;
  listType: TvListType;
};

export function TvsLayout({ title, listType }: TvsLayoutProps) {
  return (
    <Container>
      <ListTitle title={title} />
      <div className="flex flex-row">
        <div className="flex flex-col shadow">
          <Filters />
        </div>
        <Tvs listType={listType} />
      </div>
    </Container>
  );
}

import { ListTitle } from '@/shared/components/ListTitle';
import type { MovieListType } from '../api/movie';
import { Filters } from '../components/Filters';
import { Movies } from './Movies';
import { Container } from '@/shared/components/Container';

type MoviesLayoutProps = {
  title: string;
  listType: MovieListType;
};

export function MoviesLayout({ title, listType }: MoviesLayoutProps) {
  return (
    <Container>
      <ListTitle title={title} />
      <div className="flex flex-row">
        <div className="flex flex-col shadow">
          <Filters />
        </div>
        <Movies listType={listType} />
      </div>
    </Container>
  );
}

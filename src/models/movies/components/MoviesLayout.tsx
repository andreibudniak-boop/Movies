import { ListTitle } from '@/shared/components/ListTitle';
import type { MovieListType } from '../api/movie';
import { Filters } from '../components/Filters';
import { Movies } from './Movies';
import { Container } from '@/shared/components/Container';
import { useMovieFilterStore } from '@/shared/store/store';

type MoviesLayoutProps = {
  title: string;
  listType: MovieListType;
};

export function MoviesLayout({ title, listType }: MoviesLayoutProps) {
  const appliedFilters = useMovieFilterStore((state) => state.appliedFilters);
  return (
    <Container>
      <ListTitle title={title} />
      <div className="flex flex-row">
        <div className="flex flex-col shadow">
          <Filters />
        </div>
        <Movies listType={listType} filters={appliedFilters} />
      </div>
    </Container>
  );
}

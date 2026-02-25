type Genre = {
  id: number;
  name: string;
};

type GenreLinksProps = {
  genres: Genre[];
};
import { Link } from '@tanstack/react-router';

export const GenreLinks = ({ genres }: GenreLinksProps) => (
  <>
    {genres.map((genre, index) => (
      <span key={genre.id}>
        <Link to="/">{genre.name}</Link>
        {index !== genres.length - 1 && ', '}
      </span>
    ))}
  </>
);

//will be done later

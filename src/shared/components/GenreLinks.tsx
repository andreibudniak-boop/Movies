type Genre = {
  id: number;
  name: string;
};

type GenreLinksProps = {
  genres: Genre[];
};

export const GenreLinks = ({ genres }: GenreLinksProps) => (
  <>
    {genres.map((genre, index) => (
      <span key={genre.id}>
        <a href={`/${genre.id}`}>{genre.name}</a>
        {index < genres.length - 1 && ', '}
      </span>
    ))}
  </>
);

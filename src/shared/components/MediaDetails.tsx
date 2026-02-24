import { generateFullPath } from '@/shared/utils/generateFullPath';
import { GenreLinks } from '@/shared/components/GenreLinks';
import { Runtime } from '@/shared/components/Runtime';
import RatingCircle from '@/shared/components/icons/RatingCircle';
import { Button } from '@/shared/components/ui/button';
import type { MediaDetailsType as IMediaDetails } from '../types/types';

interface MediaDetailsProps {
  media: IMediaDetails;
}

export function MediaDetails({ media }: MediaDetailsProps) {
  const backdropUrl = media.backdropPath ? generateFullPath(media.backdropPath) : '';
  const posterUrl = media.posterPath
    ? generateFullPath(media.posterPath)
    : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

  const releaseYear = media.releaseDate ? media.releaseDate.slice(0, 4) : '';

  return (
    <div
      className="relative w-full h-screen border-b text-white flex flex-col"
      style={{
        backgroundImage: backdropUrl ? `url(${backdropUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 py-[40px] flex max-w-[1400px] m-auto ">
        <img src={posterUrl} alt="poster" className="w-[300px] h-auto rounded-lg shadow-xl" />

        <div className="flex flex-col justify-center pl-[40px] max-w-[800px]">
          <div className="mb-6">
            <h2 className="text-4xl font-bold">
              {media.title}
              {releaseYear && <span className="font-normal opacity-80"> ({releaseYear})</span>}
            </h2>

            <div className="mt-3 flex items-center gap-4 text-white/80 flex-wrap">
              <span className="border border-white/50 px-2 py-[2px] text-sm rounded">PG-13</span>

              {media.releaseDate && <span>{media.releaseDate.replaceAll('-', '/')}</span>}

              <GenreLinks genres={media.genres} />

              {media.runtime && <Runtime minutes={media.runtime} />}
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="hover:scale-[1.1] transition-transform">
              <RatingCircle rating={media.voteAverage} />
            </div>
            <span className="font-medium">Рейтинг</span>

            <ul className="pl-10 flex items-center justify-between">
              <li className="w-9 h-9 -ml-3 flex items-center justify-center cursor-pointer rounded-full duration-150 bg-[#032541] hover:scale-[1.1] transition-transform">
                <img
                  className="w-7 h-7"
                  src="https://www.themoviedb.org/assets/2/v8/1f914-3bddd22b1fdb581063d478b4b626bb58a478698d06d6b6d1969accf67e394fdc.svg"
                  alt=""
                />
              </li>
              <li className="w-9 h-9 -ml-3 flex items-center justify-center cursor-pointer rounded-full duration-150 bg-[#032541] hover:scale-[1.1] transition-transform">
                <img
                  className="w-7 h-7"
                  src="https://www.themoviedb.org/assets/2/v8/1f92f-a18cb233c7639241a00dd2fea97c74a12765c05a55b881653868dad147165eda.svg"
                  alt=""
                />
              </li>
              <li className="w-9 h-9 -ml-3 flex items-center justify-center cursor-pointer rounded-full duration-150 bg-[#032541] hover:scale-[1.1] transition-transform">
                <img
                  className="w-7 h-7"
                  src="https://www.themoviedb.org/assets/2/v8/1f60d-f12478ffe50d98da9d6cafbf29ef1777b8d1d2bb123224c978ca9ba4e6e6159b.svg"
                  alt=""
                />
              </li>
            </ul>

            <div className="pl-10">
              <Button variant="my">
                What's your Vibe{' '}
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/40 text-xs font-bold">
                  i
                </span>
              </Button>
            </div>
          </div>

          <div>
            <ul className="pt-5 flex items-center gap-3 flex-wrap">
              <li>
                <Button variant="tmdbCircle" size="icon-xl">
                  <img
                    className="w-4 h-4"
                    src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-159-thumbnails-list-white-c260ea972eebf812289fd3c41d0d2c1dff33ecbcd62be13fba8eeaf9de173789.svg"
                    alt=""
                  />
                </Button>
              </li>
              <li>
                <Button variant="tmdbCircle" size="icon-xl">
                  <img
                    className="w-4 h-4"
                    src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-13-heart-white-28d2cc2d6418c5047efcfd2438bfc5d109192671263c270993c05f130cc4584e.svg"
                    alt=""
                  />
                </Button>
              </li>
              <li>
                <Button variant="tmdbCircle" size="icon-xl">
                  <img
                    className="w-4 h-4"
                    src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-73-bookmark-white-432e98d550b7e4c80b06272c49475b0db85a60f6fae450420713004b3c9d3ffd.svg"
                    alt=""
                  />
                </Button>
              </li>
              <li>
                <a
                  href=""
                  className="group inline-flex items-center gap-2 font-semibold text-white transition-colors duration-200 hover:text-gray-400 hover:underline underline-offset-4"
                >
                  <img
                    src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-175-play-806cb05551791b8dedd7f8d38fd3bd806e2d397fcfeaa00a5cc9129f0819fd07.svg"
                    alt=""
                    className="w-5 h-5 filter brightness-0 invert transition duration-200 group-hover:opacity-70"
                    aria-hidden="true"
                  />
                  Воспроизвести трейлер
                </a>
              </li>
            </ul>
          </div>

          {media.tagline && <div className="pt-6 italic text-white/70">{media.tagline}</div>}

          <div className="pt-6">
            <h3 className="text-xl font-semibold mb-2">Overview</h3>
            <p className="text-white/85 leading-relaxed">{media.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

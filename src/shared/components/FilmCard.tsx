import type { CardType } from '@/shared/types/types';

import { Link } from '@tanstack/react-router';
import RatingCircle from './icons/RatingCircle';

function FilmCard(item: CardType) {
  const formattedDate = new Date(item.date)
    .toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .replace(' г.', '')
    .replace('.', '');

  return (
    <>
      <div className="max-w-[180px] mt-[10px] rounded-xl overflow-hidden shadow flex flex-col hover:scale-[1.01] transition-transform  ">
        <Link to={item.link} preload="intent">
          <img
            src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
            alt=""
            className="w-full w-[180px] h-auto block cursor-pointer"
          />
        </Link>
        <div className="pt-7 px-2.5 pb-3 relative">
          <Link to={item.link} preload="intent">
            <p className="font-bold hover:text-blue-400 hover:underline transition-colors duration-100 inline">
              {item.title}
            </p>
          </Link>
          <div className="absolute -top-[25px]">
            <RatingCircle rating={item.vote_average} />
          </div>
          <p className="text-base text-gray-500">{formattedDate}</p>
        </div>
      </div>
    </>
  );
}

export default FilmCard;

import { Button } from './ui/button';
//props is need for the future functionaluty
export function MediaActions({ mediaId }: { mediaId: number }) {
  console.log(mediaId);
  return (
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
  );
}

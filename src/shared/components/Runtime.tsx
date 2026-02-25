import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

type RuntimeProps = {
  minutes: number;
};

export const Runtime = ({ minutes }: RuntimeProps) => {
  const formatRuntime = (minutes: number) => {
    const d = dayjs.duration(minutes, 'minutes');

    const hours = Math.floor(d.asHours());
    const mins = d.minutes();

    if (!hours) return `${mins}min`;
    if (!mins) return `${hours}h`;

    return `${hours}h ${mins}min`;
  };

  return <>{formatRuntime(minutes)}</>;
};

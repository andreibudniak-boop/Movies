type RuntimeProps = {
  minutes: number;
};

export const Runtime = ({ minutes }: RuntimeProps) => {
  const formatRuntime = (mins: number): string => {
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;

    if (hours === 0) return `${remainingMins}m`;
    if (remainingMins === 0) return `${hours}h`;
    return `${hours}h${remainingMins}m`;
  };

  return <>{formatRuntime(minutes)}</>;
};

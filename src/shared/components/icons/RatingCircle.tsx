type RatingCircleProps = {
  rating: number;
};

const RatingCircle = ({ rating }: RatingCircleProps) => {
  const radius = 20;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  const percentage = Math.round(rating * 10);

  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = (value: number) => {
    if (value < 50) return 'text-red-500';
    if (value < 70) return 'text-yellow-500';
    return 'text-green-500';
  };

  const colorClass = getColor(percentage);

  return (
    <div className="relative flex items-center justify-center w-12 h-12 bg-gray-900 rounded-full">
      <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
        <circle
          className="text-gray-700"
          strokeWidth={stroke}
          stroke="currentColor"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <circle
          className={`${colorClass} transition-all duration-500 ease-out`}
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      <div className="absolute text-xs font-bold text-white font-sans">
        {percentage}
        <span className="text-[8px] align-top">%</span>
      </div>
    </div>
  );
};

export default RatingCircle;

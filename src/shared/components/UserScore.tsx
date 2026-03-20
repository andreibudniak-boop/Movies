import React, { useState } from 'react';
import { cn } from '../lib/utils';
import * as Slider from '@radix-ui/react-slider';

interface UserScoreRangeProps {
  minValue?: number;
  maxValue?: number;
  step?: number;
  defaultValue?: [number, number];
  onValueChange?: (value: [number, number]) => void;
  className?: string;
}

const UserScoreRange: React.FC<UserScoreRangeProps> = ({
  minValue = 1,
  maxValue = 10,
  step = 1,
  defaultValue = [3, 7],
  onValueChange,
  className,
}) => {
  const [value, setValue] = useState<[number, number]>(defaultValue);

  const handleValueChange = (newValue: number[]) => {
    const rangeValue = [newValue[0], newValue[1]] as [number, number];
    setValue(rangeValue);
    onValueChange?.(rangeValue);
  };

  const ticks = Array.from({ length: maxValue - minValue + 1 }, (_, i) => minValue + i);

  return (
    <div className={cn('flex flex-col gap-2 w-full', className)}>
      <p className="text-sm font-medium">User Score</p>

      <div className="relative">
        <div className="relative h-8">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
            <Slider.Root
              className="relative flex items-center w-full h-6 select-none touch-none"
              value={value}
              min={minValue}
              max={maxValue}
              step={step}
              onValueChange={handleValueChange}
              minStepsBetweenThumbs={1}
            >
              <Slider.Track className="relative bg-gray-200 rounded-full h-1 flex-1">
                <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
              </Slider.Track>

              <Slider.Thumb
                className="block w-3 h-3 bg-white border-2 border-blue-500 rounded-full shadow-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-grab active:cursor-grabbing"
                aria-label="Минимальное значение"
              />

              <Slider.Thumb
                className="block w-3 h-3 bg-white border-2 border-blue-500 rounded-full shadow-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-grab active:cursor-grabbing"
                aria-label="Максимальное значение"
              />
            </Slider.Root>
          </div>

          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 grid h-2 pointer-events-none"
            style={{
              gridTemplateColumns: `repeat(${ticks.length}, 1fr)`,
              gap: '0px',
            }}
          >
            {ticks.map((tick) => (
              <div key={tick} className="flex justify-center">
                <div
                  className={cn(
                    'w-px h-2',
                    tick >= value[0] && tick <= value[1] ? 'bg-blue-300' : 'bg-gray-300'
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between px-1 mt-2">
          {ticks.map((num) => (
            <span
              key={num}
              className={cn(
                'text-xs',
                num >= value[0] && num <= value[1] ? 'text-blue-600 font-medium' : 'text-gray-400'
              )}
            >
              {num}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserScoreRange;

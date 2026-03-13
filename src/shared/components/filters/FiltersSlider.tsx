import React, { useState, useMemo } from 'react';
import { cn } from '../../lib/utils';
import * as Slider from '@radix-ui/react-slider';

interface FilterSliderProps {
  label: string;
  minValue: number;
  maxValue: number;
  step?: number;
  defaultValue?: number | [number, number];
  tickValues?: number[];
  mode?: 'single' | 'range';
  onValueChange?: (value: number | [number, number]) => void;
  className?: string;
}

const FilterSlider: React.FC<FilterSliderProps> = ({
  label,
  minValue,
  maxValue,
  step = 1,
  defaultValue,
  tickValues,
  mode = 'range',
  onValueChange,
  className,
}) => {
  const [value, setValue] = useState<number | [number, number]>(
    defaultValue || (mode === 'single' ? minValue : [minValue, maxValue])
  );

  const handleValueChange = (newValue: number[]) => {
    if (mode === 'single') {
      const singleValue = newValue[0];
      setValue(singleValue);
      onValueChange?.(singleValue);
    } else {
      const rangeValue = [newValue[0], newValue[1]] as [number, number];
      setValue(rangeValue);
      onValueChange?.(rangeValue);
    }
  };

  const generateTicks = useMemo(() => {
    if (tickValues) return tickValues;

    const range = maxValue - minValue;
    let tickStep = 1;

    if (range <= 20) {
      tickStep = 2;
    } else if (range <= 100) {
      tickStep = 10;
    } else if (range <= 500) {
      tickStep = 50;
    } else {
      tickStep = 100;
    }

    const ticks: number[] = [];
    for (let i = minValue; i <= maxValue; i += tickStep) {
      ticks.push(i);
    }

    if (!ticks.includes(minValue)) ticks.unshift(minValue);
    if (!ticks.includes(maxValue)) ticks.push(maxValue);

    return ticks;
  }, [minValue, maxValue, tickValues]);

  const isTickActive = (tick: number) => {
    if (mode === 'single') {
      return tick <= (value as number);
    } else {
      const [min, max] = value as [number, number];
      return tick >= min && tick <= max;
    }
  };

  const sliderValue = mode === 'single' ? [value as number] : (value as [number, number]);

  // Размер ползунка в пикселях
  const thumbSize = 16; // w-4 = 16px
  const thumbOffset = thumbSize / 2;

  return (
    <div className={cn('flex flex-col gap-2 w-full', className)}>
      <p className="text-sm font-medium">{label}</p>

      <div className="relative">
        <div className="relative h-8">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
            <Slider.Root
              className="relative flex items-center w-full h-6 select-none touch-none"
              value={sliderValue}
              min={minValue}
              max={maxValue}
              step={step}
              onValueChange={handleValueChange}
              minStepsBetweenThumbs={0}
            >
              {/* Трек с отступами для ползунка */}
              <Slider.Track
                className="relative bg-gray-200 rounded-full h-1 flex-1"
                style={{
                  marginLeft: `${thumbOffset}px`,
                  marginRight: `${thumbOffset}px`,
                }}
              >
                <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
              </Slider.Track>

              <Slider.Thumb
                className="
    group relative block w-3 h-3
    bg-blue-500 border-2 border-blue-500
    rounded-full shadow-lg
    cursor-grab active:cursor-grabbing
  "
                style={{
                  marginTop: '10px',
                  transform: 'translate(-50%, -50%)',
                  marginLeft: `${thumbOffset}px`,
                }}
              >
                <div
                  className="
      absolute -top-9 left-1/2 -translate-x-1/2
      px-2 py-1 text-xs rounded-md
      bg-black text-white whitespace-nowrap
      pointer-events-none
      opacity-0 scale-75
      transition-all duration-200 ease-out

      group-active:opacity-100
      group-active:scale-100
      group-focus:opacity-100
      group-focus:scale-100
    "
                >
                  {mode === 'single'
                    ? value
                    : `${(value as [number, number])[0]} – ${(value as [number, number])[1]}`}
                </div>
              </Slider.Thumb>

              {/* Второй ползунок только для режима range */}
              {mode === 'range' && (
                <Slider.Thumb
                  className="
                            group relative block w-3 h-3
                            bg-blue-500 border-2 border-blue-500
                            rounded-full shadow-lg
                            cursor-grab active:cursor-grabbing
                          "
                  style={{
                    marginTop: '10px',
                    transform: 'translate(-50%, -50%)',
                    marginLeft: `${thumbOffset}px`,
                  }}
                >
                  <div
                    className="
                              absolute -top-9 left-1/2 -translate-x-1/2
                              px-2 py-1 text-xs rounded-md
                              bg-black text-white whitespace-nowrap
                              pointer-events-none
                              opacity-0 scale-75
                              transition-all duration-200 ease-out

                              group-active:opacity-100
                              group-active:scale-100
                              group-focus:opacity-100
                              group-focus:scale-100
                            "
                  >
                    {`${(value as [number, number])[0]}-${(value as [number, number])[1]}`}
                  </div>
                </Slider.Thumb>
              )}
            </Slider.Root>
          </div>

          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none">
            <div
              className="relative w-full"
              style={{
                marginLeft: `${thumbOffset}px`,
                marginRight: `${thumbOffset}px`,
                marginTop: '8px',
                width: `calc(100% - ${thumbOffset * 2}px)`,
              }}
            >
              {generateTicks.map((tick, index) => {
                const position = ((tick - minValue) / (maxValue - minValue)) * 100;

                return (
                  <div
                    key={index}
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{
                      left: `${position}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div
                      className={cn(
                        'w-[2px] h-2',
                        isTickActive(tick) ? 'bg-blue-500' : 'bg-gray-300'
                      )}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Шкала с подписями - с учетом отступов */}
        <div className="relative w-full mt-2">
          <div
            className="relative w-full h-4"
            style={{
              marginLeft: `${thumbOffset}px`,
              marginRight: `${thumbOffset}px`,
              width: `calc(100% - ${thumbOffset * 2}px)`,
            }}
          >
            {generateTicks.map((tick, index) => {
              const position = ((tick - minValue) / (maxValue - minValue)) * 100;

              return (
                <span
                  key={index}
                  className={cn(
                    'absolute text-xs -translate-x-1/2',
                    isTickActive(tick) ? 'text-blue-600 font-medium' : 'text-gray-400'
                  )}
                  style={{ left: `${position}%` }}
                >
                  {tick}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSlider;

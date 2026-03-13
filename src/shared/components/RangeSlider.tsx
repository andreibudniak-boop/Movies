import React, { useState } from 'react';
import { cn } from '../lib/utils';
import * as Slider from '@radix-ui/react-slider';

interface RangeSliderProps {
  label: string;
  minValue: number;
  maxValue: number;
  step?: number;
  defaultValue?: [number, number];
  tickValues?: number[]; // Значения для отметок
  onValueChange?: (value: [number, number]) => void;
  className?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  minValue,
  maxValue,
  step = 1,
  defaultValue,
  tickValues,
  onValueChange,
  className,
}) => {
  const [value, setValue] = useState<[number, number]>(defaultValue || [minValue, maxValue]);

  const handleValueChange = (newValue: number[]) => {
    const rangeValue = [newValue[0], newValue[1]] as [number, number];
    setValue(rangeValue);
    onValueChange?.(rangeValue);
  };

  // Используем предоставленные tickValues или генерируем свои
  const ticks =
    tickValues ||
    Array.from({ length: Math.min(10, maxValue - minValue + 1) }, (_, i) =>
      Math.round(minValue + (i * (maxValue - minValue)) / 10)
    );

  return (
    <div className={cn('flex flex-col gap-2 w-full', className)}>
      <p className="text-sm font-medium">{label}</p>

      <div className="relative">
        {/* Контейнер для отметок */}
        <div className="relative h-8">
          {/* Слайдер */}
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
                aria-label={`${label} минимум`}
              />

              <Slider.Thumb
                className="block w-3 h-3 bg-white border-2 border-blue-500 rounded-full shadow-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-grab active:cursor-grabbing"
                aria-label={`${label} максимум`}
              />
            </Slider.Root>
          </div>

          {/* Вертикальные полосочки */}
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 grid h-2 pointer-events-none"
            style={{
              gridTemplateColumns: `repeat(${ticks.length}, 1fr)`,
            }}
          >
            {ticks.map((tick, index) => (
              <div key={index} className="flex justify-center">
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

        {/* Шкала с подписями */}
        <div className="flex justify-between px-1 mt-2">
          {ticks.map((tick, index) => (
            <span
              key={index}
              className={cn(
                'text-xs',
                tick >= value[0] && tick <= value[1] ? 'text-blue-600 font-medium' : 'text-gray-400'
              )}
            >
              {tick}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;

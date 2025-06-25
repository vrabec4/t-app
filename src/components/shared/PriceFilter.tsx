'use client';

import * as React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { TypographyP } from '@/components/ui/typography';

type Props = {
  minPrice: number;
  maxPrice: number;
  sliderValues: [number, number];
  minInput: string;
  maxInput: string;
  isFiltered: boolean;
  onMinInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSliderChange: (values: number[]) => void;
  onClearFilter?: () => void;
  isMobile?: boolean;
  message?: string;
};

export function PriceFilter({
  minPrice,
  maxPrice,
  sliderValues,
  minInput,
  maxInput,
  isFiltered,
  onMinInputChange,
  onMaxInputChange,
  onSliderChange,
  isMobile = false,
  message,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="px-3 py-2">
        <Slider
          min={minPrice}
          max={maxPrice}
          step={0.01}
          value={sliderValues}
          onValueChange={onSliderChange}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className="text-sm text-gray-600 font-medium">Min Price</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              $
            </span>
            <Input
              type="number"
              min={minPrice}
              max={maxPrice}
              step="0.01"
              value={minInput}
              onChange={onMinInputChange}
              className="pl-7 text-sm h-10 border-gray-300 focus:border-primary focus:ring-primary"
              data-testid="price-filter-min"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-sm text-gray-600 font-medium">Max Price</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              $
            </span>
            <Input
              type="number"
              min={minPrice}
              max={maxPrice}
              step="0.01"
              value={maxInput}
              onChange={onMaxInputChange}
              className="pl-7 text-sm h-10 border-gray-300 focus:border-primary focus:ring-primary"
              data-testid="price-filter-max"
            />
          </div>
        </div>
      </div>

      <div className="text-sm text-center space-y-1">
        <TypographyP className="text-gray-600">
          Range:{' '}
          <span className="font-medium">
            ${parseFloat(minInput || '0').toFixed(2)} - $
            {parseFloat(maxInput || '0').toFixed(2)}
          </span>
        </TypographyP>
        {isFiltered && (
          <TypographyP className="text-primary font-medium text-sm">
            {message ||
              (isMobile
                ? 'Tap "Apply" to see filtered products'
                : 'Auto-applying filter...')}
          </TypographyP>
        )}
      </div>
    </div>
  );
}

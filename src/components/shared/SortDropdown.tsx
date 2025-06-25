'use client';

import { useState } from 'react';

import {
  ArrowDownAZ,
  ArrowDownUp,
  ArrowUpDown,
  ArrowUpZA,
  ChevronDown,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

export type SortOption =
  | 'default'
  | 'price-low'
  | 'price-high'
  | 'name-asc'
  | 'name-desc';

type Props = {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
};

const sortOptions = [
  {
    value: 'default' as const,
    label: 'Default',
    icon: <ArrowDownUp className="h-4 w-4" />,
  },
  {
    value: 'price-low' as const,
    label: 'Price: Low to High',
    icon: <ArrowDownUp className="h-4 w-4" />,
  },
  {
    value: 'price-high' as const,
    label: 'Price: High to Low',
    icon: <ArrowUpDown className="h-4 w-4" />,
  },
  {
    value: 'name-asc' as const,
    label: 'Name: A to Z',
    icon: <ArrowDownAZ className="h-4 w-4" />,
  },
  {
    value: 'name-desc' as const,
    label: 'Name: Z to A',
    icon: <ArrowUpZA className="h-4 w-4" />,
  },
];

export function SortDropdown({ sortBy, onSortChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = sortOptions.find((option) => option.value === sortBy);

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2 w-full sm:w-auto min-w-[180px] justify-between text-sm border-gray-300 hover:bg-primary hover:text-white hover:border-primary transition-colors"
        data-testid="sort-dropdown-button"
      >
        <span className="truncate flex items-center gap-2">
          {selectedOption?.icon}
          <span>Sort by: {selectedOption?.label}</span>
        </span>
        <ChevronDown className="h-4 w-4 flex-shrink-0" />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 top-full mt-2 z-20 w-full min-w-[220px] bg-white border rounded-md shadow-lg">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors ${
                  sortBy === option.value
                    ? 'bg-gray-50 text-primary font-medium'
                    : 'text-gray-700'
                }`}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
                data-testid={`sort-option-${option.value}`}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

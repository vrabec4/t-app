'use client';

import React, { ReactNode, createContext, useContext } from 'react';
import { ChangeEvent } from 'react';

import { Product } from '@/openapi/model/product';

import { SortOption, useProductFilter } from '@/hooks/useProductFilter';

type FilterContextType = {
  filteredProducts: Product[];
  minPrice: number;
  maxPrice: number;
  isFiltered: boolean;
  sortBy: SortOption;
  sliderValues: [number, number];
  minInput: string;
  maxInput: string;
  mobileSliderValues: [number, number];
  mobileMinInput: string;
  mobileMaxInput: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  onMinInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onMaxInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSliderChange: (values: number[]) => void;
  onMobileMinInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onMobileMaxInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onMobileSliderChange: (values: number[]) => void;
  applyMobileFilters: () => void;
  onSortChange: (sort: SortOption) => void;
  clearFilter: () => void;
  clearMobileFilter: () => void;
};

type FilterProviderProps = {
  children: ReactNode;
  products: Product[] | undefined;
  debounceMs?: number;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};

export function FilterProvider({
  children,
  products,
  debounceMs = 300,
}: FilterProviderProps) {
  const filterLogic = useProductFilter({ products, debounceMs });

  return (
    <FilterContext.Provider value={filterLogic}>
      {children}
    </FilterContext.Provider>
  );
}

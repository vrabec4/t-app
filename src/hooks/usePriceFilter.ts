'use client';

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

import { useDebounce } from '@/hooks';
import { Product } from '@/openapi/model/product';

export type SortOption =
  | 'default'
  | 'price-low'
  | 'price-high'
  | 'name-asc'
  | 'name-desc';

type Props = {
  products: Product[] | undefined;
  debounceMs?: number;
};

type UseProductFilter = {
  filteredProducts: Product[];
  minPrice: number;
  maxPrice: number;
  isFiltered: boolean;
  sortBy: SortOption;
  sliderValues: [number, number];
  minInput: string;
  maxInput: string;
  mobileMinInput: string;
  mobileMaxInput: string;
  mobileSliderValues: [number, number];
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

export function usePriceFilter({
  products,
  debounceMs = 300,
}: Props): UseProductFilter {
  const { minPrice, maxPrice } = useMemo(() => {
    if (!products || products.length === 0) {
      return { minPrice: 0, maxPrice: 1000 };
    }

    const prices = products
      .map((product) => product.price || 0)
      .filter((price) => price > 0);

    if (prices.length === 0) {
      return { minPrice: 0, maxPrice: 1000 };
    }

    return {
      minPrice: Math.floor(Math.min(...prices)),
      maxPrice: Math.ceil(Math.max(...prices)),
    };
  }, [products]);

  const [sliderValues, setSliderValues] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);
  const [minInput, setMinInput] = useState(minPrice.toString());
  const [maxInput, setMaxInput] = useState(maxPrice.toString());
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [mobileSliderValues, setMobileSliderValues] = useState<
    [number, number]
  >([minPrice, maxPrice]);
  const [mobileMinInput, setMobileMinInput] = useState(minPrice.toString());
  const [mobileMaxInput, setMobileMaxInput] = useState(maxPrice.toString());

  const debouncedMinValue = useDebounce(
    parseFloat(minInput) || minPrice,
    debounceMs
  );
  const debouncedMaxValue = useDebounce(
    parseFloat(maxInput) || maxPrice,
    debounceMs
  );

  useEffect(() => {
    setSliderValues([minPrice, maxPrice]);
    setMinInput(minPrice.toString());
    setMaxInput(maxPrice.toString());

    setMobileSliderValues([minPrice, maxPrice]);
    setMobileMinInput(minPrice.toString());
    setMobileMaxInput(maxPrice.toString());
  }, [minPrice, maxPrice]);

  useEffect(() => {
    if (isSidebarOpen) {
      setMobileSliderValues(sliderValues);
      setMobileMinInput(minInput);
      setMobileMaxInput(maxInput);
    }
  }, [isSidebarOpen, sliderValues, minInput, maxInput]);

  const onMinInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinInput(value);
  }, []);

  const onMaxInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setMaxInput(value);
    },
    []
  );

  const onMobileMinInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setMobileMinInput(value);
    },
    []
  );

  const onMobileMaxInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setMobileMaxInput(value);
    },
    []
  );

  const applyMobileFilters = useCallback(() => {
    setMinInput(mobileMinInput);
    setMaxInput(mobileMaxInput);
    setSliderValues(mobileSliderValues);
    setIsSidebarOpen(false);
  }, [mobileMinInput, mobileMaxInput, mobileSliderValues]);

  const onSliderChange = useCallback((values: number[]) => {
    if (values.length === 2) {
      const [min, max] = values;
      setSliderValues([min!, max!]);
      setMinInput(min!.toString());
      setMaxInput(max!.toString());
    }
  }, []);

  const onMobileSliderChange = useCallback((values: number[]) => {
    if (values.length === 2) {
      const [min, max] = values;
      setMobileSliderValues([min!, max!]);
      setMobileMinInput(min!.toString());
      setMobileMaxInput(max!.toString());
    }
  }, []);

  const onSortChange = useCallback((sort: SortOption) => {
    setSortBy(sort);
  }, []);

  const clearFilter = useCallback(() => {
    setSliderValues([minPrice, maxPrice]);
    setMinInput(minPrice.toString());
    setMaxInput(maxPrice.toString());
    setSortBy('default');
  }, [minPrice, maxPrice]);

  const clearMobileFilter = useCallback(() => {
    setSliderValues([minPrice, maxPrice]);
    setMinInput(minPrice.toString());
    setMaxInput(maxPrice.toString());
    setSortBy('default');
    setIsSidebarOpen(false);
  }, [minPrice, maxPrice]);

  const isFiltered =
    debouncedMinValue !== minPrice ||
    debouncedMaxValue !== maxPrice ||
    sortBy !== 'default';

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products.filter((product) => {
      const price = product.price || 0;
      return price >= debouncedMinValue && price <= debouncedMaxValue;
    });

    switch (sortBy) {
      case 'price-low':
        filtered = filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        filtered = filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'name-asc':
        filtered = filtered.sort((a, b) =>
          (a.title || '').localeCompare(b.title || '')
        );
        break;
      case 'name-desc':
        filtered = filtered.sort((a, b) =>
          (b.title || '').localeCompare(a.title || '')
        );
        break;
      case 'default':
      default:
        filtered = filtered.sort((a, b) => (a.id || 0) - (b.id || 0));
        break;
    }

    return filtered;
  }, [products, debouncedMinValue, debouncedMaxValue, sortBy]);

  return {
    filteredProducts,
    minPrice,
    maxPrice,
    isFiltered,
    sortBy,
    sliderValues,
    minInput,
    maxInput,
    mobileSliderValues,
    mobileMinInput,
    mobileMaxInput,
    isSidebarOpen,
    setIsSidebarOpen,
    onMinInputChange,
    onMaxInputChange,
    onSliderChange,
    onMobileMinInputChange,
    onMobileMaxInputChange,
    onMobileSliderChange,
    applyMobileFilters,
    onSortChange,
    clearFilter,
    clearMobileFilter,
  };
}

'use client';

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

import { useDebounce } from '@/hooks';
import { Product } from '@/openapi/model/product';

import { useURLState } from '@/hooks/useURLState';

export type SortOption =
  | 'default'
  | 'price-low'
  | 'price-high'
  | 'name-asc'
  | 'name-desc';

type UseProductFilterProps = {
  products: Product[] | undefined;
  debounceMs?: number;
};

export function useProductFilter({
  products,
  debounceMs = 300,
}: UseProductFilterProps) {
  const { getStateFromURL, updateURL, isInitialized } = useURLState();

  const { minPrice, maxPrice } = useMemo(() => {
    if (!products || products.length === 0) {
      return { minPrice: 0, maxPrice: 1000 };
    }

    const prices = products
      .map((product) => product.price || 0)
      .filter((price) => price >= 0);

    if (prices.length === 0) {
      return { minPrice: 0, maxPrice: 1000 };
    }

    return {
      minPrice: 0,
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
  const [hasInitializedFromURL, setHasInitializedFromURL] = useState(false);

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

  const debouncedMinInput = useDebounce(minInput, debounceMs);
  const debouncedMaxInput = useDebounce(maxInput, debounceMs);

  useEffect(
    function initializeFromURLOnMount() {
      if (isInitialized && !hasInitializedFromURL) {
        const urlState = getStateFromURL();

        setHasInitializedFromURL(true);

        if (urlState.minPrice !== undefined) {
          setMinInput(urlState.minPrice.toString());
          setSliderValues((prev) => [urlState.minPrice!, prev[1]]);
        }

        if (urlState.maxPrice !== undefined) {
          setMaxInput(urlState.maxPrice.toString());
          setSliderValues((prev) => [prev[0], urlState.maxPrice!]);
        }

        if (urlState.sortBy !== undefined) {
          setSortBy(urlState.sortBy);
        }
      }
    },
    [isInitialized, hasInitializedFromURL, getStateFromURL]
  );

  useEffect(
    function updatePriceRangeWhenProductsChange() {
      if (!hasInitializedFromURL) {
        setSliderValues([minPrice, maxPrice]);
        setMinInput(minPrice.toString());
        setMaxInput(maxPrice.toString());

        setMobileSliderValues([minPrice, maxPrice]);
        setMobileMinInput(minPrice.toString());
        setMobileMaxInput(maxPrice.toString());
      }
    },
    [minPrice, maxPrice, hasInitializedFromURL]
  );

  useEffect(
    function syncStateToURL() {
      if (isInitialized && hasInitializedFromURL) {
        const currentMin = parseFloat(debouncedMinInput) || minPrice;
        const currentMax = parseFloat(debouncedMaxInput) || maxPrice;

        updateURL(
          {
            minPrice: currentMin,
            maxPrice: currentMax,
            sortBy,
          },
          minPrice,
          maxPrice
        );
      }
    },
    [
      debouncedMinInput,
      debouncedMaxInput,
      sortBy,
      minPrice,
      maxPrice,
      updateURL,
      isInitialized,
      hasInitializedFromURL,
    ]
  );

  useEffect(
    function syncMobileFiltersWithDesktopWhenSidebarOpens() {
      if (isSidebarOpen) {
        setMobileSliderValues(sliderValues);
        setMobileMinInput(minInput);
        setMobileMaxInput(maxInput);
      }
    },
    [isSidebarOpen, sliderValues, minInput, maxInput]
  );

  const onMinInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinInput(value);
  }, []);

  const onMaxInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxInput(value);
  }, []);

  const onMobileMinInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setMobileMinInput(value);
    },
    []
  );

  const onMobileMaxInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
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

    updateURL(
      {
        minPrice: minPrice,
        maxPrice: maxPrice,
        sortBy: 'default',
      },
      minPrice,
      maxPrice
    );
  }, [minPrice, maxPrice, updateURL]);

  const clearMobileFilter = useCallback(() => {
    setMobileSliderValues([minPrice, maxPrice]);
    setMobileMinInput(minPrice.toString());
    setMobileMaxInput(maxPrice.toString());
    setSortBy('default');
    setIsSidebarOpen(false);

    updateURL(
      {
        minPrice: minPrice,
        maxPrice: maxPrice,
        sortBy: 'default',
      },
      minPrice,
      maxPrice
    );
  }, [minPrice, maxPrice, updateURL]);

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

    const sortFunctions: Record<
      SortOption,
      (a: Product, b: Product) => number
    > = {
      'price-low': (a, b) => (a.price || 0) - (b.price || 0),
      'price-high': (a, b) => (b.price || 0) - (a.price || 0),
      'name-asc': (a, b) => (a.title || '').localeCompare(b.title || ''),
      'name-desc': (a, b) => (b.title || '').localeCompare(a.title || ''),
      default: (a, b) => (a.id || 0) - (b.id || 0),
    };

    const sortFn = sortFunctions[sortBy || 'default'];
    filtered = filtered.sort(sortFn);

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

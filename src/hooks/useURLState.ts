'use client';

import { useCallback, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { SortOption } from './useProductFilter';

export type FilterState = {
  minPrice?: number;
  maxPrice?: number;
  sortBy?: SortOption;
};

export function useURLState() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isInitialized, setIsInitialized] = useState(false);

  const getStateFromURL = useCallback((): FilterState => {
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy') as SortOption;

    return {
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      sortBy:
        sortBy &&
        [
          'default',
          'price-low',
          'price-high',
          'name-asc',
          'name-desc',
        ].includes(sortBy)
          ? sortBy
          : undefined,
    };
  }, [searchParams]);

  const updateURL = useCallback(
    (
      newState: FilterState,
      defaultMinPrice: number,
      defaultMaxPrice: number
    ) => {
      const params = new URLSearchParams(searchParams.toString());

      const setParam = (
        key: string,
        value: string | number | undefined,
        shouldInclude: boolean
      ) => {
        if (shouldInclude && value !== undefined) {
          params.set(key, value.toString());
        } else {
          params.delete(key);
        }
      };

      setParam(
        'minPrice',
        newState.minPrice,
        newState.minPrice !== undefined && newState.minPrice !== defaultMinPrice
      );

      setParam(
        'maxPrice',
        newState.maxPrice,
        newState.maxPrice !== undefined && newState.maxPrice !== defaultMaxPrice
      );

      setParam(
        'sortBy',
        newState.sortBy,
        Boolean(newState.sortBy && newState.sortBy !== 'default')
      );

      const queryString = params.toString();
      router.replace(queryString ? `?${queryString}` : '/products', {
        scroll: false,
      });
    },
    [router, searchParams]
  );

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  return {
    getStateFromURL,
    updateURL,
    isInitialized,
  };
}

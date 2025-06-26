import { Product } from '@/openapi/model/product';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SortOption, useProductFilter } from '@/hooks/useProductFilter';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(() => null),
    toString: vi.fn(() => ''),
  }),
}));

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    price: 100,
    description: 'Desc 1',
    category: 'Cat 1',
    image: 'img1.jpg',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 200,
    description: 'Desc 2',
    category: 'Cat 2',
    image: 'img2.jpg',
  },
  {
    id: 3,
    title: 'Product 3',
    price: 50,
    description: 'Desc 3',
    category: 'Cat 1',
    image: 'img3.jpg',
  },
  {
    id: 4,
    title: 'Product 4',
    price: 300,
    description: 'Desc 4',
    category: 'Cat 3',
    image: 'img4.jpg',
  },
];

describe('useProductFilter hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should initialize with the correct min and max prices', () => {
    const { result } = renderHook(() =>
      useProductFilter({ products: mockProducts })
    );

    expect(result.current.minPrice).toBe(0);
    expect(result.current.maxPrice).toBe(300);
    expect(result.current.sliderValues).toEqual([0, 300]);
    expect(result.current.minInput).toBe('0');
    expect(result.current.maxInput).toBe('300');
  });

  it('should filter products based on price range', async () => {
    const { result } = renderHook(() =>
      useProductFilter({ products: mockProducts })
    );

    act(() => {
      result.current.onSliderChange([100, 200]);
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.filteredProducts).toHaveLength(2);
    expect(result.current.filteredProducts.map((p) => p.id)).toEqual([1, 2]);
  });

  it('should sort products by price low to high', () => {
    const { result } = renderHook(() =>
      useProductFilter({ products: mockProducts })
    );

    act(() => {
      result.current.onSortChange('price-low' as SortOption);
    });

    expect(result.current.filteredProducts.map((p) => p.price)).toEqual([
      50, 100, 200, 300,
    ]);
  });

  it('should sort products by price high to low', () => {
    const { result } = renderHook(() =>
      useProductFilter({ products: mockProducts })
    );

    act(() => {
      result.current.onSortChange('price-high' as SortOption);
    });

    expect(result.current.filteredProducts.map((p) => p.price)).toEqual([
      300, 200, 100, 50,
    ]);
  });

  it('should clear filters', () => {
    const { result } = renderHook(() =>
      useProductFilter({ products: mockProducts })
    );

    act(() => {
      result.current.onSliderChange([100, 200]);
      result.current.onSortChange('price-high' as SortOption);
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    act(() => {
      result.current.clearFilter();
      vi.advanceTimersByTime(300);
    });

    expect(result.current.sliderValues).toEqual([0, 300]);
    expect(result.current.sortBy).toBe('default');
    expect(result.current.minInput).toBe('0');
    expect(result.current.maxInput).toBe('300');
  });
});

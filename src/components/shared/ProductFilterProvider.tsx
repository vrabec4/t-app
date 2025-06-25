'use client';

import { ReactNode } from 'react';

import { FilterProvider } from '@/contexts/FilterContext';
import { Product } from '@/openapi/model/product';

type Props = {
  children: ReactNode;
  products: Product[] | undefined;
};

export function ProductFilterProvider({ children, products }: Props) {
  return <FilterProvider products={products}>{children}</FilterProvider>;
}

'use client';

import { ReactNode } from 'react';

import { Product } from '@/openapi/model/product';
import { FilterProvider } from '@/providers';

type Props = {
  children: ReactNode;
  products: Product[] | undefined;
};

export function ProductFilterProvider({ children, products }: Props) {
  return <FilterProvider products={products}>{children}</FilterProvider>;
}

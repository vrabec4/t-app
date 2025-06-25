'use client';

import { useGetAllProducts } from '@openapi/generated/products/products';
import {
  ErrorAlert,
  MainLayout,
  ProductFilterProvider,
  ProductList,
  ProductsLoader,
} from '@shared';

export default function HomePage() {
  const { data: products, isLoading, error } = useGetAllProducts();

  if (isLoading) {
    return (
      <MainLayout>
        <ProductsLoader />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <ErrorAlert />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ProductFilterProvider products={products}>
        <ProductList
          title="Welcome to Our Store"
          description="Browse our featured products"
        />
      </ProductFilterProvider>
    </MainLayout>
  );
}

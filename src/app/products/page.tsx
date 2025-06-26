'use client';

import { Suspense } from 'react';

import { ProductFilterProvider } from '@/providers/ProductFilterProvider';
import { useGetAllProducts } from '@openapi/generated/products/products';
import { ErrorAlert, ProductsLoader } from '@shared';

import { ProductList } from '@/components/shared/ProductList';

function ProductListingContent() {
  const { data: products, isLoading, error } = useGetAllProducts();

  if (isLoading) {
    return (
      <>
        <ProductsLoader />
      </>
    );
  }

  if (error) {
    return (
      <>
        <ErrorAlert />
      </>
    );
  }

  return (
    <>
      <title>T-App - Our Products</title>
      <ProductFilterProvider products={products}>
        <ProductList
          title="Our Products"
          description="Discover amazing products at great prices"
        />
      </ProductFilterProvider>
    </>
  );
}

export default function ProductListingPage() {
  return (
    <Suspense fallback={<ProductsLoader />}>
      <ProductListingContent />
    </Suspense>
  );
}

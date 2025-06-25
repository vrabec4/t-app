'use client';

import { useGetAllProducts } from '@openapi/generated/products/products';
import { ErrorAlert, ProductsLoader } from '@shared';

import { ProductFilterProvider } from '@/components/shared/ProductFilterProvider';
import { ProductList } from '@/components/shared/ProductList';

export default function ProductListingPage() {
  const { data: products, isLoading, error } = useGetAllProducts();

  if (isLoading) {
    return <ProductsLoader />;
  }

  if (error) {
    return <ErrorAlert />;
  }

  return (
    <ProductFilterProvider products={products}>
      <ProductList
        title="Our Products"
        description="Discover amazing products at great prices"
      />
    </ProductFilterProvider>
  );
}

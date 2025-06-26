'use client';

import { useFilterContext } from '@/providers';
import { FilterSidebar, PageHeader, ProductCard, SortDropdown } from '@shared';
import { Alert, AlertDescription, AlertTitle } from '@ui/alert';

type Props = {
  title?: string;
  description?: string;
};

export function ProductList({
  title = 'Our Products',
  description = 'Discover amazing products at great prices',
}: Props) {
  const { filteredProducts, isFiltered, sortBy, onSortChange } =
    useFilterContext();

  const totalProducts = filteredProducts.length;
  const filteredCount = filteredProducts.length;

  return (
    <div className="container mx-auto px-4 pb-16">
      <PageHeader title={title} description={description} />

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        <FilterSidebar />

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 bg-white p-4 rounded-md shadow-sm">
            <div className="text-sm text-muted-foreground">
              {isFiltered ? (
                <>
                  Showing{' '}
                  <span className="font-medium text-primary">
                    {filteredCount}
                  </span>{' '}
                  of <span className="font-medium">{totalProducts}</span>{' '}
                  products
                  {filteredCount !== totalProducts && (
                    <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-white text-xs">
                      {filteredCount}
                    </span>
                  )}
                </>
              ) : (
                <>
                  Showing all{' '}
                  <span className="font-medium">{totalProducts}</span> products
                </>
              )}
            </div>

            <SortDropdown sortBy={sortBy} onSortChange={onSortChange} />
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < 2} // Only prioritize the first 2 visible images for faster initial load
                />
              ))}
            </div>
          ) : (
            <Alert className="shadow-sm">
              <AlertTitle>No products match your criteria</AlertTitle>
              <AlertDescription>
                Try adjusting your filters or price range.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

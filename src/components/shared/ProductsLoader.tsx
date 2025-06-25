'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function ProductsLoader() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <Skeleton className="h-10 w-1/3 mx-auto" />
          <Skeleton className="h-4 w-1/4 mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow">
      <Skeleton className="aspect-square w-full" />

      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-9 w-24 rounded" />
        </div>
      </div>
    </div>
  );
}

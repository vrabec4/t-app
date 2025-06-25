'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useGetProductById } from '@/openapi/generated/products/products';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  TypographyH1,
  TypographyH2,
  TypographyLarge,
  TypographyMuted,
  TypographyP,
} from '@/components/ui/typography';

import { ErrorAlert, MainLayout, ProductsLoader } from '@/components/shared';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params?.id);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductById(productId, {
    query: {
      enabled: !isNaN(productId) && productId > 0,
      staleTime: 10 * 60 * 1000,
    },
  });

  if (isLoading) {
    return <ProductsLoader />;
  }

  if (error || !product) {
    return (
      <ErrorAlert message="Error loading product details. Please try again." />
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <Link href="/products">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square rounded-lg overflow-hidden flex items-center justify-center bg-white">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title || 'Product'}
              width={240}
              height={240}
              className="object-contain"
              placeholder="blur"
              blurDataURL="/placeholder-product.svg"
              data-testid="product-image"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              No Image Available
            </div>
          )}
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <TypographyH1 className="mb-2">{product.title}</TypographyH1>
              <TypographyLarge className="font-bold text-primary text-2xl mb-4">
                ${product.price}
              </TypographyLarge>
              <Separator className="my-4" />
              <TypographyH2 className="text-xl font-semibold mb-2">
                Description
              </TypographyH2>
              <TypographyP className="text-muted-foreground">
                {product.description}
              </TypographyP>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  Buy Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-12">
        <TypographyH2 className="mb-4">Product Specifications</TypographyH2>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <TypographyMuted className="font-semibold">
                  Product ID:
                </TypographyMuted>
                <TypographyP>{product.id}</TypographyP>
              </div>
              <div>
                <TypographyMuted className="font-semibold">
                  Category:
                </TypographyMuted>
                <TypographyP>{product.category}</TypographyP>
              </div>
              <div>
                <TypographyMuted className="font-semibold">
                  Price:
                </TypographyMuted>
                <TypographyP>${product.price}</TypographyP>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

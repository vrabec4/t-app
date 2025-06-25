'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import type { Product } from '@/openapi/model';
import { Eye, Heart, ShoppingCart } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  TypographyH3,
  TypographyLarge,
  TypographyMuted,
} from '@/components/ui/typography';

type Props = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: Props) {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <Card
      className="overflow-hidden transition-all duration-300 flex flex-col h-full rounded-md border-transparent hover:shadow-md group"
      data-testid="product-card"
    >
      <div className="aspect-square relative overflow-hidden">
        {product.image ? (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <Image
              src={product.image}
              alt={product.title || 'Product'}
              width={180}
              height={180}
              className="h-auto w-auto transition-transform duration-500 group-hover:scale-110"
              priority={priority}
              loading={priority ? 'eager' : 'lazy'}
              placeholder="blur"
              blurDataURL="/placeholder-product.svg"
              data-testid="product-image"
            />
            <div className="absolute -right-16 top-4 transition-all duration-300 group-hover:right-4 flex flex-col gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="bg-white hover:bg-primary hover:text-white text-gray-700 w-9 h-9 rounded-full shadow-sm transition-colors duration-200"
              >
                <Heart className="w-[18px] h-[18px]" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="bg-white hover:bg-primary hover:text-white text-gray-700 w-9 h-9 rounded-full shadow-sm transition-colors duration-200"
              >
                <ShoppingCart className="w-[18px] h-[18px]" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={handleRedirect}
                className="bg-white hover:bg-primary hover:text-white text-gray-700 w-9 h-9 rounded-full shadow-sm transition-colors duration-200"
              >
                <Eye className="w-[18px] h-[18px]" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <Image
              src="/placeholder-product.svg"
              alt="Product placeholder"
              width={300}
              height={300}
              className="object-contain"
              data-testid="product-placeholder-image"
              priority={priority}
            />
          </div>
        )}
        <div className="absolute left-4 top-4">
          <Badge
            variant="secondary"
            className="bg-primary text-white text-xs rounded-md font-medium px-2 py-1"
          >
            {product.category}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 flex-1">
        <div className="mb-2 cursor-pointer" onClick={handleRedirect}>
          <TypographyH3 className="line-clamp-1 text-base font-medium hover:text-primary transition-colors duration-200">
            {product.title}
          </TypographyH3>
        </div>

        <TypographyMuted className="mb-2 line-clamp-2 text-sm">
          {product.description}
        </TypographyMuted>

        <TypographyLarge className="font-semibold text-primary">
          ${product.price}
        </TypographyLarge>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-center mt-auto">
        <Button
          onClick={handleRedirect}
          variant="outline"
          className="w-full hover:bg-primary hover:text-white transition-colors duration-300 border-primary text-primary"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

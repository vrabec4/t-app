import { Product } from '@/openapi/model';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProductCard } from '@/components/shared/ProductCard';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    className,
    'data-testid': dataTestId,
  }: {
    src: string;
    alt: string;
    className?: string;
    'data-testid'?: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} data-testid={dataTestId} />
  ),
}));

describe('ProductCard Component', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'This is a test product description',
    category: 'test',
    image: 'https://test.com/image.jpg',
  };

  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders product details correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();

    expect(screen.getByText('$99.99')).toBeInTheDocument();

    expect(
      screen.getByText('This is a test product description')
    ).toBeInTheDocument();

    expect(screen.getByText('test')).toBeInTheDocument();

    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://test.com/image.jpg');
  });

  it('displays placeholder image when product has no image', () => {
    const productWithoutImage = { ...mockProduct, image: undefined };
    render(<ProductCard product={productWithoutImage} />);

    expect(screen.getByTestId('product-placeholder-image')).toBeInTheDocument();
    expect(screen.getByAltText('Product placeholder')).toBeInTheDocument();
  });

  it('navigates to product details page when button is clicked', () => {
    render(<ProductCard product={mockProduct} />);

    const viewDetailsButton = screen.getByText('View Details');
    fireEvent.click(viewDetailsButton);

    expect(mockPush).toHaveBeenCalledWith('/products/1');
  });
});

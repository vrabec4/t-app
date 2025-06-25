import { describe, expect, it } from 'vitest';

import { cn } from '@/lib/utils/utils';

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should handle conditional classes', () => {
    const condition = true;
    expect(cn('foo', condition && 'bar')).toBe('foo bar');
    expect(cn('foo', !condition && 'bar')).toBe('foo');
  });

  it('should handle tailwind class conflicts with twMerge', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });
});

import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useDebounce } from '@/hooks/useDebounce';

describe('useDebounce hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should return the initial value immediately', () => {
    const initialValue = 'test';
    const { result } = renderHook(() => useDebounce(initialValue, 500));

    expect(result.current).toBe(initialValue);
  });

  it('should not update the value before the delay has passed', () => {
    const initialValue = 'test';
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: initialValue, delay: 500 } }
    );

    rerender({ value: 'updated', delay: 500 });

    // Advance time but not enough to trigger the debounce
    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(result.current).toBe(initialValue);
  });

  it('should update the value after the delay has passed', () => {
    const initialValue = 'test';
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: initialValue, delay: 500 } }
    );

    const updatedValue = 'updated';
    rerender({ value: updatedValue, delay: 500 });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe(updatedValue);
  });

  it('should reset the timeout when the value changes before the delay has passed', () => {
    const initialValue = 'test';
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: initialValue, delay: 500 } }
    );

    rerender({ value: 'intermediate', delay: 500 });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    const updatedValue = 'final';
    rerender({ value: updatedValue, delay: 500 });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Timer was reset, so we're still 200ms away from the timeout
    expect(result.current).toBe(initialValue);

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe(updatedValue);
  });
});

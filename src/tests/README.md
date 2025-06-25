# Testing Guide

This project includes both unit tests and end-to-end tests.

## Unit Tests

Unit tests are located in the `src/tests/unit` directory and are implemented using [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

### Running Unit Tests

```bash
# Run all unit tests
pnpm test

# Run tests in watch mode (useful for development)
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage
```

## End-to-End Tests

End-to-end tests are located in the `src/tests/e2e` directory and use [Playwright](https://playwright.dev/).

### Running E2E Tests

```bash
# Run all e2e tests
pnpm test:e2e

# Run e2e tests with UI
pnpm test:e2e:ui

# Run e2e tests in headed mode (shows browsers)
pnpm test:e2e:headed

# Run e2e tests in debug mode
pnpm test:e2e:debug
```

## Writing Tests

### Unit Tests

Unit tests should follow these patterns:

1. Test files should be named `*.test.ts` or `*.test.tsx`
2. Group related tests in `describe` blocks
3. Use clear test descriptions in `it` statements

Example:

```typescript
import { describe, expect, it } from 'vitest';

describe('Component or utility name', () => {
  it('should perform expected behavior', () => {
    // Arrange
    // Act
    // Assert
    expect(result).toBe(expectedValue);
  });
});
```

### E2E Tests

E2E tests should focus on user flows through the application.

See the [Playwright documentation](https://playwright.dev/docs/intro) for more details on writing E2E tests.

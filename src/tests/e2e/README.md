# End-to-End Tests

This directory contains end-to-end tests for the application using Playwright.

## Available Tests

### Homepage Tests (`homepage.spec.ts`)

Tests that verify the homepage loads correctly and displays products.

### Product Filtering Tests (`product-filtering.spec.ts`)

Tests that verify product filtering functionality.

### Product Details Tests (`product-details.spec.ts`)

Tests that verify navigation to and display of product details.

## Running Tests

You can run the tests using the following npm scripts:

```bash
# Run all e2e tests
pnpm test:e2e

# Run tests in UI mode (interactive)
pnpm test:e2e:ui

# Run tests in headed mode (visible browser)
pnpm test:e2e:headed

# Run tests in debug mode
pnpm test:e2e:debug
```

## Writing New Tests

When writing new tests:

1. Create a new file with the `.spec.ts` extension
2. Import the Playwright test utilities:
   ```typescript
   import { expect, test } from '@playwright/test';
   ```
3. Group related tests using `test.describe`
4. Use descriptive test names that explain the expected behavior

## Best Practices

- Use data-testid attributes for reliable element selection
- Write tests that are independent of each other
- Avoid depending on specific test execution order
- Use descriptive selectors and create helper functions for repeated actions

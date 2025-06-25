# Playwright E2E Testing

This project uses Playwright for end-to-end testing with pnpm as the package manager.

## Getting Started

### Installation

Playwright is already installed as a dev dependency. To install browsers:

```bash
pnpm exec playwright install
```

### Running Tests

Run all E2E tests:

```bash
pnpm test:e2e
```

Run tests with UI mode (interactive):

```bash
pnpm test:e2e:ui
```

Run tests in headed mode (see browser):

```bash
pnpm test:e2e:headed
```

Run tests in debug mode:

```bash
pnpm test:e2e:debug
```

### Test Files

- Tests are located in `tests/e2e/`
- Test files should end with `.spec.ts`
- The config file is `playwright.config.ts`

### Configuration

The Playwright configuration includes:

- Tests run against `http://localhost:3000`
- Automatic dev server startup before tests
- Multiple browser testing (Chromium, Firefox, WebKit)
- Mobile device testing
- Screenshot on failure
- HTML reporting

### Writing Tests

```typescript
import { expect, test } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Expected Title/);
});
```

### VS Code Integration

Use the VS Code tasks:

- `test:e2e` - Run all tests
- `test:e2e:ui` - Run with UI mode
- `test:e2e:headed` - Run in headed mode

### Reports

Test reports are generated in:

- `playwright-report/` - HTML reports
- `test-results/` - Test artifacts and screenshots

import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load the product listing page', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');

    // The page should have a title - don't check specific title as it may change
    // Just verify that a title exists
    await expect(page).toHaveTitle(/.+/);

    // Wait for product cards to appear (indicates products loaded)
    await page.waitForSelector('[data-testid="product-card"]', {
      timeout: 10000,
    });

    // Check if at least one product card is present
    const productCards = await page
      .locator('[data-testid="product-card"]')
      .count();
    expect(productCards).toBeGreaterThan(0);
  });
});

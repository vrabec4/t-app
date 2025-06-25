import { expect, test } from '@playwright/test';

test.describe('Product Details', () => {
  test('should navigate to product details page when clicking on a product card', async ({
    page,
  }) => {
    // Navigate to homepage
    await page.goto('/');

    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', {
      timeout: 10000,
    });

    // Click the "View Details" button on the first product card
    await page.getByRole('button', { name: 'View Details' }).first().click();

    // Check that the URL has changed to a product details page
    await expect(page).toHaveURL(/\/products\/\d+/);

    // Wait for the product details to load
    await page.waitForLoadState('networkidle');

    // Check that product details are displayed
    // This would depend on what's shown on your product detail page
    await expect(page.locator('h1')).toBeVisible();

    // Verify we can navigate back to the products listing page
    await page.goBack();

    // Verify we're back on the products page
    await expect(
      page.locator('[data-testid="product-card"]').first()
    ).toBeVisible();
  });
});

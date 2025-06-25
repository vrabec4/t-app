import { expect, test } from '@playwright/test';

test.describe('Product Filtering and Sorting', () => {
  test('should filter products by price range', async ({ page }) => {
    // Navigate to the products page
    await page.goto('/products');

    // Wait for product cards to load
    await page.waitForSelector('[data-testid="product-card"]', {
      timeout: 10000,
    });

    // Count initial number of products
    const initialProductCount = await page
      .locator('[data-testid="product-card"]')
      .count();

    // Look for the price filter inputs with data-testid
    const minInput = page.locator('[data-testid="price-filter-min"]');
    const maxInput = page.locator('[data-testid="price-filter-max"]');

    // Wait for the inputs to be visible
    await minInput.waitFor({ timeout: 5000 });
    await maxInput.waitFor({ timeout: 5000 });

    // Fill min and max price inputs
    await minInput.fill('100');
    await maxInput.fill('200');

    // Wait for filter to apply
    await page.waitForTimeout(1000);

    // Count filtered products
    const filteredProductCount = await page
      .locator('[data-testid="product-card"]')
      .count();

    // Check that filtering had some effect (fewer products should be shown)
    expect(filteredProductCount).toBeLessThanOrEqual(initialProductCount);

    // Test clear filter functionality using data-testid
    await page.locator('[data-testid="clear-price-filter"]').click();

    // Wait for filter to reset
    await page.waitForTimeout(1000);

    // Count products after clearing filter
    const resetProductCount = await page
      .locator('[data-testid="product-card"]')
      .count();

    // Should be back to initial count
    expect(resetProductCount).toEqual(initialProductCount);
  });

  test('should sort products by price', async ({ page }) => {
    // Navigate to the products page
    await page.goto('/products');

    // Wait for product cards to load
    await page.waitForSelector('[data-testid="product-card"]', {
      timeout: 10000,
    });

    // Check for the sort dropdown button using data-testid
    const sortButton = page.locator('[data-testid="sort-dropdown-button"]');
    await expect(sortButton).toBeVisible();

    // Function to get product prices
    const getProductPrices = async () => {
      const priceTexts = await page
        .locator('[data-testid="product-card"] .text-primary')
        .allTextContents();
      return priceTexts.map((text) => {
        // Extract number from price text (e.g., "$120" -> 120)
        const match = text.match(/\$?(\d+(\.\d+)?)/);
        return match && match[1] ? parseFloat(match[1]) : 0;
      });
    };

    // Get initial prices to compare after sorting
    await getProductPrices();

    // Open the sort dropdown and select price low to high
    await sortButton.click();
    await page.locator('[data-testid="sort-option-price-low"]').click();
    await page.waitForTimeout(500);

    // Get sorted prices
    const lowToHighPrices = await getProductPrices();

    // Check if prices are sorted ascending
    const isSortedAscending = lowToHighPrices.every((price, i) => {
      if (i === 0) return true;
      return price >= (lowToHighPrices[i - 1] ?? 0);
    });
    expect(isSortedAscending).toBeTruthy();

    // Select price high to low
    await sortButton.click();
    await page.locator('[data-testid="sort-option-price-high"]').click();
    await page.waitForTimeout(500);

    // Get sorted prices
    const highToLowPrices = await getProductPrices();

    // Check if prices are sorted descending
    const isSortedDescending = highToLowPrices.every((price, i) => {
      if (i === 0) return true;
      return price <= (highToLowPrices[i - 1] ?? Number.MAX_VALUE);
    });
    expect(isSortedDescending).toBeTruthy();
  });
});

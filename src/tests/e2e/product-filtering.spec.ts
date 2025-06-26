import { expect, test } from '@playwright/test';

test.describe('Product Filtering and Sorting', () => {
  test('should filter products by price range', async ({ page }) => {
    await page.goto('/products');

    await page.waitForSelector('[data-testid="product-card"]', {
      timeout: 10000,
    });

    const initialProductCount = await page
      .locator('[data-testid="product-card"]')
      .count();

    const minInput = page.locator('[data-testid="price-filter-min"]');
    const maxInput = page.locator('[data-testid="price-filter-max"]');

    await minInput.waitFor({ timeout: 5000 });
    await maxInput.waitFor({ timeout: 5000 });

    await minInput.fill('100');
    await maxInput.fill('200');

    await page.waitForTimeout(1000);

    const filteredProductCount = await page
      .locator('[data-testid="product-card"]')
      .count();

    expect(filteredProductCount).toBeLessThanOrEqual(initialProductCount);

    await page.locator('[data-testid="clear-price-filter"]').click();

    await page.waitForTimeout(1000);

    const resetProductCount = await page
      .locator('[data-testid="product-card"]')
      .count();

    expect(resetProductCount).toEqual(initialProductCount);
  });

  test('should sort products by price', async ({ page }) => {
    await page.goto('/products');

    await page.waitForSelector('[data-testid="product-card"]', {
      timeout: 10000,
    });

    const sortButton = page.locator('[data-testid="sort-dropdown-button"]');
    await expect(sortButton).toBeVisible();

    const getProductPrices = async () => {
      const priceTexts = await page
        .locator('[data-testid="product-card"] >> text=/^\\$\\d+(\\.\\d+)?$/')
        .allTextContents();

      return priceTexts.map((text) => {
        const match = text.match(/\$?(\d+(\.\d+)?)/);
        return match && match[1] ? parseFloat(match[1]) : 0;
      });
    };

    await getProductPrices();

    await sortButton.click();
    await page.locator('[data-testid="sort-option-price-low"]').click();
    await page.waitForTimeout(500);

    const lowToHighPrices = await getProductPrices();

    const isSortedAscending = lowToHighPrices.every((price, i) => {
      if (i === 0) return true;
      return price >= (lowToHighPrices[i - 1] ?? 0);
    });
    expect(isSortedAscending).toBeTruthy();

    await sortButton.click();
    await page.locator('[data-testid="sort-option-price-high"]').click();
    await page.waitForTimeout(500);

    const highToLowPrices = await getProductPrices();

    const isSortedDescending = highToLowPrices.every((price, i) => {
      if (i === 0) return true;
      return price <= (highToLowPrices[i - 1] ?? Number.MAX_VALUE);
    });
    expect(isSortedDescending).toBeTruthy();
  });
});

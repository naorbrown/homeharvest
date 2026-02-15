import { test, expect } from '@playwright/test';

const BASE = '/homeharvest';

test.describe('Mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('mobile menu opens and closes', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.locator('.mobile-menu-btn').click();
    const dialog = page.locator('#mobile-nav');
    await expect(dialog).toBeVisible();
    await page.locator('.mobile-nav-close').click();
    await expect(dialog).not.toBeVisible();
  });

  test('desktop nav hidden on mobile', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page.locator('.nav-links')).not.toBeVisible();
  });

  test('mobile nav has FAQ link', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.locator('.mobile-menu-btn').click();
    await expect(page.locator('.mobile-nav-links').getByText('FAQ')).toBeVisible();
  });

  test('CMD-K works on mobile', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.keyboard.press('Meta+k');
    await expect(page.locator('#search-dialog')).toBeVisible();
  });
});

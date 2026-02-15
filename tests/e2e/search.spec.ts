import { test, expect } from '@playwright/test';

const BASE = '/homeharvest';

test.describe('Search', () => {
  test('CMD-K opens search dialog', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.keyboard.press('Meta+k');
    await expect(page.locator('#search-dialog')).toBeVisible();
  });

  test('CMD-K toggles search dialog closed', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.keyboard.press('Meta+k');
    await expect(page.locator('#search-dialog')).toBeVisible();
    await page.keyboard.press('Meta+k');
    await expect(page.locator('#search-dialog')).not.toBeVisible();
  });

  test('Escape closes search dialog', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.keyboard.press('Meta+k');
    await expect(page.locator('#search-dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#search-dialog')).not.toBeVisible();
  });

  test('search close button works', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.keyboard.press('Meta+k');
    await expect(page.locator('#search-dialog')).toBeVisible();
    await page.locator('#search-close').click();
    await expect(page.locator('#search-dialog')).not.toBeVisible();
  });

  test('search trigger button opens dialog on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto(`${BASE}/`);
    await page.locator('#search-open').click();
    await expect(page.locator('#search-dialog')).toBeVisible();
  });

  test('mobile search icon opens dialog', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE}/`);
    await page.locator('#search-open-mobile').click();
    await expect(page.locator('#search-dialog')).toBeVisible();
  });

  test('search dialog exists on all pages', async ({ page }) => {
    const pages = ['/', '/guides/', '/faq/', '/spaces/windowsill/'];
    for (const p of pages) {
      await page.goto(`${BASE}${p}`);
      await expect(page.locator('#search-dialog')).toBeAttached();
    }
  });

  test('mobile search button exists on all pages', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const pages = ['/', '/guides/', '/faq/'];
    for (const p of pages) {
      await page.goto(`${BASE}${p}`);
      await expect(page.locator('#search-open-mobile')).toBeVisible();
    }
  });
});

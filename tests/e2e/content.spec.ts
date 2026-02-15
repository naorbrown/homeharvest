import { test, expect } from '@playwright/test';

const BASE = '/homeharvest';

test.describe('Content & Visual', () => {
  test('no horizontal overflow on homepage', async ({ page }) => {
    await page.goto(`${BASE}/`);
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(overflow).toBe(false);
  });

  test('back-to-top button appears on scroll', async ({ page }) => {
    await page.goto(`${BASE}/`);
    const btn = page.locator('#back-to-top');
    // Initially hidden
    await expect(btn).toHaveCSS('opacity', '0');
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(300);
    await expect(btn).toHaveCSS('opacity', '1');
  });

  test('reading progress bar exists on detail pages', async ({ page }) => {
    await page.goto(`${BASE}/guides/herbs/`);
    // The bar starts at width: 0% (top of page), so check the container is visible
    await expect(page.locator('.reading-progress')).toBeVisible();
  });

  test('quick-stats grid exists on detail pages', async ({ page }) => {
    await page.goto(`${BASE}/guides/herbs/`);
    await expect(page.locator('.quick-stats')).toBeVisible();
    const stats = page.locator('.quick-stat');
    await expect(stats).toHaveCount(4);
  });

  test('detail pages have TL;DR box', async ({ page }) => {
    await page.goto(`${BASE}/spaces/windowsill/`);
    await expect(page.locator('.tldr-box')).toBeVisible();
  });

  test('breadcrumbs work on detail pages', async ({ page }) => {
    await page.goto(`${BASE}/guides/herbs/`);
    await expect(page.locator('.breadcrumb')).toBeVisible();
    const homeLink = page.locator('.breadcrumb a').first();
    await expect(homeLink).toHaveAttribute('href', '/homeharvest/');
  });
});

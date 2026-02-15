import { test, expect } from '@playwright/test';

const BASE = '/homeharvest';

test.describe('FAQ', () => {
  test('FAQ page loads with correct heading', async ({ page }) => {
    await page.goto(`${BASE}/faq/`);
    await expect(page.locator('h1')).toContainText('Frequently Asked Questions');
  });

  test('FAQ has 12 collapsible sections', async ({ page }) => {
    await page.goto(`${BASE}/faq/`);
    const sections = page.locator('details.collapsible-section');
    await expect(sections).toHaveCount(12);
  });

  test('FAQ accordion opens and closes', async ({ page }) => {
    await page.goto(`${BASE}/faq/`);
    // Get the second section (first one is open by default)
    const section = page.locator('details.collapsible-section').nth(1);
    const summary = section.locator('summary');

    // Should be closed initially
    await expect(section).not.toHaveAttribute('open', '');

    // Click to open
    await summary.click();
    await expect(section).toHaveAttribute('open', '');
  });

  test('FAQ cross-links resolve', async ({ page }) => {
    await page.goto(`${BASE}/faq/`);
    const links = await page.locator('.faq-layout a[href^="/homeharvest/"]').all();
    const hrefs = new Set<string>();
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href) hrefs.add(href);
    }
    for (const href of hrefs) {
      const response = await page.request.get(href);
      expect(response.status(), `Broken FAQ link: ${href}`).toBe(200);
    }
  });

  test('visual reference guides section exists', async ({ page }) => {
    await page.goto(`${BASE}/faq/`);
    await expect(page.locator('.visual-guides')).toBeVisible();
    await expect(page.locator('.planting-calendar')).toBeVisible();
    await expect(page.locator('.sun-cards')).toBeVisible();
  });
});

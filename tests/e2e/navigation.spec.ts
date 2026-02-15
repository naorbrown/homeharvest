import { test, expect } from '@playwright/test';

const BASE = '/homeharvest';

const ALL_PAGES = [
  '/',
  '/spaces/',
  '/guides/',
  '/systems/',
  '/faq/',
  '/spaces/windowsill/',
  '/spaces/balcony/',
  '/spaces/backyard/',
  '/spaces/indoor/',
  '/guides/herbs/',
  '/guides/microgreens/',
  '/guides/lettuce/',
  '/guides/tomatoes/',
  '/guides/peppers/',
  '/guides/root-vegetables/',
  '/systems/soil-beds/',
  '/systems/hydroponics/',
  '/systems/vertical-towers/',
  '/systems/containers/',
];

test.describe('Navigation', () => {
  for (const page of ALL_PAGES) {
    test(`${page} loads successfully`, async ({ page: p }) => {
      const response = await p.goto(`${BASE}${page}`);
      expect(response?.status()).toBe(200);
      await expect(p.locator('h1').first()).toBeVisible();
      await expect(p.locator('header')).toBeVisible();
      await expect(p.locator('footer')).toBeVisible();
    });
  }

  test('header nav links exist on desktop', async ({ page }) => {
    test.skip(test.info().project.name === 'mobile', 'Desktop nav hidden on mobile');
    await page.goto(`${BASE}/`);
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav.getByText('Spaces')).toBeVisible();
    await expect(nav.getByText('Guides')).toBeVisible();
    await expect(nav.getByText('Systems')).toBeVisible();
    await expect(nav.getByText('FAQ')).toBeVisible();
  });

  test('logo links to home', async ({ page }) => {
    await page.goto(`${BASE}/guides/`);
    await page.locator('.logo').first().click();
    await expect(page).toHaveURL(/\/homeharvest\/$/);
  });

  test('all internal links on homepage resolve', async ({ page }) => {
    await page.goto(`${BASE}/`);
    const links = await page.locator('a[href^="/homeharvest/"]').all();
    const hrefs = new Set<string>();
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href) hrefs.add(href);
    }
    for (const href of hrefs) {
      const response = await page.request.get(href);
      expect(response.status(), `Broken link: ${href}`).toBe(200);
    }
  });
});

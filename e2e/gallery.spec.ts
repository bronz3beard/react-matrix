import { expect, test, type Page } from '@playwright/test';

const GALLERY = './?beta=gallery';

const shownCount = async (page: Page) => {
  const text = (await page.getByRole('status').textContent()) ?? '';
  const [, shown, total] = /Showing (\d+) of (\d+) designs/.exec(text) ?? [];
  return { shown: Number(shown), total: Number(total) };
};

const cards = (page: Page) => page.getByRole('list', { name: 'Designs' }).getByRole('article');

test('shows every design as a live preview card', async ({ page }) => {
  await page.goto(GALLERY);

  const { shown, total } = await shownCount(page);
  expect(total).toBeGreaterThan(0);
  expect(shown).toBe(total);
  await expect(cards(page)).toHaveCount(total);
  for (const card of await cards(page).all()) {
    await expect(card.getByRole('heading', { level: 2 })).not.toBeEmpty();
    await expect(card.getByRole('table')).toBeVisible();
  }
});

test('previews are not interactive, so the grid adds no cell tab stops', async ({ page }) => {
  await page.goto(GALLERY);

  await expect(page.getByRole('list', { name: 'Designs' }).getByRole('button')).toHaveCount(0);
});

test('filter chips narrow the designs and are kept in the URL', async ({ page }) => {
  await page.goto(GALLERY);

  await page.getByRole('radio', { name: 'Dark' }).check();
  await expect(page).toHaveURL(/[?&]beta=gallery/);
  await expect(page).toHaveURL(/[?&]scheme=dark/);
  const dark = await shownCount(page);
  await expect(cards(page)).toHaveCount(dark.shown);
  for (const card of await cards(page).all()) {
    await expect(card.locator('.rdm-root')).toHaveAttribute('data-scheme', 'dark');
  }
  if (dark.shown === 0) await expect(page.getByText('No designs match these filters.')).toBeVisible();

  // A shared or reloaded link restores the same view.
  await page.reload();
  await expect(page.getByRole('radio', { name: 'Dark' })).toBeChecked();
  expect(await shownCount(page)).toEqual(dark);

  await page.getByRole('radio', { name: 'All' }).check();
  await expect(page).not.toHaveURL(/scheme=/);

  await page.getByRole('checkbox', { name: 'Minimal' }).check();
  await expect(page).toHaveURL(/[?&]tags=minimal/);
  const minimal = await shownCount(page);
  await expect(cards(page)).toHaveCount(minimal.shown);
  for (const card of await cards(page).all()) {
    await expect(card.getByRole('list', { name: 'Character' })).toContainText('Minimal');
  }
});

test('on desktop every preview shows its whole matrix without scrolling', async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) < 1024, 'phones scroll previews inside their cards');
  await page.goto(GALLERY);

  for (const preview of await page.locator('.preset-card .rdm-root').all()) {
    const { scrollWidth, clientWidth } = await preview.evaluate((root) => ({
      scrollWidth: root.scrollWidth,
      clientWidth: root.clientWidth,
    }));
    expect(scrollWidth, 'preview is clipped').toBeLessThanOrEqual(clientWidth);
  }
});

test('the gallery page never scrolls sideways', async ({ page }) => {
  await page.goto(GALLERY);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Keep runs offline and deterministic: the footer's web font is decorative.
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) =>
    route.fulfill({ status: 200, contentType: 'text/css', body: '' })
  );
});

test('the demo site renders the risk matrix with all 25 ratings', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  await page.goto('./');

  const table = page.getByRole('table', { name: /React Matrix/ });
  await expect(table).toBeVisible();
  await expect(table.locator('td.rdm-cell')).toHaveCount(25);
  await expect(page.getByRole('columnheader', { name: /Catastrophic/ })).toBeVisible();
  expect(errors).toEqual([]);
});

test('axis titles are upper-cased by the Original theme, not in the text', async ({ page }) => {
  await page.goto('./');

  for (const axis of [
    page.getByRole('columnheader', { name: 'Consequence', exact: true }),
    page.getByRole('rowheader', { name: 'Likelihood', exact: true }),
  ]) {
    await expect(axis).toHaveCSS('text-transform', 'uppercase');
  }
});

test('the page never scrolls sideways; a wide matrix scrolls inside itself', async ({ page }) => {
  await page.goto('./');

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test('a cell can be chosen by pointer, Enter or Space', async ({ page }) => {
  await page.goto('./');
  const status = page.getByRole('status');

  await page
    .getByRole('button', { name: 'Likelihood Rare, Consequence Minor: low (1)' })
    .click();
  await expect(status).toHaveText('Rare × Minor: low (1). Business as usual.');

  await page
    .getByRole('button', { name: 'Likelihood Almost Certain, Consequence Catastrophic: extreme (25)' })
    .focus();
  await page.keyboard.press('Enter');
  await expect(status).toHaveText(
    'Almost Certain × Catastrophic: extreme (25). Activity should not commence.'
  );

  await page
    .getByRole('button', { name: 'Likelihood Possible, Consequence Moderate: medium (8)' })
    .focus();
  await page.keyboard.press('Space');
  await expect(status).toHaveText(
    'Possible × Moderate: medium (8). Requires routine to periodic monitoring.'
  );
});

test('a matrix that scrolls sideways can be scrolled from the keyboard', async ({ page }) => {
  await page.goto('./');
  const matrix = page.locator('.rdm-root');
  const scrolls = await matrix.evaluate((element) => element.scrollWidth > element.clientWidth);

  if (!scrolls) {
    // Nothing to scroll (desktop): no extra tab stop.
    await expect(matrix).not.toHaveAttribute('tabindex');
    return;
  }

  const region = page.getByRole('region', { name: 'React Matrix' });
  await expect(region).toHaveAttribute('tabindex', '0');
  await region.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => region.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
});

// The Original preset's look: from the top of the caption to the bottom of the
// table, excluding the demo site's header icons and footer. Re-baselined in 1.0
// with Tech Lead sign-off (the pre-1.0 image is in git history at 8bec0eb).
// Mobile is not captured; the gallery's mobile checks cover narrow screens.
test('baseline: original look of the matrix on desktop', async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== 'chromium-desktop',
    'the baseline is captured once, on desktop Chromium'
  );

  await page.goto('./');

  const title = await page.locator('caption').boundingBox();
  const table = await page.getByRole('table').boundingBox();
  if (!title || !table) throw new Error('matrix caption or table is not rendered');

  await expect(page).toHaveScreenshot('original-baseline-desktop.png', {
    clip: {
      x: table.x,
      y: title.y,
      width: table.width,
      height: table.y + table.height - title.y,
    },
  });
});

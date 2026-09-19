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

  const table = page.getByRole('table');
  await expect(table).toBeVisible();
  await expect(table.getByRole('cell')).toHaveCount(25);
  await expect(page.getByRole('columnheader', { name: /Catastrophic/ })).toBeVisible();
  expect(errors).toEqual([]);
});

// Pre-1.0 look of the matrix: from the top of its title to the bottom of the
// table, excluding the demo site's header icons and footer. S5c compares the 1.0
// Original preset against this image. Mobile is not captured because the pre-1.0
// layout is absolutely centred and clipped at 360px, which 1.0 removes by design.
test('baseline: original look of the matrix on desktop', async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== 'chromium-desktop',
    'the baseline is captured once, on desktop Chromium'
  );

  await page.goto('./');

  const title = await page.getByRole('heading', { level: 1 }).boundingBox();
  const table = await page.getByRole('table').boundingBox();
  if (!title || !table) throw new Error('matrix title or table is not rendered');

  await expect(page).toHaveScreenshot('original-baseline-desktop.png', {
    clip: {
      x: table.x,
      y: title.y,
      width: table.width,
      height: table.y + table.height - title.y,
    },
  });
});

import { expect, test, type Page } from '@playwright/test';

const GALLERY = './';

const choose = async (page: Page, names: string[]) => {
  for (const name of names) await page.getByRole('button', { name: `Compare ${name}` }).click();
};

const openCompare = async (page: Page, names: string[]) => {
  await page.goto(GALLERY);
  await choose(page, names);
  await page.getByRole('button', { name: /^Compare \(/ }).click();
  const dialog = page.getByRole('dialog', { name: `Comparing ${names.join(', ')}` });
  await expect(dialog).toBeVisible();
  return dialog;
};

test('designs are gathered in the tray before they can be compared', async ({ page }) => {
  await page.goto(GALLERY);
  const tray = page.getByRole('region', { name: 'Designs to compare' });

  await expect(tray).toBeHidden();

  await choose(page, ['Noir']);
  await expect(tray).toBeVisible();
  // One design is not a comparison, so the action is not yet available.
  await expect(tray.getByRole('button', { name: /^Compare \(/ })).toBeDisabled();
  await expect(tray.getByRole('status')).toHaveText('Choose one more design to compare.');

  await choose(page, ['Aurora']);
  await expect(tray.getByRole('button', { name: 'Compare (2)' })).toBeEnabled();

  await tray.getByRole('button', { name: 'Remove Noir' }).click();
  await expect(tray.getByText('Noir', { exact: true })).toBeHidden();
  await expect(page.getByRole('button', { name: 'Compare Noir' })).toHaveAttribute(
    'aria-pressed',
    'false'
  );
});

test('the tray takes no more than four designs', async ({ page }) => {
  await page.goto(GALLERY);

  await choose(page, ['Noir', 'Aurora', 'Thermal', 'Swiss', 'Clay']);

  // The fifth is refused rather than evicting one of the four already chosen.
  await expect(page.getByRole('button', { name: 'Compare (4)' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Compare Clay' })).toHaveAttribute(
    'aria-pressed',
    'false'
  );
});

test('the compare view shows one pane per design, side by side', async ({ page }) => {
  const dialog = await openCompare(page, ['Noir', 'Aurora', 'Thermal']);

  await expect(dialog.getByRole('listitem')).toHaveCount(3);
  await expect(dialog.getByRole('heading', { level: 3 })).toHaveText([
    'Noir',
    'Aurora',
    'Thermal',
  ]);
  await expect(dialog.getByRole('table')).toHaveCount(3);
  // Panes are previews, not demos: no handler, so no cell tab stops.
  await expect(dialog.locator('.rdm-root button')).toHaveCount(0);

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('every compared design is shown whole on a desktop screen', async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) < 1024, 'phones show one pane at a time');
  const dialog = await openCompare(page, ['Noir', 'Aurora', 'Thermal', 'Swiss']);

  // Panes wrap rather than shrink; three designs squeezed onto one row clipped
  // all of them, which is how this shipped the first time.
  for (const width of [1280, 1600, 2400]) {
    await page.setViewportSize({ width, height: 900 });
    const clipped = await dialog
      .locator('.rdm-root')
      .evaluateAll((roots) => roots.filter((root) => root.scrollWidth > root.clientWidth).length);
    expect(clipped, `clipped at ${width}px`).toBe(0);
  }
});

test('all panes change size together', async ({ page }) => {
  const dialog = await openCompare(page, ['Noir', 'Aurora']);

  await expect(dialog.locator('td.rdm-cell')).toHaveCount(50);

  await dialog.getByRole('radio', { name: '3×3' }).check();

  await expect(dialog.locator('td.rdm-cell')).toHaveCount(18);
  await expect(dialog.getByRole('columnheader', { name: /Catastrophic/ })).toHaveCount(0);
});

test('the comparison can be shared as a link', async ({ page }) => {
  await page.goto(GALLERY);
  await choose(page, ['Noir', 'Aurora']);
  await page.getByRole('button', { name: 'Compare (2)' }).click();
  await page.getByRole('radio', { name: '4×4' }).check();
  await expect(page).toHaveURL(/[?&]compare=noir,aurora/);
  await expect(page).toHaveURL(/[?&]size=4/);

  await page.reload();

  // The chosen designs and size survive; the view itself is not reopened.
  await expect(page.getByRole('button', { name: 'Compare (2)' })).toBeVisible();
  await page.getByRole('button', { name: 'Compare (2)' }).click();
  await expect(page.getByRole('radio', { name: '4×4' })).toBeChecked();
});

test('on a phone each design is a full-width slide, and can be stacked instead', async ({
  page,
}) => {
  test.skip((page.viewportSize()?.width ?? 0) >= 1024, 'desktop shows the panes side by side');
  const dialog = await openCompare(page, ['Noir', 'Aurora']);
  const panes = dialog.locator('.compare-panes');

  const slides = await panes.evaluate((list) => list.scrollWidth > list.clientWidth);
  expect(slides).toBe(true);

  await dialog.getByRole('checkbox', { name: 'Stack' }).check();

  expect(await panes.evaluate((list) => list.scrollWidth > list.clientWidth)).toBe(false);
});

test('the gallery page still never scrolls sideways with the tray open', async ({ page }) => {
  await page.goto(GALLERY);
  await choose(page, ['Noir', 'Aurora', 'Thermal', 'Swiss']);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

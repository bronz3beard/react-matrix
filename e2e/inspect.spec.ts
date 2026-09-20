import { expect, test, type Page } from '@playwright/test';

const GALLERY = './';

// Noir is a palette design with square corners and filled cells, so every tweak
// below is a visible change from how it comes.
const openNoir = async (page: Page) => {
  await page.goto(GALLERY);
  await page.getByRole('button', { name: 'Inspect Noir' }).click();
  const dialog = page.getByRole('dialog', { name: 'Noir design' });
  await expect(dialog).toBeVisible();
  return dialog;
};

test('a design opens large, with the code needed to use it', async ({ page }) => {
  const dialog = await openNoir(page);

  await expect(dialog.getByRole('table', { name: /React Matrix/ })).toBeVisible();
  await expect(dialog.locator('.tweak-snippet')).toHaveText(
    "import ReactMatrix, { noir } from 'react-data-matrix';\n\n" +
      '<ReactMatrix data={data} theme={noir} />'
  );
  // The token table is generated from the theme being rendered, so it cannot
  // drift from it.
  await expect(dialog.getByRole('row', { name: /^cellVariant/ })).toContainText('fill');

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('tweaking a design changes both the preview and the snippet', async ({ page }) => {
  const dialog = await openNoir(page);
  const cell = dialog.locator('td.rdm-cell').first();
  const before = await cell.evaluate((element) => getComputedStyle(element).borderRadius);

  await dialog.getByRole('radio', { name: 'Pill' }).check();
  await dialog.getByRole('radio', { name: 'Score' }).check();

  await expect(dialog.locator('.tweak-snippet')).toContainText(
    "theme={{ ...noir, radius: '999px', emphasis: 'score' }}"
  );
  expect(await cell.evaluate((element) => getComputedStyle(element).borderRadius)).not.toBe(before);
  await expect(dialog.getByRole('row', { name: /^radius/ })).toContainText('999px');

  // "As it comes" must return the design to its published form.
  await dialog.getByRole('radio', { name: 'As it comes' }).first().check();
  await expect(dialog.locator('.tweak-snippet')).toContainText("theme={{ ...noir, emphasis:");
  await expect(dialog.locator('.tweak-snippet')).not.toContainText('radius');
});

test('choosing cells shows what the click handler receives, newest first', async ({ page }) => {
  const dialog = await openNoir(page);
  const log = dialog.locator('.inspect-log li');

  await expect(log).toHaveCount(0);
  await dialog.getByRole('button', { name: /Likelihood Rare, Consequence Minor/ }).click();
  await expect(log).toHaveText(['Rare × Minor — low (1)']);

  await dialog
    .getByRole('button', { name: /Likelihood Almost Certain, Consequence Catastrophic/ })
    .focus();
  await page.keyboard.press('Enter');
  await expect(log.first()).toHaveText('Almost Certain × Catastrophic — extreme (25)');

  // Only the last five are kept, so the log cannot grow without bound.
  for (const name of await dialog.getByRole('button', { name: /Likelihood/ }).all()) {
    await name.click();
  }
  await expect(log).toHaveCount(5);
});

test('the inspected matrix is shown whole on a desktop screen', async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) < 1024, 'phones scroll the matrix inside the dialog');
  await openNoir(page);

  // Either side of the one-column/two-column split: a side panel that leaves the
  // matrix too little room clips it, which is how it shipped the first time.
  for (const width of [1280, 1360, 1600, 2400]) {
    await page.setViewportSize({ width, height: 900 });
    const clipped = await page
      .locator('.inspect-preview .rdm-root')
      .evaluate((root) => root.scrollWidth > root.clientWidth);
    expect(clipped, `clipped at ${width}px`).toBe(false);
  }
});

test('the snippet can be copied to the clipboard', async ({ page, browserName, context }) => {
  test.skip(browserName !== 'chromium', 'clipboard permissions are Chromium-only in Playwright');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const dialog = await openNoir(page);

  await dialog.getByRole('button', { name: 'Copy' }).click();

  await expect(dialog.getByRole('status')).toHaveText('Copied');
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboard).toContain('<ReactMatrix data={data} theme={noir} />');
});

test('each design opens with its own tokens and an empty log', async ({ page }) => {
  const noir = await openNoir(page);
  await noir.getByRole('button', { name: /Likelihood Rare, Consequence Minor/ }).click();
  await expect(noir.locator('.inspect-log li')).toHaveCount(1);
  await page.keyboard.press('Escape');

  await page.getByRole('button', { name: 'Inspect Aurora' }).click();
  const aurora = page.getByRole('dialog', { name: 'Aurora design' });

  await expect(aurora.locator('.tweak-snippet')).toContainText('theme={aurora}');
  await expect(aurora.locator('.inspect-log li')).toHaveCount(0);
});

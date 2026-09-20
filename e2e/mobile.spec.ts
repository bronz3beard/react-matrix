import { expect, test, type Page } from '@playwright/test';

const GALLERY = './';

// The whole file is about narrow screens; the desktop projects have their own
// gates for the same flows.
test.beforeEach(({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) >= 1024, 'this suite covers phone-sized screens');
});

const openInspect = async (page: Page) => {
  await page.goto(GALLERY);
  await page.getByRole('button', { name: 'Inspect Noir' }).click();
  const dialog = page.getByRole('dialog', { name: 'Noir design' });
  await expect(dialog).toBeVisible();
  return dialog;
};

const openCompare = async (page: Page) => {
  await page.goto(GALLERY);
  for (const name of ['Noir', 'Aurora']) {
    await page.getByRole('button', { name: `Compare ${name}` }).click();
  }
  await page.getByRole('button', { name: 'Compare (2)' }).click();
  const dialog = page.getByRole('dialog', { name: /^Comparing/ });
  await expect(dialog).toBeVisible();
  return dialog;
};

test('every design can be reached by scrolling, and nothing overflows sideways', async ({
  page,
}) => {
  await page.goto(GALLERY);

  const text = (await page.getByRole('status').first().textContent()) ?? '';
  const [, total] = /of (\d+) designs/.exec(text) ?? [];
  const cards = page.getByRole('list', { name: 'Designs' }).getByRole('article');
  await expect(cards).toHaveCount(Number(total));

  // The last card is genuinely reachable, not clipped out of the document.
  await cards.last().scrollIntoViewIfNeeded();
  await expect(cards.last().getByRole('heading', { level: 2 })).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test('back closes the inspect dialog instead of leaving the gallery', async ({ page }) => {
  const dialog = await openInspect(page);

  await page.goBack();

  await expect(dialog).toBeHidden();
  await expect(page.getByRole('list', { name: 'Designs' })).toBeVisible();
});

test('back closes the compare view instead of leaving the gallery', async ({ page }) => {
  const dialog = await openCompare(page);

  await page.goBack();

  await expect(dialog).toBeHidden();
  await expect(page.getByRole('list', { name: 'Designs' })).toBeVisible();
});

test('closing a dialog by hand leaves no history entry to press back through', async ({ page }) => {
  await page.goto(GALLERY);
  const marker = page.url();

  const dialog = await openInspect(page);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();

  // One back press must leave the gallery: Escape has to have taken its entry
  // with it, or the visitor is stuck pressing back twice.
  await page.goBack();
  expect(page.url()).not.toBe(marker);
});

test('a severity dot stays beside its label in a narrow cell', async ({ page }) => {
  await page.goto(GALLERY);
  const clay = page
    .getByRole('article')
    .filter({ has: page.getByRole('heading', { name: 'Clay' }) });
  await clay.scrollIntoViewIfNeeded();

  // The dot is a ::before, so it cannot be measured on its own. What can be
  // measured is how many lines the label occupies: one client rect per line.
  // (Not line-height — it computes to "normal" here, and comparing against NaN
  // made the first version of this check pass against the unfixed stylesheet.)
  const wrapped = await clay.locator('.rdm-cell-label').evaluateAll((labels) =>
    labels
      .filter((label) => label.getClientRects().length > 1)
      .map((label) => label.textContent ?? '?')
  );

  expect(wrapped).toEqual([]);
});

test('site controls are large enough to tap', async ({ page }) => {
  await page.goto(GALLERY);
  await page.getByRole('button', { name: 'Compare Noir' }).click();

  // WCAG 2.2 asks for 24×24; 44×44 is the comfortable target this site aims at.
  // Only the site's own controls: cells inside a matrix belong to the component
  // and are sized by the design being previewed.
  const small = await page
    .locator('.gallery button, .gallery a, .gallery label.chip')
    .evaluateAll((controls) =>
      controls
        .filter((control) => {
          if (control.closest('.rdm-root')) return false;
          const { width, height } = control.getBoundingClientRect();
          return width > 0 && height > 0 && (width < 44 || height < 44);
        })
        .map((control) => `${control.className || control.tagName}: ${control.textContent?.trim()}`)
    );

  expect(small).toEqual([]);
});

test('the compare tray stays within reach above the bottom of the screen', async ({ page }) => {
  await page.goto(GALLERY);
  await page.getByRole('button', { name: 'Compare Noir' }).click();
  const tray = page.getByRole('region', { name: 'Designs to compare' });

  await expect(tray).toBeVisible();
  const viewport = page.viewportSize()!;
  const box = (await tray.boundingBox())!;

  // Sticky: still on screen after scrolling to the very bottom of the gallery.
  // (Scripted, not a wheel event: mobile WebKit has no wheel.)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const after = (await tray.boundingBox())!;
  expect(after.y).toBeLessThanOrEqual(viewport.height);
  expect(box.width).toBeLessThanOrEqual(viewport.width);
});

import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

// Cells coloured from the consumer's own data (e.g. the Original preset): colour
// choice is the data owner's responsibility (Tech Lead decision 2026-09-19), so
// only the contrast rule skips them. Palette themes are contrast-gated in unit tests.
const DATA_COLOURED_CELLS = '.rdm-root[data-palette="data"] td.rdm-cell';

type Violation = Awaited<ReturnType<AxeBuilder['analyze']>>['violations'][number];
const summarise = (violations: Violation[]) =>
  violations.map((v) => `${v.id}: ${v.nodes.map((node) => node.target.join(' ')).join(' | ')}`);

const PAGES = [
  ['demo page', './?demo=classic'],
  ['preset gallery', './'],
] as const;

const openPage = async (page: Page, path: string) => {
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) =>
    route.fulfill({ status: 200, contentType: 'text/css', body: '' })
  );
  await page.goto(path);
  await expect(page.getByRole('table').first()).toBeVisible();
  // Steady state: a matrix root becomes keyboard-focusable one frame after it is
  // found to overflow (ResizeObserver), so scan only once every root has settled.
  await expect
    .poll(() =>
      page
        .locator('.rdm-root')
        .evaluateAll((roots) =>
          roots.every(
            (root) => root.scrollWidth <= root.clientWidth || root.getAttribute('tabindex') === '0'
          )
        )
    )
    .toBe(true);
};

for (const [label, path] of PAGES) {
  test(`the ${label} has no WCAG 2.2 A/AA violations`, async ({ page }) => {
    await openPage(page, path);

    const allButContrast = await new AxeBuilder({ page })
      .withTags(WCAG_TAGS)
      .disableRules(['color-contrast'])
      .analyze();
    const contrast = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .exclude(DATA_COLOURED_CELLS)
      .analyze();

    expect(summarise([...allButContrast.violations, ...contrast.violations])).toEqual([]);
  });

  test(`data-coloured cells are the only contrast exception on the ${label}`, async ({ page }) => {
    await openPage(page, path);

    const { violations } = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
    const flagged = violations.flatMap((v) => v.nodes.map((node) => node.target.join(' ')));

    // The demo data really does contain low-contrast colours, so the exclusion above
    // is exercised; and every flagged element is (inside) a data-coloured cell.
    expect(flagged.length).toBeGreaterThan(0);
    for (const selector of flagged) {
      const insideDataCell = await page
        .locator(selector)
        .evaluate((element, cells) => element.closest(cells) !== null, DATA_COLOURED_CELLS);
      expect(insideDataCell, selector).toBe(true);
    }
  });
}

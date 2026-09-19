import { expect, test, type Page } from '@playwright/test';

declare global {
  interface Window {
    cspViolations: string[];
  }
}

const FIXTURE = 'e2e/fixtures/csp.html';
// The fixture's palette maps the most severe tier ("red" values) to #b71c1c.
const THEME_RED = 'rgb(183, 28, 28)';

const collectViolations = (page: Page) =>
  page.addInitScript(() => {
    window.cspViolations = [];
    document.addEventListener('securitypolicyviolation', (event) => {
      window.cspViolations.push(`${event.violatedDirective} ${event.blockedURI}`);
    });
  });

const mostSevereCell = (page: Page) => page.locator('td[data-row="A"][data-col="5"]');

test('theme colours apply under a strict style-src CSP when the nonce is passed', async ({ page }) => {
  await collectViolations(page);
  await page.goto(FIXTURE);

  await expect(mostSevereCell(page)).toHaveCSS('background-color', THEME_RED);
  expect(await page.evaluate(() => window.cspViolations)).toEqual([]);
});

test('without the nonce the policy blocks the stylesheet (negative control)', async ({ page }) => {
  await collectViolations(page);
  await page.goto(`${FIXTURE}?nonce=none`);

  await expect(mostSevereCell(page)).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.cspViolations.length)).toBeGreaterThan(0);
  await expect(mostSevereCell(page)).not.toHaveCSS('background-color', THEME_RED);
});

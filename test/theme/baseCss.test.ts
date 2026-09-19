// @vitest-environment node
import { transform } from 'lightningcss';
import { describe, expect, it } from 'vitest';
import { BASE_CSS } from '../../lib/theme/baseCss';

const BUDGET_MINIFIED_BYTES = 2560;
// Properties that can only paint a colour, never fetch a resource.
const COLOUR_ONLY_PROPERTIES = new Set([
  'background-color',
  'color',
  'border-color',
  'outline-color',
  'box-shadow',
]);

const minify = () =>
  transform({
    filename: 'base.css',
    code: new TextEncoder().encode(BASE_CSS),
    minify: true,
  });

describe('base stylesheet', () => {
  // Catches structural and selector errors (stray braces, malformed @container
  // or attribute selectors, unknown pseudo-classes). Like browsers, it accepts
  // unknown property names, so the visual checks in B08 cover those.
  it('parses without syntax errors or selector warnings', () => {
    expect(minify().warnings).toEqual([]);
  });

  it(`stays within ${BUDGET_MINIFIED_BYTES} bytes minified`, () => {
    expect(minify().code.length).toBeLessThanOrEqual(BUDGET_MINIFIED_BYTES);
  });

  it('feeds per-cell (data-derived) colours only into colour-typed properties', () => {
    const consumers = [...BASE_CSS.matchAll(/([a-z-]+):[^;{}]*var\(--rdm-cell-(?:bg|fg)\)/g)].map(
      (match) => match[1]
    );

    expect(consumers.length).toBeGreaterThan(0);
    expect(consumers.filter((property) => !COLOUR_ONLY_PROPERTIES.has(property))).toEqual([]);
  });
});

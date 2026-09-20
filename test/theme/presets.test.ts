/// <reference types="node" />
// Node types are referenced here only (this file writes the review report);
// the rest of the browser-side project stays free of Node globals.
import { mkdirSync, writeFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { presets } from '../../lib';
import { contrastRatio, interpolateColour, pickText } from '../../lib/theme/colour';
import { classify, distance, isPixelLength } from './signature';

// The Original preset plus 25 designs (plan R3).
const EXPECTED_PRESET_COUNT = 26;
const GALLERY = 'https://bronz3beard.github.io/react-matrix/';

const HEX = /^#[0-9a-f]{6}$/i;
const entries = Object.entries(presets);
const withPalette = entries.filter(([, theme]) => (theme.palette?.length ?? 0) > 0);

// Gates for every preset present (the full-set count is added when all 26 exist).
describe('preset quality gates', () => {
  it(`ships exactly ${EXPECTED_PRESET_COUNT} designs`, () => {
    expect(entries).toHaveLength(EXPECTED_PRESET_COUNT);
  });

  it('gives every preset a unique name', () => {
    const names = entries.map(([, theme]) => theme.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('keeps every pair of presets at least two design traits apart (H4)', () => {
    const tooClose: string[] = [];
    entries.forEach(([keyA, a], index) =>
      entries.slice(index + 1).forEach(([keyB, b]) => {
        const traits = distance(classify(a), classify(b));
        if (traits < 2) tooClose.push(`${keyA}/${keyB} differ on ${traits} trait(s)`);
      })
    );
    expect(tooClose).toEqual([]);
  });

  it('gives every preset its own background and its own palette', () => {
    const surfaces = entries.map(([, theme]) => theme.surface.toLowerCase());
    expect(new Set(surfaces).size).toBe(surfaces.length);
    const palettes = withPalette.map(([, theme]) => JSON.stringify(theme.palette));
    expect(new Set(palettes).size).toBe(palettes.length);
  });

  it.each(entries)('%s uses exact lengths and opaque hex colours', (_key, theme) => {
    [theme.gap, theme.lineWidth, ...theme.radius.trim().split(/\s+/)].forEach((length) =>
      expect(isPixelLength(length), length).toBe(true)
    );
    [theme.surface, theme.text, theme.mutedText, theme.headerSurface, theme.headerText].forEach(
      (colour) => expect(colour, colour).toMatch(HEX)
    );
    theme.palette?.forEach(({ bg, fg }) => {
      expect(bg).toMatch(HEX);
      expect(fg).toMatch(HEX);
    });
  });

  it.each(entries)('%s keeps its own text readable (WCAG AA 4.5:1)', (_key, theme) => {
    expect(contrastRatio(theme.text, theme.surface)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(theme.headerText, theme.headerSurface)).toBeGreaterThanOrEqual(4.5);
    // Sub-titles are rendered inside header cells.
    expect(contrastRatio(theme.mutedText, theme.headerSurface)).toBeGreaterThanOrEqual(4.5);
  });

  it.each(withPalette)('%s palette text is readable on every step', (_key, theme) => {
    // Beacon promises AAA; the rest promise AA.
    const required = theme.name === 'Beacon' ? 7 : 4.5;
    theme.palette!.forEach(({ bg, fg }) =>
      expect(contrastRatio(fg, bg), `${fg} on ${bg}`).toBeGreaterThanOrEqual(required)
    );
  });

  // Written for the design review: the pairs most likely to look alike, with
  // links that open them side by side in the gallery.
  it('records the closest pairs for the human design review', () => {
    const pairs = entries
      .flatMap(([keyA, a], index) =>
        entries.slice(index + 1).map(([keyB, b]) => ({
          keyA,
          keyB,
          traits: distance(classify(a), classify(b)),
        }))
      )
      .sort((first, second) => first.traits - second.traits);
    const closest = pairs.filter(({ traits }) => traits === pairs[0].traits);

    const report = [
      `# Closest preset pairs (${closest.length} at ${pairs[0].traits} differing traits)`,
      '',
      'Machine checks cannot judge whether two designs *look* alike. These pairs are',
      'the closest by design traits; open each link and confirm they read as distinct.',
      '',
      ...closest.map(({ keyA, keyB }) => `- [${keyA} vs ${keyB}](${GALLERY}?compare=${keyA},${keyB})`),
      '',
    ].join('\n');
    mkdirSync('test-results', { recursive: true });
    writeFileSync('test-results/preset-near-pairs.md', report);

    expect(closest.length).toBeGreaterThan(0);
  });

  it.each(withPalette.filter(([, theme]) => ['outline', 'dot'].includes(theme.cellVariant)))(
    '%s outline or dot colours stand out from the background (WCAG 1.4.11, 3:1)',
    (_key, theme) => {
      theme.palette!.forEach(({ bg }) =>
        expect(contrastRatio(bg, theme.surface), `${bg} on ${theme.surface}`).toBeGreaterThanOrEqual(3)
      );
    }
  );

  it.each(withPalette.filter(([, theme]) => theme.scale === 'score'))(
    '%s heatmap stays readable at every point of the scale',
    (_key, theme) => {
      const stops = theme.palette!.map(({ bg }) => bg);
      for (let step = 0; step <= 10; step += 1) {
        const bg = interpolateColour(stops, step / 10);
        expect(contrastRatio(pickText(bg), bg), bg).toBeGreaterThanOrEqual(4.5);
      }
    }
  );
});

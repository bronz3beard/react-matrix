import { describe, expect, it } from 'vitest';
import {
  contrastRatio,
  interpolateColour,
  isSafeColour,
  parseHex,
  pickText,
  relativeLuminance,
} from '../../lib/theme/colour';

describe('WCAG contrast', () => {
  it('gives 21:1 for black on white and 1:1 for identical colours', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
    expect(contrastRatio('#336699', '#336699')).toBeCloseTo(1, 5);
  });

  it('measures the Original "green" data colour below AA with black text', () => {
    // Documents the finding carried to B08: #008000 + black ≈ 4.1:1 (< 4.5:1).
    expect(contrastRatio('#008000', '#000000')).toBeCloseTo(4.09, 1);
  });

  it('picks whichever of black or white contrasts more', () => {
    expect(pickText('#ffff00')).toBe('#000000');
    expect(pickText('#000080')).toBe('#ffffff');
    expect(pickText('#008000')).toBe('#ffffff');
  });

  it('rejects malformed theme colours instead of guessing', () => {
    expect(() => parseHex('red')).toThrow('Expected a #rgb or #rrggbb colour');
    expect(() => parseHex('#12')).toThrow();
  });
});

describe('interpolateColour', () => {
  it('returns the stops at the ends of the scale', () => {
    expect(interpolateColour(['#fde725', '#21918c', '#440154'], 0)).toBe('#fde725');
    expect(interpolateColour(['#fde725', '#21918c', '#440154'], 1)).toBe('#440154');
    expect(interpolateColour(['#abc'], 0.5)).toBe('#aabbcc');
  });

  it('darkens steadily along a light-to-dark ramp', () => {
    const luminances = Array.from({ length: 11 }, (_, step) =>
      relativeLuminance(interpolateColour(['#fff5eb', '#fd8d3c', '#7f2704'], step / 10))
    );
    luminances.slice(1).forEach((luminance, index) => {
      expect(luminance).toBeLessThan(luminances[index]);
    });
  });

  it('clamps positions outside 0..1', () => {
    expect(interpolateColour(['#000000', '#ffffff'], -1)).toBe('#000000');
    expect(interpolateColour(['#000000', '#ffffff'], 2)).toBe('#ffffff');
  });
});

describe('isSafeColour (allowlist for untrusted data colours)', () => {
  it.each([
    '#fff',
    '#FFAA00',
    '#ffaa0080',
    'green',
    'rebeccapurple',
    'rgb(0 128 0)',
    'rgba(0, 128, 0, 0.5)',
    'hsl(120deg 100% 25%)',
    'oklch(62% 0.2 145)',
    'oklch(none 0.2 145 / 50%)',
  ])('accepts %s', (value) => {
    expect(isSafeColour(value)).toBe(true);
  });

  it.each([
    ['an extra box-shadow layer', 'red, 0 0 0 999px #000'],
    ['a comment', '/*x*/red'],
    ['a resource fetch', 'url(https://example.com/x.png)'],
    ['a variable reference', 'var(--x)'],
    ['a declaration break-out', '#fff;position:fixed'],
    ['a trailing list', 'rgb(0 0 0) , red'],
    ['a chained function', 'rgb(0,0,0)url(x)'],
    ['a legacy expression', 'expression(alert(1))'],
    ['!important', 'red !important'],
    ['an empty string', ''],
    ['surrounding whitespace', ' green'],
    ['a nested function', 'rgb(calc(1) 0 0)'],
    ['a non-hex hash', '#ggg'],
    ['an overlong value', `#${'a'.repeat(64)}`],
  ])('rejects %s', (_label, value) => {
    expect(isSafeColour(value)).toBe(false);
  });
});

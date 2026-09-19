import { describe, expect, it } from 'vitest';
import type { MatrixValue } from '../../lib';
import { contrastRatio } from '../../lib/theme/colour';
import { original } from '../../lib/theme/presets/original';
import {
  FALLBACK_CELL_COLOUR,
  cellColours,
  createSeverityScale,
} from '../../lib/theme/severity';
import type { MatrixTheme } from '../../lib/theme/types';
import { data } from '../../src/data/risk5x5';

const valueWith = (overrides: Partial<MatrixValue>): MatrixValue => ({
  ...data.matrix_values[0],
  ...overrides,
});

const PALETTE = [
  { bg: '#e8f5e9', fg: '#000000' },
  { bg: '#fff59d', fg: '#000000' },
  { bg: '#ffb74d', fg: '#000000' },
  { bg: '#e57373', fg: '#000000' },
  { bg: '#b71c1c', fg: '#ffffff' },
];

describe('createSeverityScale', () => {
  it('ranks the demo colours by their lowest score and records the score range', () => {
    const scale = createSeverityScale(data.matrix_values);

    expect([...scale.tiers]).toEqual([
      ['green', 0],
      ['yellow', 1],
      ['orange', 2],
      ['red', 3],
    ]);
    expect([scale.minScore, scale.maxScore]).toEqual([1, 25]);
  });
});

describe('cellColours', () => {
  const scale = createSeverityScale(data.matrix_values);

  it('uses the value’s own colour with the theme text when the theme has no palette', () => {
    expect(cellColours(original, { value: valueWith({ colour: 'orange' }), scale })).toEqual({
      bg: 'orange',
      fg: '#000000',
    });
  });

  it('falls back to a neutral colour and reports an unsafe data colour', () => {
    const unsafe = 'red, 0 0 0 999px #000';

    expect(cellColours(original, { value: valueWith({ colour: unsafe }), scale })).toEqual({
      bg: FALLBACK_CELL_COLOUR,
      fg: '#000000',
      rejectedColour: unsafe,
    });
    expect(contrastRatio(FALLBACK_CELL_COLOUR, '#000000')).toBeGreaterThan(7);
  });

  it('spreads colour tiers evenly across a tier palette', () => {
    const theme: MatrixTheme = { ...original, palette: PALETTE, scale: 'tier' };
    const bgFor = (colour: string) =>
      cellColours(theme, { value: valueWith({ colour }), scale }).bg;

    // 4 tiers over 5 stops → stops 0, 1, 3, 4.
    expect(['green', 'yellow', 'orange', 'red'].map(bgFor)).toEqual([
      '#e8f5e9',
      '#fff59d',
      '#e57373',
      '#b71c1c',
    ]);
  });

  it('uses the lowest palette step when all values share one colour', () => {
    const theme: MatrixTheme = { ...original, palette: PALETTE, scale: 'tier' };
    const single = createSeverityScale([valueWith({ colour: 'blue' })]);

    expect(cellColours(theme, { value: valueWith({ colour: 'blue' }), scale: single })).toEqual(
      PALETTE[0]
    );
  });

  it('maps scores continuously on a score scale and picks readable text', () => {
    const theme: MatrixTheme = { ...original, palette: PALETTE, scale: 'score' };

    const lowest = cellColours(theme, { value: valueWith({ score_value: 1 }), scale });
    const highest = cellColours(theme, { value: valueWith({ score_value: 25 }), scale });

    expect(lowest.bg).toBe('#e8f5e9');
    expect(highest.bg).toBe('#b71c1c');
    [lowest, highest].forEach(({ bg, fg }) =>
      expect(contrastRatio(bg, fg)).toBeGreaterThanOrEqual(4.5)
    );
  });

  it('places every value at the start of a score scale when all scores are equal', () => {
    const theme: MatrixTheme = { ...original, palette: PALETTE, scale: 'score' };
    const flat = createSeverityScale([valueWith({ score_value: 7 })]);

    expect(cellColours(theme, { value: valueWith({ score_value: 7 }), scale: flat }).bg).toBe(
      '#e8f5e9'
    );
  });
});

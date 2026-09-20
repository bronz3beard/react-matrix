import { describe, expect, it } from 'vitest';
import { buildGrid } from '../../lib/grid';
import {
  DATASETS,
  MAX_COMPARED,
  SIZES,
  readCompare,
  toggleCompared,
  writeCompare,
} from '../../src/gallery/compare';

describe('the compare selection in the URL', () => {
  it('starts empty, at the full-size matrix', () => {
    expect(readCompare('')).toEqual({ names: [], size: 5 });
  });

  it('ignores unknown designs, unknown sizes and repeats', () => {
    expect(readCompare('?compare=noir,nonsense,noir,aurora&size=4')).toEqual({
      names: ['noir', 'aurora'],
      size: 4,
    });
    expect(readCompare('?size=9').size).toBe(5);
  });

  it('never restores more designs than can be compared', () => {
    expect(readCompare('?compare=noir,aurora,thermal,swiss,clay,neon').names).toHaveLength(
      MAX_COMPARED
    );
  });

  it('keeps the filter parameters and drops its own defaults', () => {
    expect(writeCompare('?scheme=dark', { names: ['noir', 'aurora'], size: 4 })).toBe(
      '?scheme=dark&compare=noir,aurora&size=4'
    );
    expect(writeCompare('?scheme=dark&compare=noir&size=3', { names: [], size: 5 })).toBe(
      '?scheme=dark'
    );
  });
});

describe('choosing designs to compare', () => {
  it('adds, removes and keeps the order they were chosen in', () => {
    expect(toggleCompared({ names: ['noir'], name: 'aurora' })).toEqual(['noir', 'aurora']);
    expect(toggleCompared({ names: ['noir', 'aurora'], name: 'noir' })).toEqual(['aurora']);
  });

  it('refuses a fifth design rather than silently dropping one', () => {
    const full = ['noir', 'aurora', 'thermal', 'swiss'] as const;

    expect(toggleCompared({ names: [...full], name: 'clay' })).toEqual([...full]);
    expect(toggleCompared({ names: [...full], name: 'noir' })).toHaveLength(3);
  });
});

describe('the datasets offered in the compare view', () => {
  it('has one for every size, of that size, with a rating in every cell', () => {
    for (const size of SIZES) {
      const data = DATASETS[size];
      const { rows, columns, issues } = buildGrid(data, { reverse: true });

      expect(data.matrix_size, `${size}×${size}`).toBe(size);
      expect(columns).toHaveLength(size);
      expect(rows).toHaveLength(size);
      expect(rows.flatMap((row) => row.cells).filter(Boolean)).toHaveLength(size * size);
      // No duplicate or unplaceable coordinates: the grid reports those as issues.
      expect(issues).toEqual([]);
    }
  });

  it('runs from the mildest cell to the most severe', () => {
    const { rows } = buildGrid(DATASETS[4], { reverse: false });
    const first = rows[0].cells[0];
    const last = rows[3].cells[3];

    expect(first?.description).toBe('low');
    expect(last?.description).toBe('extreme');
    expect(last!.score_value).toBeGreaterThan(first!.score_value);
  });
});

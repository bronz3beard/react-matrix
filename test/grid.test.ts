import { describe, expect, it } from 'vitest';
import { buildGrid, type Grid } from '../lib/grid';
import { data } from '../lib/utils/data';
import { createMatrix, shuffle } from './fixtures/createMatrix';

const labels = (grid: Grid) =>
  grid.rows.map((row) => row.cells.map((cell) => cell?.description ?? null));

describe('buildGrid', () => {
  it('places every value at its likelihood × consequence regardless of input order', () => {
    const matrix = createMatrix(5);
    const shuffled = { ...matrix, matrix_values: shuffle(matrix.matrix_values) };

    const grid = buildGrid(shuffled, { reverse: true });

    expect(labels(grid)).toEqual(labels(buildGrid(matrix, { reverse: true })));
    grid.rows.forEach((row) =>
      row.cells.forEach((cell, columnIndex) => {
        expect(cell?.likelihood_descriptor).toBe(row.detail.likelihood);
        expect(cell?.consequence_descriptor).toBe(grid.columns[columnIndex].consequence);
      })
    );
    expect(grid.issues).toEqual([]);
  });

  it('puts the last likelihood on top when reversed and the first on top otherwise', () => {
    const matrix = createMatrix(3);

    expect(labels(buildGrid(matrix, { reverse: true }))).toEqual([
      ['C1', 'C2', 'C3'],
      ['D1', 'D2', 'D3'],
      ['E1', 'E2', 'E3'],
    ]);
    expect(labels(buildGrid(matrix, { reverse: false }))).toEqual([
      ['E1', 'E2', 'E3'],
      ['D1', 'D2', 'D3'],
      ['C1', 'C2', 'C3'],
    ]);
  });

  it.each([3, 4, 5, 6].map((size) => [size, size]))('builds a %i×%i grid from matrix_size', (size) => {
    const grid = buildGrid(createMatrix(size), { reverse: true });

    expect(grid.columns).toHaveLength(size);
    expect(grid.rows).toHaveLength(size);
    grid.rows.forEach((row) => expect(row.cells).toHaveLength(size));
    expect(grid.issues).toEqual([]);
  });

  it('shows only the first matrix_size rows and columns, silently excluding the rest', () => {
    const grid = buildGrid({ ...data, matrix_size: 3 }, { reverse: false });

    expect(grid.rows.map((row) => row.detail.row_header_title)).toEqual([
      'Rare',
      'Unlikely',
      'Possible',
    ]);
    expect(grid.columns.map((column) => column.header_title)).toEqual([
      'Minor',
      'Moderate',
      'Significant',
    ]);
    expect(grid.issues).toEqual([]);
  });

  it('leaves a cell empty when no value exists for its coordinate', () => {
    const matrix = createMatrix(3);
    const withoutD2 = {
      ...matrix,
      matrix_values: matrix.matrix_values.filter((value) => value.description !== 'D2'),
    };

    const grid = buildGrid(withoutD2, { reverse: true });

    expect(labels(grid)[1]).toEqual(['D1', null, 'D3']);
    expect(grid.issues).toEqual([]);
  });

  it('reports a value whose coordinate matches no row or column instead of throwing', () => {
    const matrix = createMatrix(3);
    const stray = { ...matrix.matrix_values[0], id: 999, likelihood_descriptor: 'Q' };

    const grid = buildGrid(
      { ...matrix, matrix_values: [...matrix.matrix_values, stray] },
      { reverse: true }
    );

    expect(grid.issues).toEqual([
      'react-data-matrix: value 999 (likelihood "Q" × consequence 1) matches no row or column and is not shown.',
    ]);
    expect(labels(grid).flat()).not.toContain(null);
  });

  it('keeps the first of two values that share a coordinate and reports both', () => {
    const matrix = createMatrix(3);
    const duplicate = { ...matrix.matrix_values[0], id: 500, description: 'duplicate' };

    const grid = buildGrid(
      { ...matrix, matrix_values: [...matrix.matrix_values, duplicate] },
      { reverse: false }
    );

    expect(labels(grid)[0][0]).toBe('E1');
    expect(grid.issues).toEqual([
      'react-data-matrix: values 1 and 500 share likelihood "E" × consequence 1; only 1 is shown.',
    ]);
  });
});

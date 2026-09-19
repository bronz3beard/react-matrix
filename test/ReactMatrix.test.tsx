import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ReactMatrix from '../lib';
import { data } from '../lib/utils/data';
import oracle from './fixtures/grid-5x5.pre-1.0.json';
import { createMatrix, shuffle } from './fixtures/createMatrix';
import { projectGrid } from './projectGrid';
import { readTable } from './readTable';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ReactMatrix grid layout', () => {
  it('renders shuffled values exactly like the ordered 0.4.x rendering', () => {
    render(
      <ReactMatrix data={{ ...data, matrix_values: shuffle(data.matrix_values) }} />
    );

    expect(projectGrid(readTable())).toEqual(oracle);
  });

  it.each([3, 4, 5, 6].map((size) => [size, size]))(
    'renders a %i×%i matrix with every rating under its own row and column headers',
    (size) => {
      const { container } = render(<ReactMatrix data={createMatrix(size)} />);

      const grid = projectGrid(readTable());
      expect(grid.columnHeaders).toHaveLength(size);
      expect(grid.rowHeaders).toHaveLength(size);
      expect(Object.keys(grid.cells)).toHaveLength(size * size);
      Object.entries(grid.cells).forEach(([key, text]) => {
        // key "LA|C3" (row header | column header) must hold the value labelled "A3".
        const [, likelihood, consequence] = /^L(\w)\|C(\d+)$/.exec(key) ?? [];
        expect(text.startsWith(`${likelihood}${consequence} `)).toBe(true);
      });

      // Every header row spans exactly the two row-header columns plus N value columns.
      container.querySelectorAll('thead tr').forEach((row) => {
        const width = [...row.children].reduce(
          (sum, cell) => sum + (cell as HTMLTableCellElement).colSpan,
          0
        );
        expect(width).toBe(size + 2);
      });
      const axisTitle = screen.getByRole('rowheader', { name: 'LIKELIHOOD' });
      expect((axisTitle as HTMLTableCellElement).rowSpan).toBe(size + 1);
    }
  );

  it('reports a value with an unknown coordinate and still renders every other rating', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const matrix = createMatrix(3);
    const stray = { ...matrix.matrix_values[0], id: 999, consequence_descriptor: 9 };

    render(
      <ReactMatrix data={{ ...matrix, matrix_values: [...matrix.matrix_values, stray] }} />
    );

    expect(error).toHaveBeenCalledWith(
      'react-data-matrix: value 999 (likelihood "E" × consequence 9) matches no row or column and is not shown.'
    );
    expect(screen.getAllByRole('cell')).toHaveLength(9);
  });
});

import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ReactMatrix, { original } from '../lib';
import { FALLBACK_CELL_COLOUR } from '../lib/theme/severity';
import { data } from '../src/data/risk5x5';
import oracle from './fixtures/grid-5x5.pre-1.0.json';
import { createMatrix, shuffle } from './fixtures/createMatrix';
import { projectGrid } from './projectGrid';
import { readTable } from './readTable';

afterEach(() => {
  vi.restoreAllMocks();
});

// 0.4.x oracle with the one declared 1.0 difference (axis text is upper-cased by CSS).
const EXPECTED_1_0 = {
  ...oracle,
  axisTitles: { ...oracle.axisTitles, row: 'Likelihood' },
};

describe('ReactMatrix grid layout', () => {
  it('renders shuffled values exactly like the ordered rendering', () => {
    render(
      <ReactMatrix data={{ ...data, matrix_values: shuffle(data.matrix_values) }} />
    );

    expect(projectGrid(readTable())).toEqual(EXPECTED_1_0);
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
      const axisTitle = screen.getByRole('rowheader', { name: 'Likelihood' });
      expect((axisTitle as HTMLTableCellElement).rowSpan).toBe(size);
    }
  );

  it('reports a value with an unknown coordinate and still renders every other rating', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const matrix = createMatrix(3);
    const stray = { ...matrix.matrix_values[0], id: 999, consequence_descriptor: 9 };

    const { container } = render(
      <ReactMatrix data={{ ...matrix, matrix_values: [...matrix.matrix_values, stray] }} />
    );

    expect(error).toHaveBeenCalledWith(
      'react-data-matrix: value 999 (likelihood "E" × consequence 9) matches no row or column and is not shown.'
    );
    expect(container.querySelectorAll('td.rdm-cell')).toHaveLength(9);
  });
});

const rootOf = (container: HTMLElement) => container.querySelector<HTMLElement>('.rdm-root')!;
const cellAt = (container: HTMLElement, row: string, column: number) =>
  container.querySelector<HTMLElement>(`td[data-row="${row}"][data-col="${column}"]`)!;

describe('ReactMatrix 1.0 API', () => {
  it('uses the Original preset by default', () => {
    const { container } = render(<ReactMatrix data={data} />);
    const root = rootOf(container);

    expect(root.dataset).toMatchObject({ variant: 'fill', axisCase: 'upper', scheme: 'light' });
    expect(root.style.getPropertyValue('--rdm-gap')).toBe('2px');
    expect(cellAt(container, 'A', 5).style.getPropertyValue('--rdm-cell-bg')).toBe('red');
  });

  it('applies a tweaked theme, then per-instance variables from `style` on top', () => {
    const { container } = render(
      <ReactMatrix
        data={data}
        theme={{ ...original, radius: '8px', gap: '6px' }}
        style={{ '--rdm-gap': '9px' }}
      />
    );
    const root = rootOf(container);

    expect(root.style.getPropertyValue('--rdm-radius')).toBe('8px');
    expect(root.style.getPropertyValue('--rdm-gap')).toBe('9px');
  });

  it('applies per-element overrides from `styles`', () => {
    const { container } = render(
      <ReactMatrix
        data={data}
        className="my-matrix"
        styles={{ table: { width: '10rem' }, cell: { fontWeight: 700 } }}
      />
    );

    expect(rootOf(container).className).toBe('rdm-root my-matrix');
    expect(container.querySelector<HTMLElement>('table')!.style.width).toBe('10rem');
    container
      .querySelectorAll<HTMLElement>('td.rdm-cell')
      .forEach((cell) => expect(cell.style.fontWeight).toBe('700'));
  });

  it('renders only semantic markup and data hooks when unstyled', () => {
    // React 19 keeps hoisted stylesheets from earlier tests in <head>, so assert
    // that this render adds none rather than that none exist.
    const sheetsBefore = document.querySelectorAll('style').length;
    const { container } = render(<ReactMatrix data={data} unstyled />);
    const root = rootOf(container);

    expect(document.querySelectorAll('style')).toHaveLength(sheetsBefore);
    expect(container.querySelector('style')).toBeNull();
    expect(root.getAttribute('style') ?? '').not.toContain('--rdm-');
    expect(root.dataset.variant).toBeUndefined();
    expect(cellAt(container, 'A', 5).dataset.tier).toBe('3');
    expect(cellAt(container, 'A', 5).getAttribute('style') ?? '').not.toContain('--rdm-');
  });

  it('marks every cell with its coordinates and severity tier, and renders no ids', () => {
    const { container } = render(<ReactMatrix data={data} />);

    expect(cellAt(container, 'E', 1).dataset.tier).toBe('0');
    expect(cellAt(container, 'C', 3).dataset.tier).toBe('2');
    expect(cellAt(container, 'A', 5).dataset.tier).toBe('3');
    expect(container.querySelectorAll('[id]')).toHaveLength(0);
  });

  it('names the table by its caption', () => {
    render(<ReactMatrix data={data} />);

    expect(screen.getByRole('table', { name: /React Matrix/ })).toBeTruthy();
  });

  it('shows a neutral colour for an unsafe data colour and reports it', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const unsafe = {
      ...data,
      matrix_values: data.matrix_values.map((value) =>
        value.id === 26 ? { ...value, colour: 'red, 0 0 0 999px #000' } : value
      ),
    };

    const { container } = render(<ReactMatrix data={unsafe} />);

    expect(cellAt(container, 'E', 1).style.getPropertyValue('--rdm-cell-bg')).toBe(
      FALLBACK_CELL_COLOUR
    );
    expect(error).toHaveBeenCalledWith(
      'react-data-matrix: value 26 has an unsafe colour "red, 0 0 0 999px #000"; a neutral colour is shown instead.'
    );
  });
});

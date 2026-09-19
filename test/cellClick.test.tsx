import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ReactMatrix, { type ReactMatrixProps } from '../lib';
import { data } from '../src/data/risk5x5';
import { createMatrix } from './fixtures/createMatrix';

const MOST_SEVERE = 'Likelihood Almost Certain, Consequence Catastrophic: extreme (25)';

const valueAt = (likelihood: string, consequence: number) =>
  data.matrix_values.find(
    (value) =>
      value.likelihood_descriptor === likelihood && value.consequence_descriptor === consequence
  );

describe('onCellClick', () => {
  it('receives the cell, its row and column details, and the click event', () => {
    const onCellClick = vi.fn<NonNullable<ReactMatrixProps['onCellClick']>>();
    render(<ReactMatrix data={data} onCellClick={onCellClick} />);

    fireEvent.click(screen.getByRole('button', { name: MOST_SEVERE }));

    expect(onCellClick).toHaveBeenCalledTimes(1);
    const [cell, { row, column, event }] = onCellClick.mock.calls[0];
    expect(cell).toBe(valueAt('A', 5));
    expect(row).toBe(data.matrix_details.find((detail) => detail.likelihood === 'A'));
    expect(column).toBe(data.matrix_details.find((detail) => detail.consequence === 5));
    expect(event.type).toBe('click');
  });

  it('turns every rating into a button named by its row, column and rating', () => {
    render(<ReactMatrix data={data} onCellClick={() => {}} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(25);
    buttons.forEach((button) => expect(button.getAttribute('type')).toBe('button'));
    expect(screen.getByRole('button', { name: MOST_SEVERE })).toBeTruthy();
    expect(
      screen.getByRole('button', {
        name: 'Likelihood Rare, Consequence Minor: low (1)',
      })
    ).toBeTruthy();
  });

  it('gives empty cells no button', () => {
    const matrix = createMatrix(3);
    const withGap = {
      ...matrix,
      matrix_values: matrix.matrix_values.filter((value) => value.description !== 'D2'),
    };

    render(<ReactMatrix data={withGap} onCellClick={() => {}} />);

    expect(screen.getAllByRole('button')).toHaveLength(8);
  });

  it('renders ratings as plain text when there is no handler', () => {
    render(<ReactMatrix data={data} />);

    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('lets errors thrown by the handler surface instead of swallowing them', () => {
    const failure = new Error('consumer handler failed');
    const surfaced: unknown[] = [];
    // React 19 reports event-handler errors through window.reportError; React 18
    // rethrows them from the dispatch. Either way they must reach the host app.
    const onWindowError = (event: ErrorEvent) => {
      surfaced.push(event.error);
      event.preventDefault();
    };
    window.addEventListener('error', onWindowError);
    render(
      <ReactMatrix
        data={data}
        onCellClick={() => {
          throw failure;
        }}
      />
    );

    try {
      fireEvent.click(screen.getByRole('button', { name: MOST_SEVERE }));
    } catch (error) {
      surfaced.push(error);
    } finally {
      window.removeEventListener('error', onWindowError);
    }

    expect(surfaced).toContain(failure);
  });
});

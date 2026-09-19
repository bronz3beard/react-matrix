import type { MatrixData, MatrixDetail, MatrixValue } from './types/index.js';

// Pure layout model: which value sits in which cell. Rows are keyed by
// `MatrixDetail.likelihood` and columns by `MatrixDetail.consequence`; each value
// is placed by its own coordinates, never by its position in `matrix_values`.
// Problems are returned as `issues` so the caller decides how to report them.

export interface GridRow {
  detail: MatrixDetail;
  cells: (MatrixValue | null)[];
}

export interface Grid {
  columns: MatrixDetail[];
  rows: GridRow[];
  issues: string[];
}

export const buildGrid = (
  data: MatrixData,
  { reverse }: { reverse: boolean }
): Grid => {
  const details = data.matrix_details.slice(0, data.matrix_size);
  const rowIndex = new Map(details.map((detail, index) => [detail.likelihood, index]));
  const columnIndex = new Map(
    details.map((detail, index) => [detail.consequence, index])
  );
  const knownLikelihoods = new Set(data.matrix_details.map((d) => d.likelihood));
  const knownConsequences = new Set(data.matrix_details.map((d) => d.consequence));

  const cells = details.map(() => details.map((): MatrixValue | null => null));
  const issues: string[] = [];

  for (const value of data.matrix_values) {
    const row = rowIndex.get(value.likelihood_descriptor);
    const column = columnIndex.get(value.consequence_descriptor);
    const coordinate = `likelihood "${value.likelihood_descriptor}" × consequence ${value.consequence_descriptor}`;

    if (row === undefined || column === undefined) {
      // Values for rows/columns beyond `matrix_size` are excluded on purpose;
      // only coordinates that match no detail at all are data errors.
      const known =
        knownLikelihoods.has(value.likelihood_descriptor) &&
        knownConsequences.has(value.consequence_descriptor);
      if (!known) {
        issues.push(
          `react-data-matrix: value ${value.id} (${coordinate}) matches no row or column and is not shown.`
        );
      }
      continue;
    }

    const existing = cells[row][column];
    if (existing) {
      issues.push(
        `react-data-matrix: values ${existing.id} and ${value.id} share ${coordinate}; only ${existing.id} is shown.`
      );
      continue;
    }
    cells[row][column] = value;
  }

  const rows = details.map((detail, index) => ({ detail, cells: cells[index] }));
  return { columns: details, rows: reverse ? rows.reverse() : rows, issues };
};

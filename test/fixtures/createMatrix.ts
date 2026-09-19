import type { MatrixData, MatrixValue } from '../../lib';

const LIKELIHOODS = ['E', 'D', 'C', 'B', 'A', 'Z'];

// An N×N matrix whose every value is labelled with its own coordinate
// (description "A3" = likelihood A × consequence 3), so a misplaced value is
// visible in any assertion.
export const createMatrix = (size: number): MatrixData => {
  const details = Array.from({ length: size }, (_, index) => ({
    id: index + 1,
    position: size,
    matrix_type: 'Risk',
    likelihood: LIKELIHOODS[index],
    consequence: index + 1,
    header_title: `C${index + 1}`,
    header_sub_title: '',
    row_header_title: `L${LIKELIHOODS[index]}`,
    row_header_sub_title: '',
  }));

  const values: MatrixValue[] = details.flatMap((row, rowIndex) =>
    details.map((column, columnIndex) => ({
      id: rowIndex * size + columnIndex + 1,
      matrix_id: 1,
      description: `${row.likelihood}${column.consequence}`,
      score_value: rowIndex * size + columnIndex + 1,
      colour: 'green',
      position: 1,
      likelihood_descriptor: row.likelihood,
      consequence_descriptor: column.consequence,
      response: '',
    }))
  );

  return {
    id: 1,
    matrix_size: size,
    matrix_name: `${size}×${size} test matrix`,
    primary_header_title: 'Consequence',
    primary_row_header_title: 'Likelihood',
    matrix_description: '',
    matrix_details: details,
    matrix_values: values,
  };
};

// Deterministic reordering: interleave from both ends, so almost every value
// moves far from its original index.
export const shuffle = <T>(items: T[]): T[] =>
  items.map((_, index) =>
    index % 2 === 0 ? items[items.length - 1 - index / 2] : items[(index - 1) / 2]
  );

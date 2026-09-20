import type { MatrixData, MatrixDetail, MatrixValue } from '../../lib';

// The 5×5 set in risk5x5.ts is the real historical demo data and is left alone.
// The gallery's compare view also offers 3×3 and 4×4, which are generated here
// rather than written out: two more hand-kept literals would be ~150 lines of
// the same shape, and a wrong coordinate would be invisible.

const LIKELIHOODS = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain'] as const;
const CONSEQUENCES = ['Minor', 'Moderate', 'Significant', 'Critical', 'Catastrophic'] as const;

// Highest share of the worst possible score each band covers, low to extreme.
const BANDS = [
  { upTo: 0.2, description: 'low', colour: 'green', response: 'Business as usual' },
  { upTo: 0.4, description: 'medium', colour: 'yellow', response: 'Requires routine monitoring' },
  { upTo: 0.7, description: 'high', colour: 'orange', response: 'Requires senior oversight' },
  { upTo: 1, description: 'extreme', colour: 'red', response: 'Activity should not commence' },
] as const;

/** Rows run most likely first, so the top row is "A", as in the 5×5 data. */
const likelihoodCode = ({ index, size }: { index: number; size: number }) =>
  String.fromCharCode('A'.charCodeAt(0) + size - 1 - index);

export const makeRiskData = (size: number): MatrixData => {
  const details: MatrixDetail[] = Array.from({ length: size }, (_, index) => ({
    id: index + 1,
    position: index + 1,
    matrix_type: 'Risk',
    likelihood: likelihoodCode({ index, size }),
    consequence: index + 1,
    header_title: CONSEQUENCES[index],
    header_sub_title: 'Header sub-title/description.',
    row_header_title: LIKELIHOODS[index],
    row_header_sub_title: 'Row Header sub-title/description.',
  }));

  const values: MatrixValue[] = details.flatMap((row, rowIndex) =>
    details.map((column, columnIndex): MatrixValue => {
      const score = (rowIndex + 1) * (columnIndex + 1);
      const band = BANDS.find(({ upTo }) => score <= upTo * size * size) ?? BANDS.at(-1)!;
      return {
        id: rowIndex * size + columnIndex + 1,
        matrix_id: size,
        description: band.description,
        score_value: score,
        colour: band.colour,
        position: rowIndex * size + columnIndex + 1,
        likelihood_descriptor: row.likelihood,
        consequence_descriptor: column.consequence,
        response: band.response,
      };
    })
  );

  return {
    id: size,
    matrix_size: size,
    matrix_name: 'React Matrix',
    primary_header_title: 'Consequence',
    primary_row_header_title: 'Likelihood',
    matrix_description: 'Risk Matrix Template',
    matrix_details: details,
    matrix_values: values,
  };
};

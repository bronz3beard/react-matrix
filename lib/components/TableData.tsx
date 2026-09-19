import type { CSSProperties } from 'react';
import type { SeverityColour } from '../theme/types.js';
import type { MatrixValue } from '../types/index.js';

interface TableDataProps {
  value: MatrixValue | null;
  row: string;
  column: number;
  tier?: number;
  colours?: SeverityColour;
  style?: CSSProperties;
}

// One matrix cell. The severity colour arrives as --rdm-cell-bg/--rdm-cell-fg,
// consumed only by colour properties in the base stylesheet; `data-tier` lets
// unstyled (e.g. strict-CSP) consumers colour cells from their own CSS.
const TableData = ({ value, row, column, tier, colours, style }: TableDataProps) => {
  if (!value) {
    return (
      <td className="rdm-cell rdm-cell-empty" data-row={row} data-col={column} style={style} />
    );
  }

  const colourVariables = colours
    ? { '--rdm-cell-bg': colours.bg, '--rdm-cell-fg': colours.fg }
    : undefined;

  return (
    <td
      className="rdm-cell"
      data-row={row}
      data-col={column}
      data-tier={tier}
      style={{ ...colourVariables, ...style }}
    >
      <span className="rdm-cell-label">{value.description}</span>
      <br />
      <span className="rdm-cell-score">{`(${value.score_value})`}</span>
    </td>
  );
};

export default TableData;

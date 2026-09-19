import type { CSSProperties, MouseEvent } from 'react';
import type { SeverityColour } from '../theme/types.js';
import type { MatrixValue } from '../types/index.js';

interface TableDataProps {
  value: MatrixValue | null;
  row: string;
  column: number;
  tier?: number;
  colours?: SeverityColour;
  style?: CSSProperties;
  /** Set when the consumer passed `onCellClick`: the cell becomes a native button. */
  onActivate?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Row, column and rating, so the button makes sense outside the table's context. */
  accessibleName?: string;
}

// One matrix cell. The severity colour arrives as --rdm-cell-bg/--rdm-cell-fg,
// consumed only by colour properties in the base stylesheet; `data-tier` lets
// unstyled (e.g. strict-CSP) consumers colour cells from their own CSS.
const TableData = ({
  value,
  row,
  column,
  tier,
  colours,
  style,
  onActivate,
  accessibleName,
}: TableDataProps) => {
  if (!value) {
    return (
      <td className="rdm-cell rdm-cell-empty" data-row={row} data-col={column} style={style} />
    );
  }

  const colourVariables = colours
    ? { '--rdm-cell-bg': colours.bg, '--rdm-cell-fg': colours.fg }
    : undefined;
  const content = (
    <>
      <span className="rdm-cell-label">{value.description}</span>
      <br />
      <span className="rdm-cell-score">{`(${value.score_value})`}</span>
    </>
  );

  return (
    <td
      className="rdm-cell"
      data-row={row}
      data-col={column}
      data-tier={tier}
      style={{ ...colourVariables, ...style }}
    >
      {onActivate ? (
        // No try/catch: errors from the consumer's handler must surface, not vanish.
        <button
          type="button"
          className="rdm-cell-button"
          aria-label={accessibleName}
          onClick={onActivate}
        >
          {content}
        </button>
      ) : (
        content
      )}
    </td>
  );
};

export default TableData;

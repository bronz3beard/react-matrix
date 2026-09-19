import type { GridRow } from '../grid.js';
import type { SeverityColour } from '../theme/types.js';
import type { MatrixDetail, MatrixSlotStyles, ReactMatrixProps } from '../types/index.js';
import TableData from './TableData.js';

interface MatrixRowsProps {
  rowTitle: string;
  columnTitle: string;
  columns: MatrixDetail[];
  rows: GridRow[];
  tiers: ReadonlyMap<string, number>;
  /** Severity colour per value id; `null` when unstyled. */
  colours: ReadonlyMap<number, SeverityColour> | null;
  styles: MatrixSlotStyles;
  onCellClick?: ReactMatrixProps['onCellClick'];
}

const MatrixRows = ({
  rowTitle,
  columnTitle,
  columns,
  rows,
  tiers,
  colours,
  styles,
  onCellClick,
}: MatrixRowsProps) => (
  <tbody>
    {rows.map(({ detail, cells }, rowIndex) => (
      <tr key={detail.id} data-row={detail.likelihood}>
        {rowIndex === 0 && (
          <th
            className="rdm-axis-title"
            scope="rowgroup"
            rowSpan={rows.length}
            style={styles.axisTitle}
          >
            {rowTitle}
          </th>
        )}
        <th className="rdm-row-header" scope="row" style={styles.rowHeader}>
          {detail.row_header_title}
          <div className="rdm-subtitle">{detail.row_header_sub_title}</div>
        </th>
        {cells.map((value, columnIndex) => {
          const column = columns[columnIndex];
          const interactive = value && onCellClick;
          return (
            <TableData
              key={value?.id ?? `empty-${columnIndex}`}
              value={value}
              row={detail.likelihood}
              column={column.consequence}
              tier={value ? tiers.get(value.colour) : undefined}
              colours={value ? colours?.get(value.id) : undefined}
              style={styles.cell}
              onActivate={
                interactive
                  ? (event) => onCellClick(value, { row: detail, column, event })
                  : undefined
              }
              accessibleName={
                interactive
                  ? `${rowTitle} ${detail.row_header_title}, ${columnTitle} ${column.header_title}: ${value.description} (${value.score_value})`
                  : undefined
              }
            />
          );
        })}
      </tr>
    ))}
  </tbody>
);

export default MatrixRows;

import type { GridRow } from '../grid.js';
import type { SeverityColour } from '../theme/types.js';
import type { MatrixDetail, MatrixSlotStyles } from '../types/index.js';
import TableData from './TableData.js';

interface MatrixRowsProps {
  title: string;
  columns: MatrixDetail[];
  rows: GridRow[];
  tiers: ReadonlyMap<string, number>;
  /** Severity colour per value id; `null` when unstyled. */
  colours: ReadonlyMap<number, SeverityColour> | null;
  styles: MatrixSlotStyles;
}

const MatrixRows = ({ title, columns, rows, tiers, colours, styles }: MatrixRowsProps) => (
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
            {title}
          </th>
        )}
        <th className="rdm-row-header" scope="row" style={styles.rowHeader}>
          {detail.row_header_title}
          <div className="rdm-subtitle">{detail.row_header_sub_title}</div>
        </th>
        {cells.map((value, columnIndex) => (
          <TableData
            key={value?.id ?? `empty-${columnIndex}`}
            value={value}
            row={detail.likelihood}
            column={columns[columnIndex].consequence}
            tier={value ? tiers.get(value.colour) : undefined}
            colours={value ? colours?.get(value.id) : undefined}
            style={styles.cell}
          />
        ))}
      </tr>
    ))}
  </tbody>
);

export default MatrixRows;

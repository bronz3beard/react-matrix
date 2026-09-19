import type { MatrixDetail, MatrixSlotStyles } from '../types/index.js';

interface MatrixHeadersProps {
  title: string;
  columns: MatrixDetail[];
  styles: MatrixSlotStyles;
}

// Two header rows: the column axis title spanning the value columns, then one
// header per column. The two leading cells sit above the row axis title and the
// row headers.
const MatrixHeaders = ({ title, columns, styles }: MatrixHeadersProps) => (
  <thead>
    <tr>
      <td className="rdm-corner" colSpan={2} />
      <th
        className="rdm-axis-title"
        scope="colgroup"
        colSpan={columns.length}
        style={styles.axisTitle}
      >
        {title}
      </th>
    </tr>
    <tr>
      <td className="rdm-corner" colSpan={2} />
      {columns.map((column) => (
        <th
          key={column.id}
          className="rdm-column-header"
          scope="col"
          data-col={column.consequence}
          style={styles.columnHeader}
        >
          {column.header_title}
          <div className="rdm-subtitle">{column.header_sub_title}</div>
        </th>
      ))}
    </tr>
  </thead>
);

export default MatrixHeaders;

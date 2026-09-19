// Coordinate projection of a rendered matrix table: which text sits at which
// (row header, column header). It deliberately ignores <tr> structure, so the
// markup can be reorganised without invalidating the recorded 0.4.x oracle.

export type CellRole = 'columnheader' | 'rowheader' | 'cell';

export interface TableCell {
  role: CellRole;
  textParts: string[];
}

export type TableRow = TableCell[];

export interface GridProjection {
  axisTitles: { column: string; row: string };
  columnHeaders: string[];
  rowHeaders: string[];
  cells: Record<string, string>;
}

export const normaliseText = (parts: string[]): string =>
  parts.join(' ').replace(/\s+/g, ' ').trim();

const cellText = (cell: TableCell): string => normaliseText(cell.textParts);

const primaryText = (cell: TableCell): string =>
  normaliseText(cell.textParts.filter((part) => part.trim() !== '').slice(0, 1));

const hasText = (cell: TableCell): boolean => cellText(cell) !== '';

export const projectGrid = (rows: TableRow[]): GridProjection => {
  const headerRows = rows.filter(
    (row) => row.length > 0 && row.every((cell) => cell.role === 'columnheader')
  );
  const columnHeaderRow = headerRows.reduce<TableRow>(
    (widest, row) =>
      row.filter(hasText).length > widest.filter(hasText).length ? row : widest,
    []
  );
  const columnHeaderCells = columnHeaderRow.filter(hasText);

  const dataRows = rows.filter((row) => row.some((cell) => cell.role === 'cell'));
  const rowHeaderCells = dataRows.map((row) => {
    const rowHeaders = row.filter((cell) => cell.role === 'rowheader');
    const rowHeader = rowHeaders[rowHeaders.length - 1];
    if (rowHeader === undefined) {
      throw new Error(`Data row without a row header: ${JSON.stringify(row)}`);
    }
    return rowHeader;
  });

  const cells: Record<string, string> = {};
  dataRows.forEach((row, rowIndex) => {
    const values = row.filter((cell) => cell.role === 'cell');
    if (values.length > columnHeaderCells.length) {
      throw new Error(
        `Row ${rowIndex} has ${values.length} cells but only ${columnHeaderCells.length} column headers`
      );
    }
    values.forEach((value, columnIndex) => {
      const key = `${primaryText(rowHeaderCells[rowIndex])}|${primaryText(
        columnHeaderCells[columnIndex]
      )}`;
      cells[key] = cellText(value);
    });
  });

  const axisColumn = headerRows
    .filter((row) => row !== columnHeaderRow)
    .flat()
    .filter(hasText);
  const axisRow = rows
    .flat()
    .filter(
      (cell) =>
        cell.role === 'rowheader' && hasText(cell) && !rowHeaderCells.includes(cell)
    );

  return {
    axisTitles: {
      column: axisColumn.map(cellText).join(' '),
      row: axisRow.map(cellText).join(' '),
    },
    columnHeaders: columnHeaderCells.map(cellText),
    rowHeaders: rowHeaderCells.map(cellText),
    cells,
  };
};

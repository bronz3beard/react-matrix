import { FC } from 'react';
import {
  getHeaderRowStyles,
  getHeaderTitleStyles,
  getHeaderSubTitleStyles,
  getHeaderPrimaryTitleStyles,
} from '../helpers/getStyles.js';
import { capitaliseString } from '../utils/functions.js';
import TableData from './TableData.js';
import { MatrixRowsProps } from '../types/index.js';

const MatrixRows: FC<MatrixRowsProps> = ({
  data,
  rows,
  rowPrimaryUpper = true,
  hasInlineStyles = true,
  trRowStyles = {},
  trTitleStyles = {},
  trSubTitleStyles = {},
  trPrimaryTitleStyles = {},
  tdStyles = {},
  customRowDynamicIdValue = '',
  customRowHeaderDynamicIdValue = '',
  customTableDataDynamicIdValue = '',
}: MatrixRowsProps) => {
  const tableRowStyles = getHeaderRowStyles(hasInlineStyles, trRowStyles);
  const tableRowHeaderTitleStyles = getHeaderTitleStyles(
    hasInlineStyles,
    trTitleStyles
  );
  const tableRowHeaderSubTitleStyles = getHeaderSubTitleStyles(
    hasInlineStyles,
    trSubTitleStyles
  );
  const rowHeaderPrimaryTitleStyles = getHeaderPrimaryTitleStyles(
    hasInlineStyles,
    trPrimaryTitleStyles
  );

  const rowPrimaryTitle = rowPrimaryUpper
    ? capitaliseString(data.primary_row_header_title)
    : data.primary_row_header_title;

  return (
    <tbody>
      <tr id="react-matrix-row-primary-title">
        <th
          scope="row"
          rowSpan={rows.length + 1}
          style={rowHeaderPrimaryTitleStyles}
        >
          {rowPrimaryTitle}
        </th>
      </tr>
      {rows.map(({ detail, cells }) => (
        <tr
          style={tableRowStyles}
          key={detail.id}
          id={`react-matrix-dynamic-rows-${detail.row_header_title}-${
            detail.row_header_sub_title
          }${!customRowDynamicIdValue ? '' : `-${customRowDynamicIdValue}`}`}
        >
          <th
            scope="row"
            style={tableRowHeaderTitleStyles}
            id={`react-matrix-dynamic-rows-${detail.row_header_title}-${
              detail.row_header_sub_title
            }${
              !customRowHeaderDynamicIdValue
                ? ''
                : `-${customRowHeaderDynamicIdValue}`
            }`}
          >
            {detail.row_header_title}
            <div style={tableRowHeaderSubTitleStyles}>
              {detail.row_header_sub_title}
            </div>
          </th>
          {cells.map((cell, index) =>
            cell ? (
              <TableData
                data={cell}
                tdStyles={tdStyles}
                key={cell.id}
                hasInlineStyles={hasInlineStyles}
                customTableDataDynamicIdValue={customTableDataDynamicIdValue}
              />
            ) : (
              <td key={`empty-${index}`} />
            )
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default MatrixRows;

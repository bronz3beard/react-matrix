import { FC } from 'react';
import {
  getTableStyles,
  getTableBoarder,
  getContainerStyles,
} from './helpers/getStyles';
import MatrixHeaders from './components/MatrixHeaders';
import MatrixRows from './components/MatrixRows';
import { ReactMatrixProps } from './types';

const ReactMatrix: FC<ReactMatrixProps> = ({
  data,
  tableStyles: contextTableStyles,
  hasTableBorder: contextHasTableBorder,
  hasInlineStyles: contextHasInlineStyles,
  hasContainerStyles: contextHasContainerStyles,
  tableContainerStyles: contextTableContainerStyles,

  tableStyles = {},
  hasInlineStyles = true,

  // MatrixHeaders
  headerPrimaryUpper = true,
  thRowStyles = {},
  thTitleStyles = {},
  thSubTitleStyles = {},
  thPrimaryTitleStyles = {},
  customHeaderRowIdValue = '',
  customDynamicHeaderTitleIdValue = '',
  customDynamicSubHeaderTitleIdValue = '',

  // MatrixRows
  rowPrimaryUpper = true,
  reverseMatrixValues = true,
  trRowStyles = {},
  trTitleStyles = {},
  trSubTitleStyles = {},
  trPrimaryTitleStyles = {},
  tdStyles = {},
  customRowDynamicIdValue = '',
  customRowHeaderDynamicIdValue = '',
  customTableDataDynamicIdValue = '',
}) => {
  const tableBorder = getTableBoarder(
    !!(contextHasInlineStyles && contextHasTableBorder)
  );
  const tableElmStyles = getTableStyles(
    !!(contextHasInlineStyles && contextTableStyles),
    tableStyles
  );
  const containerStyles = getContainerStyles(
    !!(contextHasInlineStyles && contextHasContainerStyles),
    contextTableContainerStyles ?? {}
  );

  return (
    <div style={containerStyles}>
      <h1>{data.matrix_name}</h1>
      <h4>{data.matrix_description}</h4>
      <table id="matrix-table" style={{ ...tableElmStyles, ...tableBorder }}>
        <MatrixHeaders
          {...{
            data,
            hasInlineStyles,
            headerPrimaryUpper,
            thRowStyles,
            thTitleStyles,
            thSubTitleStyles,
            thPrimaryTitleStyles,
            customHeaderRowIdValue,
            customDynamicHeaderTitleIdValue,
            customDynamicSubHeaderTitleIdValue,
          }}
        />
        <MatrixRows
          {...{
            data,
            rowPrimaryUpper,
            hasInlineStyles,
            reverseMatrixValues,
            trRowStyles,
            trTitleStyles,
            trSubTitleStyles,
            trPrimaryTitleStyles,
            tdStyles,
            customRowDynamicIdValue,
            customRowHeaderDynamicIdValue,
            customTableDataDynamicIdValue,
          }}
        />
      </table>
    </div>
  );
};

export default ReactMatrix;

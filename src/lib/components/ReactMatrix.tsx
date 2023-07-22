import React, { FC, useContext } from "react";
import {
  getTableStyles,
  getTableBoarder,
  getContainerStyles,
} from "../helpers/getStyles";
import MatrixHeaders from "./MatrixHeaders";
import MatrixRows from "./MatrixRows";
import Context from "../context";
import { ReactMatrixProps } from "../types";

const ReactMatrix: FC<ReactMatrixProps> = ({ tableStyles = {} }) => {
  const {
    matrixName,
    tableStyles: contextTableStyles,
    hasTableBorder: contextHasTableBorder,
    hasInlineStyles: contextHasInlineStyles,
    matrixDescription,
    hasContainerStyles: contextHasContainerStyles,
    tableContainerStyles: contextTableContainerStyles,
  } = useContext(Context);

  const tableBorder = getTableBoarder(
    contextHasInlineStyles && contextHasTableBorder
  );
  const tableElmStyles = getTableStyles(
    !!(contextHasInlineStyles && contextTableStyles),
    tableStyles
  );
  const containerStyles = getContainerStyles(
    contextHasInlineStyles && contextHasContainerStyles,
    contextTableContainerStyles
  );

  return (
    <div style={containerStyles}>
      <h1>{matrixName}</h1>
      <h4>{matrixDescription}</h4>
      <table id="matrix-table" style={{ ...tableElmStyles, ...tableBorder }}>
        <MatrixHeaders />
        <MatrixRows />
      </table>
    </div>
  );
};

export default ReactMatrix;

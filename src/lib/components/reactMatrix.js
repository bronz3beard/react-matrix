import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  getTableStyles,
  getTableBoarder,
  getContainerStyles,
} from "../helpers/getStyles";
import MatrixHeaders from "./matrixHeaders";
import MatrixRows from "./matrixRows";
import Context from "../context";

const ReactMatrix = () => {
  const { 
    matrixName,
    tableStyles,
    hasTableBorder,
    hasInlineStyles,
    matrixDescription,
    hasContainerStyles,
    tableContainerStyles,
   } = useContext(Context)

  const tableBorder = getTableBoarder(hasInlineStyles && hasTableBorder);
  const tableElmStyles = getTableStyles(hasInlineStyles && tableStyles, tableStyles);
  const containerStyles = getContainerStyles(hasInlineStyles && hasContainerStyles, tableContainerStyles);

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

ReactMatrix.defaultProps = {
  tableStyles: {},
  hasTableBorder: true,
  hasInlineStyles: true,
  hasContainerStyles: true,
  tableContainerStyles: {},

  matrixName: "",
  matrixDescription: "",
};

ReactMatrix.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    matrix_name: PropTypes.string,
    matrix_description: PropTypes.string,
    matrix_size: PropTypes.number.isRequired,
    matrix_details: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        likelihood: PropTypes.string,
        consequence: PropTypes.number,
        header_title: PropTypes.string,
        header_sub_title: PropTypes.string,
        row_header_title: PropTypes.string,
        row_header_sub_title: PropTypes.string,
      })
    ),

    matrix_values: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        colour: PropTypes.string,
        position: PropTypes.number.isRequired,
        matrix_id: PropTypes.number,
        score_value: PropTypes.number,
        description: PropTypes.string,
        response: PropTypes.string,
        likelihood_descriptor: PropTypes.string.isRequired,
        consequence_descriptor: PropTypes.number,
      })
    ),
  }),
  hasTableBorder: PropTypes.bool,
  hasInlineStyles: PropTypes.bool,
  hasContainerStyles: PropTypes.bool,
  reverseMatrixValues: PropTypes.bool,
  matrixSizeSelected: PropTypes.number,

  rowPrimaryUpper: PropTypes.bool,
  headerPrimaryUpper: PropTypes.bool,

  tableContainerStyles: PropTypes.shape({}),
  tableStyles: PropTypes.shape({}),

  thRowStyles: PropTypes.shape({}),
  thTitleStyles: PropTypes.shape({}),
  thSubTitleStyles: PropTypes.shape({}),
  thPrimaryTitleStyles: PropTypes.shape({}),

  trRowStyles: PropTypes.shape({}),
  trTitleStyles: PropTypes.shape({}),
  trSubTitleStyles: PropTypes.shape({}),
  trPrimaryTitleStyles: PropTypes.shape({}),

  tdStyles: PropTypes.shape({}),

  customHeaderRowIdValue: PropTypes.string,
  customDynamicHeaderTitleIdValue: PropTypes.string,
  customDynamicSubHeaderTitleIdValue: PropTypes.string,

  customRowDynamicIdValue: PropTypes.string,
  customRowHeaderDynamicIdValue: PropTypes.string,

  customTableDataDynamicIdValue: PropTypes.string,
};

export default ReactMatrix;

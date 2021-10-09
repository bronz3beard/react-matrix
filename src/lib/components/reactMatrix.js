import React from "react";
import PropTypes from "prop-types";
import MatrixHeaders from "./matrixHeaders";
import MatrixRows from "./matrixRows";

const ReactMatrix = (props) => {
  const {
    data,
    tableStyles,
    thRowStyles,
    trRowStyles,
    trTitleStyles,
    thTitleStyles,
    hasTableBorder,
    rowPrimaryUpper,
    hasInlineStyles,
    thSubTitleStyles,
    trSubTitleStyles,
    headerPrimaryUpper,
    matrixSizeSelected,
    hasContainerStyles,
    reverseMatrixValues,
    thPrimaryTitleStyles,
    trPrimaryTitleStyles,
    tableContainerStyles,
    customHeaderRowIdValue,
    customRowDynamicIdValue,
    customTableDataDynamicIdValue,
    customDynamicHeaderTitleIdValue,
    customDynamicSubHeaderTitleIdValue,
  } = props;

  const customContainerStyles = !tableContainerStyles
    ? {}
    : tableContainerStyles;
  const containerStyles =
    hasInlineStyles && hasContainerStyles
      ? {
          top: `${50}%`,
          left: `${50}%`,
          height: `${100}%`,
          textAlign: "center",
          position: "absolute",
          transform: `translate(${-50}%, ${-50}%)`,
          ...tableContainerStyles,
        }
      : { ...customContainerStyles };

  const tableBorder =
    hasInlineStyles && hasTableBorder ? { border: `${1}px solid black` } : {};

  const customTableStyles = !tableStyles ? {} : tableStyles;
  const tableElmStyles =
    hasInlineStyles && tableStyles
      ? { width: `${70}rem`, ...tableStyles }
      : { ...customTableStyles };

  return (
    <div style={containerStyles}>
      <h1>{data.matrix_name}</h1>
      <h4>{data.matrix_description}</h4>
      <table id="matrix-table" style={{ ...tableElmStyles, ...tableBorder }}>
        <MatrixHeaders
          data={data}
          thRowStyles={thRowStyles}
          thTitleStyles={thTitleStyles}
          hasInlineStyles={hasInlineStyles}
          thSubTitleStyles={thSubTitleStyles}
          headerPrimaryUpper={headerPrimaryUpper}
          matrixSizeSelected={matrixSizeSelected}
          thPrimaryTitleStyles={thPrimaryTitleStyles}
          customHeaderRowIdValue={customHeaderRowIdValue}
          customDynamicHeaderTitleIdValue={customDynamicHeaderTitleIdValue}
          customDynamicSubHeaderTitleIdValue={
            customDynamicSubHeaderTitleIdValue
          }
        />

        <MatrixRows
          data={data}
          trRowStyles={trRowStyles}
          trTitleStyles={trTitleStyles}
          rowPrimaryUpper={rowPrimaryUpper}
          hasInlineStyles={hasInlineStyles}
          trSubTitleStyles={trSubTitleStyles}
          matrixSizeSelected={matrixSizeSelected}
          reverseMatrixValues={reverseMatrixValues}
          trPrimaryTitleStyles={trPrimaryTitleStyles}
          customRowDynamicIdValue={customRowDynamicIdValue}
          customTableDataDynamicIdValue={customTableDataDynamicIdValue}
        />
      </table>
    </div>
  );
};

ReactMatrix.defaultProps = {
  hasTableBorder: true,
  rowPrimaryUpper: true,
  hasInlineStyles: true,
  matrixSizeSelected: 5,
  headerPrimaryUpper: true,
  hasContainerStyles: true,
  reverseMatrixValues: true,

  tableContainerStyles: {},
  tableStyles: {},

  thRowStyles: {},
  thTitleStyles: {},
  thSubTitleStyles: {},
  thPrimaryTitleStyles: {},

  trRowStyles: {},
  trTitleStyles: {},
  trSubTitleStyles: {},
  trPrimaryTitleStyles: {},

  tdStyles: {},

  customHeaderRowIdValue: "",
  customRowDynamicIdValue: "",
  customTableDataDynamicIdValue: "",
  customRowHeaderDynamicIdValue: "",
  customDynamicHeaderTitleIdValue: "",
  customDynamicSubHeaderTitleIdValue: "",
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
    ).isRequired,

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
    ).isRequired,
  }).isRequired,

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

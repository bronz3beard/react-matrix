import React from "react";
import PropTypes from "prop-types";
import { groupObjectsByProp, capitaliseString } from "../utils/functions";
import TableData from "./tableData";

const MatrixRows = (props) => {
  const {
    data,
    tdStyles,
    trRowStyles,
    trTitleStyles,
    rowPrimaryUpper,
    hasInlineStyles,
    trSubTitleStyles,
    reverseMatrixValues,
    trPrimaryTitleStyles,
    customRowDynamicIdValue,
    customRowHeaderDynamicIdValue,
    customTableDataDynamicIdValue,
  } = props;

  const valuesArray = reverseMatrixValues
    ? groupObjectsByProp(data.matrix_values, "likelihood_descriptor")
        .reverse()
        .slice(0, data.matrix_size)
    : groupObjectsByProp(data.matrix_values, "likelihood_descriptor").slice(
        0,
        data.matrix_size
      );

  const customPrimaryTitleStyles = !trPrimaryTitleStyles
    ? {}
    : trPrimaryTitleStyles;

  const rowHeaderPrimaryTitleStyles = hasInlineStyles
    ? { ...trPrimaryTitleStyles }
    : { ...customPrimaryTitleStyles };

  const customRowStyles = !trRowStyles ? {} : trRowStyles;
  const tableRowStyles = hasInlineStyles
    ? { border: `${1}px solid black`, ...customRowStyles }
    : { ...customRowStyles };

  const customTitleStyle = !trTitleStyles ? {} : trTitleStyles;
  const tableRowHeaderTitleStyles = hasInlineStyles
    ? {
        backgroundColor: "light-black",
        border: `${1}px solid black`,
        ...trTitleStyles,
      }
    : { ...customTitleStyle };

  const customSubTitleStyle = !trSubTitleStyles ? {} : trSubTitleStyles;
  const tableRowHeaderSubTitleStyles = hasInlineStyles
    ? { fontSize: `${0.9}em`, fontWeight: "normal", ...trSubTitleStyles }
    : { ...customSubTitleStyle };

  const rowPrimaryTitle = rowPrimaryUpper
    ? capitaliseString(data.primary_row_header_title)
    : data.primary_row_header_title;

  return (
    <tbody>
      <tr id="react-matrix-row-primary-title">
        <th scope="row" rowSpan="6" style={rowHeaderPrimaryTitleStyles}>
          {rowPrimaryTitle}
        </th>
      </tr>
      {valuesArray.map((row, index) => {
        const rowHeaderOrder = reverseMatrixValues
          ? data.matrix_size - (index + 1)
          : index;

        return (
          <tr
            style={tableRowStyles}
            key={`row-${index}`}
            id={`react-matrix-dynamic-rows-${
              data.matrix_details[rowHeaderOrder]?.row_header_titles
            }-${data.matrix_details[rowHeaderOrder]?.row_header_sub_titles}${
              !customRowDynamicIdValue ? "" : `-${customRowDynamicIdValue}`
            }`}
          >
            <th
              scope="row"
              style={tableRowHeaderTitleStyles}
              id={`react-matrix-dynamic-rows-${
                data.matrix_details[rowHeaderOrder]?.row_header_titles
              }-${data.matrix_details[rowHeaderOrder]?.row_header_sub_titles}${
                !customRowHeaderDynamicIdValue
                  ? ""
                  : `-${customRowHeaderDynamicIdValue}`
              }`}
            >
              {data.matrix_details[rowHeaderOrder]?.row_header_title}
              <div style={tableRowHeaderSubTitleStyles}>
                {data.matrix_details[rowHeaderOrder]?.row_header_sub_title}
              </div>
            </th>
            {row.slice(0, data.matrix_size).map((item, index) => {
              return (
                <TableData
                  data={item}
                  tdStyles={tdStyles}
                  key={`${item.id}-${index}`}
                  hasInlineStyles={hasInlineStyles}
                  customTableDataDynamicIdValue={customTableDataDynamicIdValue}
                />
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

MatrixRows.defaultProps = {
  rowPrimaryUpper: true,
  hasInlineStyles: true,
  reverseMatrixValues: true,

  trRowStyles: {},
  trTitleStyles: {},
  trSubTitleStyles: {},
  trPrimaryTitleStyles: {},

  tdStyles: {},

  customRowDynamicIdValue: "",
  customRowHeaderDynamicIdValue: "",
  customTableDataDynamicIdValue: "",
};

MatrixRows.propTypes = {
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

  rowPrimaryUpper: PropTypes.bool,
  hasInlineStyles: PropTypes.bool,
  reverseMatrixValues: PropTypes.bool,

  trRowStyles: PropTypes.shape({}),
  trTitleStyles: PropTypes.shape({}),
  trSubTitleStyles: PropTypes.shape({}),
  trPrimaryTitleStyles: PropTypes.shape({}),

  tdStyles: PropTypes.shape({}),

  customRowDynamicIdValue: PropTypes.string,
  customRowHeaderDynamicIdValue: PropTypes.string,

  customTableDataDynamicIdValue: PropTypes.string,
};

export default MatrixRows;

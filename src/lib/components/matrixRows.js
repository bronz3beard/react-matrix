import React, { useContext } from "react";
import {
  getHeaderRowStyles,
  getHeaderTitleStyles,
  getHeaderSubTitleStyles,
  getHeaderPrimaryTitleStyles,
} from "../helpers/getStyles";
import { groupObjectsByProp, capitaliseString } from "../utils/functions";
import TableData from "./tableData";
import Context from "../context";

const MatrixRows = () => {
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
   } = useContext(Context)

  const valuesArray = reverseMatrixValues
    ? groupObjectsByProp(data.matrix_values, "likelihood_descriptor")
        .reverse()
        .slice(0, data.matrix_size)
    : groupObjectsByProp(data.matrix_values, "likelihood_descriptor").slice(
        0,
        data.matrix_size
      );

  const tableRowStyles = getHeaderRowStyles(hasInlineStyles, trRowStyles);
  const tableRowHeaderTitleStyles = getHeaderTitleStyles(hasInlineStyles, trTitleStyles);
  const tableRowHeaderSubTitleStyles = getHeaderSubTitleStyles(hasInlineStyles, trSubTitleStyles);
  const rowHeaderPrimaryTitleStyles = getHeaderPrimaryTitleStyles(hasInlineStyles, trPrimaryTitleStyles);

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

  matrixSizeSelected: 5,

  customRowDynamicIdValue: "",
  customRowHeaderDynamicIdValue: "",
  customTableDataDynamicIdValue: "",
};

export default MatrixRows;

import React from "react";
import { getHeaderRowStyles, getHeaderTitleStyles, getHeaderSubTitleStyles, getHeaderPrimaryTitleStyles, } from "../helpers/getStyles";
import { groupObjectsByProp, capitaliseString } from "../utils/functions";
import TableData from "./TableData";
const MatrixRows = ({ data, rowPrimaryUpper = true, hasInlineStyles = true, reverseMatrixValues = true, trRowStyles = {}, trTitleStyles = {}, trSubTitleStyles = {}, trPrimaryTitleStyles = {}, tdStyles = {}, customRowDynamicIdValue = "", customRowHeaderDynamicIdValue = "", customTableDataDynamicIdValue = "", }) => {
    const valuesArray = reverseMatrixValues
        ? groupObjectsByProp(data.matrix_values, "likelihood_descriptor")
            .reverse()
            .slice(0, data.matrix_size)
        : groupObjectsByProp(data.matrix_values, "likelihood_descriptor").slice(0, data.matrix_size);
    const tableRowStyles = getHeaderRowStyles(hasInlineStyles, trRowStyles);
    const tableRowHeaderTitleStyles = getHeaderTitleStyles(hasInlineStyles, trTitleStyles);
    const tableRowHeaderSubTitleStyles = getHeaderSubTitleStyles(hasInlineStyles, trSubTitleStyles);
    const rowHeaderPrimaryTitleStyles = getHeaderPrimaryTitleStyles(hasInlineStyles, trPrimaryTitleStyles);
    const rowPrimaryTitle = rowPrimaryUpper
        ? capitaliseString(data.primary_row_header_title)
        : data.primary_row_header_title;
    return (<tbody>
      <tr id="react-matrix-row-primary-title">
        <th scope="row" rowSpan={6} style={rowHeaderPrimaryTitleStyles}>
          {rowPrimaryTitle}
        </th>
      </tr>
      {valuesArray.map((row, index) => {
            var _a, _b, _c, _d, _e, _f;
            const rowHeaderOrder = reverseMatrixValues
                ? data.matrix_size - (index + 1)
                : index;
            return (<tr style={tableRowStyles} key={`row-${index}`} id={`react-matrix-dynamic-rows-${(_a = data.matrix_details[rowHeaderOrder]) === null || _a === void 0 ? void 0 : _a.row_header_title}-${(_b = data.matrix_details[rowHeaderOrder]) === null || _b === void 0 ? void 0 : _b.row_header_sub_title}${!customRowDynamicIdValue ? "" : `-${customRowDynamicIdValue}`}`}>
            <th scope="row" style={tableRowHeaderTitleStyles} id={`react-matrix-dynamic-rows-${(_c = data.matrix_details[rowHeaderOrder]) === null || _c === void 0 ? void 0 : _c.row_header_title}-${(_d = data.matrix_details[rowHeaderOrder]) === null || _d === void 0 ? void 0 : _d.row_header_sub_title}${!customRowHeaderDynamicIdValue
                    ? ""
                    : `-${customRowHeaderDynamicIdValue}`}`}>
              {(_e = data.matrix_details[rowHeaderOrder]) === null || _e === void 0 ? void 0 : _e.row_header_title}
              <div style={tableRowHeaderSubTitleStyles}>
                {(_f = data.matrix_details[rowHeaderOrder]) === null || _f === void 0 ? void 0 : _f.row_header_sub_title}
              </div>
            </th>
            {row
                    .slice(0, data.matrix_size)
                    .map((item, index) => {
                    return (<TableData data={item} tdStyles={tdStyles} key={`${item.id}-${index}`} hasInlineStyles={hasInlineStyles} customTableDataDynamicIdValue={customTableDataDynamicIdValue}/>);
                })}
          </tr>);
        })}
    </tbody>);
};
MatrixRows.defaultProps = {};
export default MatrixRows;

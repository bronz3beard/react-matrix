"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.reverse.js");
var _react = _interopRequireWildcard(require("react"));
var _getStyles = require("../helpers/getStyles");
var _functions = require("../utils/functions");
var _tableData = _interopRequireDefault(require("./tableData"));
var _context = _interopRequireDefault(require("../context"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
    customTableDataDynamicIdValue
  } = (0, _react.useContext)(_context.default);
  const valuesArray = reverseMatrixValues ? (0, _functions.groupObjectsByProp)(data.matrix_values, "likelihood_descriptor").reverse().slice(0, data.matrix_size) : (0, _functions.groupObjectsByProp)(data.matrix_values, "likelihood_descriptor").slice(0, data.matrix_size);
  const tableRowStyles = (0, _getStyles.getHeaderRowStyles)(hasInlineStyles, trRowStyles);
  const tableRowHeaderTitleStyles = (0, _getStyles.getHeaderTitleStyles)(hasInlineStyles, trTitleStyles);
  const tableRowHeaderSubTitleStyles = (0, _getStyles.getHeaderSubTitleStyles)(hasInlineStyles, trSubTitleStyles);
  const rowHeaderPrimaryTitleStyles = (0, _getStyles.getHeaderPrimaryTitleStyles)(hasInlineStyles, trPrimaryTitleStyles);
  const rowPrimaryTitle = rowPrimaryUpper ? (0, _functions.capitaliseString)(data.primary_row_header_title) : data.primary_row_header_title;
  return /*#__PURE__*/_react.default.createElement("tbody", null, /*#__PURE__*/_react.default.createElement("tr", {
    id: "react-matrix-row-primary-title"
  }, /*#__PURE__*/_react.default.createElement("th", {
    scope: "row",
    rowSpan: "6",
    style: rowHeaderPrimaryTitleStyles
  }, rowPrimaryTitle)), valuesArray.map((row, index) => {
    var _data$matrix_details$, _data$matrix_details$2, _data$matrix_details$3, _data$matrix_details$4, _data$matrix_details$5, _data$matrix_details$6;
    const rowHeaderOrder = reverseMatrixValues ? data.matrix_size - (index + 1) : index;
    return /*#__PURE__*/_react.default.createElement("tr", {
      style: tableRowStyles,
      key: "row-".concat(index),
      id: "react-matrix-dynamic-rows-".concat((_data$matrix_details$ = data.matrix_details[rowHeaderOrder]) === null || _data$matrix_details$ === void 0 ? void 0 : _data$matrix_details$.row_header_titles, "-").concat((_data$matrix_details$2 = data.matrix_details[rowHeaderOrder]) === null || _data$matrix_details$2 === void 0 ? void 0 : _data$matrix_details$2.row_header_sub_titles).concat(!customRowDynamicIdValue ? "" : "-".concat(customRowDynamicIdValue))
    }, /*#__PURE__*/_react.default.createElement("th", {
      scope: "row",
      style: tableRowHeaderTitleStyles,
      id: "react-matrix-dynamic-rows-".concat((_data$matrix_details$3 = data.matrix_details[rowHeaderOrder]) === null || _data$matrix_details$3 === void 0 ? void 0 : _data$matrix_details$3.row_header_titles, "-").concat((_data$matrix_details$4 = data.matrix_details[rowHeaderOrder]) === null || _data$matrix_details$4 === void 0 ? void 0 : _data$matrix_details$4.row_header_sub_titles).concat(!customRowHeaderDynamicIdValue ? "" : "-".concat(customRowHeaderDynamicIdValue))
    }, (_data$matrix_details$5 = data.matrix_details[rowHeaderOrder]) === null || _data$matrix_details$5 === void 0 ? void 0 : _data$matrix_details$5.row_header_title, /*#__PURE__*/_react.default.createElement("div", {
      style: tableRowHeaderSubTitleStyles
    }, (_data$matrix_details$6 = data.matrix_details[rowHeaderOrder]) === null || _data$matrix_details$6 === void 0 ? void 0 : _data$matrix_details$6.row_header_sub_title)), row.slice(0, data.matrix_size).map((item, index) => {
      return /*#__PURE__*/_react.default.createElement(_tableData.default, {
        data: item,
        tdStyles: tdStyles,
        key: "".concat(item.id, "-").concat(index),
        hasInlineStyles: hasInlineStyles,
        customTableDataDynamicIdValue: customTableDataDynamicIdValue
      });
    }));
  }));
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
  customTableDataDynamicIdValue: ""
};
var _default = MatrixRows;
exports.default = _default;
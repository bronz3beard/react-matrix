"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Provider = void 0;

var _react = require("react");

const Context = /*#__PURE__*/(0, _react.createContext)({
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
  customDynamicSubHeaderTitleIdValue: ""
});
const Provider = Context.Provider;
exports.Provider = Provider;
var _default = Context;
exports.default = _default;
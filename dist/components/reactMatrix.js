"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _matrixHeaders = _interopRequireDefault(require("./matrixHeaders"));

var _matrixRows = _interopRequireDefault(require("./matrixRows"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ReactMatrix = props => {
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
    customDynamicSubHeaderTitleIdValue
  } = props;
  const customContainerStyles = !tableContainerStyles ? {} : tableContainerStyles;
  const containerStyles = hasInlineStyles && hasContainerStyles ? _objectSpread({
    top: "".concat(50, "%"),
    left: "".concat(50, "%"),
    height: "".concat(100, "%"),
    textAlign: "center",
    position: "absolute",
    transform: "translate(".concat(-50, "%, ").concat(-50, "%)")
  }, tableContainerStyles) : _objectSpread({}, customContainerStyles);
  const tableBorder = hasInlineStyles && hasTableBorder ? {
    border: "".concat(1, "px solid black")
  } : {};
  const customTableStyles = !tableStyles ? {} : tableStyles;
  const tableElmStyles = hasInlineStyles && tableStyles ? _objectSpread({
    width: "".concat(70, "rem")
  }, tableStyles) : _objectSpread({}, customTableStyles);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: containerStyles
  }, /*#__PURE__*/_react.default.createElement("h1", null, data.matrix_name), /*#__PURE__*/_react.default.createElement("h4", null, data.matrix_description), /*#__PURE__*/_react.default.createElement("table", {
    id: "matrix-table",
    style: _objectSpread(_objectSpread({}, tableElmStyles), tableBorder)
  }, /*#__PURE__*/_react.default.createElement(_matrixHeaders.default, {
    data: data,
    thRowStyles: thRowStyles,
    thTitleStyles: thTitleStyles,
    hasInlineStyles: hasInlineStyles,
    thSubTitleStyles: thSubTitleStyles,
    headerPrimaryUpper: headerPrimaryUpper,
    matrixSizeSelected: matrixSizeSelected,
    thPrimaryTitleStyles: thPrimaryTitleStyles,
    customHeaderRowIdValue: customHeaderRowIdValue,
    customDynamicHeaderTitleIdValue: customDynamicHeaderTitleIdValue,
    customDynamicSubHeaderTitleIdValue: customDynamicSubHeaderTitleIdValue
  }), /*#__PURE__*/_react.default.createElement(_matrixRows.default, {
    data: data,
    trRowStyles: trRowStyles,
    trTitleStyles: trTitleStyles,
    rowPrimaryUpper: rowPrimaryUpper,
    hasInlineStyles: hasInlineStyles,
    trSubTitleStyles: trSubTitleStyles,
    matrixSizeSelected: matrixSizeSelected,
    reverseMatrixValues: reverseMatrixValues,
    trPrimaryTitleStyles: trPrimaryTitleStyles,
    customRowDynamicIdValue: customRowDynamicIdValue,
    customTableDataDynamicIdValue: customTableDataDynamicIdValue
  })));
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
  customDynamicSubHeaderTitleIdValue: ""
};
ReactMatrix.propTypes = {
  data: _propTypes.default.shape({
    id: _propTypes.default.number,
    matrix_name: _propTypes.default.string,
    matrix_description: _propTypes.default.string,
    matrix_size: _propTypes.default.number.isRequired,
    matrix_details: _propTypes.default.arrayOf(_propTypes.default.shape({
      id: _propTypes.default.number,
      likelihood: _propTypes.default.string,
      consequence: _propTypes.default.number,
      header_title: _propTypes.default.string,
      header_sub_title: _propTypes.default.string,
      row_header_title: _propTypes.default.string,
      row_header_sub_title: _propTypes.default.string
    })).isRequired,
    matrix_values: _propTypes.default.arrayOf(_propTypes.default.shape({
      id: _propTypes.default.number.isRequired,
      colour: _propTypes.default.string,
      position: _propTypes.default.number.isRequired,
      matrix_id: _propTypes.default.number,
      score_value: _propTypes.default.number,
      description: _propTypes.default.string,
      response: _propTypes.default.string,
      likelihood_descriptor: _propTypes.default.string.isRequired,
      consequence_descriptor: _propTypes.default.number
    })).isRequired
  }).isRequired,
  hasTableBorder: _propTypes.default.bool,
  hasInlineStyles: _propTypes.default.bool,
  hasContainerStyles: _propTypes.default.bool,
  reverseMatrixValues: _propTypes.default.bool,
  matrixSizeSelected: _propTypes.default.number,
  rowPrimaryUpper: _propTypes.default.bool,
  headerPrimaryUpper: _propTypes.default.bool,
  tableContainerStyles: _propTypes.default.shape({}),
  tableStyles: _propTypes.default.shape({}),
  thRowStyles: _propTypes.default.shape({}),
  thTitleStyles: _propTypes.default.shape({}),
  thSubTitleStyles: _propTypes.default.shape({}),
  thPrimaryTitleStyles: _propTypes.default.shape({}),
  trRowStyles: _propTypes.default.shape({}),
  trTitleStyles: _propTypes.default.shape({}),
  trSubTitleStyles: _propTypes.default.shape({}),
  trPrimaryTitleStyles: _propTypes.default.shape({}),
  tdStyles: _propTypes.default.shape({}),
  customHeaderRowIdValue: _propTypes.default.string,
  customDynamicHeaderTitleIdValue: _propTypes.default.string,
  customDynamicSubHeaderTitleIdValue: _propTypes.default.string,
  customRowDynamicIdValue: _propTypes.default.string,
  customRowHeaderDynamicIdValue: _propTypes.default.string,
  customTableDataDynamicIdValue: _propTypes.default.string
};
var _default = ReactMatrix;
exports.default = _default;
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

const ReactMatrix = props => {
  const {
    data,
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
    customHeaderRowIdValue,
    customRowDynamicIdValue,
    customTableDataDynamicIdValue,
    customDynamicHeaderTitleIdValue,
    customDynamicSubHeaderTitleIdValue
  } = props;
  const containerStyles = hasInlineStyles && hasContainerStyles ? {
    top: "".concat(50, "%"),
    left: "".concat(50, "%"),
    textAlign: "center",
    position: "absolute",
    transform: "translate(".concat(-50, "%, ").concat(-50, "%)")
  } : {};
  const tableBorder = hasInlineStyles && hasTableBorder ? {
    border: "".concat(1, "px solid black")
  } : {};
  return /*#__PURE__*/_react.default.createElement("div", {
    style: containerStyles
  }, /*#__PURE__*/_react.default.createElement("h1", null, data.matrix_name), /*#__PURE__*/_react.default.createElement("h4", null, data.matrix_description), /*#__PURE__*/_react.default.createElement("table", {
    id: "matrix-table",
    style: tableBorder
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
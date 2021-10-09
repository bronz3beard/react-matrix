"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.reverse.js");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _functions = require("../utils/functions");

var _tableData = _interopRequireDefault(require("./tableData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const MatrixRows = props => {
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
  } = props;
  const valuesArray = reverseMatrixValues ? (0, _functions.groupObjectsByProp)(data.matrix_values, "likelihood_descriptor").reverse().slice(0, data.matrix_size) : (0, _functions.groupObjectsByProp)(data.matrix_values, "likelihood_descriptor").slice(0, data.matrix_size);
  const customPrimaryTitleStyles = !trPrimaryTitleStyles ? {} : trPrimaryTitleStyles;
  const rowHeaderPrimaryTitleStyles = hasInlineStyles ? _objectSpread({}, trPrimaryTitleStyles) : _objectSpread({}, customPrimaryTitleStyles);
  const customRowStyles = !trRowStyles ? {} : trRowStyles;
  const tableRowStyles = hasInlineStyles ? _objectSpread({
    border: "".concat(1, "px solid black")
  }, customRowStyles) : _objectSpread({}, customRowStyles);
  const customTitleStyle = !trTitleStyles ? {} : trTitleStyles;
  const tableRowHeaderTitleStyles = hasInlineStyles ? _objectSpread({
    padding: "".concat(0, " ", 0.5, "rem ", 0, " ", 0.5, "rem"),
    border: "".concat(1, "px solid black")
  }, trTitleStyles) : _objectSpread({}, customTitleStyle);
  const customSubTitleStyle = !trSubTitleStyles ? {} : trSubTitleStyles;
  const tableRowHeaderSubTitleStyles = hasInlineStyles ? _objectSpread({
    fontSize: "".concat(0.9, "em"),
    fontWeight: "normal"
  }, trSubTitleStyles) : _objectSpread({}, customSubTitleStyle);
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
  customRowDynamicIdValue: "",
  customRowHeaderDynamicIdValue: "",
  customTableDataDynamicIdValue: ""
};
MatrixRows.propTypes = {
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
  rowPrimaryUpper: _propTypes.default.bool,
  hasInlineStyles: _propTypes.default.bool,
  reverseMatrixValues: _propTypes.default.bool,
  trRowStyles: _propTypes.default.shape({}),
  trTitleStyles: _propTypes.default.shape({}),
  trSubTitleStyles: _propTypes.default.shape({}),
  trPrimaryTitleStyles: _propTypes.default.shape({}),
  tdStyles: _propTypes.default.shape({}),
  customRowDynamicIdValue: _propTypes.default.string,
  customRowHeaderDynamicIdValue: _propTypes.default.string,
  customTableDataDynamicIdValue: _propTypes.default.string
};
var _default = MatrixRows;
exports.default = _default;
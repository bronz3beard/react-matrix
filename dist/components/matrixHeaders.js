"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _functions = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import "./styles/riskMatrix.scss";
const MatrixHeaders = props => {
  const {
    data,
    thRowStyles,
    thTitleStyles,
    hasInlineStyles,
    thSubTitleStyles,
    headerPrimaryUpper,
    thPrimaryTitleStyles,
    customHeaderRowIdValue,
    customDynamicHeaderTitleIdValue,
    customDynamicSubHeaderTitleIdValue
  } = props;
  const customPrimaryTitleStyles = !thPrimaryTitleStyles ? {} : thPrimaryTitleStyles;
  const headerPrimaryTitleStyles = hasInlineStyles ? _objectSpread({
    borderWidth: "".concat(0),
    padding: "".concat(1, "rem ", 0, " ", 1, "rem ", 0)
  }, thPrimaryTitleStyles) : _objectSpread({}, customPrimaryTitleStyles);
  const customRowStyles = !thRowStyles ? {} : thRowStyles;
  const headerRowStyles = hasInlineStyles ? _objectSpread({
    borderColor: "black",
    borderStyle: "solid",
    padding: "".concat(10, "rem ", 0, " ", 0, " ", 0),
    borderWidth: "".concat(0, " ", 0, " ", 0, " ", 10, "px")
  }, thRowStyles) : _objectSpread({}, customRowStyles);
  const customThTitleStyles = !thTitleStyles ? {} : thTitleStyles;
  const headerTitleStyles = hasInlineStyles ? _objectSpread({
    padding: "".concat(0, " ", 0.5, "rem ", 0, " ", 0.5, "rem"),
    backgroundColor: "light-grey",
    border: "".concat(1, "px solid black")
  }, thTitleStyles) : _objectSpread({}, customThTitleStyles);
  const customThSubTitleStyles = !thSubTitleStyles ? {} : thSubTitleStyles;
  const headerSubTitleStyles = hasInlineStyles ? _objectSpread({
    fontSize: "".concat(0.9, "em"),
    fontWeight: "normal"
  }, thSubTitleStyles) : _objectSpread({}, customThSubTitleStyles);
  const headerPrimaryTitle = headerPrimaryUpper ? (0, _functions.capitaliseString)(data.primary_header_title) : data.primary_header_title;
  return /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", {
    id: "react-matrix-blank-headers-primary-title-row"
  }, /*#__PURE__*/_react.default.createElement("th", {
    headers: "blank",
    colSpan: "4"
  }), /*#__PURE__*/_react.default.createElement("th", {
    style: headerPrimaryTitleStyles,
    id: "react-matrix-header-primary-title"
  }, headerPrimaryTitle), /*#__PURE__*/_react.default.createElement("th", {
    headers: "blank",
    colSpan: "2"
  })), /*#__PURE__*/_react.default.createElement("tr", {
    style: headerRowStyles,
    id: "react-matrix-dynamic-headers-row-".concat(customHeaderRowIdValue)
  }, /*#__PURE__*/_react.default.createElement("th", {
    headers: "blank",
    colSpan: "2"
  }), data.matrix_details.slice(0, data.matrix_size).map((column, index) => {
    return /*#__PURE__*/_react.default.createElement("th", {
      scope: "col",
      style: headerTitleStyles,
      id: "react-matrix-dynamic-column-header-title".concat(!customDynamicHeaderTitleIdValue ? "" : "-".concat(customDynamicHeaderTitleIdValue)),
      key: "".concat(column.id, "-").concat(index)
    }, column.header_title, /*#__PURE__*/_react.default.createElement("div", {
      style: headerSubTitleStyles,
      id: "react-matrix-dynamic-column-header-sub-title".concat(!customDynamicSubHeaderTitleIdValue ? "" : "-".concat(customDynamicSubHeaderTitleIdValue))
    }, column.header_sub_title));
  })));
};

MatrixHeaders.defaultProps = {
  hasInlineStyles: true,
  headerPrimaryUpper: true,
  thRowStyles: {},
  thTitleStyles: {},
  thSubTitleStyles: {},
  thPrimaryTitleStyles: {},
  customHeaderRowIdValue: "",
  customDynamicHeaderTitleIdValue: "",
  customDynamicSubHeaderTitleIdValue: ""
};
MatrixHeaders.propTypes = {
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
  hasInlineStyles: _propTypes.default.bool,
  headerPrimaryUpper: _propTypes.default.bool,
  thRowStyles: _propTypes.default.shape({}),
  thTitleStyles: _propTypes.default.shape({}),
  thSubTitleStyles: _propTypes.default.shape({}),
  thPrimaryTitleStyles: _propTypes.default.shape({}),
  customHeaderRowIdValue: _propTypes.default.string,
  customDynamicHeaderTitleIdValue: _propTypes.default.string,
  customDynamicSubHeaderTitleIdValue: _propTypes.default.string
};
var _default = MatrixHeaders;
exports.default = _default;
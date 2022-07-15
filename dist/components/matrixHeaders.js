"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _getStyles = require("../helpers/getStyles");

var _functions = require("../utils/functions");

var _context = _interopRequireDefault(require("../context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import "./styles/riskMatrix.scss";
const MatrixHeaders = () => {
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
  } = (0, _react.useContext)(_context.default);
  const headerRowStyles = (0, _getStyles.getHeaderRowStyles)(hasInlineStyles, thRowStyles);
  const headerTitleStyles = (0, _getStyles.getHeaderTitleStyles)(hasInlineStyles, thTitleStyles);
  const headerSubTitleStyles = (0, _getStyles.getHeaderSubTitleStyles)(hasInlineStyles, thSubTitleStyles);
  const headerPrimaryTitleStyles = (0, _getStyles.getHeaderPrimaryTitleStyles)(hasInlineStyles, thPrimaryTitleStyles);
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
  matrixSizeSelected: 5,
  customHeaderRowIdValue: "",
  customDynamicHeaderTitleIdValue: "",
  customDynamicSubHeaderTitleIdValue: ""
};
var _default = MatrixHeaders;
exports.default = _default;
"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _getStyles = require("../helpers/getStyles");

var _matrixHeaders = _interopRequireDefault(require("./matrixHeaders"));

var _matrixRows = _interopRequireDefault(require("./matrixRows"));

var _context = _interopRequireDefault(require("../context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ReactMatrix = () => {
  const {
    matrixName,
    tableStyles,
    hasTableBorder,
    hasInlineStyles,
    matrixDescription,
    hasContainerStyles,
    tableContainerStyles
  } = (0, _react.useContext)(_context.default);
  const tableBorder = (0, _getStyles.getTableBoarder)(hasInlineStyles && hasTableBorder);
  const tableElmStyles = (0, _getStyles.getTableStyles)(hasInlineStyles && tableStyles, tableStyles);
  const containerStyles = (0, _getStyles.getContainerStyles)(hasInlineStyles && hasContainerStyles, tableContainerStyles);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: containerStyles
  }, /*#__PURE__*/_react.default.createElement("h1", null, matrixName), /*#__PURE__*/_react.default.createElement("h4", null, matrixDescription), /*#__PURE__*/_react.default.createElement("table", {
    id: "matrix-table",
    style: _objectSpread(_objectSpread({}, tableElmStyles), tableBorder)
  }, /*#__PURE__*/_react.default.createElement(_matrixHeaders.default, null), /*#__PURE__*/_react.default.createElement(_matrixRows.default, null)));
};

ReactMatrix.defaultProps = {
  tableStyles: {},
  hasTableBorder: true,
  hasInlineStyles: true,
  hasContainerStyles: true,
  tableContainerStyles: {},
  matrixName: "",
  matrixDescription: ""
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
    })),
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
    }))
  }),
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
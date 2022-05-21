"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.symbol.description.js");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const TableData = props => {
  const {
    data,
    tdStyles,
    hasInlineStyles,
    customTableDataDynamicIdValue
  } = props;

  const handleCellClick = tdSelected => {
    alert("".concat(tdSelected === null || tdSelected === void 0 ? void 0 : tdSelected.description, ", ").concat(tdSelected === null || tdSelected === void 0 ? void 0 : tdSelected.score_value, " \n").concat(tdSelected === null || tdSelected === void 0 ? void 0 : tdSelected.response));
  };

  const customTdStyles = !tdStyles ? {} : tdStyles;
  const tableDataStyles = hasInlineStyles ? _objectSpread({
    cursor: "pointer",
    textAlign: "center",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: "".concat(1, "px"),
    backgroundColor: data === null || data === void 0 ? void 0 : data.colour
  }, tdStyles) : _objectSpread({}, customTdStyles);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("td", {
    style: tableDataStyles,
    onClick: () => handleCellClick(data),
    id: "react-matrix-dynamic-table-data".concat(!customTableDataDynamicIdValue ? "" : "-".concat(customTableDataDynamicIdValue))
  }, "".concat(data === null || data === void 0 ? void 0 : data.description), /*#__PURE__*/_react.default.createElement("br", null), "(".concat(data === null || data === void 0 ? void 0 : data.score_value, ")")));
};

TableData.defaultProps = {
  tdStyles: {},
  hasInlineStyles: true,
  customTableDataDynamicIdValue: ""
};
TableData.propsTypes = {
  data: _propTypes.default.shape({
    id: _propTypes.default.number,
    colour: _propTypes.default.string,
    position: _propTypes.default.number,
    matrix_id: _propTypes.default.number,
    score_value: _propTypes.default.number,
    description: _propTypes.default.string,
    response: _propTypes.default.string,
    likelihood_descriptor: _propTypes.default.string,
    consequence_descriptor: _propTypes.default.number
  }).isRequired,
  tdStyles: _propTypes.default.shape({}),
  hasInlineStyles: _propTypes.default.bool,
  customTableDataDynamicIdValue: _propTypes.default.string
};
var _default = TableData;
exports.default = _default;
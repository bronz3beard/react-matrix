"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTableStyles = exports.getTableBoarder = exports.getHeaderTitleStyles = exports.getHeaderSubTitleStyles = exports.getHeaderRowStyles = exports.getHeaderPrimaryTitleStyles = exports.getCustomStyles = exports.getContainerStyles = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const getCustomStyles = hasStyle => !hasStyle ? {} : hasStyle;

exports.getCustomStyles = getCustomStyles;

const getContainerStyles = (hasStyle, styles) => !hasStyle ? _objectSpread({}, getCustomStyles(styles)) : _objectSpread({
  top: "".concat(50, "%"),
  left: "".concat(50, "%"),
  height: "".concat(100, "%"),
  textAlign: "center",
  position: "absolute",
  transform: "translate(".concat(-50, "%, ").concat(-50, "%)")
}, styles);

exports.getContainerStyles = getContainerStyles;

const getTableBoarder = hasStyle => !hasStyle ? {} : {
  border: "".concat(1, "px solid black")
};

exports.getTableBoarder = getTableBoarder;

const getTableStyles = (hasStyle, styles) => !hasStyle ? _objectSpread({}, getCustomStyles(styles)) : _objectSpread({
  width: "".concat(70, "rem")
}, styles);

exports.getTableStyles = getTableStyles;

const getHeaderPrimaryTitleStyles = (hasStyle, styles) => !hasStyle ? _objectSpread({}, getCustomStyles(styles)) : _objectSpread({
  borderWidth: "".concat(0),
  padding: "".concat(1, "rem ", 0, " ", 1, "rem ", 0)
}, styles);

exports.getHeaderPrimaryTitleStyles = getHeaderPrimaryTitleStyles;

const getHeaderRowStyles = (hasStyle, styles) => !hasStyle ? _objectSpread({}, getCustomStyles(styles)) : _objectSpread({
  borderColor: "black",
  borderStyle: "solid",
  padding: "".concat(10, "rem ", 0, " ", 0, " ", 0),
  borderWidth: "".concat(0, " ", 0, " ", 0, " ", 10, "px")
}, styles);

exports.getHeaderRowStyles = getHeaderRowStyles;

const getHeaderTitleStyles = (hasStyle, styles) => !hasStyle ? _objectSpread({}, getCustomStyles(styles)) : _objectSpread({
  padding: "".concat(0, " ", 0.5, "rem ", 0, " ", 0.5, "rem"),
  backgroundColor: "light-grey",
  border: "".concat(1, "px solid black")
}, styles);

exports.getHeaderTitleStyles = getHeaderTitleStyles;

const getHeaderSubTitleStyles = (hasStyle, styles) => !hasStyle ? _objectSpread({}, getCustomStyles(styles)) : _objectSpread({
  fontSize: "".concat(0.9, "em"),
  fontWeight: "normal"
}, styles);

exports.getHeaderSubTitleStyles = getHeaderSubTitleStyles;
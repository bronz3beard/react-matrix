"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupObjectsByProp = exports.capitaliseString = exports.capitaliseFirstCharacter = exports.callAll = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

const groupObjectsByProp = (array, prop) => {
  const map = new Map(Array.from(array, obj => [obj[prop], []]));
  array.forEach(obj => map.get(obj[prop]).push(obj));
  return Array.from(map.values());
}; // capitalises first character of each word


exports.groupObjectsByProp = groupObjectsByProp;

const capitaliseFirstCharacter = stringValue => stringValue.replace(/\b([a-z\s])/g, string => string.toUpperCase()); // capitalizes entire word


exports.capitaliseFirstCharacter = capitaliseFirstCharacter;

const capitaliseString = stringValue => stringValue.toUpperCase();

exports.capitaliseString = capitaliseString;

const callAll = function callAll() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return fns.forEach(fn => fn && fn(...args));
  };
};

exports.callAll = callAll;
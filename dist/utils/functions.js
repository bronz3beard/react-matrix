"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupObjectsByProp = exports.capitaliseString = exports.capitaliseFirstCharacter = void 0;

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
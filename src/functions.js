/* eslint-disable no-prototype-builtins */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-expressions */

export const groupObjectsByProp = (array, prop) => {
  const map = new Map(Array.from(array, (obj) => [obj[prop], []]));

  array.forEach((obj) => map.get(obj[prop]).push(obj));

  return Array.from(map.values());
};

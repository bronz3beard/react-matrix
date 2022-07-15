export const groupObjectsByProp = (array, prop) => {
  const map = new Map(Array.from(array, (obj) => [obj[prop], []]));

  array.forEach((obj) => map.get(obj[prop]).push(obj));

  return Array.from(map.values());
};

// capitalises first character of each word
export const capitaliseFirstCharacter = stringValue => (
  stringValue.replace(/\b([a-z\s])/g, string => string.toUpperCase())
);

// capitalizes entire word
export const capitaliseString = (stringValue) => (
  stringValue.toUpperCase()
);

export const callAll = (...fns) => (...args) =>
fns.forEach(fn => fn && fn(...args))
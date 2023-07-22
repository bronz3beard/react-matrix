export const groupObjectsByProp = <T extends Record<string, any>>(
  array: T[],
  prop: keyof T
) => {
  const map = new Map<T[keyof T], T[]>(
    Array.from(array, (obj) => [obj[prop], []])
  );

  array.forEach((obj) => {
    const key = obj[prop];
    if (key !== undefined) {
      const group = map.get(key);
      if (group) {
        group.push(obj);
      }
    }
  });

  return Array.from(map.values());
};

// capitalises first character of each word
export const capitaliseFirstCharacter = (stringValue: string): string =>
  stringValue.replace(/\b([a-z\s])/g, (string) => string.toUpperCase());

// capitalizes entire word
export const capitaliseString = (stringValue: string): string =>
  stringValue.toUpperCase();

export const callAll =
  <T extends (...args: any[]) => void>(...fns: T[]) =>
  (...args: Parameters<T>) =>
    fns.forEach((fn) => fn && fn(...args));

/* eslint-disable no-prototype-builtins */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-expressions */

export const getUrl = () => {
  const currentURL = window.location.pathname.split("/")[1];
  return `/${currentURL}`;
};

export const isClientSide = () => typeof window !== "undefined";

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export const scrollToComponent = (ref) => {
  if (isClientSide()) {
    const isSmoothScrollSupported =
      "scrollBehavior" in document.documentElement.style;
    if (isSmoothScrollSupported) {
      ref &&
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    } else {
      ref && ref.current.scrollIntoView(false);
    }
  }
};

const getDescendantPropObject = (obj, desc) => {
  const arr = desc.split(".");
  if (!arr.length) {
    return obj[desc];
  }

  while (arr.length && (obj = obj[arr.shift()]));

  return obj;
};

const getDescendantPropString = (field) => {
  const fieldArray = field.split(".");

  return fieldArray[fieldArray.length - 1];
};

export const dataFilter = (dataArray, filterValue, filterOnValue = null) => {
  const lowercaseFilter = !filterValue
    ? ""
    : filterValue.toString().toLowerCase();

  return dataArray.filter((item) =>
    Object.keys(item).some((key) => {
      const keyValue = !filterOnValue ? item[key] : item[filterOnValue];

      if (keyValue) {
        return (
          keyValue.toString().toLowerCase().indexOf(lowercaseFilter) !== -1 ||
          !lowercaseFilter
        );
      }
      return null;
    })
  );
};

export const sortArrayOfObjectsByField = (
  arrayToSort,
  field,
  order = "desc"
) => {
  const stringField =
    field && field.includes(".") ? getDescendantPropString(field) : field;

  const orderValue = order === "desc" ? 1 : -1;
  const sortedArray = arrayToSort.sort(
    (a, b) =>
      (a[stringField] < b[stringField]
        ? 1
        : a[stringField] > b[stringField]
        ? -1
        : 0) * orderValue
  );

  return sortedArray;
};

export const arraySort = (array, sortOrder = { key: "asc" }) => {
  const orderSort = sortOrder.key === "asc" ? "desc" : "asc";
  const arraySorted = array.sort((a, b) =>
    orderSort === "asc"
      ? a[sortOrder.key] > b[sortOrder.key]
      : b[sortOrder.key] > a[sortOrder.key]
  );
  return arraySorted;
};

// The modern version of the Fisher–Yates shuffle
export const arrayShuffle = (array) => {
  // eslint-disable-next-line no-plusplus
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const theseThingsAreEqual = (a, b) => {
  if (a === b) {
    return true;
  }
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }
  if (!a || !b || (typeof a !== "object" && typeof b !== "object")) {
    return a === b;
  }
  if (a === null || a === undefined || b === null || b === undefined) {
    return false;
  }
  if (a.prototype !== b.prototype) {
    return false;
  }

  const keys = Object.keys(a);

  if (keys.length !== Object.keys(b).length) {
    return false;
  }

  return keys.every((k) => a[k] === b[k]);
};

export const getUcFirst = (value) =>
  `${value[0].toUpperCase()}${value.slice(1)}`;

export const firstCharacterToUpperCaseAndSpacesForDivision = (
  theString,
  originalDivision
) => {
  const arrayOfString = theString.split(originalDivision);
  const arrayPascalCase = arrayOfString.map(
    (word) => `${word[0].toUpperCase()}${word.substring(1, word.length)}`
  );
  return arrayPascalCase.join(" ");
};

// capitalises first character of each word
export const capitaliseFirstCharacter = (stringValue) =>
  stringValue.replace(/\b([a-z\s])/g, (string) => string.toUpperCase());

// capitalizes entire word
export const capitaliseString = (stringValue, replaceValue) =>
  replaceValue
    ? stringValue.replace(/\b([a-z\s]+)/g, replaceValue.toUpperCase())
    : stringValue.replace(/\b([a-z]*)/g, (string) => string.toUpperCase());

// removes special characters on standard en-us keyboard config
export const removeSpecialCharacters = (stringValue, replaceValue) =>
  replaceValue
    ? stringValue.replace(
        /[$&+,:;=?@#|'"‘’<>.^*()%!-._\\\/`~\[\]\{\}]+/g,
        replaceValue
      )
    : stringValue.replace(/[$&+,:;=?@#|'"‘’<>.^*()%!-._\\\/`~\[\]\{\}]*/g, "");

// removes all numbers in a string
export const removeNumbers = (stringValue, replaceValue) =>
  replaceValue
    ? stringValue.replace(/[0-9\s]+/g, replaceValue)
    : stringValue.replace(/[0-9]*/g, "");

// returns only the number in a string removing letters and special characters
export const getOnlyNumbers = (stringValue, replaceValue) =>
  replaceValue
    ? stringValue.replace(
        /[a-zA-Z$&+,:;=?@#|'"‘’<>.^*()%!-._\\\/`~\[\]\{\}]+/g,
        replaceValue
      )
    : stringValue.replace(
        /[a-zA-Z$&+,:;=?@#|'"‘’<>.^*()%!-._\\\/`~\[\]\{\}]*/g,
        ""
      );

// replace whitespace with any character or no space
export const replaceWhiteSpace = (stringValue, replaceValue) =>
  replaceValue
    ? stringValue.replace(/[\s]/g, replaceValue)
    : stringValue.replace(/[\s]+/g, "");

// find and replace html element - WIP
export const replaceHtmlElement = (stringValue, element, replaceValue) =>
  stringValue.replace(
    `/<${element}(?:'[^']*'['']*|'[^']*'['']*|[^''>])+>([\w\d\s:,°.-]*)/g`,
    replaceValue
  );

// check if object is empty.
export const isEmpty = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return true;
    }
  }
  return false;
};

export const reactSelectOptions = (
  optionsArray,
  value,
  label,
  concatParam = null,
  stringFunction,
  customOptionValue
) => {
  return optionsArray.map((item) => {
    const optionItems = {};

    const objectFieldValue = getDescendantPropObject(item, value);
    const objectFieldLabel = getDescendantPropObject(item, label);
    const objectFieldConcatParam =
      concatParam && getDescendantPropObject(item, concatParam);

    const labelValue = !concatParam
      ? objectFieldLabel
      : `${objectFieldLabel} ${
          !objectFieldConcatParam ? "" : ` - ${objectFieldConcatParam}`
        }`;

    optionItems.value = objectFieldValue;
    optionItems.label = !stringFunction
      ? labelValue
      : stringFunction(labelValue);
    optionItems.customAbbreviation = !customOptionValue
      ? ""
      : item[customOptionValue];

    return optionItems;
  });
};

// const formatOptionLabel = ({ value, label, customAbbreviation }) => {
//   return (
//     <div style={{ display: "flex" }}>
//       <div>
//         {label} <img src={customAbbreviation} alt="asset-types-list" />
//       </div>
//     </div>
//   )
// }

export const groupObjectsByProp = (array, prop) => {
  const map = new Map(Array.from(array, (obj) => [obj[prop], []]));

  array.forEach((obj) => map.get(obj[prop]).push(obj));

  return Array.from(map.values());
};

export const getUniqueArrayObjects = (array, objectKey) => {
  return array.filter(
    (value, index, self) =>
      self.map((item) => item[objectKey]).indexOf(value[objectKey]) === index
  );
};

export const getUniqueArrayValues = (value, index, self) => {
  return self.indexOf(value) === index;
};

export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const val = item[key];
    groups[val] = groups[val] || [];
    groups[val].push(item);

    return groups;
  }, {});
};

// not tested
export const arrayMergeByKey = (array1, array2, mergeKey) => {
  const x = array1.map((value) => ({
    ...array2.find((item) => item[mergeKey] === value[mergeKey] && item),
    ...value,
  }));

  return x;
};

export const arePropsEqual = (prevProps, nextProps) => {
  console.info("arePropsEqual -> nextProps", nextProps);
  console.info("arePropsEqual -> prevProps", prevProps);
  console.info(
    "arePropsEqual -> nextProps === prevProps",
    nextProps.board.field === prevProps.board.field
  );
  if (nextProps.board.field === prevProps.board.field) {
    return true;
  }
  return false;
  // return true if passing nextProps to render would return
  // the same result as passing prevProps to render,
  //   otherwise return false
};

// this assumes a specific data structure and needs to be reviewed and made more flexible
// not tested.
export const validateRequiredFields = (data) => {
  const requiredValues = [];
  // this code enforces all required fields before allowing the user to submit.

  // originally my data was an object array thats why i am using a for loop here over .map
  for (let i = 1; i <= data.length; i++) {
    if (data[i]) {
      // you could cast the below to a Boolean also if you prefer
      // e.g. !!(data[i].required && data[i].value === '')
      requiredValues.push(data[i].required && data[i].value === "");
    }
  }

  const checkIsTrue = (bool) => {
    return bool === false;
  };

  if (requiredValues.every(checkIsTrue)) {
    return false;
  } else {
    return true;
  }
};

// attribute = one attribute to remove attributes = many attributes to remove
export const removeNullAttributesFromObject = (
  obj,
  attribute = "",
  attributes = []
) => {
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }

    if (attributes.length > 0) {
      if (attributes.includes(propName)) {
        delete obj[propName];
      }
    }

    if (attribute) {
      delete obj[attribute];
    }
  }

  return obj;
};

const componentToHex = (colour) => {
  return colour.length === 1 ? `0${colour}` : colour;
};

export const rgbToHex = (rgbValue) => {
  // 16 = radix - An integer in the range 2 through 36 specifying the base to use for representing numeric values.
  const r = componentToHex(parseInt(rgbValue[0]).toString(16));
  const g = componentToHex(parseInt(rgbValue[1]).toString(16));
  const b = componentToHex(parseInt(rgbValue[2]).toString(16));

  if (r && g && b) {
    return `#${r}${g}${b}`;
  }
};

export const randomString = () => Math.random().toString(36).slice(2);

const compassHeadings = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
];

export const degToCompass = (direction) => {
  const deg = parseInt(direction / 22.5 + 0.5);
  return compassHeadings[deg % 16];
};

export const convertWindSpeed = (speed) => {
  const oneKnot = 1.94384;
  const knots = speed / oneKnot;

  return knots.toFixed(2);
};

export const findLowestIntNotInArray = (array = []) => {
  let count = 1;

  if (!array.length) {
    return count;
  }

  // looping iterating until the count is not existing,
  // at that point the while breaks and returns the count,
  // which will be the lowest positive integer not in the array.
  while (array.indexOf(count) !== -1) {
    count++;
  }

  return count;
};

export const simpleArraySum = (array) => {
  return array.reduce((accumulator, num) => accumulator + num, 0);
};

export const compareArrayOfNumbers = (arrayOne, arrayTwo) => {
  // Write your code here
  let scoreA = 0;
  let scoreB = 0;

  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] > arrayTwo[i]) {
      scoreA++;
    } else if (arrayTwo[i] > arrayOne[i]) {
      scoreB++;
    } else {
      continue;
    }
  }

  return [scoreA, scoreB];
};

export const accessNestedArray = (array) => {
  // Write your code here
  const arrLength = array.length;
  let leftToRight = 0,
    rightToLeft = 0;

  // Looping through the array and summing the diagonals.
  for (let i = 0; i < arrLength; i++) {
    // Calculating the primary diagonal.
    leftToRight += array[i][i];
    // Reversing the second dimension of array to calculate secondary diagonal.
    rightToLeft += array[arrLength - 1 - i][i];
  }
  // return absolute difference value.
  return Math.abs(leftToRight - rightToLeft);
};

export const arrayValueRatio = (array) => {
  // Write your code here
  const elements = array.length;
  const pos = array.filter((number) => number > 0).length / elements;
  const neg = array.filter((number) => number < 0).length / elements;
  const zero = array.filter((number) => number == 0).length / elements;

  const results = `${pos.toFixed(6)}\n${neg.toFixed(6)}\n${zero.toFixed(6)}`;

  return results;
};

export const staircase = (number) => {
  // Write your code here
  const hash = "#";

  for (let i = 1; i <= number; i++) {
    console.info(`${" ".repeat(number - i)}${hash.repeat(i)}`);
  }
};

export const miniMaxSum = (array) => {
  // Write your code here
  const removeFirst = array.sort((a, b) => a - b).slice(0, array.length - 1);
  const removeLast = array.sort((a, b) => b - a).slice(0, array.length - 1);

  const small = removeFirst.reduce(
    (accumulator, num) => parseInt(accumulator + num),
    0
  );

  const large = removeLast.reduce(
    (accumulator, num) => parseInt(accumulator + num),
    0
  );

  console.info(`${small} ${large}`);
};

export const findCountLargestInt = (array) => {
  // Write your code here
  const largestInt = Math.max(...array);

  const totalInt = array.filter((item) => item === largestInt);

  return totalInt.length;
};
//  const [timeLeft, setTimeLeft] = useState(3);
// export const setTimmer = (data) => {
//   // exit early when we reach 0 or reset count
//   if (!timeLeft) {

//     setDataUpdated(!dataUpdated);
//     setTimeLeft(3);
//   }

//   // save intervalId to clear the interval when the
//   // component re-renders

//   const intervalId = setInterval(() => {
//     setTimeLeft(timeLeft - 1);
//   }, 1000);

//   // clear interval on re-render to avoid memory leaks
//   return () => clearInterval(intervalId);

//   // add timeLeft as a dependency to re-rerun the effect
//   // when we update it
// }, [timeLeft]);

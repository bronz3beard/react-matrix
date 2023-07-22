# React Matrix &nbsp; [![npm version](https://badge.fury.io/js/react-data-matrix.svg)](https://badge.fury.io/js/react-data-matrix)

[React Matrix Demo](https://bronz3beard.github.io/react-matrix)

React Matrix table shows relationships between two or more variables in a data set in grid format.

The most common usage for a table like React Matrix, is to display the **likelihood** and **consequence** "scores" of **risks/hazards**, this can be for anything from Corporate, Work Health Safety and Environment risks, and more.

# PR's

- Have a look at the [PR template doc](https://github.com/bronz3beard/react-matrix/blob/main/docs) for best approach to getting your pr merged.

# Usage

```ts
import { ReactMatrix } from "react-data-matrix";

const App: FC = () => {
  ...

  return (
    <ReactMatrix
      {...{
        matrixName: "",
        matrixDescription: "",
        hasTableBorder: true,
        rowPrimaryUpper: true,
        hasInlineStyles: true,
        matrixSizeSelected: 5,
        headerPrimaryUpper: true,
        hasContainerStyles: true,
        reverseMatrixValues: true,

        tableContainerStyles: {},
        tableStyles: {},

        thRowStyles: {},
        thTitleStyles: {},
        thSubTitleStyles: {},
        thPrimaryTitleStyles: {},

        trRowStyles: {},
        trTitleStyles: {},
        trSubTitleStyles: {},
        trPrimaryTitleStyles: {},

        tdStyles: {},

        customHeaderRowIdValue: "",
        customRowDynamicIdValue: "",
        customTableDataDynamicIdValue: "",
        customRowHeaderDynamicIdValue: "",
        customDynamicHeaderTitleIdValue: "",
        customDynamicSubHeaderTitleIdValue: "",
        data,
      }}
    />
  )
}
```

# Expected Data Structure

- See [`./src/lib/utils/data.js`](https://github.com/bronz3beard/react-matrix/blob/main/src/lib/utils/data.js) for an example of the data, this can be used for testing if needed,
  or an example of how to construct/deconstruct your data objects from your api.

```ts
  const data = {
    id: 1,
    matrix_size: 5,
    matrix_name: "React Matrix",
    matrix_description: "Risk Matrix Template",
    matrix_details: [
      {
        id: 1,
        likelihood: "LIKELIHOOD VALUE",
        consequence: CONSEQUENCE VALUE,
        header_title: "Title",
        header_sub_title: "Sub-title/description.",
        row_header_title: "Row Title",
        row_header_sub_title: "Row Sub-title/description.",
      }, {
        id: 2,
        ...
      } {
        id: 3,
        ...
      } {
        id: 4,
        ...
      } {
        id: 5,
        ...
      }
    ],
    matrix_values: [
      {
        id: 1,
        position: 1,
        matrix_id: 1,
        score_value: 1,
        colour: "green",
        description: "low",
        consequence_descriptor: 1,
        likelihood_descriptor: "E",
        response: "Business as usual",
      }, {
        id: 2,
        ...
      },
      ...,
      ...,
      , {
        id: 25,
        ...
      },
    ]
  }
```

# Types

```ts
export interface MatrixDetail {
  id: number;
  position: number;
  matrix_type: string;
  likelihood: string;
  consequence: number;
  header_title: string;
  header_sub_title: string;
  row_header_title: string;
  row_header_sub_title: string;
}

export interface MatrixValue {
  id: number;
  matrix_id: number;
  description: string;
  score_value: number;
  colour: string;
  position: number;
  likelihood_descriptor: string;
  consequence_descriptor: number;
  response: string;
}

export interface MatrixData {
  id: number;
  matrix_size: number;
  matrix_name: string;
  primary_header_title: string;
  primary_row_header_title: string;
  matrix_description: string;
  matrix_details: MatrixDetail[];
  matrix_values: MatrixValue[];
}

export interface ReactMatrixProps {
  data: MatrixData;
  hasTableBorder?: boolean;
  hasInlineStyles?: boolean;
  hasContainerStyles?: boolean;
  reverseMatrixValues?: boolean;
  matrixSizeSelected?: number;
  rowPrimaryUpper?: boolean;
  headerPrimaryUpper?: boolean;
  tableContainerStyles?: React.CSSProperties;
  tableStyles?: React.CSSProperties;
  thRowStyles?: React.CSSProperties;
  thTitleStyles?: React.CSSProperties;
  thSubTitleStyles?: React.CSSProperties;
  thPrimaryTitleStyles?: React.CSSProperties;
  trRowStyles?: React.CSSProperties;
  trTitleStyles?: React.CSSProperties;
  trSubTitleStyles?: React.CSSProperties;
  trPrimaryTitleStyles?: React.CSSProperties;
  tdStyles?: React.CSSProperties;
  customHeaderRowIdValue?: string;
  customDynamicHeaderTitleIdValue?: string;
  customDynamicSubHeaderTitleIdValue?: string;
  customRowDynamicIdValue?: string;
  customRowHeaderDynamicIdValue?: string;
  customTableDataDynamicIdValue?: string;
}

export interface TableDataProps {
  data: {
    id: number;
    colour: string;
    position: number;
    matrix_id: number;
    score_value: number;
    description: string;
    response: string;
    likelihood_descriptor: string;
    consequence_descriptor: number;
  };
  tdStyles?: React.CSSProperties;
  hasInlineStyles?: boolean;
  customTableDataDynamicIdValue?: string;
}
```

```ts
defaultProps = {
  matrixName: "",
  matrixDescription: "",
  hasTableBorder: true,
  rowPrimaryUpper: true,
  hasInlineStyles: true,
  matrixSizeSelected: 5,
  headerPrimaryUpper: true,
  hasContainerStyles: true,
  reverseMatrixValues: true,

  tableContainerStyles: {},
  tableStyles: {},

  thRowStyles: {},
  thTitleStyles: {},
  thSubTitleStyles: {},
  thPrimaryTitleStyles: {},

  trRowStyles: {},
  trTitleStyles: {},
  trSubTitleStyles: {},
  trPrimaryTitleStyles: {},

  tdStyles: {},

  customHeaderRowIdValue: "",
  customRowDynamicIdValue: "",
  customTableDataDynamicIdValue: "",
  customRowHeaderDynamicIdValue: "",
  customDynamicHeaderTitleIdValue: "",
  customDynamicSubHeaderTitleIdValue: "",
};
```

# Available Properties

- **hasInlineStyles**
  - Default is true.
  - If false all inline styles are removed.

---

- **hasTableBorder**
  - Default is true.
  - If false the most outer border is removed.

---

- **hasContainerStyles**
  - Default is true.
  - This will center the matrix in the middle of the page.

---

- **reverseMatrixValues**
  - Default is true.
  - When true the lowest value will be in the bottom left and the highest value will be in the top right, with all sequential values in-between.
  - When false the values will be reversed, lowest value top left highest value bottom right.

---

- **rowPrimaryUpper**
  - Default is true.
  - If false string formatting will be removed.

---

- **headerPrimaryUpper**
  - Default is true.
  - If false string formatting will be removed.

---

- **customHeaderRowIdValue**
  - Default is empty string.
  - can be used to target element through id prop.

---

- **customDynamicHeaderTitleIdValue**
  - Default is empty string.
  - can be used to target element through id prop.

---

- **customDynamicSubHeaderTitleIdValue**
  - Default is empty string.
  - can be used to target element through id prop.

---

- **customRowDynamicIdValue**
  - Default is empty string.
  - can be used to target element through id prop.

---

- **customRowHeaderDynamicIdValue**
  - Default is empty string.
  - can be used to target element through id prop.

---

- **customTableDataDynamicIdValue**
  - Default is empty string.
  - can be used to target element through id prop.

---

# Styling Properties

### Inline

**These styles can be added to the current styles or,
if you make `hasInlineStyles = false`, then add these values with your own styles, you can have full control over styling inline.**

**ReactMatrix**

- tableContainerStyles={{}}
- tableStyles={{}}

**MatrixHeaders**

- thRowStyles={{}}
- thTitleStyles={{}}
- thSubTitleStyles={{}}
- thPrimaryTitleStyles={{}}

**MatrixRows**

- trRowStyles={{}},
- trTitleStyles={{}},
- trSubTitleStyles={{}},
- trPrimaryTitleStyles={{}},

**TableData**

- tdStyles={{}},

---

# Create React App

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TableData = (props) => {
  const { tableData, hideMatrixInputs, handleCellInputChange } = props;
  const [inputToText, setInputToText] = useState(false);

  useEffect(() => {
    setInputToText(false);
  }, [hideMatrixInputs]);

  const handleCellClick = (tdSelected) => {
    alert(`${tdSelected.description}, ${tdSelected.score_value}`);
    // tableData.forEach((val) => {
    //   val.expanded = false;
    // });
    // if (tdSelected) {
    //   tdSelected.expanded = true;
    // }
    // setInputToText(!inputToText);
  };

  return (
    <>
      <td
        onClick={() => handleCellClick(tableData)}
        style={{
          cursor: "pointer",
          textAlign: "center",
          borderColor: "black",
          borderStyle: "solid",
          borderWidth: `${1}px`,
          backgroundColor: tableData.colour,
        }}
      >
        {`${tableData.description}`}
        <br />
        {`(${tableData.score_value})`}
      </td>
    </>
  );
};

TableData.defaultProps = {
  inputDescription: "",
  inputValue: "",
  inputColour: "",
  inputPlaceHolder: "",
  handleCellInputChange: () => {},
};
TableData.propsTypes = {
  data: [],
  inputDescription: PropTypes.string,
  inputValue: PropTypes.string,
  inputColour: PropTypes.string,
  inputPlaceHolder: PropTypes.string,
  handleCellInputChange: PropTypes.func,
};

export default TableData;

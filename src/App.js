import React from "react";
import PropTypes from "prop-types";
import { data } from "./data";
import MatrixHeaders from "./matrixHeaders";
import MatrixRows from "./matrixRows";

const App = (props) => {
  const {
    hasTableBorder,
    hideMatrixInputs,
    reverseMatrixValues,
    matrixSizeSelected,
    hasContainerStyles,
    handleCellInputChange,
  } = props;

  const containerStyles = hasContainerStyles
    ? {
        top: `${50}%`,
        left: `${50}%`,
        position: "absolute",
        transform: `translate(${-50}%, ${-50}%)`,
      }
    : {};

  const tableBorder = hasTableBorder ? { border: `${1}px solid black` } : {};

  return (
    <div style={containerStyles}>
      <table id="matrix-table" style={tableBorder}>
        <MatrixHeaders columns={data} matrixSizeSelected={matrixSizeSelected} />
        <MatrixRows
          data={data}
          hideMatrixInputs={hideMatrixInputs}
          matrixSizeSelected={matrixSizeSelected}
          reverseMatrixValues={reverseMatrixValues}
          handleCellInputChange={handleCellInputChange}
        />
      </table>
    </div>
  );
};

App.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})), // .isRequired,
};

App.defaultProps = {
  data: [],
};

export default App;

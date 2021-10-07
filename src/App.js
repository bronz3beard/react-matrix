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
  } = props;

  const containerStyles = hasContainerStyles
    ? {
        top: `${50}%`,
        left: `${50}%`,
        textAlign: "center",
        position: "absolute",
        transform: `translate(${-50}%, ${-50}%)`,
      }
    : {};

  const tableBorder = hasTableBorder ? { border: `${1}px solid black` } : {};

  return (
    <div style={containerStyles}>
      <h1>{data.matrix_name}</h1>
      <h4>{data.matrix_description}</h4>
      <table id="matrix-table" style={tableBorder}>
        <MatrixHeaders columns={data} matrixSizeSelected={matrixSizeSelected} />
        <MatrixRows
          data={data}
          hideMatrixInputs={hideMatrixInputs}
          matrixSizeSelected={matrixSizeSelected}
          reverseMatrixValues={reverseMatrixValues}
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

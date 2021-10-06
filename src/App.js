import React from "react";
import PropTypes from "prop-types";
import { data } from "./data";
import MatrixHeaders from "./matrixHeaders";
import MatrixRows from "./matrixRows";

const App = (props) => {
  const { handleCellInputChange, hideMatrixInputs, matrixSizeSelected } = props;

  return (
    <div
      style={{
        top: `${50}%`,
        left: `${50}%`,
        position: "absolute",
        transform: `translate(${-50}%, ${-50}%)`,
      }}
    >
      <table id="matrix-table" style={{ border: `${1}px solid black` }}>
        <MatrixHeaders columns={data} matrixSizeSelected={matrixSizeSelected} />
        <MatrixRows
          data={data}
          hideMatrixInputs={hideMatrixInputs}
          matrixSizeSelected={matrixSizeSelected}
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

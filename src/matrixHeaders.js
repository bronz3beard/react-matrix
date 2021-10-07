import React from "react";
import PropTypes from "prop-types";
import "./riskMatrix.scss";

const MatrixHeaders = ({ columns }) => (
  <thead>
    <tr>
      <th headers="blank"></th>
      <th headers="blank"></th>
      <th headers="blank"></th>
      <th headers="blank"></th>
      <th
        style={{
          borderWidth: `${0}`,
          padding: `${1}rem ${0} ${1}rem ${0}`,
        }}
      >
        CONSEQUENCE
      </th>
      <th headers="blank"></th>
      <th headers="blank"></th>
    </tr>
    <tr
      style={{
        padding: `${10}rem ${0} ${0} ${0}`,
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: `${0} ${0} ${0} ${1}px`,
      }}
    >
      <th headers="blank" style={{ borderWidth: `${0} ${0} ${0}  ${0}` }}></th>
      <th headers="blank" style={{ borderWidth: `${0} ${0} ${0}  ${0}` }}></th>
      {columns.matrix_details
        .slice(0, columns.matrix_size)
        .map((column, index) => {
          return (
            <th
              scope="col"
              id="inspections-headers"
              key={`${column.id}-${index}`}
              style={{
                backgroundColor: "light-grey",
                border: `${1}px solid black`,
              }}
            >
              {column.header_title}
              <div style={{ fontSize: `${0.9}em`, fontWeight: "normal" }}>
                {column.header_sub_title}
              </div>
            </th>
          );
        })}
    </tr>
  </thead>
);

MatrixHeaders.propTypes = {
  columns: PropTypes.PropTypes.shape({}).isRequired,
};

export default MatrixHeaders;

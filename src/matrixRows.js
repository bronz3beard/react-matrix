import React from "react";
import PropTypes from "prop-types";
import { groupObjectsByProp } from "./functions";
import TableData from "./tableData";

const MatrixRows = ({ data }) => (
  <tbody>
    <tr id="react-matrix-rows-likelihood">
      <th scope="row" rowSpan="6">
        LIKELIHOOD
      </th>
    </tr>
    {groupObjectsByProp(data.matrix_values, "likelihood_descriptor")
      .reverse()
      .map((row, index) => {
        return (
          <tr
            key={`${row.id}-${index}`}
            style={{ border: `${1}px solid black` }}
            id={`react-matrix-rows-${data.matrix_details[index].row_header_titles}-${data.matrix_details[index].row_header_sub_titles}`}
          >
            <th
              scope="row"
              style={{
                backgroundColor: "light-black",
                border: `${1}px solid black`,
              }}
            >
              {data.matrix_details[index].row_header_title}
              <div style={{ fontSize: `${0.9}em`, fontWeight: "normal" }}>
                {data.matrix_details[index].row_header_sub_title}
              </div>
            </th>
            {row.map((item, index) => {
              return <TableData tableData={item} key={`${item.id}-${index}`} />;
            })}
          </tr>
        );
      })}
  </tbody>
);

MatrixRows.propTypes = {
  data: PropTypes.PropTypes.shape({}).isRequired,
};

export default MatrixRows;

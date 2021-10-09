import React from "react";
import PropTypes from "prop-types";

const TableData = (props) => {
  const { data, tdStyles, hasInlineStyles, customTableDataDynamicIdValue } =
    props;

  const handleCellClick = (tdSelected) => {
    alert(
      `${tdSelected?.description}, ${tdSelected?.score_value} \n${tdSelected?.response}`
    );
  };

  const customTdStyles = !tdStyles ? {} : tdStyles;
  const tableDataStyles = hasInlineStyles
    ? {
        cursor: "pointer",
        textAlign: "center",
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: `${1}px`,
        backgroundColor: data?.colour,
        ...tdStyles,
      }
    : { ...customTdStyles };

  return (
    <>
      <td
        style={tableDataStyles}
        onClick={() => handleCellClick(data)}
        id={`react-matrix-dynamic-table-data${
          !customTableDataDynamicIdValue
            ? ""
            : `-${customTableDataDynamicIdValue}`
        }`}
      >
        {`${data?.description}`}
        <br />
        {`(${data?.score_value})`}
      </td>
    </>
  );
};

TableData.defaultProps = {
  tdStyles: {},
  hasInlineStyles: true,
  customTableDataDynamicIdValue: "",
};

TableData.propsTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    colour: PropTypes.string,
    position: PropTypes.number,
    matrix_id: PropTypes.number,
    score_value: PropTypes.number,
    description: PropTypes.string,
    response: PropTypes.string,
    likelihood_descriptor: PropTypes.string,
    consequence_descriptor: PropTypes.number,
  }).isRequired,

  tdStyles: PropTypes.shape({}),
  hasInlineStyles: PropTypes.bool,
  customTableDataDynamicIdValue: PropTypes.string,
};

export default TableData;

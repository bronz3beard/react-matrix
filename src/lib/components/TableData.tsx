import React, { FC } from "react";
import { TableDataProps } from "../types";

const TableData: FC<TableDataProps> = ({
  data,
  tdStyles = {},
  hasInlineStyles = true,
  customTableDataDynamicIdValue = "",
}) => {
  const handleCellClick = (tdSelected: TableDataProps["data"]) => {
    alert(
      `${tdSelected?.description}, ${tdSelected?.score_value} \n${tdSelected?.response}`
    );
  };

  const customTdStyles = !tdStyles ? {} : tdStyles;
  const tableDataStyles: React.CSSProperties = hasInlineStyles
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

export default TableData;

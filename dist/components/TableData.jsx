import React from "react";
const TableData = ({ data, tdStyles = {}, hasInlineStyles = true, customTableDataDynamicIdValue = "", }) => {
    const handleCellClick = (tdSelected) => {
        alert(`${tdSelected === null || tdSelected === void 0 ? void 0 : tdSelected.description}, ${tdSelected === null || tdSelected === void 0 ? void 0 : tdSelected.score_value} \n${tdSelected === null || tdSelected === void 0 ? void 0 : tdSelected.response}`);
    };
    const customTdStyles = !tdStyles ? {} : tdStyles;
    const tableDataStyles = hasInlineStyles
        ? Object.assign({ cursor: "pointer", textAlign: "center", borderColor: "black", borderStyle: "solid", borderWidth: `${1}px`, backgroundColor: data === null || data === void 0 ? void 0 : data.colour }, tdStyles) : Object.assign({}, customTdStyles);
    return (<>
      <td style={tableDataStyles} onClick={() => handleCellClick(data)} id={`react-matrix-dynamic-table-data${!customTableDataDynamicIdValue
            ? ""
            : `-${customTableDataDynamicIdValue}`}`}>
        {`${data === null || data === void 0 ? void 0 : data.description}`}
        <br />
        {`(${data === null || data === void 0 ? void 0 : data.score_value})`}
      </td>
    </>);
};
export default TableData;

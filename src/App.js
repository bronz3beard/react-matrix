import React from "react";
import { ReactMatrix } from "./lib";
import IconsRow from "./components/iconsRow";
import Footer from "./components/footer";
import { data } from "./lib/utils/data.ts";

const App = () => {
  return (
    <>
      <IconsRow />
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
      <Footer />
    </>
  );
};

export default App;

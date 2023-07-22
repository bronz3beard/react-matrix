import ReactMatrix from "../lib";
import IconsRow from "./components/iconsRow";
import Footer from "./components/footer";
import { ReactMatrixProps } from "../lib/types";

function App(props: ReactMatrixProps) {
  return (
    <>
      <IconsRow />
      <ReactMatrix
        {...{
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
          ...props,
        }}
      />
      <Footer />
    </>
  );
}

export default App;

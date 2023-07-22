import { createContext } from "react";
import { MatrixData } from "../types";

interface ContextType {
  data: MatrixData;
  matrixName: string;
  matrixDescription: string;
  hasTableBorder: boolean;
  rowPrimaryUpper: boolean;
  hasInlineStyles: boolean;
  matrixSizeSelected: number;
  headerPrimaryUpper: boolean;
  hasContainerStyles: boolean;
  reverseMatrixValues: boolean;
  tableContainerStyles: Record<string, any>;
  tableStyles: Record<string, any>;
  thRowStyles: Record<string, any>;
  thTitleStyles: Record<string, any>;
  thSubTitleStyles: Record<string, any>;
  thPrimaryTitleStyles: Record<string, any>;
  trRowStyles: Record<string, any>;
  trTitleStyles: Record<string, any>;
  trSubTitleStyles: Record<string, any>;
  trPrimaryTitleStyles: Record<string, any>;
  tdStyles: Record<string, any>;
  customHeaderRowIdValue: string;
  customRowDynamicIdValue: string;
  customTableDataDynamicIdValue: string;
  customRowHeaderDynamicIdValue: string;
  customDynamicHeaderTitleIdValue: string;
  customDynamicSubHeaderTitleIdValue: string;
}

const Context = createContext<ContextType>({
  data: {} as MatrixData,
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
});

export const Provider = Context.Provider;

export default Context;

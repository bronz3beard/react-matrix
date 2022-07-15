import { createContext } from 'react'

const Context = createContext({
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
})

export const Provider = Context.Provider

export default Context

export interface MatrixDetail {
  id: number;
  position: number;
  matrix_type: string;
  likelihood: string;
  consequence: number;
  header_title: string;
  header_sub_title: string;
  row_header_title: string;
  row_header_sub_title: string;
}

export interface MatrixValue {
  id: number;
  matrix_id: number;
  description: string;
  score_value: number;
  colour: string;
  position: number;
  likelihood_descriptor: string;
  consequence_descriptor: number;
  response: string;
}

export interface MatrixData {
  id: number;
  matrix_size: number;
  matrix_name: string;
  primary_header_title: string;
  primary_row_header_title: string;
  matrix_description: string;
  matrix_details: MatrixDetail[];
  matrix_values: MatrixValue[];
}

export interface ReactMatrixProps {
  data?: {
    id: number;
    matrix_name: string;
    matrix_description: string;
    matrix_size: number;
    primary_header_title: string;
    primary_row_header_title: string;
    matrix_details: {
      id: number;
      likelihood: string;
      consequence: number;
      header_title: string;
      header_sub_title: string;
      row_header_title: string;
      row_header_sub_title: string;
    }[];
    matrix_values: {
      id: number;
      colour: string;
      position: number;
      matrix_id: number;
      score_value: number;
      description: string;
      response: string;
      likelihood_descriptor: string;
      consequence_descriptor: number;
    }[];
  };
  hasTableBorder?: boolean;
  hasInlineStyles?: boolean;
  hasContainerStyles?: boolean;
  reverseMatrixValues?: boolean;
  matrixSizeSelected?: number;
  rowPrimaryUpper?: boolean;
  headerPrimaryUpper?: boolean;
  tableContainerStyles?: React.CSSProperties;
  tableStyles?: React.CSSProperties;
  thRowStyles?: React.CSSProperties;
  thTitleStyles?: React.CSSProperties;
  thSubTitleStyles?: React.CSSProperties;
  thPrimaryTitleStyles?: React.CSSProperties;
  trRowStyles?: React.CSSProperties;
  trTitleStyles?: React.CSSProperties;
  trSubTitleStyles?: React.CSSProperties;
  trPrimaryTitleStyles?: React.CSSProperties;
  tdStyles?: React.CSSProperties;
  customHeaderRowIdValue?: string;
  customDynamicHeaderTitleIdValue?: string;
  customDynamicSubHeaderTitleIdValue?: string;
  customRowDynamicIdValue?: string;
  customRowHeaderDynamicIdValue?: string;
  customTableDataDynamicIdValue?: string;
}

export interface TableDataProps {
  data: {
    id: number;
    colour: string;
    position: number;
    matrix_id: number;
    score_value: number;
    description: string;
    response: string;
    likelihood_descriptor: string;
    consequence_descriptor: number;
  };
  tdStyles?: React.CSSProperties;
  hasInlineStyles?: boolean;
  customTableDataDynamicIdValue?: string;
}

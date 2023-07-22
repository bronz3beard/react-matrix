import React from "react";
import { ReactMatrix } from "./lib";
import { Provider } from "./lib/context";
import PropTypes from "prop-types";
import IconsRow from "./components/iconsRow";
import Footer from "./components/footer";

const App = (props) => {
  return (
    <>
      <IconsRow />
      <Provider
        value={{
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
      >
        <ReactMatrix />
      </Provider>
      <Footer />
    </>
  );
};

App.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    matrix_name: PropTypes.string,
    matrix_description: PropTypes.string,
    matrix_size: PropTypes.number.isRequired,
    primary_header_title: PropTypes.string,
    primary_row_header_title: PropTypes.string,

    matrix_details: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        likelihood: PropTypes.string,
        consequence: PropTypes.number,
        header_title: PropTypes.string,
        header_sub_title: PropTypes.string,
        row_header_title: PropTypes.string,
        row_header_sub_title: PropTypes.string,
      })
    ).isRequired,

    matrix_values: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        colour: PropTypes.string,
        position: PropTypes.number.isRequired,
        matrix_id: PropTypes.number,
        score_value: PropTypes.number,
        description: PropTypes.string,
        response: PropTypes.string,
        likelihood_descriptor: PropTypes.string.isRequired,
        consequence_descriptor: PropTypes.number,
      })
    ).isRequired,
  }).isRequired,

  hasTableBorder: PropTypes.bool,
  hasInlineStyles: PropTypes.bool,
  hasContainerStyles: PropTypes.bool,
  reverseMatrixValues: PropTypes.bool,
  matrixSizeSelected: PropTypes.number,

  rowPrimaryUpper: PropTypes.bool,
  headerPrimaryUpper: PropTypes.bool,

  tableContainerStyles: PropTypes.shape({}),
  tableStyles: PropTypes.shape({}),

  thRowStyles: PropTypes.shape({}),
  thTitleStyles: PropTypes.shape({}),
  thSubTitleStyles: PropTypes.shape({}),
  thPrimaryTitleStyles: PropTypes.shape({}),

  trRowStyles: PropTypes.shape({}),
  trTitleStyles: PropTypes.shape({}),
  trSubTitleStyles: PropTypes.shape({}),
  trPrimaryTitleStyles: PropTypes.shape({}),

  tdStyles: PropTypes.shape({}),

  customHeaderRowIdValue: PropTypes.string,
  customDynamicHeaderTitleIdValue: PropTypes.string,
  customDynamicSubHeaderTitleIdValue: PropTypes.string,

  customRowDynamicIdValue: PropTypes.string,
  customRowHeaderDynamicIdValue: PropTypes.string,

  customTableDataDynamicIdValue: PropTypes.string,
};

export default App;

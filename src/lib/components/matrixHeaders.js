import React from "react";
import PropTypes from "prop-types";
import { capitaliseString } from "../utils/functions";
// import "./styles/riskMatrix.scss";

const MatrixHeaders = (props) => {
  const {
    data,
    thRowStyles,
    thTitleStyles,
    hasInlineStyles,
    thSubTitleStyles,
    headerPrimaryUpper,
    thPrimaryTitleStyles,
    customHeaderRowIdValue,
    customDynamicHeaderTitleIdValue,
    customDynamicSubHeaderTitleIdValue,
  } = props;

  const customPrimaryTitleStyles = !thPrimaryTitleStyles
    ? {}
    : thPrimaryTitleStyles;
  const headerPrimaryTitleStyles = hasInlineStyles
    ? {
        borderWidth: `${0}`,
        padding: `${1}rem ${0} ${1}rem ${0}`,
        ...thPrimaryTitleStyles,
      }
    : { ...customPrimaryTitleStyles };

  const customRowStyles = !thRowStyles ? {} : thRowStyles;
  const headerRowStyles = hasInlineStyles
    ? {
        borderColor: "black",
        borderStyle: "solid",
        padding: `${10}rem ${0} ${0} ${0}`,
        borderWidth: `${0} ${0} ${0} ${10}px`,
        ...thRowStyles,
      }
    : { ...customRowStyles };

  const customThTitleStyles = !thTitleStyles ? {} : thTitleStyles;
  const headerTitleStyles = hasInlineStyles
    ? {
        padding: `${0} ${0.5}rem ${0} ${0.5}rem`,
        backgroundColor: "light-grey",
        border: `${1}px solid black`,
        ...thTitleStyles,
      }
    : { ...customThTitleStyles };

  const customThSubTitleStyles = !thSubTitleStyles ? {} : thSubTitleStyles;
  const headerSubTitleStyles = hasInlineStyles
    ? { fontSize: `${0.9}em`, fontWeight: "normal", ...thSubTitleStyles }
    : { ...customThSubTitleStyles };

  const headerPrimaryTitle = headerPrimaryUpper
    ? capitaliseString(data.primary_header_title)
    : data.primary_header_title;

  return (
    <thead>
      <tr id="react-matrix-blank-headers-primary-title-row">
        <th headers="blank" colSpan="4"></th>
        <th
          style={headerPrimaryTitleStyles}
          id="react-matrix-header-primary-title"
        >
          {headerPrimaryTitle}
        </th>
        <th headers="blank" colSpan="2"></th>
      </tr>
      <tr
        style={headerRowStyles}
        id={`react-matrix-dynamic-headers-row-${customHeaderRowIdValue}`}
      >
        <th headers="blank" colSpan="2"></th>
        {data.matrix_details.slice(0, data.matrix_size).map((column, index) => {
          return (
            <th
              scope="col"
              style={headerTitleStyles}
              id={`react-matrix-dynamic-column-header-title${
                !customDynamicHeaderTitleIdValue
                  ? ""
                  : `-${customDynamicHeaderTitleIdValue}`
              }`}
              key={`${column.id}-${index}`}
            >
              {column.header_title}
              <div
                style={headerSubTitleStyles}
                id={`react-matrix-dynamic-column-header-sub-title${
                  !customDynamicSubHeaderTitleIdValue
                    ? ""
                    : `-${customDynamicSubHeaderTitleIdValue}`
                }`}
              >
                {column.header_sub_title}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

MatrixHeaders.defaultProps = {
  hasInlineStyles: true,
  headerPrimaryUpper: true,

  thRowStyles: {},
  thTitleStyles: {},
  thSubTitleStyles: {},
  thPrimaryTitleStyles: {},

  customHeaderRowIdValue: "",
  customDynamicHeaderTitleIdValue: "",
  customDynamicSubHeaderTitleIdValue: "",
};

MatrixHeaders.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    matrix_name: PropTypes.string,
    matrix_description: PropTypes.string,
    matrix_size: PropTypes.number.isRequired,
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

  hasInlineStyles: PropTypes.bool,
  headerPrimaryUpper: PropTypes.bool,

  thRowStyles: PropTypes.shape({}),
  thTitleStyles: PropTypes.shape({}),
  thSubTitleStyles: PropTypes.shape({}),
  thPrimaryTitleStyles: PropTypes.shape({}),

  customHeaderRowIdValue: PropTypes.string,
  customDynamicHeaderTitleIdValue: PropTypes.string,
  customDynamicSubHeaderTitleIdValue: PropTypes.string,
};

export default MatrixHeaders;

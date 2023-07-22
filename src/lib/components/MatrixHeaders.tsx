import React, { FC } from "react";
import {
  getHeaderRowStyles,
  getHeaderTitleStyles,
  getHeaderSubTitleStyles,
  getHeaderPrimaryTitleStyles,
} from "../helpers/getStyles";
import { capitaliseString } from "../utils/functions";
import { MatrixHeaderProps } from "../types";
// import "./styles/riskMatrix.scss";

const MatrixHeaders: FC<MatrixHeaderProps> = ({
  data,
  hasInlineStyles = true,
  headerPrimaryUpper = true,
  thRowStyles = {},
  thTitleStyles = {},
  thSubTitleStyles = {},
  thPrimaryTitleStyles = {},
  customHeaderRowIdValue = "",
  customDynamicHeaderTitleIdValue = "",
  customDynamicSubHeaderTitleIdValue = "",
}: MatrixHeaderProps) => {
  const headerRowStyles = getHeaderRowStyles(hasInlineStyles, thRowStyles);
  const headerTitleStyles = getHeaderTitleStyles(
    hasInlineStyles,
    thTitleStyles
  );
  const headerSubTitleStyles = getHeaderSubTitleStyles(
    hasInlineStyles,
    thSubTitleStyles
  );
  const headerPrimaryTitleStyles = getHeaderPrimaryTitleStyles(
    hasInlineStyles,
    thPrimaryTitleStyles
  );

  const headerPrimaryTitle = !headerPrimaryUpper
    ? capitaliseString(data?.primary_header_title)
    : data?.primary_header_title;

  return (
    <thead>
      <tr id="react-matrix-blank-headers-primary-title-row">
        <th headers="blank" colSpan={4}></th>
        <th
          style={headerPrimaryTitleStyles}
          id="react-matrix-header-primary-title"
        >
          {headerPrimaryTitle}
        </th>
        <th headers="blank" colSpan={2}></th>
      </tr>
      <tr
        style={headerRowStyles}
        id={`react-matrix-dynamic-headers-row-${customHeaderRowIdValue}`}
      >
        <th headers="blank" colSpan={2}></th>
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

export default MatrixHeaders;

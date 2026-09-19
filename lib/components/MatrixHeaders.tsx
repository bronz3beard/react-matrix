import { FC } from 'react';
import {
  getHeaderRowStyles,
  getHeaderTitleStyles,
  getHeaderSubTitleStyles,
  getHeaderPrimaryTitleStyles,
} from '../helpers/getStyles.js';
import { capitaliseString } from '../utils/functions.js';
import { MatrixHeaderProps } from '../types/index.js';

const MatrixHeaders: FC<MatrixHeaderProps> = ({
  data,
  columns,
  hasInlineStyles = true,
  headerPrimaryUpper = true,
  thRowStyles = {},
  thTitleStyles = {},
  thSubTitleStyles = {},
  thPrimaryTitleStyles = {},
  customHeaderRowIdValue = '',
  customDynamicHeaderTitleIdValue = '',
  customDynamicSubHeaderTitleIdValue = '',
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

  // The axis title sits over the middle column: two row-header columns plus the
  // columns before it on the left, the rest on the right (4 and 2 for a 5×5).
  const titleColumn = Math.floor((columns.length - 1) / 2);
  const columnsAfterTitle = columns.length - 1 - titleColumn;

  return (
    <thead>
      <tr id="react-matrix-blank-headers-primary-title-row">
        <th headers="blank" colSpan={2 + titleColumn}></th>
        <th
          style={headerPrimaryTitleStyles}
          id="react-matrix-header-primary-title"
        >
          {headerPrimaryTitle}
        </th>
        {columnsAfterTitle > 0 && (
          <th headers="blank" colSpan={columnsAfterTitle}></th>
        )}
      </tr>
      <tr
        style={headerRowStyles}
        id={`react-matrix-dynamic-headers-row-${customHeaderRowIdValue}`}
      >
        <th headers="blank" colSpan={2}></th>
        {columns.map((column, index) => {
          return (
            <th
              scope="col"
              style={headerTitleStyles}
              id={`react-matrix-dynamic-column-header-title${
                !customDynamicHeaderTitleIdValue
                  ? ''
                  : `-${customDynamicHeaderTitleIdValue}`
              }`}
              key={`${column.id}-${index}`}
            >
              {column.header_title}
              <div
                style={headerSubTitleStyles}
                id={`react-matrix-dynamic-column-header-sub-title${
                  !customDynamicSubHeaderTitleIdValue
                    ? ''
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

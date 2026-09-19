import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import MatrixHeaders from './components/MatrixHeaders.js';
import MatrixRows from './components/MatrixRows.js';
import { buildGrid } from './grid.js';
import { BASE_CSS, BASE_CSS_HREF } from './theme/baseCss.js';
import { original } from './theme/presets/original.js';
import { cellColours, createSeverityScale } from './theme/severity.js';
import { themeToCssVars, themeToDataAttributes } from './theme/tokens.js';
import type { ReactMatrixProps } from './types/index.js';

// React 19 hoists a <style> with `href` + `precedence` into <head> and renders it
// once per page; React 18 renders it in place. Spread so React 18's type
// definitions, which lack `precedence`, still accept it.
const HOISTED_STYLE = { href: BASE_CSS_HREF, precedence: 'default' };

// True while the element scrolls sideways (a wide matrix on a narrow screen).
// Such a region must be keyboard-scrollable (WCAG 2.1.1), so the root becomes
// focusable only then, instead of adding a tab stop to every matrix.
const useHorizontalOverflow = (ref: RefObject<HTMLElement | null>): boolean => {
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof ResizeObserver === 'undefined') return;
    // Fires once on observe, then whenever the root or its table resizes.
    const observer = new ResizeObserver(() =>
      setOverflows(element.scrollWidth > element.clientWidth)
    );
    observer.observe(element);
    const table = element.querySelector('table');
    if (table) observer.observe(table);
    return () => observer.disconnect();
  }, [ref]);

  return overflows;
};

const ReactMatrix = ({
  data,
  theme = original,
  styles = {},
  className,
  style,
  unstyled = false,
  reverseMatrixValues = true,
  nonce,
}: ReactMatrixProps) => {
  const grid = useMemo(
    () => buildGrid(data, { reverse: reverseMatrixValues }),
    [data, reverseMatrixValues]
  );
  const scale = useMemo(() => createSeverityScale(data.matrix_values), [data]);
  const colours = useMemo(
    () =>
      unstyled
        ? null
        : new Map(
            data.matrix_values.map((value) => [value.id, cellColours(theme, { value, scale })])
          ),
    [data, theme, scale, unstyled]
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const scrolls = useHorizontalOverflow(rootRef);

  // Invalid data is reported, never thrown: one bad value must not take down
  // the host page.
  useEffect(() => {
    grid.issues.forEach((issue) => console.error(issue));
    colours?.forEach(({ rejectedColour }, id) => {
      if (rejectedColour !== undefined) {
        console.error(
          `react-data-matrix: value ${id} has an unsafe colour ${JSON.stringify(rejectedColour)}; a neutral colour is shown instead.`
        );
      }
    });
  }, [grid, colours]);

  return (
    <div
      ref={rootRef}
      {...(scrolls ? { tabIndex: 0, role: 'region', 'aria-label': data.matrix_name } : {})}
      className={className ? `rdm-root ${className}` : 'rdm-root'}
      style={unstyled ? { ...styles.root, ...style } : { ...themeToCssVars(theme), ...styles.root, ...style }}
      {...(unstyled ? {} : themeToDataAttributes(theme))}
    >
      {!unstyled && (
        <style {...HOISTED_STYLE} nonce={nonce}>
          {BASE_CSS}
        </style>
      )}
      <table className="rdm-table" style={styles.table}>
        <caption className="rdm-caption" style={styles.caption}>
          <span className="rdm-caption-title">{data.matrix_name}</span>
          <span className="rdm-caption-description">{data.matrix_description}</span>
        </caption>
        <colgroup span={2} />
        <colgroup span={grid.columns.length} />
        <MatrixHeaders
          title={data.primary_header_title}
          columns={grid.columns}
          styles={styles}
        />
        <MatrixRows
          title={data.primary_row_header_title}
          columns={grid.columns}
          rows={grid.rows}
          tiers={scale.tiers}
          colours={colours}
          styles={styles}
        />
      </table>
    </div>
  );
};

export default ReactMatrix;
export { original } from './theme/presets/original.js';
export type {
  MatrixData,
  MatrixDetail,
  MatrixRootStyle,
  MatrixSlot,
  MatrixSlotStyles,
  MatrixValue,
  ReactMatrixProps,
} from './types/index.js';
export type { CellVariant, MatrixTheme, SeverityColour } from './theme/types.js';

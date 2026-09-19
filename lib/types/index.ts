import type { CSSProperties } from 'react';
import type { MatrixTheme } from '../theme/types.js';

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

/** Elements that accept per-instance inline overrides via `styles`. */
export type MatrixSlot =
  | 'root'
  | 'caption'
  | 'table'
  | 'axisTitle'
  | 'columnHeader'
  | 'rowHeader'
  | 'cell';

export type MatrixSlotStyles = Partial<Record<MatrixSlot, CSSProperties>>;

/** Root inline style; also accepts theme variable overrides like `--rdm-radius`. */
export type MatrixRootStyle = CSSProperties & { [variable: `--rdm-${string}`]: string };

export interface ReactMatrixProps {
  data: MatrixData;
  /** Preset or custom theme (default `original`). Tweak with `{ ...preset, radius: '4px' }`. */
  theme?: MatrixTheme;
  /** Inline overrides per element, applied after the theme. */
  styles?: MatrixSlotStyles;
  className?: string;
  style?: MatrixRootStyle;
  /** Render semantic markup with `rdm-*` classes and `data-*` hooks only: no theme, no base stylesheet. */
  unstyled?: boolean;
  /** Most likely row on top (default `true`). */
  reverseMatrixValues?: boolean;
  /** CSP nonce for the base <style> element. */
  nonce?: string;
}

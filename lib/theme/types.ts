// A preset or custom theme. Theme values are trusted CSS written by the
// developer; only data supplied at runtime (`MatrixValue.colour`) is untrusted.
// Tweak a preset with a plain spread: `{ ...aurora, radius: '4px' }`.

export type CellVariant = 'fill' | 'outline' | 'chip' | 'dot';

export interface SeverityColour {
  bg: string;
  fg: string;
}

export interface MatrixTheme {
  name: string;
  scheme: 'light' | 'dark';
  /** System font stack only; the library never loads remote fonts. */
  font: string;
  fontSize: string;
  /** Solid colour (6-digit hex); contrast checks measure against it. */
  surface: string;
  /** Optional `background-image` layered over `surface`, e.g. a gradient. */
  backdrop?: string;
  text: string;
  mutedText: string;
  headerSurface: string;
  headerText: string;
  line: string;
  lineWidth: string;
  lineStyle: 'solid' | 'dashed';
  radius: string;
  gap: string;
  cellPadding: string;
  cellShadow: string;
  cellVariant: CellVariant;
  emphasis: 'label' | 'score';
  align: 'center' | 'start';
  axisCase: 'upper' | 'none';
  /** Low → high severity ramp (opaque 6-digit hex). Omit to use each value's own `colour`. */
  palette?: readonly SeverityColour[];
  /** `tier`: one palette step per colour tier; `score`: continuous heatmap by score. */
  scale: 'tier' | 'score';
  focus: string;
}

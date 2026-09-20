import type { MatrixTheme } from '../types.js';

// An accounting ledger: a tight grey grid, monospace figures aligned to the
// left and pale tinted cells that stay out of the way.
export const ledger: MatrixTheme = {
  name: 'Ledger',
  scheme: 'light',
  font: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
  fontSize: '0.875rem',
  surface: '#fbfbf9',
  text: '#20201d',
  mutedText: '#55554f',
  headerSurface: '#f0f0ec',
  headerText: '#20201d',
  line: '#b8b8b0',
  lineWidth: '1px',
  lineStyle: 'solid',
  radius: '0',
  gap: '0',
  cellPadding: '0.3rem 0.5rem',
  cellShadow: 'none',
  cellVariant: 'fill',
  emphasis: 'label',
  align: 'start',
  axisCase: 'upper',
  palette: [
    { bg: '#e7f0e3', fg: '#20201d' },
    { bg: '#f6efcf', fg: '#20201d' },
    { bg: '#f7dfc4', fg: '#20201d' },
    { bg: '#f2cdcd', fg: '#20201d' },
  ],
  scale: 'tier',
  focus: '#20201d',
};

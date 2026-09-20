import type { MatrixTheme } from '../types.js';

// Line art: cells are drawn, not filled — a coloured outline and matching
// label on plain white.
export const contour: MatrixTheme = {
  name: 'Contour',
  scheme: 'light',
  font: 'system-ui, sans-serif',
  fontSize: '0.9375rem',
  surface: '#fefefe',
  text: '#27272a',
  mutedText: '#52525b',
  headerSurface: '#fefefe',
  headerText: '#27272a',
  line: '#d4d4d8',
  lineWidth: '0',
  lineStyle: 'solid',
  radius: '8px',
  gap: '4px',
  cellPadding: '0.45rem',
  cellShadow: 'none',
  cellVariant: 'outline',
  emphasis: 'label',
  align: 'center',
  axisCase: 'upper',
  palette: [
    { bg: '#047857', fg: '#ffffff' },
    { bg: '#b45309', fg: '#ffffff' },
    { bg: '#9a3412', fg: '#ffffff' },
    { bg: '#be123c', fg: '#ffffff' },
  ],
  scale: 'tier',
  focus: '#2563eb',
};

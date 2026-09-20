import type { MatrixTheme } from '../types.js';

// Nordic dusk: a cool slate surface where severity is a single muted dot
// beside each rating rather than a filled cell.
export const fjord: MatrixTheme = {
  name: 'Fjord',
  scheme: 'dark',
  font: 'system-ui, sans-serif',
  fontSize: '0.9375rem',
  surface: '#2e3440',
  text: '#eceff4',
  mutedText: '#d8dee9',
  headerSurface: '#3b4252',
  headerText: '#eceff4',
  line: '#4c566a',
  lineWidth: '0',
  lineStyle: 'solid',
  radius: '6px',
  gap: '6px',
  cellPadding: '0.5rem',
  cellShadow: 'none',
  cellVariant: 'dot',
  emphasis: 'label',
  align: 'center',
  axisCase: 'upper',
  palette: [
    { bg: '#a3be8c', fg: '#2e3440' },
    { bg: '#ebcb8b', fg: '#2e3440' },
    { bg: '#d08770', fg: '#141a21' },
    { bg: '#e0868f', fg: '#141a21' },
  ],
  scale: 'tier',
  focus: '#88c0d0',
};

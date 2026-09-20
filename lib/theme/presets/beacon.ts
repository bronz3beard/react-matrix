import type { MatrixTheme } from '../types.js';

// Accessibility first: an Okabe–Ito colour-blind-safe ramp, heavy borders and
// text that clears WCAG AAA (7:1) on every severity colour.
export const beacon: MatrixTheme = {
  name: 'Beacon',
  scheme: 'light',
  font: 'system-ui, sans-serif',
  fontSize: '1rem',
  surface: '#f7f7f7',
  text: '#111111',
  mutedText: '#333333',
  headerSurface: '#f2f2f2',
  headerText: '#111111',
  line: '#111111',
  lineWidth: '2px',
  lineStyle: 'solid',
  radius: '4px',
  gap: '4px',
  cellPadding: '0.5rem',
  cellShadow: 'none',
  cellVariant: 'fill',
  emphasis: 'label',
  align: 'center',
  axisCase: 'upper',
  palette: [
    { bg: '#56b4e9', fg: '#000000' },
    { bg: '#f0e442', fg: '#000000' },
    { bg: '#e69f00', fg: '#000000' },
    { bg: '#8c2d02', fg: '#ffffff' },
  ],
  scale: 'tier',
  focus: '#0072b2',
};

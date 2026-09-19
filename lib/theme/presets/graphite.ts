import type { MatrixTheme } from '../types.js';

// Greyscale only, so it survives printing and photocopying: severity is carried
// by lightness and a bold, left-aligned score.
export const graphite: MatrixTheme = {
  name: 'Graphite',
  scheme: 'light',
  font: 'system-ui, sans-serif',
  fontSize: '0.9375rem',
  surface: '#fafafa',
  text: '#1f1f1f',
  mutedText: '#555555',
  headerSurface: '#ececec',
  headerText: '#1f1f1f',
  line: '#8a8a8a',
  lineWidth: '1px',
  lineStyle: 'solid',
  radius: '2px',
  gap: '2px',
  cellPadding: '0.35rem 0.5rem',
  cellShadow: 'none',
  cellVariant: 'fill',
  emphasis: 'score',
  align: 'start',
  axisCase: 'upper',
  palette: [
    { bg: '#e5e5e5', fg: '#111111' },
    { bg: '#b3b3b3', fg: '#111111' },
    { bg: '#6b6b6b', fg: '#ffffff' },
    { bg: '#262626', fg: '#ffffff' },
  ],
  scale: 'tier',
  focus: '#000000',
};

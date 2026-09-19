import type { MatrixTheme } from '../types.js';

// Quiet and spacious: faint hairlines, generous spacing and a small coloured
// dot beside each rating instead of a filled cell.
export const whitespace: MatrixTheme = {
  name: 'Whitespace',
  scheme: 'light',
  font: 'system-ui, sans-serif',
  fontSize: '0.9375rem',
  surface: '#f8fafc',
  text: '#1d1d1f',
  mutedText: '#6e6e73',
  headerSurface: '#ffffff',
  headerText: '#1d1d1f',
  line: '#e5e5ea',
  lineWidth: '1px',
  lineStyle: 'solid',
  radius: '0',
  gap: '6px',
  cellPadding: '0.6rem',
  cellShadow: 'none',
  cellVariant: 'dot',
  emphasis: 'label',
  align: 'center',
  axisCase: 'upper',
  palette: [
    { bg: '#15803d', fg: '#ffffff' },
    { bg: '#a16207', fg: '#ffffff' },
    { bg: '#c2410c', fg: '#ffffff' },
    { bg: '#b91c1c', fg: '#ffffff' },
  ],
  scale: 'tier',
  focus: '#0071e3',
};

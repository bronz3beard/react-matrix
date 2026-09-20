import type { MatrixTheme } from '../types.js';

// International typographic style: a strict flush grid, a red header band and
// figures that lead the cell.
export const swiss: MatrixTheme = {
  name: 'Swiss',
  scheme: 'light',
  font: "'Helvetica Neue', Helvetica, Arial, system-ui, sans-serif",
  fontSize: '0.9375rem',
  surface: '#fcfcfc',
  text: '#111111',
  mutedText: '#f4f4f4',
  headerSurface: '#d7263d',
  headerText: '#ffffff',
  line: '#111111',
  lineWidth: '0',
  lineStyle: 'solid',
  radius: '0',
  gap: '0',
  cellPadding: '0.5rem',
  cellShadow: 'none',
  cellVariant: 'fill',
  emphasis: 'score',
  align: 'start',
  axisCase: 'upper',
  palette: [
    { bg: '#efefef', fg: '#111111' },
    { bg: '#c9c9c9', fg: '#111111' },
    { bg: '#707070', fg: '#ffffff' },
    { bg: '#d7263d', fg: '#ffffff' },
  ],
  scale: 'tier',
  focus: '#d7263d',
};

import type { MatrixTheme } from '../types.js';

// Playful and soft: cream background, rounded type and pill-shaped cells in
// mint, lemon, peach and strawberry.
export const sherbet: MatrixTheme = {
  name: 'Sherbet',
  scheme: 'light',
  font: "ui-rounded, 'SF Pro Rounded', Nunito, system-ui, sans-serif",
  fontSize: '0.9375rem',
  surface: '#fff8f0',
  text: '#3b2f2f',
  mutedText: '#6b5a55',
  headerSurface: '#ffffff',
  headerText: '#3b2f2f',
  line: '#f1dfd3',
  lineWidth: '0',
  lineStyle: 'solid',
  radius: '999px',
  gap: '8px',
  cellPadding: '0.45rem 0.75rem',
  cellShadow: 'none',
  cellVariant: 'fill',
  emphasis: 'label',
  align: 'center',
  axisCase: 'upper',
  palette: [
    { bg: '#b8f2d0', fg: '#3b2f2f' },
    { bg: '#fff3a3', fg: '#3b2f2f' },
    { bg: '#ffc9a8', fg: '#3b2f2f' },
    { bg: '#ff8fab', fg: '#3b2f2f' },
  ],
  scale: 'tier',
  focus: '#d9468f',
};

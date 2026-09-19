import type { MatrixTheme } from '../types.js';

// A board report: a navy header band, slate hairlines, left-aligned text and a
// conservative teal → amber → orange → crimson ramp.
export const boardroom: MatrixTheme = {
  name: 'Boardroom',
  scheme: 'light',
  font: "'Segoe UI', 'Helvetica Neue', system-ui, sans-serif",
  fontSize: '0.9375rem',
  surface: '#f4f6f9',
  text: '#1b2a41',
  mutedText: '#c9d4e5',
  headerSurface: '#1b2a41',
  headerText: '#ffffff',
  line: '#9aa7b8',
  lineWidth: '1px',
  lineStyle: 'solid',
  radius: '4px',
  gap: '2px',
  cellPadding: '0.4rem 0.6rem',
  cellShadow: 'none',
  cellVariant: 'fill',
  emphasis: 'label',
  align: 'start',
  axisCase: 'upper',
  palette: [
    { bg: '#0f766e', fg: '#ffffff' },
    { bg: '#f59e0b', fg: '#1b2a41' },
    { bg: '#c2410c', fg: '#ffffff' },
    { bg: '#991b1b', fg: '#ffffff' },
  ],
  scale: 'tier',
  focus: '#0b5fff',
};

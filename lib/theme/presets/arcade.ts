import type { MatrixTheme } from '../types.js';

// 8-bit arcade cabinet: purple-black screen, chunky pixel borders and neon
// cells in monospace capitals.
export const arcade: MatrixTheme = {
  name: 'Arcade',
  scheme: 'dark',
  font: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
  fontSize: '0.875rem',
  surface: '#150d2b',
  text: '#f3e8ff',
  mutedText: '#c4b5fd',
  headerSurface: '#241548',
  headerText: '#f3e8ff',
  line: '#0b0618',
  lineWidth: '3px',
  lineStyle: 'solid',
  radius: '0',
  gap: '4px',
  cellPadding: '0.4rem',
  cellShadow: '0 4px 0 #0b0618',
  cellVariant: 'fill',
  emphasis: 'label',
  align: 'center',
  axisCase: 'upper',
  palette: [
    { bg: '#39ff14', fg: '#0b0618' },
    { bg: '#ffe600', fg: '#0b0618' },
    { bg: '#ff9f1c', fg: '#0b0618' },
    { bg: '#ff2079', fg: '#0b0618' },
  ],
  scale: 'tier',
  focus: '#39ff14',
};

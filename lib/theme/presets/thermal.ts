import type { MatrixTheme } from '../types.js';

// A thermal camera: a continuous heatmap by score (indigo → magenta → orange →
// pale yellow) in edge-to-edge cells, with large monospace scores.
export const thermal: MatrixTheme = {
  name: 'Thermal',
  scheme: 'dark',
  font: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
  fontSize: '0.875rem',
  surface: '#0d0221',
  text: '#f4f1ff',
  mutedText: '#b9b3d1',
  headerSurface: '#1a0b3a',
  headerText: '#f4f1ff',
  line: '#0d0221',
  lineWidth: '0',
  lineStyle: 'solid',
  radius: '0',
  gap: '0',
  cellPadding: '0.3rem',
  cellShadow: 'none',
  cellVariant: 'fill',
  emphasis: 'score',
  align: 'center',
  axisCase: 'upper',
  palette: [
    { bg: '#1b0c41', fg: '#ffffff' },
    { bg: '#6a176e', fg: '#ffffff' },
    { bg: '#bc3754', fg: '#ffffff' },
    { bg: '#f37819', fg: '#000000' },
    { bg: '#fcffa4', fg: '#000000' },
  ],
  scale: 'score',
  focus: '#ffd166',
};

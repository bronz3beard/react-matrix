import type { MatrixTheme } from '../types.js';

// Neumorphic: monochrome tiles pressed out of a soft grey surface with paired
// light and dark shadows, and a saturated dot marking each severity.
export const clay: MatrixTheme = {
  name: 'Clay',
  scheme: 'light',
  font: "ui-rounded, 'SF Pro Rounded', Nunito, system-ui, sans-serif",
  fontSize: '0.9375rem',
  surface: '#e6e9ef',
  text: '#2d3142',
  mutedText: '#4f5569',
  headerSurface: '#e6e9ef',
  headerText: '#2d3142',
  line: '#d1d5de',
  lineWidth: '0',
  lineStyle: 'solid',
  radius: '18px',
  gap: '10px',
  cellPadding: '0.5rem',
  cellShadow: '6px 6px 12px #c3c7d0, -6px -6px 12px #ffffff',
  cellVariant: 'dot',
  emphasis: 'label',
  align: 'center',
  axisCase: 'upper',
  palette: [
    { bg: '#067647', fg: '#ffffff' },
    { bg: '#9a6700', fg: '#ffffff' },
    { bg: '#c4320a', fg: '#ffffff' },
    { bg: '#9f1d2c', fg: '#ffffff' },
  ],
  scale: 'tier',
  focus: '#5b5bd6',
};

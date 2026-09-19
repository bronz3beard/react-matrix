import type { MatrixTheme } from '../types.js';

// A technical drawing: blueprint blue, dashed white construction lines and
// monospace labels, with cells outlined in light severity colours.
export const blueprint: MatrixTheme = {
  name: 'Blueprint',
  scheme: 'dark',
  font: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
  fontSize: '0.875rem',
  surface: '#0b3d91',
  text: '#ffffff',
  mutedText: '#cfe0ff',
  headerSurface: '#0d47a1',
  headerText: '#ffffff',
  line: '#e3eeff',
  lineWidth: '1px',
  lineStyle: 'dashed',
  radius: '0',
  gap: '0',
  cellPadding: '0.4rem',
  cellShadow: 'none',
  cellVariant: 'outline',
  emphasis: 'label',
  align: 'center',
  axisCase: 'upper',
  palette: [
    { bg: '#b9f6ca', fg: '#051d4a' },
    { bg: '#fff59d', fg: '#051d4a' },
    { bg: '#ffcc80', fg: '#051d4a' },
    { bg: '#ff8a80', fg: '#051d4a' },
  ],
  scale: 'tier',
  focus: '#ffeb3b',
};

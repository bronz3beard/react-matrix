import type { MatrixTheme } from '../types.js';

// A phosphor terminal: black screen, monospace green text and cells outlined in
// green → amber → orange → red by severity.
export const terminal: MatrixTheme = {
  name: 'Terminal',
  scheme: 'dark',
  font: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
  fontSize: '0.875rem',
  surface: '#050805',
  text: '#33ff66',
  mutedText: '#29cc52',
  headerSurface: '#0a120a',
  headerText: '#33ff66',
  line: '#1a3d1a',
  lineWidth: '0',
  lineStyle: 'solid',
  radius: '0',
  gap: '2px',
  cellPadding: '0.35rem',
  cellShadow: 'none',
  cellVariant: 'outline',
  emphasis: 'label',
  align: 'center',
  axisCase: 'upper',
  palette: [
    { bg: '#33ff66', fg: '#050805' },
    { bg: '#ffb000', fg: '#050805' },
    { bg: '#ff7a1a', fg: '#050805' },
    { bg: '#ff3b3b', fg: '#050805' },
  ],
  scale: 'tier',
  focus: '#ffb000',
};

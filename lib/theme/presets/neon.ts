import type { MatrixTheme } from '../types.js';

// Night-city signage: near-black with softly glowing outlined cells and
// monospace lettering.
export const neon: MatrixTheme = {
  name: 'Neon',
  scheme: 'dark',
  font: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
  fontSize: '0.9375rem',
  surface: '#0a0a12',
  text: '#f5d0fe',
  mutedText: '#e9a8fd',
  headerSurface: '#140b1f',
  headerText: '#f5d0fe',
  line: '#2a1b3d',
  lineWidth: '0',
  lineStyle: 'solid',
  radius: '12px',
  gap: '8px',
  cellPadding: '0.5rem',
  cellShadow: '0 0 14px rgba(236, 72, 153, 0.35)',
  cellVariant: 'outline',
  emphasis: 'label',
  align: 'center',
  axisCase: 'upper',
  palette: [
    { bg: '#22d3ee', fg: '#0a0a12' },
    { bg: '#a3e635', fg: '#0a0a12' },
    { bg: '#fb923c', fg: '#0a0a12' },
    { bg: '#f472b6', fg: '#0a0a12' },
  ],
  scale: 'tier',
  focus: '#22d3ee',
};

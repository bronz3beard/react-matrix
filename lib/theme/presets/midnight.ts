import type { MatrixTheme } from '../types.js';

// Deep navy with jewel-tone cells (emerald, citrine, topaz, garnet) and a
// subtle inner highlight along each cell's top edge.
export const midnight: MatrixTheme = {
  name: 'Midnight',
  scheme: 'dark',
  font: 'system-ui, sans-serif',
  fontSize: '0.9375rem',
  surface: '#0a192f',
  text: '#e2e8f0',
  mutedText: '#94a3b8',
  headerSurface: '#112240',
  headerText: '#ccd6f6',
  line: '#233554',
  lineWidth: '0',
  lineStyle: 'solid',
  radius: '8px',
  gap: '4px',
  cellPadding: '0.4rem',
  cellShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.14)',
  cellVariant: 'fill',
  emphasis: 'label',
  align: 'center',
  axisCase: 'upper',
  palette: [
    { bg: '#047857', fg: '#ffffff' },
    { bg: '#ca8a04', fg: '#0a192f' },
    { bg: '#c2410c', fg: '#ffffff' },
    { bg: '#9f1239', fg: '#ffffff' },
  ],
  scale: 'tier',
  focus: '#64ffda',
};

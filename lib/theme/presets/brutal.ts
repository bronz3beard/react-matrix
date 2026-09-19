import type { MatrixTheme } from '../types.js';

// Neo-brutalist: separate blocks with thick black borders, hard offset
// shadows, flat primary colours and a plain grotesk.
export const brutal: MatrixTheme = {
  name: 'Brutal',
  scheme: 'light',
  font: "'Helvetica Neue', Arial, system-ui, sans-serif",
  fontSize: '1rem',
  surface: '#fffdf5',
  text: '#000000',
  mutedText: '#1a1a1a',
  headerSurface: '#ffffff',
  headerText: '#000000',
  line: '#000000',
  lineWidth: '3px',
  lineStyle: 'solid',
  radius: '0',
  gap: '6px',
  cellPadding: '0.5rem',
  cellShadow: '4px 4px 0 #000000',
  cellVariant: 'fill',
  emphasis: 'label',
  align: 'center',
  axisCase: 'upper',
  palette: [
    { bg: '#a3e635', fg: '#000000' },
    { bg: '#facc15', fg: '#000000' },
    { bg: '#fb923c', fg: '#000000' },
    { bg: '#ef4444', fg: '#000000' },
  ],
  scale: 'tier',
  focus: '#0000ff',
};

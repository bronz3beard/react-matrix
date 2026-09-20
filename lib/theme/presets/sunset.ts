import type { MatrixTheme } from '../types.js';

// Dusk light: a continuous warm wash by score, from sand through apricot and
// coral to deep crimson, on soft rounded cells.
export const sunset: MatrixTheme = {
  name: 'Sunset',
  scheme: 'light',
  font: 'system-ui, sans-serif',
  fontSize: '0.9375rem',
  surface: '#fff7ed',
  text: '#431407',
  mutedText: '#7c2d12',
  headerSurface: '#ffedd5',
  headerText: '#431407',
  line: '#fed7aa',
  lineWidth: '0',
  lineStyle: 'solid',
  radius: '20px',
  gap: '6px',
  cellPadding: '0.5rem',
  cellShadow: 'none',
  cellVariant: 'fill',
  emphasis: 'label',
  align: 'center',
  axisCase: 'upper',
  palette: [
    { bg: '#fde68a', fg: '#431407' },
    { bg: '#fdba74', fg: '#431407' },
    { bg: '#fb7185', fg: '#3f0616' },
    { bg: '#9f1239', fg: '#fff7ed' },
  ],
  scale: 'score',
  focus: '#c2410c',
};

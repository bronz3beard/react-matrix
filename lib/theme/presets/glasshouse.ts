import type { MatrixTheme } from '../types.js';

// Bright and airy: a vivid pastel gradient behind white, rounded cells with
// hairline white edges and soft lift shadows.
export const glasshouse: MatrixTheme = {
  name: 'Glasshouse',
  scheme: 'light',
  font: 'system-ui, sans-serif',
  fontSize: '0.9375rem',
  surface: '#f5f3ff',
  backdrop: 'linear-gradient(135deg, #cffafe 0%, #ede9fe 50%, #fce7f3 100%)',
  text: '#1e1b4b',
  mutedText: '#4c4a6b',
  headerSurface: '#ffffff',
  headerText: '#1e1b4b',
  line: '#ffffff',
  lineWidth: '1px',
  lineStyle: 'solid',
  radius: '16px',
  gap: '8px',
  cellPadding: '0.5rem',
  cellShadow: '0 8px 24px rgba(30, 27, 75, 0.12)',
  cellVariant: 'fill',
  emphasis: 'label',
  align: 'center',
  axisCase: 'upper',
  palette: [
    { bg: '#99f6e4', fg: '#1e1b4b' },
    { bg: '#fde68a', fg: '#1e1b4b' },
    { bg: '#fdba74', fg: '#1e1b4b' },
    { bg: '#be123c', fg: '#ffffff' },
  ],
  scale: 'tier',
  focus: '#4f46e5',
};

import type { MatrixTheme } from '../types.js';

// Northern lights over a night sky: deep indigo with a faint aurora wash,
// luminous teal → violet → magenta cells and a soft glow.
export const aurora: MatrixTheme = {
  name: 'Aurora',
  scheme: 'dark',
  font: "'Avenir Next', 'Segoe UI Variable', system-ui, sans-serif",
  fontSize: '0.9375rem',
  surface: '#0b1026',
  backdrop:
    'radial-gradient(120% 80% at 10% 0%, rgba(45, 212, 191, 0.16), transparent 60%), radial-gradient(90% 70% at 90% 10%, rgba(168, 85, 247, 0.18), transparent 60%)',
  text: '#e6ecff',
  mutedText: '#a9b4d6',
  headerSurface: '#141b3a',
  headerText: '#e6ecff',
  line: '#2a3470',
  lineWidth: '0',
  lineStyle: 'solid',
  radius: '14px',
  gap: '6px',
  cellPadding: '0.5rem',
  cellShadow: '0 0 14px rgba(94, 234, 212, 0.25)',
  cellVariant: 'fill',
  emphasis: 'label',
  align: 'center',
  axisCase: 'upper',
  palette: [
    { bg: '#5eead4', fg: '#04201c' },
    { bg: '#818cf8', fg: '#0b1026' },
    { bg: '#c084fc', fg: '#1a0b2e' },
    { bg: '#e879f9', fg: '#1a0b2e' },
    { bg: '#be185d', fg: '#ffffff' },
  ],
  scale: 'tier',
  focus: '#5eead4',
};

import type { MatrixTheme } from '../types.js';

// Product-dashboard style: plain cells carrying a status pill, the way a SaaS
// table badges its rows.
export const signal: MatrixTheme = {
  name: 'Signal',
  scheme: 'light',
  font: 'system-ui, sans-serif',
  fontSize: '0.875rem',
  surface: '#fafbfc',
  text: '#111827',
  mutedText: '#4b5563',
  headerSurface: '#ffffff',
  headerText: '#111827',
  line: '#e5e7eb',
  lineWidth: '1px',
  lineStyle: 'solid',
  radius: '6px',
  gap: '2px',
  cellPadding: '0.4rem',
  cellShadow: 'none',
  cellVariant: 'chip',
  emphasis: 'label',
  align: 'center',
  axisCase: 'upper',
  palette: [
    { bg: '#dcfce7', fg: '#14532d' },
    { bg: '#fef9c3', fg: '#713f12' },
    { bg: '#ffedd5', fg: '#7c2d12' },
    { bg: '#fee2e2', fg: '#7f1d1d' },
  ],
  scale: 'tier',
  focus: '#2563eb',
};

import type { MatrixTheme } from '../types.js';

// One hue, many depths: severity read purely as depth of blue, shading
// continuously by score from shallow water to deep ocean.
export const tidewater: MatrixTheme = {
  name: 'Tidewater',
  scheme: 'light',
  font: 'system-ui, sans-serif',
  fontSize: '0.9375rem',
  surface: '#f0f9ff',
  text: '#082f49',
  mutedText: '#0c4a6e',
  headerSurface: '#e0f2fe',
  headerText: '#082f49',
  line: '#bae6fd',
  lineWidth: '0',
  lineStyle: 'solid',
  radius: '6px',
  gap: '3px',
  cellPadding: '0.45rem',
  cellShadow: 'none',
  cellVariant: 'fill',
  emphasis: 'label',
  align: 'center',
  axisCase: 'upper',
  palette: [
    { bg: '#bae6fd', fg: '#082f49' },
    { bg: '#7dd3fc', fg: '#082f49' },
    { bg: '#0369a1', fg: '#f0f9ff' },
    { bg: '#082f49', fg: '#f0f9ff' },
  ],
  scale: 'score',
  focus: '#0284c7',
};

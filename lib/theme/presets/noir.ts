import type { MatrixTheme } from '../types.js';

// Black tie: a black card ruled in gold, serif capitals and a restrained
// charcoal-to-oxblood ramp.
export const noir: MatrixTheme = {
  name: 'Noir',
  scheme: 'dark',
  font: "ui-serif, Charter, 'Bitstream Charter', Cambria, Georgia, serif",
  fontSize: '0.9375rem',
  surface: '#0c0c0c',
  text: '#f5e6c8',
  mutedText: '#d8c49a',
  headerSurface: '#141414',
  headerText: '#f5e6c8',
  line: '#c8a44a',
  lineWidth: '1px',
  lineStyle: 'solid',
  radius: '0',
  gap: '2px',
  cellPadding: '0.45rem',
  cellShadow: 'none',
  cellVariant: 'fill',
  emphasis: 'label',
  align: 'center',
  axisCase: 'upper',
  palette: [
    { bg: '#3a3a36', fg: '#f5e6c8' },
    { bg: '#7a6a2f', fg: '#f9f2e2' },
    { bg: '#9a5b1c', fg: '#fdf6ea' },
    { bg: '#7a1f1f', fg: '#f9e6e6' },
  ],
  scale: 'tier',
  focus: '#c8a44a',
};

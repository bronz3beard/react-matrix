import type { MatrixTheme } from '../types.js';

// Forest floor: linen, serif type and leaf-shaped cells (one rounded corner,
// one sharp) in moss, ochre, rust and oxblood.
export const canopy: MatrixTheme = {
  name: 'Canopy',
  scheme: 'light',
  font: "ui-serif, Charter, 'Bitstream Charter', Cambria, Georgia, serif",
  fontSize: '0.9375rem',
  surface: '#f6f4ec',
  text: '#26301f',
  mutedText: '#4a5340',
  headerSurface: '#e9e6d8',
  headerText: '#26301f',
  line: '#cfcbb8',
  lineWidth: '0',
  lineStyle: 'solid',
  radius: '14px 2px',
  gap: '4px',
  cellPadding: '0.45rem',
  cellShadow: 'none',
  cellVariant: 'fill',
  emphasis: 'label',
  align: 'center',
  axisCase: 'upper',
  palette: [
    { bg: '#8fae72', fg: '#12180e' },
    { bg: '#d8b65a', fg: '#12180e' },
    { bg: '#9c4f1c', fg: '#fdfbf4' },
    { bg: '#6d2019', fg: '#fdfbf4' },
  ],
  scale: 'tier',
  focus: '#6d2019',
};

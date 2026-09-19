import type { MatrixTheme } from '../types.js';

// A newspaper's financial pages: newsprint, serif type, hairline rules, no
// gaps, left-aligned figures with large scores and a muted ink ramp.
export const broadsheet: MatrixTheme = {
  name: 'Broadsheet',
  scheme: 'light',
  font: "ui-serif, Charter, 'Bitstream Charter', Cambria, Georgia, serif",
  fontSize: '1rem',
  surface: '#f7f3e8',
  text: '#1c1b17',
  mutedText: '#4d4a42',
  headerSurface: '#efe9d8',
  headerText: '#1c1b17',
  line: '#2b2a26',
  lineWidth: '1px',
  lineStyle: 'solid',
  radius: '0',
  gap: '0',
  cellPadding: '0.35rem 0.5rem',
  cellShadow: 'none',
  cellVariant: 'fill',
  emphasis: 'score',
  align: 'start',
  axisCase: 'upper',
  palette: [
    { bg: '#c9d6c0', fg: '#1c1b17' },
    { bg: '#e0c27a', fg: '#1c1b17' },
    { bg: '#c77b4e', fg: '#1c1b17' },
    { bg: '#8c2f1c', fg: '#f7f3e8' },
  ],
  scale: 'tier',
  focus: '#8c2f1c',
};

import type { MatrixTheme } from '../types.js';

// The 0.4.x look: each value's own data colour, 1px black lines, the browser's
// default 2px table spacing and cell padding, and the host page's font
// (`inherit` is the one deliberate exception to "system font stacks only",
// because the original never set a font).
export const original: MatrixTheme = {
  name: 'Original',
  scheme: 'light',
  font: 'inherit',
  fontSize: 'inherit',
  surface: '#ffffff',
  text: '#000000',
  mutedText: '#000000',
  headerSurface: '#ffffff',
  headerText: '#000000',
  line: '#000000',
  lineWidth: '1px',
  lineStyle: 'solid',
  radius: '0',
  gap: '2px',
  cellPadding: '1px',
  cellShadow: 'none',
  cellVariant: 'fill',
  emphasis: 'label',
  align: 'center',
  axisCase: 'upper',
  scale: 'tier',
  focus: '#000000',
};

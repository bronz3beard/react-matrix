import type { MatrixTheme } from '../../lib';

// Classifies a theme into the 9 design traits used by the uniqueness rule
// (plan §3 / H4): every pair of presets must differ on at least two of them.

export const TRAITS = [
  'scheme',
  'variant',
  'font',
  'shape',
  'spacing',
  'line',
  'emphasis',
  'scale',
  'align',
] as const;

export type Signature = Record<(typeof TRAITS)[number], string>;

const SERIF = ['ui-serif', 'serif', 'charter', 'georgia', 'cambria', 'iowan old style'];
const MONO = ['ui-monospace', 'monospace', 'sf mono', 'menlo', 'consolas'];
const ROUNDED = ['ui-rounded', 'sf pro rounded', 'nunito'];

const firstFamily = (font: string) =>
  font.split(',')[0].trim().replace(/^['"]|['"]$/g, '').toLowerCase();

const fontClass = (font: string) => {
  const family = firstFamily(font);
  if (SERIF.includes(family)) return 'serif';
  if (MONO.includes(family)) return 'mono';
  if (ROUNDED.includes(family)) return 'rounded';
  return 'sans';
};

/** `0` or pixels only, so classification is exact (checked by the preset gate). */
export const isPixelLength = (value: string) => /^(0|\d+(\.\d+)?px)$/.test(value.trim());
const px = (value: string) => Number.parseFloat(value);

const shapeClass = (radius: string) => {
  if (radius.trim().split(/\s+/).length > 1) return 'asymmetric';
  const value = px(radius);
  if (value <= 2) return 'square';
  if (value <= 8) return 'soft';
  if (value >= 999) return 'pill';
  return 'round';
};

const spacingClass = (gap: string) => {
  const value = px(gap);
  if (value === 0) return 'flush';
  return value <= 4 ? 'tight' : 'airy';
};

const lineClass = (theme: MatrixTheme) => {
  const width = px(theme.lineWidth);
  if (width === 0) return 'none';
  if (theme.lineStyle === 'dashed') return 'dashed';
  return width <= 1 ? 'hairline' : 'bold';
};

export const classify = (theme: MatrixTheme): Signature => ({
  scheme: theme.scheme,
  variant: theme.cellVariant,
  font: fontClass(theme.font),
  shape: shapeClass(theme.radius),
  spacing: spacingClass(theme.gap),
  line: lineClass(theme),
  emphasis: theme.emphasis,
  scale: theme.scale,
  align: theme.align,
});

export const distance = (a: Signature, b: Signature) =>
  TRAITS.filter((trait) => a[trait] !== b[trait]).length;

// Pure colour helpers: WCAG contrast, text colour selection, OKLab
// interpolation for continuous (heatmap) scales, and the allowlist that guards
// untrusted data colours before they reach CSS.

type Rgb = readonly [number, number, number]; // gamma-encoded sRGB, 0..1

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

// Throws on malformed input: palettes are developer-authored theme values, so
// a bad one is a programming error to surface immediately.
export const parseHex = (hex: string): Rgb => {
  const match = HEX.exec(hex);
  if (!match) throw new Error(`Expected a #rgb or #rrggbb colour, got "${hex}"`);
  const digits =
    match[1].length === 3 ? [...match[1]].map((d) => d + d).join('') : match[1];
  return [0, 2, 4].map((i) => parseInt(digits.slice(i, i + 2), 16) / 255) as unknown as Rgb;
};

const toHex = (rgb: Rgb): string =>
  `#${rgb
    .map((channel) =>
      Math.round(Math.min(1, Math.max(0, channel)) * 255)
        .toString(16)
        .padStart(2, '0')
    )
    .join('')}`;

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const fromLinear = (c: number) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;

// WCAG 2.2 relative luminance and contrast ratio.
export const relativeLuminance = (hex: string): number => {
  const [r, g, b] = parseHex(hex).map(toLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const contrastRatio = (a: string, b: string): number => {
  const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort(
    (x, y) => y - x
  );
  return (lighter + 0.05) / (darker + 0.05);
};

/** Black or white, whichever contrasts more with `background` (ties → black). */
export const pickText = (background: string): '#000000' | '#ffffff' =>
  contrastRatio(background, '#000000') >= contrastRatio(background, '#ffffff')
    ? '#000000'
    : '#ffffff';

// OKLab (Björn Ottosson) gives perceptually even steps between palette stops.
type Lab = readonly [number, number, number];

const toOklab = (hex: string): Lab => {
  const [r, g, b] = parseHex(hex).map(toLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
};

const fromOklab = ([L, a, b]: Lab): string => {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return toHex(
    [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ].map(fromLinear) as unknown as Rgb
  );
};

const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

/** Colour at position `t` (0..1) along evenly spaced `stops`, mixed in OKLab. */
export const interpolateColour = (stops: readonly string[], t: number): string => {
  if (stops.length === 0) throw new Error('interpolateColour needs at least one stop');
  if (stops.length === 1) return toHex(parseHex(stops[0]));
  const position = Math.min(1, Math.max(0, t)) * (stops.length - 1);
  const index = Math.min(Math.floor(position), stops.length - 2);
  const [from, to] = [toOklab(stops[index]), toOklab(stops[index + 1])];
  const amount = position - index;
  return fromOklab([
    lerp(from[0], to[0], amount),
    lerp(from[1], to[1], amount),
    lerp(from[2], to[2], amount),
  ]);
};

// Allowlist for untrusted colour strings (MatrixValue.colour). Accepts hex,
// a single identifier (named colours; an unknown name is just invalid CSS) or a
// colour function whose arguments are numeric only. Everything else, including
// commas outside parentheses, comments, `url(`, `var(` and `;`, is rejected by
// construction.
const SAFE_HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const SAFE_NAME = /^[a-z]{1,32}$/i;
const SAFE_FUNCTION =
  /^(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\((?:[\d.%+\-/\s,]|none|deg|grad|rad|turn)*\)$/i;

export const isSafeColour = (value: string): boolean =>
  value.length <= 64 &&
  (SAFE_HEX.test(value) || SAFE_NAME.test(value) || SAFE_FUNCTION.test(value));

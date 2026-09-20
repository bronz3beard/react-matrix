import type { CellVariant, MatrixTheme } from '../../lib';

/** The tokens the inspect panel lets a visitor change. A subset of `MatrixTheme`. */
export interface Tweaks {
  radius?: MatrixTheme['radius'];
  gap?: MatrixTheme['gap'];
  cellPadding?: MatrixTheme['cellPadding'];
  cellVariant?: CellVariant;
  emphasis?: MatrixTheme['emphasis'];
}

export type TweakKey = keyof Tweaks;

interface TweakControl {
  key: TweakKey;
  /** Plain words: the token name is shown next to it in the snippet. */
  label: string;
  options: readonly { label: string; value: string }[];
}

// Five controls, chosen because each one visibly changes every design and each
// maps to exactly one token a developer can spread over a preset.
export const TWEAK_CONTROLS: readonly TweakControl[] = [
  {
    key: 'radius',
    label: 'Corners',
    options: [
      { label: 'Square', value: '0' },
      { label: 'Soft', value: '6px' },
      { label: 'Round', value: '14px' },
      { label: 'Pill', value: '999px' },
    ],
  },
  {
    key: 'gap',
    label: 'Gap',
    options: [
      { label: 'None', value: '0' },
      { label: 'Hairline', value: '2px' },
      { label: 'Wide', value: '8px' },
    ],
  },
  {
    key: 'cellPadding',
    label: 'Density',
    options: [
      { label: 'Compact', value: '0.3rem 0.4rem' },
      { label: 'Roomy', value: '1rem 0.9rem' },
    ],
  },
  {
    key: 'cellVariant',
    label: 'Cells',
    options: [
      { label: 'Fill', value: 'fill' },
      { label: 'Outline', value: 'outline' },
      { label: 'Chip', value: 'chip' },
      { label: 'Dot', value: 'dot' },
    ],
  },
  {
    key: 'emphasis',
    label: 'Shows',
    options: [
      { label: 'Label', value: 'label' },
      { label: 'Score', value: 'score' },
    ],
  },
];

/** The preset's own value for a control, so "as it comes" is always selectable. */
export const presetValue = ({ theme, key }: { theme: MatrixTheme; key: TweakKey }): string =>
  theme[key];

/** The theme to render: the preset, with only the tokens the visitor changed. */
export const applyTweaks = ({
  theme,
  tweaks,
}: {
  theme: MatrixTheme;
  tweaks: Tweaks;
}): MatrixTheme => {
  const changed = Object.entries(tweaks).filter(([, value]) => value !== undefined);
  return changed.length === 0 ? theme : { ...theme, ...Object.fromEntries(changed) };
};

/** Copy-pasteable usage for the preset as tweaked. Spread only when tweaked. */
export const themeSnippet = ({ preset, tweaks }: { preset: string; tweaks: Tweaks }): string => {
  const changed = Object.entries(tweaks).filter(([, value]) => value !== undefined);
  const importLine = `import ReactMatrix, { ${preset} } from 'react-data-matrix';`;
  if (changed.length === 0) {
    return `${importLine}\n\n<ReactMatrix data={data} theme={${preset}} />`;
  }
  const overrides = changed.map(([key, value]) => `${key}: '${value}'`).join(', ');
  return `${importLine}\n\n<ReactMatrix\n  data={data}\n  theme={{ ...${preset}, ${overrides} }}\n/>`;
};

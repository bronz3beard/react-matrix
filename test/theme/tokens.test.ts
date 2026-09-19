import { describe, expect, it } from 'vitest';
import { BASE_CSS } from '../../lib/theme/baseCss';
import { original } from '../../lib/theme/presets/original';
import { themeToCssVars, themeToDataAttributes } from '../../lib/theme/tokens';

// Set per cell by the component, not by the theme.
const PER_CELL_VARIABLES = ['--rdm-cell-bg', '--rdm-cell-fg'];

describe('theme tokens', () => {
  it('turns every continuous theme value into a non-empty --rdm-* variable', () => {
    const variables = themeToCssVars(original);

    expect(Object.keys(variables)).toHaveLength(16);
    Object.values(variables).forEach((value) => expect(value).not.toBe(''));
    expect(variables['--rdm-backdrop']).toBe('none');
    expect(themeToCssVars({ ...original, backdrop: 'linear-gradient(#fff, #eee)' })['--rdm-backdrop']).toBe(
      'linear-gradient(#fff, #eee)'
    );
  });

  it('exposes enumerated choices as data attributes for the base stylesheet', () => {
    expect(themeToDataAttributes(original)).toEqual({
      'data-scheme': 'light',
      'data-variant': 'fill',
      'data-emphasis': 'label',
      'data-align': 'center',
      'data-axis-case': 'upper',
    });
  });

  it('only references variables that a theme or a cell actually provides', () => {
    const provided = new Set([...Object.keys(themeToCssVars(original)), ...PER_CELL_VARIABLES]);
    const referenced = new Set([...BASE_CSS.matchAll(/var\((--rdm-[a-z-]+)\)/g)].map((m) => m[1]));

    expect([...referenced].filter((name) => !provided.has(name))).toEqual([]);
  });
});

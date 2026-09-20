import { describe, expect, it } from 'vitest';
import { noir, presets } from '../../lib';
import {
  TWEAK_CONTROLS,
  applyTweaks,
  presetValue,
  themeSnippet,
} from '../../src/gallery/tweaks';

describe('tweaking a preset', () => {
  it('renders the preset itself when nothing has been changed', () => {
    expect(applyTweaks({ theme: noir, tweaks: {} })).toBe(noir);
    expect(applyTweaks({ theme: noir, tweaks: { radius: undefined } })).toBe(noir);
  });

  it('changes only the tokens that were chosen', () => {
    const tweaked = applyTweaks({ theme: noir, tweaks: { radius: '999px', cellVariant: 'dot' } });

    expect(tweaked).toEqual({ ...noir, radius: '999px', cellVariant: 'dot' });
    expect(noir.radius).not.toBe('999px');
  });
});

describe('the snippet a visitor copies', () => {
  it('uses the preset as it comes when nothing has been changed', () => {
    expect(themeSnippet({ preset: 'noir', tweaks: {} })).toBe(
      "import ReactMatrix, { noir } from 'react-data-matrix';\n\n" +
        '<ReactMatrix data={data} theme={noir} />'
    );
  });

  it('spreads the preset and lists every changed token', () => {
    const snippet = themeSnippet({
      preset: 'noir',
      tweaks: { radius: '999px', gap: undefined, cellVariant: 'dot' },
    });

    expect(snippet).toContain("import ReactMatrix, { noir } from 'react-data-matrix';");
    expect(snippet).toContain("theme={{ ...noir, radius: '999px', cellVariant: 'dot' }}");
    expect(snippet).not.toContain('gap');
  });
});

describe('the tweak controls', () => {
  it('offers only values the theme contract accepts', () => {
    const variants = TWEAK_CONTROLS.find((control) => control.key === 'cellVariant')!;
    const emphasis = TWEAK_CONTROLS.find((control) => control.key === 'emphasis')!;

    expect(variants.options.map((option) => option.value)).toEqual([
      'fill',
      'outline',
      'chip',
      'dot',
    ]);
    expect(emphasis.options.map((option) => option.value)).toEqual(['label', 'score']);
  });

  // "As it comes" has to be selectable for every design, or a visitor could not
  // get back to the preset after touching a control.
  it('can report every design’s own value for every control', () => {
    for (const theme of Object.values(presets)) {
      for (const { key } of TWEAK_CONTROLS) {
        expect(presetValue({ theme, key }), `${theme.name}.${key}`).toBe(theme[key]);
      }
    }
  });
});

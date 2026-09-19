import type { MatrixTheme } from './types.js';

export type CssVariables = Record<`--rdm-${string}`, string>;

// Continuous theme values become custom properties on the root element's inline
// style (tweakable per instance via `style={{ '--rdm-radius': '4px' }}`).
export const themeToCssVars = (theme: MatrixTheme): CssVariables => ({
  '--rdm-font': theme.font,
  '--rdm-font-size': theme.fontSize,
  '--rdm-surface': theme.surface,
  '--rdm-backdrop': theme.backdrop ?? 'none',
  '--rdm-text': theme.text,
  '--rdm-muted-text': theme.mutedText,
  '--rdm-header-surface': theme.headerSurface,
  '--rdm-header-text': theme.headerText,
  '--rdm-line': theme.line,
  '--rdm-line-width': theme.lineWidth,
  '--rdm-line-style': theme.lineStyle,
  '--rdm-radius': theme.radius,
  '--rdm-gap': theme.gap,
  '--rdm-cell-padding': theme.cellPadding,
  '--rdm-cell-shadow': theme.cellShadow,
  '--rdm-focus': theme.focus,
});

// Enumerated theme choices select rules in the base stylesheet. `data-palette`
// says whether cell colours come from the consumer's data or the theme's palette.
export const themeToDataAttributes = (theme: MatrixTheme) => ({
  'data-palette': theme.palette && theme.palette.length > 0 ? 'theme' : 'data',
  'data-scheme': theme.scheme,
  'data-variant': theme.cellVariant,
  'data-emphasis': theme.emphasis,
  'data-align': theme.align,
  'data-axis-case': theme.axisCase,
});

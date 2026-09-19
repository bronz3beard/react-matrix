import type { MatrixValue } from '../types/index.js';
import { interpolateColour, isSafeColour, pickText } from './colour.js';
import type { MatrixTheme, SeverityColour } from './types.js';

// Used when a value's own colour fails the allowlist.
export const FALLBACK_CELL_COLOUR = '#d0d0d0';

export interface SeverityScale {
  /** Distinct data colours ranked by their lowest score: 0 = least severe. */
  tiers: ReadonlyMap<string, number>;
  minScore: number;
  maxScore: number;
}

export const createSeverityScale = (values: readonly MatrixValue[]): SeverityScale => {
  const lowestScore = new Map<string, number>();
  for (const { colour, score_value } of values) {
    lowestScore.set(colour, Math.min(lowestScore.get(colour) ?? Infinity, score_value));
  }
  const ranked = [...lowestScore].sort(([, a], [, b]) => a - b);
  const scores = values.map((value) => value.score_value);

  return {
    tiers: new Map(ranked.map(([colour], tier) => [colour, tier])),
    minScore: scores.length > 0 ? Math.min(...scores) : 0,
    maxScore: scores.length > 0 ? Math.max(...scores) : 0,
  };
};

export interface CellColours extends SeverityColour {
  /** Set when the value's own colour failed the allowlist and the fallback was used. */
  rejectedColour?: string;
}

export const cellColours = (
  theme: MatrixTheme,
  { value, scale }: { value: MatrixValue; scale: SeverityScale }
): CellColours => {
  const { palette } = theme;

  if (!palette || palette.length === 0) {
    return isSafeColour(value.colour)
      ? { bg: value.colour, fg: theme.text }
      : { bg: FALLBACK_CELL_COLOUR, fg: theme.text, rejectedColour: value.colour };
  }

  if (theme.scale === 'score') {
    const range = scale.maxScore - scale.minScore;
    const position = range === 0 ? 0 : (value.score_value - scale.minScore) / range;
    const bg = interpolateColour(
      palette.map((step) => step.bg),
      position
    );
    return { bg, fg: pickText(bg) };
  }

  const tierCount = scale.tiers.size;
  const tier = scale.tiers.get(value.colour) ?? 0;
  const position = tierCount <= 1 ? 0 : tier / (tierCount - 1);
  return palette[Math.round(position * (palette.length - 1))];
};

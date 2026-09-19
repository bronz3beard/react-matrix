import type { MatrixTheme } from '../types.js';
import { original } from './original.js';

export { original };

// Every preset by key. Import single presets by name to keep bundles small;
// import `presets` only when you need all of them (e.g. a theme picker).
export const presets = { original } satisfies Record<string, MatrixTheme>;

export type PresetName = keyof typeof presets;

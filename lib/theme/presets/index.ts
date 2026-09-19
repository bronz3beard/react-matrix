import type { MatrixTheme } from '../types.js';
import { aurora } from './aurora.js';
import { blueprint } from './blueprint.js';
import { boardroom } from './boardroom.js';
import { broadsheet } from './broadsheet.js';
import { brutal } from './brutal.js';
import { clay } from './clay.js';
import { glasshouse } from './glasshouse.js';
import { graphite } from './graphite.js';
import { midnight } from './midnight.js';
import { original } from './original.js';
import { sherbet } from './sherbet.js';
import { terminal } from './terminal.js';
import { thermal } from './thermal.js';
import { whitespace } from './whitespace.js';

export {
  aurora,
  blueprint,
  boardroom,
  broadsheet,
  brutal,
  clay,
  glasshouse,
  graphite,
  midnight,
  original,
  sherbet,
  terminal,
  thermal,
  whitespace,
};

// Every preset by key. Import single presets by name to keep bundles small;
// import `presets` only when you need all of them (e.g. a theme picker).
export const presets = {
  original,
  aurora,
  midnight,
  broadsheet,
  brutal,
  glasshouse,
  terminal,
  sherbet,
  graphite,
  blueprint,
  thermal,
  whitespace,
  boardroom,
  clay,
} satisfies Record<string, MatrixTheme>;

export type PresetName = keyof typeof presets;

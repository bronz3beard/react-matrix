import type { MatrixTheme } from '../types.js';
import { arcade } from './arcade.js';
import { aurora } from './aurora.js';
import { beacon } from './beacon.js';
import { blueprint } from './blueprint.js';
import { boardroom } from './boardroom.js';
import { broadsheet } from './broadsheet.js';
import { brutal } from './brutal.js';
import { canopy } from './canopy.js';
import { clay } from './clay.js';
import { contour } from './contour.js';
import { fjord } from './fjord.js';
import { glasshouse } from './glasshouse.js';
import { graphite } from './graphite.js';
import { ledger } from './ledger.js';
import { midnight } from './midnight.js';
import { neon } from './neon.js';
import { noir } from './noir.js';
import { original } from './original.js';
import { sherbet } from './sherbet.js';
import { signal } from './signal.js';
import { sunset } from './sunset.js';
import { swiss } from './swiss.js';
import { terminal } from './terminal.js';
import { thermal } from './thermal.js';
import { tidewater } from './tidewater.js';
import { whitespace } from './whitespace.js';

export {
  arcade,
  aurora,
  beacon,
  blueprint,
  boardroom,
  broadsheet,
  brutal,
  canopy,
  clay,
  contour,
  fjord,
  glasshouse,
  graphite,
  ledger,
  midnight,
  neon,
  noir,
  original,
  sherbet,
  signal,
  sunset,
  swiss,
  terminal,
  thermal,
  tidewater,
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
  arcade,
  sunset,
  tidewater,
  canopy,
  fjord,
  neon,
  ledger,
  contour,
  signal,
  beacon,
  noir,
  swiss,
} satisfies Record<string, MatrixTheme>;

export type PresetName = keyof typeof presets;

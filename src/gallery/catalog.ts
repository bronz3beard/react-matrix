import type { PresetName } from '../../lib';

export const CHARACTERS = [
  'Minimal',
  'Bold',
  'Soft',
  'Technical',
  'Editorial',
  'Playful',
  'Accessible',
  'Data-dense',
] as const;

export type Character = (typeof CHARACTERS)[number];

export interface PresetInfo {
  description: string;
  tags: readonly Character[];
}

// Gallery copy and filter tags for every preset. Typed against the library's
// `presets`, so adding a preset without an entry here fails to compile.
export const catalog: Record<PresetName, PresetInfo> = {
  original: {
    description: 'The 0.4.x look: your own data colours, 1px black lines and the page’s font.',
    tags: ['Minimal'],
  },
  aurora: {
    description: 'Northern lights on a night sky: glowing teal, violet and magenta cells.',
    tags: ['Soft', 'Bold'],
  },
  midnight: {
    description: 'Deep navy with jewel-tone cells and a subtle highlight on each edge.',
    tags: ['Bold'],
  },
  broadsheet: {
    description: 'Newspaper financial pages: serif type, hairline rules and large figures.',
    tags: ['Editorial', 'Data-dense'],
  },
  brutal: {
    description: 'Neo-brutalist blocks with thick borders, hard shadows and flat colour.',
    tags: ['Bold', 'Playful'],
  },
  glasshouse: {
    description: 'Rounded white-edged cells floating over a bright pastel gradient.',
    tags: ['Soft', 'Playful'],
  },
  terminal: {
    description: 'A phosphor terminal: monospace green on black, cells outlined by severity.',
    tags: ['Technical', 'Data-dense'],
  },
  sherbet: {
    description: 'Pill-shaped pastel cells and rounded type on a warm cream background.',
    tags: ['Playful', 'Soft'],
  },
  graphite: {
    description: 'Greyscale only, so it prints and photocopies cleanly; bold scores lead.',
    tags: ['Minimal', 'Accessible'],
  },
  blueprint: {
    description: 'A technical drawing: dashed white lines and outlined cells on blueprint blue.',
    tags: ['Technical'],
  },
  thermal: {
    description: 'A continuous heatmap by score, edge to edge, like a thermal camera.',
    tags: ['Technical', 'Data-dense'],
  },
  whitespace: {
    description: 'Quiet and spacious: faint hairlines and a coloured dot beside each rating.',
    tags: ['Minimal'],
  },
  boardroom: {
    description: 'A board report: navy header band, slate hairlines and left-aligned text.',
    tags: ['Editorial'],
  },
  clay: {
    description: 'Neumorphic tiles pressed out of soft grey, with a dot marking severity.',
    tags: ['Soft', 'Minimal'],
  },
  arcade: {
    description: '8-bit cabinet: chunky pixel borders and neon cells in monospace capitals.',
    tags: ['Playful', 'Bold'],
  },
  sunset: {
    description: 'A continuous warm wash by score, from sand through coral to crimson.',
    tags: ['Soft'],
  },
  tidewater: {
    description: 'One hue, many depths: severity read as depth of blue, shaded by score.',
    tags: ['Minimal', 'Soft'],
  },
  canopy: {
    description: 'Forest floor: linen, serif type and leaf-shaped cells in moss and rust.',
    tags: ['Editorial', 'Soft'],
  },
  fjord: {
    description: 'Nordic dusk: a cool slate surface with a single muted dot per rating.',
    tags: ['Minimal'],
  },
  neon: {
    description: 'Night-city signage: glowing outlined cells and monospace lettering.',
    tags: ['Bold', 'Playful'],
  },
  ledger: {
    description: 'An accounting ledger: tight grid, monospace figures, pale tinted cells.',
    tags: ['Data-dense', 'Editorial'],
  },
  contour: {
    description: 'Line art: cells are drawn, not filled, with matching coloured labels.',
    tags: ['Minimal', 'Technical'],
  },
  signal: {
    description: 'Product dashboard: plain cells carrying a status pill, as a SaaS table would.',
    tags: ['Minimal', 'Data-dense'],
  },
  beacon: {
    description: 'Accessibility first: a colour-blind-safe ramp with AAA contrast throughout.',
    tags: ['Accessible', 'Bold'],
  },
  noir: {
    description: 'Black tie: a black card ruled in gold with serif capitals.',
    tags: ['Editorial', 'Bold'],
  },
  swiss: {
    description: 'International typographic style: a flush grid, red band and leading figures.',
    tags: ['Editorial', 'Data-dense'],
  },
};

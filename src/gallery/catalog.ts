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
};

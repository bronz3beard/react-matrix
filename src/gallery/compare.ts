import { presets, type MatrixData, type PresetName } from '../../lib';
import { data as risk5x5 } from '../data/risk5x5';
import { makeRiskData } from '../data/smaller';

/** More than four panes stop being comparable on any screen. */
export const MAX_COMPARED = 4;
export const SIZES = [3, 4, 5] as const;
export type CompareSize = (typeof SIZES)[number];
const DEFAULT_SIZE: CompareSize = 5;

export interface CompareState {
  names: PresetName[];
  size: CompareSize;
}

// The 5×5 set is the demo data the gallery already shows; the smaller ones are
// generated so the same design can be judged at more than one shape.
export const DATASETS: Record<CompareSize, MatrixData> = {
  3: makeRiskData(3),
  4: makeRiskData(4),
  5: risk5x5,
};

const isPreset = (name: string): name is PresetName => name in presets;

/** Unknown names and sizes from the URL are dropped, never trusted. */
export const readCompare = (search: string): CompareState => {
  const params = new URLSearchParams(search);
  const requested = (params.get('compare') ?? '').split(',').filter(Boolean);
  const size = Number(params.get('size'));
  return {
    names: [...new Set(requested.filter(isPreset))].slice(0, MAX_COMPARED),
    size: SIZES.find((option) => option === size) ?? DEFAULT_SIZE,
  };
};

/** The query string for `state`, keeping unrelated parameters such as filters. */
export const writeCompare = (search: string, state: CompareState): string => {
  const params = new URLSearchParams(search);
  if (state.names.length === 0) params.delete('compare');
  else params.set('compare', state.names.join(','));
  if (state.size === DEFAULT_SIZE) params.delete('size');
  else params.set('size', String(state.size));
  const query = params.toString().replace(/%2C/g, ',');
  return query ? `?${query}` : '';
};

/** Add or remove a design. A full tray refuses new ones rather than evicting. */
export const toggleCompared = ({
  names,
  name,
}: {
  names: PresetName[];
  name: PresetName;
}): PresetName[] => {
  if (names.includes(name)) return names.filter((chosen) => chosen !== name);
  return names.length >= MAX_COMPARED ? names : [...names, name];
};

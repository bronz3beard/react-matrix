import type { MatrixTheme } from '../../lib';
import { CHARACTERS, type Character, type PresetInfo } from './catalog';

export type SchemeFilter = 'all' | MatrixTheme['scheme'];

export interface GalleryFilters {
  scheme: SchemeFilter;
  tags: Character[];
}

export const SCHEMES: readonly SchemeFilter[] = ['all', 'light', 'dark'];

const slug = (character: Character) => character.toLowerCase();

// Filters live in the query string so a filtered gallery can be shared and
// survives a reload. Unknown values from the URL are ignored, never trusted.
export const readFilters = (search: string): GalleryFilters => {
  const params = new URLSearchParams(search);
  const scheme = params.get('scheme');
  const requested = new Set((params.get('tags') ?? '').split(',').filter(Boolean));
  return {
    scheme: SCHEMES.find((option) => option === scheme) ?? 'all',
    tags: CHARACTERS.filter((character) => requested.has(slug(character))),
  };
};

/** The query string for `filters`, keeping unrelated parameters such as `beta`. */
export const writeFilters = (search: string, filters: GalleryFilters): string => {
  const params = new URLSearchParams(search);
  if (filters.scheme === 'all') params.delete('scheme');
  else params.set('scheme', filters.scheme);
  if (filters.tags.length === 0) params.delete('tags');
  else params.set('tags', filters.tags.map(slug).join(','));
  const query = params.toString().replace(/%2C/g, ',');
  return query ? `?${query}` : '';
};

// Shown when the scheme matches and, if any character tags are chosen, the
// preset has at least one of them.
export const matchesFilters = ({
  theme,
  info,
  filters,
}: {
  theme: MatrixTheme;
  info: PresetInfo;
  filters: GalleryFilters;
}): boolean =>
  (filters.scheme === 'all' || theme.scheme === filters.scheme) &&
  (filters.tags.length === 0 || filters.tags.some((tag) => info.tags.includes(tag)));

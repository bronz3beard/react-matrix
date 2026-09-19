import { describe, expect, it } from 'vitest';
import { original, presets } from '../../lib';
import { CHARACTERS, catalog } from '../../src/gallery/catalog';
import { matchesFilters, readFilters, writeFilters } from '../../src/gallery/filters';

describe('gallery filters in the URL', () => {
  it('defaults to every design', () => {
    expect(readFilters('')).toEqual({ scheme: 'all', tags: [] });
  });

  it('reads the scheme and character tags, ignoring unknown values', () => {
    expect(readFilters('?beta=gallery&scheme=dark&tags=bold,unknown,data-dense')).toEqual({
      scheme: 'dark',
      tags: ['Bold', 'Data-dense'],
    });
    expect(readFilters('?scheme=purple').scheme).toBe('all');
  });

  it('writes readable parameters, keeps unrelated ones and drops defaults', () => {
    expect(
      writeFilters('?beta=gallery', { scheme: 'dark', tags: ['Bold', 'Data-dense'] })
    ).toBe('?beta=gallery&scheme=dark&tags=bold,data-dense');
    expect(writeFilters('?beta=gallery&scheme=dark&tags=bold', { scheme: 'all', tags: [] })).toBe(
      '?beta=gallery'
    );
    expect(writeFilters('', { scheme: 'all', tags: [] })).toBe('');
  });

  it('round-trips every filter combination it writes', () => {
    const filters = { scheme: 'light' as const, tags: [...CHARACTERS] };
    expect(readFilters(writeFilters('?beta=gallery', filters))).toEqual(filters);
  });
});

describe('matchesFilters', () => {
  const info = { description: '', tags: ['Bold', 'Technical'] as const };

  it('matches on scheme', () => {
    expect(matchesFilters({ theme: original, info, filters: { scheme: 'light', tags: [] } })).toBe(true);
    expect(matchesFilters({ theme: original, info, filters: { scheme: 'dark', tags: [] } })).toBe(false);
  });

  it('matches when the design has any of the chosen character tags', () => {
    const match = (tags: typeof CHARACTERS[number][]) =>
      matchesFilters({ theme: original, info, filters: { scheme: 'all', tags } });

    expect(match([])).toBe(true);
    expect(match(['Soft', 'Technical'])).toBe(true);
    expect(match(['Soft', 'Playful'])).toBe(false);
  });
});

describe('gallery catalog', () => {
  it('describes and tags every preset the library exports, and nothing else', () => {
    expect(Object.keys(catalog).sort()).toEqual(Object.keys(presets).sort());
    Object.values(catalog).forEach(({ description, tags }) => {
      expect(description.length).toBeGreaterThan(0);
      expect(tags.length).toBeGreaterThan(0);
    });
  });
});

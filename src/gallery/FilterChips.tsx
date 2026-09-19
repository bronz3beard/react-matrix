import { CHARACTERS, type Character } from './catalog';
import { SCHEMES, type GalleryFilters, type SchemeFilter } from './filters';

const SCHEME_LABELS: Record<SchemeFilter, string> = {
  all: 'All',
  light: 'Light',
  dark: 'Dark',
};

interface FilterChipsProps {
  filters: GalleryFilters;
  onChange: (filters: GalleryFilters) => void;
}

// Every option is visible at once (no dropdown). Native radios and checkboxes,
// styled as chips, give keyboard and screen-reader support for free.
const FilterChips = ({ filters, onChange }: FilterChipsProps) => {
  const toggleTag = (tag: Character, checked: boolean) =>
    onChange({
      ...filters,
      tags: CHARACTERS.filter((character) =>
        character === tag ? checked : filters.tags.includes(character)
      ),
    });

  return (
    <form className="filter-chips" aria-label="Filter designs" onSubmit={(event) => event.preventDefault()}>
      <fieldset>
        <legend>Scheme</legend>
        {SCHEMES.map((scheme) => (
          <label key={scheme} className="chip">
            <input
              type="radio"
              name="scheme"
              value={scheme}
              checked={filters.scheme === scheme}
              onChange={() => onChange({ ...filters, scheme })}
            />
            {SCHEME_LABELS[scheme]}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Character</legend>
        {CHARACTERS.map((character) => (
          <label key={character} className="chip">
            <input
              type="checkbox"
              value={character}
              checked={filters.tags.includes(character)}
              onChange={(event) => toggleTag(character, event.target.checked)}
            />
            {character}
          </label>
        ))}
      </fieldset>
    </form>
  );
};

export default FilterChips;

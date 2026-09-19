import { useEffect, useState } from 'react';
import { presets, type MatrixData, type PresetName } from '../../lib';
import { catalog } from './catalog';
import FilterChips from './FilterChips';
import { matchesFilters, readFilters, writeFilters, type GalleryFilters } from './filters';
import PresetCard from './PresetCard';
import './gallery.css';

const NAMES = Object.keys(presets) as PresetName[];

// Every design at once, rendered live with the same data; filters narrow the
// grid instead of hiding designs behind a dropdown.
const Gallery = ({ data }: { data: MatrixData }) => {
  const [filters, setFilters] = useState<GalleryFilters>(() => readFilters(location.search));

  useEffect(() => {
    history.replaceState(
      null,
      '',
      `${location.pathname}${writeFilters(location.search, filters)}${location.hash}`
    );
  }, [filters]);

  const visible = NAMES.filter((name) =>
    matchesFilters({ theme: presets[name], info: catalog[name], filters })
  );

  return (
    <main className="gallery">
      <header>
        <h1>React Data Matrix designs</h1>
        <p>Every built-in design, rendered live with the same risk data.</p>
      </header>
      <FilterChips filters={filters} onChange={setFilters} />
      <p role="status" className="gallery-count">
        Showing {visible.length} of {NAMES.length} designs
      </p>
      {visible.length === 0 ? (
        <p className="gallery-empty">No designs match these filters.</p>
      ) : (
        <ul className="gallery-grid" aria-label="Designs">
          {visible.map((name) => (
            <li key={name}>
              <PresetCard theme={presets[name]} info={catalog[name]} data={data} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Gallery;

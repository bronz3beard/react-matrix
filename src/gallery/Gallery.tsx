import { useEffect, useState } from 'react';
import { presets, type MatrixData, type PresetName } from '../../lib';
import { catalog } from './catalog';
import { readCompare, toggleCompared, writeCompare, type CompareState } from './compare';
import CompareDialog from './CompareDialog';
import CompareTray from './CompareTray';
import FilterChips from './FilterChips';
import { matchesFilters, readFilters, writeFilters, type GalleryFilters } from './filters';
import InspectDialog from './InspectDialog';
import PresetCard from './PresetCard';
import './gallery.css';

const NAMES = Object.keys(presets) as PresetName[];

// Every design at once, rendered live with the same data; filters narrow the
// grid instead of hiding designs behind a dropdown.
const Gallery = ({ data }: { data: MatrixData }) => {
  const [filters, setFilters] = useState<GalleryFilters>(() => readFilters(location.search));
  const [inspected, setInspected] = useState<PresetName | null>(null);
  const [compare, setCompare] = useState<CompareState>(() => readCompare(location.search));
  const [comparing, setComparing] = useState(false);

  // Filters and the compare selection share the query string, so both are
  // written from one place and neither can drop the other's parameters.
  useEffect(() => {
    const search = writeCompare(writeFilters(location.search, filters), compare);
    history.replaceState(null, '', `${location.pathname}${search}${location.hash}`);
  }, [filters, compare]);

  const visible = NAMES.filter((name) =>
    matchesFilters({ theme: presets[name], info: catalog[name], filters })
  );

  return (
    <main className="gallery">
      <header>
        <h1>React Data Matrix designs</h1>
        <p>Every built-in design, rendered live with the same risk data.</p>
        <nav className="gallery-links" aria-label="Project">
          <a href="https://github.com/bronz3beard/react-matrix#readme">Docs</a>
          <a href="https://www.npmjs.com/package/react-data-matrix">npm</a>
          <a href="https://github.com/bronz3beard/react-matrix">GitHub</a>
          <a href="?demo=classic">Cell selection demo</a>
        </nav>
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
              <PresetCard
                theme={presets[name]}
                info={catalog[name]}
                data={data}
                onInspect={() => setInspected(name)}
                compared={compare.names.includes(name)}
                onCompare={() =>
                  setCompare((state) => ({
                    ...state,
                    names: toggleCompared({ names: state.names, name }),
                  }))
                }
              />
            </li>
          ))}
        </ul>
      )}
      <CompareTray
        names={compare.names}
        onRemove={(name) =>
          setCompare((state) => ({
            ...state,
            names: toggleCompared({ names: state.names, name }),
          }))
        }
        onClear={() => setCompare((state) => ({ ...state, names: [] }))}
        onOpen={() => setComparing(true)}
      />
      {comparing && (
        <CompareDialog
          names={compare.names}
          size={compare.size}
          onSize={(size) => setCompare((state) => ({ ...state, size }))}
          onClose={() => setComparing(false)}
        />
      )}
      {inspected && (
        // Remounted per design, so tweaks and the event log start clean.
        <InspectDialog
          key={inspected}
          preset={inspected}
          theme={presets[inspected]}
          info={catalog[inspected]}
          data={data}
          onClose={() => setInspected(null)}
        />
      )}
    </main>
  );
};

export default Gallery;

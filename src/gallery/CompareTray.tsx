import { presets, type PresetName } from '../../lib';
import { MAX_COMPARED } from './compare';

interface CompareTrayProps {
  names: PresetName[];
  onRemove: (name: PresetName) => void;
  onClear: () => void;
  onOpen: () => void;
}

// A sticky bar at the bottom of the screen: on a phone it is the part of the
// window a thumb reaches, and it keeps the chosen designs visible while the
// visitor scrolls the gallery looking for the next one.
const CompareTray = ({ names, onRemove, onClear, onOpen }: CompareTrayProps) => {
  if (names.length === 0) return null;

  return (
    <div className="compare-tray" role="region" aria-label="Designs to compare">
      <ul>
        {names.map((name) => (
          <li key={name}>
            {presets[name].name}
            <button type="button" onClick={() => onRemove(name)}>
              Remove <span className="sr-only">{presets[name].name}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="compare-tray-actions">
        <button type="button" onClick={onClear}>
          Clear
        </button>
        <button type="button" className="compare-open" onClick={onOpen} disabled={names.length < 2}>
          Compare ({names.length})
        </button>
      </div>
      <p role="status">
        {names.length < 2
          ? 'Choose one more design to compare.'
          : `${names.length} of ${MAX_COMPARED} designs chosen.`}
      </p>
    </div>
  );
};

export default CompareTray;

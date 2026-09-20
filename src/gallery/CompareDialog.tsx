import { useEffect, useRef, useState } from 'react';
import ReactMatrix, { presets, type PresetName } from '../../lib';
import { DATASETS, SIZES, type CompareSize } from './compare';

interface CompareDialogProps {
  names: PresetName[];
  size: CompareSize;
  onSize: (size: CompareSize) => void;
  onClose: () => void;
}

// Panes render without `onCellClick`, so comparing two to four designs adds no
// cell tab stops however many panes are open.
const CompareDialog = ({ names, size, onSize, onClose }: CompareDialogProps) => {
  const dialog = useRef<HTMLDialogElement>(null);
  // Phones show the panes as full-width slides; stacking them is the alternative
  // for anyone who would rather scroll down than sideways.
  const [stacked, setStacked] = useState(false);

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  return (
    <dialog
      className={`compare${stacked ? ' is-stacked' : ''}`}
      ref={dialog}
      onClose={onClose}
      aria-label={`Comparing ${names.map((name) => presets[name].name).join(', ')}`}
    >
      <div className="compare-head">
        <h2>Comparing {names.length} designs</h2>
        <fieldset>
          <legend>Matrix size</legend>
          {SIZES.map((option) => (
            <label className="chip" key={option}>
              <input
                type="radio"
                name="compare-size"
                checked={option === size}
                onChange={() => onSize(option)}
              />
              {option}×{option}
            </label>
          ))}
        </fieldset>
        <label className="chip compare-stack">
          <input
            type="checkbox"
            checked={stacked}
            onChange={(event) => setStacked(event.target.checked)}
          />
          Stack
        </label>
        <button type="button" onClick={() => dialog.current?.close()}>
          Close
        </button>
      </div>

      <ul className="compare-panes">
        {names.map((name) => (
          <li key={name}>
            <h3>{presets[name].name}</h3>
            <ReactMatrix
              data={DATASETS[size]}
              theme={presets[name]}
              style={{ '--rdm-font-size': '0.75rem' }}
            />
          </li>
        ))}
      </ul>
    </dialog>
  );
};

export default CompareDialog;

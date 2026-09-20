import { useEffect, useRef, useState } from 'react';
import ReactMatrix, { type MatrixData, type MatrixTheme } from '../../lib';
import type { PresetInfo } from './catalog';
import TweakPanel from './TweakPanel';
import { applyTweaks, type Tweaks } from './tweaks';

interface InspectDialogProps {
  /** The preset's export name, used in the copyable snippet. */
  preset: string;
  theme: MatrixTheme;
  info: PresetInfo;
  data: MatrixData;
  onClose: () => void;
}

const LOG_LIMIT = 5;

interface LoggedClick {
  id: number;
  text: string;
}

// The gallery's previews are plain text; this is the one place a design is
// shown large, tweakable and interactive.
const InspectDialog = ({ preset, theme, info, data, onClose }: InspectDialogProps) => {
  const dialog = useRef<HTMLDialogElement>(null);
  // The log keeps only the last five entries, so its length is not a usable key.
  const nextId = useRef(0);
  const [tweaks, setTweaks] = useState<Tweaks>({});
  const [log, setLog] = useState<LoggedClick[]>([]);

  // `showModal` is what makes Escape, the focus trap and inertness work; it can
  // only be called imperatively, and never during render.
  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  const applied = applyTweaks({ theme, tweaks });

  return (
    <dialog className="inspect" ref={dialog} onClose={onClose} aria-label={`${theme.name} design`}>
      <div className="inspect-head">
        <div>
          <h2>{theme.name}</h2>
          <p>{info.description}</p>
        </div>
        <button type="button" onClick={() => dialog.current?.close()}>
          Close
        </button>
      </div>

      <div className="inspect-body">
        <div className="inspect-preview">
          <ReactMatrix
            data={data}
            theme={applied}
            onCellClick={(cell, { row, column }) =>
              setLog((entries) =>
                [
                  {
                    id: nextId.current++,
                    text: `${row.row_header_title} × ${column.header_title} — ${cell.description} (${cell.score_value})`,
                  },
                  ...entries,
                ].slice(0, LOG_LIMIT)
              )
            }
          />
          <h3>Cell selections</h3>
          <p className="inspect-hint">
            Choose a cell with a pointer, Enter or Space: this is what{' '}
            <code>onCellClick</code> receives.
          </p>
          {/* The live region is this wrapper, so it stays in place while its
              contents change from the empty state to the list. */}
          <div className="inspect-log" aria-live="polite">
            {log.length === 0 ? (
              <p>Nothing chosen yet.</p>
            ) : (
              <ol>
                {log.map((entry) => (
                  <li key={entry.id}>{entry.text}</li>
                ))}
              </ol>
            )}
          </div>
        </div>

        <div className="inspect-side">
          <TweakPanel preset={preset} tweaks={tweaks} onChange={setTweaks} />

          <h3>Tokens</h3>
          <table className="inspect-tokens">
            <caption>Every value in this design, as it is being rendered.</caption>
            <tbody>
              {Object.entries(applied).map(([token, value]) => (
                <tr key={token}>
                  <th scope="row">{token}</th>
                  <td>
                    {Array.isArray(value) ? (
                      <span className="inspect-swatches">
                        {value.map((step: { bg: string; fg: string }) => (
                          <span
                            key={step.bg}
                            style={{ backgroundColor: step.bg, color: step.fg }}
                            title={`${step.fg} on ${step.bg}`}
                          >
                            A
                          </span>
                        ))}
                      </span>
                    ) : (
                      String(value)
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </dialog>
  );
};

export default InspectDialog;

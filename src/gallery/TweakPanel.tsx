import { useEffect, useId, useState } from 'react';
import { TWEAK_CONTROLS, themeSnippet, type TweakKey, type Tweaks } from './tweaks';

interface TweakPanelProps {
  /** The preset's export name, as it appears in the snippet. */
  preset: string;
  tweaks: Tweaks;
  onChange: (tweaks: Tweaks) => void;
}

// Radio groups, not a dropdown: every option is visible, and the snippet below
// is the thing a developer actually takes away.
const TweakPanel = ({ preset, tweaks, onChange }: TweakPanelProps) => {
  const groupId = useId();
  // What was copied, not whether: changing a tweak makes the snippet different
  // from the copied one, so the confirmation stops applying on its own.
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const snippet = themeSnippet({ preset, tweaks });
  const copied = copiedSnippet === snippet;

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopiedSnippet(null), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const choose = ({ key, value }: { key: TweakKey; value: string }) =>
    onChange({ ...tweaks, [key]: value === '' ? undefined : value });

  return (
    <div className="tweak-panel">
      <h3>Tweak it</h3>
      {TWEAK_CONTROLS.map((control) => (
        <fieldset key={control.key}>
          <legend>{control.label}</legend>
          {[{ label: 'As it comes', value: '' }, ...control.options].map((option) => (
            <label className="chip" key={option.value}>
              <input
                type="radio"
                name={`${groupId}-${control.key}`}
                value={option.value}
                checked={(tweaks[control.key] ?? '') === option.value}
                onChange={() => choose({ key: control.key, value: option.value })}
              />
              {option.label}
            </label>
          ))}
        </fieldset>
      ))}

      <h3>Use it</h3>
      <pre className="tweak-snippet">{snippet}</pre>
      <button
        type="button"
        className="tweak-copy"
        onClick={() => {
          // Clipboard access can be refused (permissions, insecure context);
          // the snippet stays selectable either way, so failing is not fatal.
          navigator.clipboard.writeText(snippet).then(
            () => setCopiedSnippet(snippet),
            () => setCopiedSnippet(null)
          );
        }}
      >
        Copy
      </button>
      <span role="status">{copied ? 'Copied' : ''}</span>
    </div>
  );
};

export default TweakPanel;

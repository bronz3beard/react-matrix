import { useId } from 'react';
import ReactMatrix, { type MatrixData, type MatrixTheme } from '../../lib';
import type { PresetInfo } from './catalog';

interface PresetCardProps {
  theme: MatrixTheme;
  info: PresetInfo;
  data: MatrixData;
  onInspect: () => void;
  compared: boolean;
  onCompare: () => void;
}

// A live, non-interactive preview: no `onCellClick`, so the gallery grid adds no
// cell tab stops however many designs it shows.
const PresetCard = ({ theme, info, data, onInspect, compared, onCompare }: PresetCardProps) => {
  const headingId = useId();

  return (
    <article className="preset-card" aria-labelledby={headingId}>
      <h2 id={headingId}>{theme.name}</h2>
      <p>{info.description}</p>
      <ul className="preset-tags" aria-label="Character">
        {info.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <ReactMatrix data={data} theme={theme} style={{ '--rdm-font-size': '0.75rem' }} />
      <div className="preset-actions">
        <button type="button" onClick={onInspect}>
          Inspect <span className="sr-only">{theme.name}</span>
        </button>
        <button type="button" aria-pressed={compared} onClick={onCompare}>
          Compare <span className="sr-only">{theme.name}</span>
        </button>
      </div>
    </article>
  );
};

export default PresetCard;

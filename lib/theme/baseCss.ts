// Structural and interactive rules shared by every theme, rendered by the
// component as one deduplicated <style> (hoisted to <head> on React 19).
// Theme values arrive as --rdm-* custom properties on the root; each cell gets
// --rdm-cell-bg / --rdm-cell-fg from its (allowlisted) severity colour.
//
// Untrusted-data rule: the per-cell variables are only ever used by
// colour-typed properties, never by properties that can fetch resources
// (background, *-image, mask, content, cursor). A test enforces this.
export const BASE_CSS = [
  '.rdm-root{container-type:inline-size;overflow-x:auto;font-family:var(--rdm-font);font-size:var(--rdm-font-size);color:var(--rdm-text);background-color:var(--rdm-surface);background-image:var(--rdm-backdrop)}',
  '.rdm-root[data-scheme=dark]{color-scheme:dark}',
  '.rdm-table{border-collapse:separate;border-spacing:var(--rdm-gap);margin-inline:auto}',
  '.rdm-caption{padding-block:.5rem}',
  '.rdm-axis-title{font-weight:700;padding-block:1rem}',
  '[data-axis-case=upper] .rdm-axis-title{text-transform:uppercase}',
  '.rdm-column-header,.rdm-row-header{background-color:var(--rdm-header-surface);color:var(--rdm-header-text);border:var(--rdm-line-width) var(--rdm-line-style) var(--rdm-line);padding-inline:.5rem}',
  '.rdm-row-header{position:sticky;inset-inline-start:0;z-index:1}',
  '.rdm-subtitle{color:var(--rdm-muted-text);font-size:.9em;font-weight:400}',
  '.rdm-cell{background-color:var(--rdm-cell-bg);color:var(--rdm-cell-fg);border:var(--rdm-line-width) var(--rdm-line-style) var(--rdm-line);border-radius:var(--rdm-radius);box-shadow:var(--rdm-cell-shadow);padding:var(--rdm-cell-padding);text-align:center}',
  '[data-align=start] :is(.rdm-cell,.rdm-column-header,.rdm-row-header){text-align:start}',
  '[data-variant=outline] .rdm-cell{background-color:transparent;color:var(--rdm-text);border-color:var(--rdm-cell-bg);border-width:2px}',
  ':is([data-variant=chip],[data-variant=dot]) .rdm-cell{background-color:transparent;color:var(--rdm-text)}',
  '[data-variant=chip] .rdm-cell-label{display:inline-block;padding:.15em .6em;border-radius:999px;background-color:var(--rdm-cell-bg);color:var(--rdm-cell-fg)}',
  '[data-variant=dot] .rdm-cell-label::before{content:"";display:inline-block;inline-size:.75em;block-size:.75em;margin-inline-end:.4em;border-radius:50%;background-color:var(--rdm-cell-bg)}',
  '[data-emphasis=score] .rdm-cell-score{font-size:1.4em;font-weight:700}',
  '.rdm-cell-button{all:unset;box-sizing:border-box;display:block;inline-size:100%;cursor:pointer;text-align:inherit}',
  '.rdm-cell-button:focus-visible{outline:3px solid var(--rdm-focus);outline-offset:2px}',
  '@media (hover:hover){.rdm-cell:has(.rdm-cell-button):hover{filter:brightness(1.08)}}',
  '@media (prefers-reduced-motion:no-preference){.rdm-cell{transition:filter .15s}}',
  '@container (width < 36rem){.rdm-subtitle{display:none}.rdm-cell{padding:calc(var(--rdm-cell-padding) / 2)}.rdm-axis-title[scope=rowgroup]{writing-mode:vertical-rl;rotate:180deg}}',
  '@media (forced-colors:active){.rdm-cell{border:1px solid CanvasText}.rdm-cell-button:focus-visible{outline-color:Highlight}}',
].join('');

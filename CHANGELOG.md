# Changelog

This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.0.1 — 2026-09-21

### Fixed

- The README carried a note saying the published npm version was still 0.4.x.
  That was true while 1.0 was being prepared and stopped being true the moment
  1.0.0 was published, leaving the note contradicting the page it appeared on.

No code changed: `dist/index.js` is byte-for-byte identical to 1.0.0. A README
correction needs its own version because npm renders the README from the
published tarball, so it cannot be changed in place.

## 1.0.0 — 2026-09-20

The first stable release. 1.0 is a rewrite of the component's styling, packaging
and accessibility. The data shape is unchanged, so existing data works as it is,
but the styling props have been replaced — see **Breaking changes** and the
[migration table](./README.md#migrating-from-04x).

Every built-in design is rendered live at
**<https://bronz3beard.github.io/react-matrix/>**.

### Added

- **26 built-in designs**, one import each: Original plus Aurora, Midnight,
  Broadsheet, Brutal, Glasshouse, Terminal, Sherbet, Graphite, Blueprint,
  Thermal, Whitespace, Boardroom, Clay, Arcade, Sunset, Tidewater, Canopy,
  Fjord, Neon, Ledger, Contour, Signal, Beacon, Noir and Swiss. Beacon meets
  AAA contrast for policies that go beyond AA. Importing one design does not
  ship the other 25.
- **`theme`**, taking a design or a plain object of tokens. Tweak a design by
  spreading it: `{ ...noir, radius: '4px' }`. There is no registry and no
  `extendTheme` helper to learn.
- **`onCellClick(cell, { row, column, event })`**. With a handler, cells are
  native buttons: keyboard-operable, named for screen readers, and activated by
  Enter and Space. Without one they stay plain text and add no tab stops.
- **CSS custom properties** (`--rdm-*`) for per-instance overrides, and
  `data-tier` / `data-row` / `data-col` hooks for styling from your own sheet.
- **`unstyled`**, rendering semantic markup and class names with no design and
  no stylesheet.
- **`nonce`**, for a strict `style-src` Content Security Policy.
- **`styles`**, per-element inline overrides (`root`, `caption`, `table`,
  `axisTitle`, `columnHeader`, `rowHeader`, `cell`).
- Exported types: `MatrixTheme`, `CellVariant`, `SeverityColour`,
  `CellClickContext`, `MatrixSlot`, `MatrixRootStyle` and `PresetName`.

### Changed

- **Ratings are placed by their coordinates**, not by their order in
  `matrix_values`. Reordering the array no longer moves ratings between cells.
- **Any N×N matrix** is supported; `matrix_size` decides the shape. The previous
  build assumed 5×5.
- **Invalid data is reported, not rendered wrongly.** A rating whose coordinates
  match no row or column is skipped and named in `console.error`, as are two
  ratings claiming the same cell.
- **Accessibility.** A real `<caption>`, `scope` on every header, forced-colors
  support, and a matrix that is keyboard-scrollable only while it actually
  overflows. The demo site is checked against WCAG 2.2 A/AA with axe on every
  release.
- **Element ids are unique** per instance, so several matrices can share a page.
- The tooling moved to Vite 8, TypeScript 6, ESLint 10, Vitest 5 and
  Playwright 1.63.

### Removed

- **CommonJS.** The package is ESM-only (`"type": "module"`, one `exports`
  entry, types first).
- **The bundled React.** `react` and `react-dom` are now peer dependencies
  (`^18.3.0 || ^19.0.0`), so a consumer's copy is the only one loaded.
- **All runtime dependencies.** The package declares none, ships no install
  scripts, and contains no `eval`, no `innerHTML` and no `process.env`.
- `alert()` on cell click, `sass`, Font Awesome, and the per-element style props
  listed in the migration table.

### Fixed

- The `types` entry pointed at a file that was not published, so TypeScript
  consumers got no types at all.
- A wide matrix could not be scrolled from the keyboard.
- Axis titles were upper-cased in the text rather than by styling, so the
  accessible name contained shouting.

### Security

- Data-supplied colours are validated against an allow-list before being used,
  so a `colour` value cannot inject arbitrary CSS.
- Published with [provenance](https://docs.npmjs.com/generating-provenance-statements)
  from a trusted publisher: the tarball is attested to this repository, commit
  and workflow. No npm token exists in the repository, and every release is
  approved by a human with 2FA before it reaches the registry.

### Known limitations

- Theme values are trusted CSS written by the developer; only runtime data
  (`MatrixValue.colour`) is treated as untrusted.
- On React 18 a page rendering several matrices repeats the base stylesheet;
  React 19 hoists and deduplicates it.
- The colours in your own data are your responsibility — the contrast gates
  cover the built-in designs, not data-supplied colours.

## 0.4.2 and earlier

See the [commit history](https://github.com/bronz3beard/react-matrix/commits/main).

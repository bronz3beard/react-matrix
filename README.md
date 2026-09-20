# react-data-matrix

A React component for risk matrices and other grids where a value sits at the crossing of two axes — likelihood × consequence, impact × effort, probability × severity.

**[See all 26 designs in the live gallery →](https://bronz3beard.github.io/react-matrix/)**

- **26 ready-made designs**, usable as they are and easy to adjust.
- **Zero runtime dependencies.** React is yours; nothing else ships.
- **~5 kB gzipped** for the component and its default design; about 335 B per extra design, and unused designs are removed by your bundler.
- **Accessible by default:** a real table with captions and header scopes, keyboard-operable cells, keyboard-scrollable on small screens, and contrast-checked designs.
- **Works under a strict Content Security Policy**, verified in Chromium, WebKit and Firefox.
- **React 18.3 and React 19**, including server rendering.

> **Version note.** This README documents the 1.0 API. The published npm version is still 0.4.x; see [Migrating from 0.4.x](#migrating-from-04x).

---

## Install

```bash
npm install react-data-matrix
```

React is a peer dependency:

```json
{ "react": "^18.3.0 || ^19.0.0", "react-dom": "^18.3.0 || ^19.0.0" }
```

The package is ESM-only and ships TypeScript types.

## Quick start

```tsx
import ReactMatrix, { type MatrixData } from 'react-data-matrix';

const data: MatrixData = {
  /* see Data shape below */
};

export function RiskMatrix() {
  return <ReactMatrix data={data} />;
}
```

That renders the **Original** design: your own colours from the data, thin black rules, the page's font.

---

## Choosing a design

Import a design by name and pass it as `theme`:

```tsx
import ReactMatrix, { aurora } from 'react-data-matrix';

<ReactMatrix data={data} theme={aurora} />;
```

Only the designs you import are bundled. To offer a picker, import them all:

```tsx
import ReactMatrix, { presets, type PresetName } from 'react-data-matrix';

const [name, setName] = useState<PresetName>('boardroom');

<>
  <select value={name} onChange={(event) => setName(event.target.value as PresetName)}>
    {Object.entries(presets).map(([key, theme]) => (
      <option key={key} value={key}>
        {theme.name}
      </option>
    ))}
  </select>
  <ReactMatrix data={data} theme={presets[name]} />
</>;
```

### The designs

Browse them live in the **[gallery](https://bronz3beard.github.io/react-matrix/)**, where you can filter by colour scheme and character.

| Design | Look |
| --- | --- |
| `original` | The 0.4.x look: your own data colours, 1px black lines |
| `aurora` | Northern lights on a night sky: glowing teal, violet, magenta |
| `midnight` | Deep navy with jewel-tone cells |
| `broadsheet` | Newspaper financial pages: serif, hairline rules, big figures |
| `brutal` | Neo-brutalist blocks, thick borders, hard shadows |
| `glasshouse` | Rounded white-edged cells over a pastel gradient |
| `terminal` | Phosphor terminal: monospace green on black, outlined cells |
| `sherbet` | Pill-shaped pastel cells, rounded type, cream background |
| `graphite` | Greyscale only, prints and photocopies cleanly |
| `blueprint` | Technical drawing: dashed white lines on blueprint blue |
| `thermal` | Continuous heatmap by score, edge to edge |
| `whitespace` | Quiet and spacious, a coloured dot per rating |
| `boardroom` | Board report: navy header band, left-aligned text |
| `clay` | Neumorphic tiles pressed out of soft grey |
| `arcade` | 8-bit cabinet: pixel borders, neon cells |
| `sunset` | Warm continuous wash by score, sand to crimson |
| `tidewater` | One hue, many depths: severity as depth of blue |
| `canopy` | Forest floor: linen, serif, leaf-shaped cells |
| `fjord` | Nordic dusk: slate surface, muted dots |
| `neon` | Night-city signage: glowing outlined cells |
| `ledger` | Accounting ledger: tight grid, monospace figures |
| `contour` | Line art: cells drawn, not filled |
| `signal` | Product dashboard: status pills |
| `beacon` | Accessibility first: colour-blind-safe, AAA contrast |
| `noir` | Black tie: black card ruled in gold |
| `swiss` | International typographic style: flush grid, red band |

---

## Styling

There are four ways to adjust a design, from smallest to largest change.

### 1. Change one value of a design

Designs are plain objects, so spread and override:

```tsx
<ReactMatrix data={data} theme={{ ...aurora, radius: '4px', gap: '0' }} />
```

### 2. Change one value for one matrix

Every design value is a CSS custom property on the matrix, so `style` can override it per instance:

```tsx
<ReactMatrix data={data} theme={aurora} style={{ '--rdm-radius': '4px' }} />
```

Available variables: `--rdm-font`, `--rdm-font-size`, `--rdm-surface`, `--rdm-backdrop`, `--rdm-text`, `--rdm-muted-text`, `--rdm-header-surface`, `--rdm-header-text`, `--rdm-line`, `--rdm-line-width`, `--rdm-line-style`, `--rdm-radius`, `--rdm-gap`, `--rdm-cell-padding`, `--rdm-cell-shadow`, `--rdm-focus`.

### 3. Style individual elements

`styles` takes inline styles per element, applied after the design:

```tsx
<ReactMatrix
  data={data}
  styles={{
    root: { maxWidth: '60rem' },
    caption: { textAlign: 'start' },
    table: { width: '100%' },
    axisTitle: { letterSpacing: '0.08em' },
    columnHeader: { textTransform: 'none' },
    rowHeader: { minWidth: '9rem' },
    cell: { fontWeight: 700 },
  }}
/>
```

### 4. Write your own design

```tsx
import ReactMatrix, { type MatrixTheme } from 'react-data-matrix';

const house: MatrixTheme = {
  name: 'House style',
  scheme: 'light',
  font: 'Inter, system-ui, sans-serif',
  fontSize: '0.9375rem',
  surface: '#ffffff',
  text: '#111827',
  mutedText: '#4b5563',
  headerSurface: '#f3f4f6',
  headerText: '#111827',
  line: '#d1d5db',
  lineWidth: '1px',
  lineStyle: 'solid',
  radius: '6px',
  gap: '2px',
  cellPadding: '0.5rem',
  cellShadow: 'none',
  cellVariant: 'fill', // 'fill' | 'outline' | 'chip' | 'dot'
  emphasis: 'label', // 'label' | 'score'
  align: 'center', // 'center' | 'start'
  axisCase: 'upper', // 'upper' | 'none'
  scale: 'tier', // 'tier' = one colour per severity tier, 'score' = heatmap
  focus: '#2563eb',
  palette: [
    { bg: '#dcfce7', fg: '#14532d' },
    { bg: '#fef9c3', fg: '#713f12' },
    { bg: '#ffedd5', fg: '#7c2d12' },
    { bg: '#fee2e2', fg: '#7f1d1d' },
  ],
};

<ReactMatrix data={data} theme={house} />;
```

Leave `palette` out to colour cells from your data's own `colour` values, as `original` does.

### 5. Use no built-in styling at all

`unstyled` renders the semantic markup with stable class names and data attributes, and adds no stylesheet and no variables — useful when you own the design system, or under a strict CSP that forbids inline styles during server rendering.

```tsx
<ReactMatrix data={data} unstyled className="my-matrix" />
```

```css
.my-matrix .rdm-cell[data-tier='0'] { background: #dcfce7; }
.my-matrix .rdm-cell[data-tier='3'] { background: #fee2e2; }
.my-matrix .rdm-cell[data-row='A'][data-col='5'] { outline: 2px solid currentColor; }
```

Class names: `rdm-root`, `rdm-caption`, `rdm-table`, `rdm-axis-title`, `rdm-column-header`, `rdm-row-header`, `rdm-subtitle`, `rdm-cell`, `rdm-cell-label`, `rdm-cell-score`, `rdm-cell-button`.
Data attributes: `data-row` (likelihood), `data-col` (consequence), `data-tier` (0 = least severe), plus `data-palette`, `data-scheme`, `data-variant`, `data-emphasis`, `data-align` and `data-axis-case` on the root.

---

## Reacting to a chosen cell

Pass `onCellClick` and each cell becomes a real button: mouse, Enter and Space all work, and each button is named for screen readers, for example "Likelihood Almost Certain, Consequence Catastrophic: extreme (25)".

```tsx
const [selected, setSelected] = useState<MatrixValue | null>(null);

<ReactMatrix
  data={data}
  onCellClick={(cell, { row, column, event }) => {
    setSelected(cell);
    console.log(row.row_header_title, column.header_title, cell.score_value, event.type);
  }}
/>;
```

Without `onCellClick`, cells are plain text with no pointer cursor and no tab stops.

**Safety.** The matrix renders your data as text only, never as HTML, and colour values from your data are checked before they reach CSS; anything unusual falls back to a neutral colour and is reported to the console. Errors thrown inside your handler are not swallowed. If you render values from the handler yourself, treat them as untrusted data as you would anywhere else.

---

## Data shape

```ts
import type { MatrixData } from 'react-data-matrix';

export const data: MatrixData = {
  id: 1,
  matrix_size: 5, // renders a 5×5; 3, 4, 6 … all work
  matrix_name: 'React Matrix', // the table caption
  matrix_description: 'Risk Matrix Template',
  primary_header_title: 'Consequence', // column axis title
  primary_row_header_title: 'Likelihood', // row axis title

  // One entry per row/column pair: entry i defines column i and row i.
  matrix_details: [
    {
      id: 1,
      position: 5,
      matrix_type: 'Risk',
      likelihood: 'E', // row key
      consequence: 1, // column key
      header_title: 'Minor', // column heading
      header_sub_title: 'Header sub-title/description.',
      row_header_title: 'Rare', // row heading
      row_header_sub_title: 'Row Header sub-title/description.',
    },
    // …
  ],

  // The ratings. Each one is placed by its own coordinates.
  matrix_values: [
    {
      id: 26,
      matrix_id: 1,
      description: 'low',
      score_value: 1,
      colour: 'green', // used when the design has no palette
      position: 1,
      likelihood_descriptor: 'E', // matches matrix_details.likelihood
      consequence_descriptor: 1, // matches matrix_details.consequence
      response: 'Business as usual',
    },
    // …
  ],
};
```

- **Order does not matter.** Ratings are placed by their coordinates, not by their position in the array.
- **Any size.** `matrix_size` decides how many rows and columns are shown.
- **Missing ratings** leave an empty cell.
- **Invalid data never crashes the page.** A rating whose coordinates match no row or column is skipped and reported with `console.error`, as are two ratings claiming the same cell.
- `reverseMatrixValues` (default `true`) puts the most likely row at the top.

---

## Recipes

### Next.js

Supported on **Next.js 16 and 15**, App Router and Pages Router. The examples below
were built and run against Next 16.3.5 and 15.5.25 on React 19.

The matrix uses state and effects, so it is a **client component**. That is not the
same as being client-rendered: it still renders on the server, and the prerendered
HTML contains the whole table and the design's stylesheet, so there is no blank
frame before hydration.

#### Fetch on the server, render as a client component (App Router)

The data is a plain object, so it crosses the server/client boundary as a prop. The
click handler is a function, so it cannot — it belongs in the client component.

```tsx
// app/matrix.tsx
'use client';

import { useState } from 'react';
import ReactMatrix, { boardroom, type MatrixData } from 'react-data-matrix';

export default function Matrix({ data }: { data: MatrixData }) {
  const [chosen, setChosen] = useState('Choose a cell.');

  return (
    <>
      <ReactMatrix
        data={data}
        theme={boardroom}
        onCellClick={(cell, { row, column }) =>
          setChosen(`${row.row_header_title} × ${column.header_title}: ${cell.description}`)
        }
      />
      <p role="status">{chosen}</p>
    </>
  );
}
```

```tsx
// app/page.tsx — a Server Component: nothing here reaches the browser
import Matrix from './matrix';

export default async function Page() {
  const data = await getRiskMatrix();
  return <Matrix data={data} />;
}
```

#### Static sites

Nothing about the matrix forces a server. With `output: 'export'` the page is
prerendered at build time and the exported HTML contains the full matrix.

#### Pages Router

The same component, with the router's own data fetching. No extra configuration.

```tsx
// pages/index.tsx
import type { GetServerSideProps } from 'next';
import ReactMatrix, { boardroom, type MatrixData } from 'react-data-matrix';

export const getServerSideProps: GetServerSideProps<{ matrix: MatrixData }> = async () => ({
  props: { matrix: await getRiskMatrix() },
});

export default function Home({ matrix }: { matrix: MatrixData }) {
  return <ReactMatrix data={matrix} theme={boardroom} />;
}
```

#### A strict Content Security Policy

Generate a nonce per request and pass it to the matrix. **Next 16** uses `proxy.ts`;
**Next 15** uses `middleware.ts` with a named `middleware` export — that difference is
Next's own, not this package's.

```ts
// proxy.ts (Next 16) — middleware.ts on Next 15
import { NextResponse, type NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const headers = new Headers(request.headers);
  headers.set('x-nonce', nonce);

  const response = NextResponse.next({ request: { headers } });
  response.headers.set('Content-Security-Policy', `style-src 'nonce-${nonce}'`);
  return response;
}
```

```tsx
// app/page.tsx
import { headers } from 'next/headers';

export default async function Page() {
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  return <Matrix data={await getRiskMatrix()} nonce={nonce} />;
}
```

The page then opts out of static rendering, because it reads a per-request header.

### Server rendering with a strict CSP (other frameworks)

Pass the page's nonce so the matrix's stylesheet is allowed:

```tsx
<ReactMatrix data={data} theme={aurora} nonce={nonce} />
```

On **React 19**, server rendering also needs the same nonce as a render option, because React manages the hoisted stylesheet:

```ts
renderToPipeableStream(<App />, { nonce: { style: nonce } });
```

Client-rendered apps need only the `nonce` prop: the matrix applies its design through the CSSOM, which a `style-src` policy does not restrict. Alternatively use `unstyled` and bring your own stylesheet.

### Several matrices on one page

Render as many as you like; on React 19 they share a single stylesheet, hoisted into `<head>` and loaded once.

```tsx
<>
  <ReactMatrix data={corporate} theme={boardroom} />
  <ReactMatrix data={project} theme={boardroom} />
</>
```

### Following the operating system's dark mode

```tsx
import ReactMatrix, { whitespace, midnight } from 'react-data-matrix';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

<ReactMatrix data={data} theme={prefersDark ? midnight : whitespace} />;
```

### A smaller matrix

```tsx
<ReactMatrix data={{ ...data, matrix_size: 3 }} />
```

---

## Accessibility

- A real `<table>` with a `<caption>`, column and row header scopes, and axis titles spanning their group.
- With `onCellClick`, cells are native buttons: reachable by keyboard, activated by Enter or Space, and named by row, column and rating.
- A matrix wider than its container scrolls inside itself, and becomes a keyboard-scrollable labelled region only while it overflows, so it never adds needless tab stops.
- Sub-titles hide and padding tightens automatically in narrow containers.
- Every built-in design is contrast-checked; `beacon` targets AAA with a colour-blind-safe palette; `graphite` works in greyscale and print.
- High-contrast mode (`forced-colors`) keeps cell borders and focus rings visible.
- **Your data's own colours are your responsibility.** With designs that have no palette (such as `original`), cell colours come from your data and may not meet contrast requirements; use a palette design, or choose accessible colours.

## Package facts

| | |
| --- | --- |
| Format | ESM only |
| Runtime dependencies | none |
| Peer dependencies | react, react-dom (`^18.3` or `^19`) |
| Types | included |
| Size | ~5 kB gzipped with one design; ~8 kB with all 26 |
| Contents | the built module, its types, the readme and the licence |

## Migrating from 0.4.x

The 1.0 API replaces per-element style props with designs.

| 0.4.x | 1.0 |
| --- | --- |
| `hasInlineStyles={false}` | `unstyled` |
| `hasTableBorder`, `hasContainerStyles` | design values, or `styles.table` / `styles.root` |
| `tableContainerStyles` | `styles.root` |
| `tableStyles` | `styles.table` |
| `thRowStyles`, `thTitleStyles`, `thSubTitleStyles`, `thPrimaryTitleStyles` | `styles.columnHeader`, `styles.axisTitle` |
| `trRowStyles`, `trTitleStyles`, `trSubTitleStyles`, `trPrimaryTitleStyles` | `styles.rowHeader`, `styles.axisTitle` |
| `tdStyles` | `styles.cell` |
| `rowPrimaryUpper`, `headerPrimaryUpper` | design value `axisCase` |
| `customHeaderRowIdValue` and the other `custom*IdValue` props | `rdm-*` class names and `data-row` / `data-col` / `data-tier` |
| `matrixSizeSelected` | removed; use `data.matrix_size` |
| clicking a cell showed an `alert()` | `onCellClick`, or nothing at all |

Also new in 1.0: `react` and `react-dom` are declared peer dependencies, the package is ESM-only, and the exported types include `MatrixTheme`, `CellClickContext`, `MatrixSlot` and `PresetName`.

## Contributing

```bash
npm ci
npm run dev            # demo site
npm test               # unit tests
npm run test:e2e:docker # browser tests in the pinned Playwright image
npm run lint && npm run typecheck && npm run build && npm run check:package
```

Pull request guidance is in [docs/pull_request_template.md](docs/pull_request_template.md).

## Licence

MIT © [bronz3beard](https://www.heyrory.com/)

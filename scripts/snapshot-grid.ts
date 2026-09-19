// Records the pre-1.0 rendering as a coordinate projection: the characterisation
// oracle for the 1.0 refactor. It must run on the pre-upgrade toolchain
// (React 18.2 + the esbuild that Vite 4 installs):
//
//   NODE_PATH=node_modules node_modules/.bin/esbuild scripts/snapshot-grid.ts \
//     --bundle --platform=node --format=cjs \
//     --outfile=node_modules/.cache/snap.cjs \
//   && node node_modules/.cache/snap.cjs > test/fixtures/grid-5x5.pre-1.0.json
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMatrix from '../lib';
import { data } from '../src/data/risk5x5';
import { projectGrid, type CellRole, type TableRow } from '../test/projectGrid';

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
};

const decode = (text: string): string =>
  text.replace(/&amp;|&lt;|&gt;|&quot;|&#x27;/g, (entity) => ENTITIES[entity]);

const roleOf = ({
  tag,
  attributes,
  inHead,
}: {
  tag: string;
  attributes: string;
  inHead: boolean;
}): CellRole => {
  if (tag === 'td') return 'cell';
  if (attributes.includes('scope="row"')) return 'rowheader';
  if (attributes.includes('scope="col"') || inHead) return 'columnheader';
  throw new Error(`Cannot infer the role of <th${attributes}> outside <thead>`);
};

const html = renderToStaticMarkup(createElement(ReactMatrix, { data }));
const headStart = html.indexOf('<thead');
const headEnd = html.indexOf('</thead>');

const rows: TableRow[] = [...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)].map(
  (row) => {
    const inHead = (row.index ?? -1) > headStart && (row.index ?? -1) < headEnd;
    return [...row[1].matchAll(/<(th|td)\b([^>]*)>([\s\S]*?)<\/\1>/g)].map(
      ([, tag, attributes, inner]) => ({
        role: roleOf({ tag, attributes, inHead }),
        textParts: inner.split(/<[^>]+>/).map(decode),
      })
    );
  }
);

console.log(JSON.stringify(projectGrid(rows), null, 2));

import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ReactMatrix from '../lib';
import { data } from '../lib/utils/data';
import oracle from './fixtures/grid-5x5.pre-1.0.json';
import { projectGrid, type CellRole, type TableRow } from './projectGrid';

const ROLES: CellRole[] = ['columnheader', 'rowheader', 'cell'];

const textParts = (element: Element): string[] => {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const parts: string[] = [];
  while (walker.nextNode()) parts.push(walker.currentNode.nodeValue ?? '');
  return parts;
};

const byDocumentOrder = (a: { element: Element }, b: { element: Element }) =>
  a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING
    ? -1
    : 1;

const readTable = (): TableRow[] =>
  screen.getAllByRole('row').map((row) =>
    ROLES.flatMap((role) =>
      within(row)
        .queryAllByRole(role)
        .map((element) => ({ element, role }))
    )
      .sort(byDocumentOrder)
      .map(({ element, role }) => ({ role, textParts: textParts(element) }))
  );

describe('characterisation against the 0.4.x rendering', () => {
  it('places every rating at the same likelihood and consequence as 0.4.x', () => {
    render(<ReactMatrix data={data} />);

    expect(projectGrid(readTable())).toEqual(oracle);
  });
});

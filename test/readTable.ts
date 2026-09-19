import { screen, within } from '@testing-library/react';
import type { CellRole, TableRow } from './projectGrid';

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

// Reads the rendered table by ARIA role (not by ids or classes), in document
// order, into the model that projectGrid() understands.
export const readTable = (): TableRow[] =>
  screen.getAllByRole('row').map((row) =>
    ROLES.flatMap((role) =>
      within(row)
        .queryAllByRole(role)
        .map((element) => ({ element, role }))
    )
      .sort(byDocumentOrder)
      .map(({ element, role }) => ({ role, textParts: textParts(element) }))
  );

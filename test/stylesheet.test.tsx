import { render } from '@testing-library/react';
import { version as reactVersion } from 'react';
import { expect, it } from 'vitest';
import ReactMatrix from '../lib';
import { data } from '../lib/utils/data';

// Its own file on purpose: Vitest gives every test file a fresh document, and
// React 19 keeps a hoisted stylesheet in <head> for the document's lifetime,
// deduplicated by href. This must be the first matrix rendered in this document.
it('renders the base stylesheet with the nonce: once per page on React 19, in place on React 18', () => {
  render(
    <>
      <ReactMatrix data={data} nonce="n0nce" />
      <ReactMatrix data={data} nonce="n0nce" />
    </>
  );
  const sheets = [...document.querySelectorAll('style')];

  sheets.forEach((sheet) => expect(sheet.getAttribute('nonce')).toBe('n0nce'));
  if (Number(reactVersion.split('.')[0]) >= 19) {
    expect(sheets).toHaveLength(1);
    expect(sheets[0].parentElement).toBe(document.head);
  } else {
    expect(sheets).toHaveLength(2);
    sheets.forEach((sheet) => expect(sheet.closest('.rdm-root')).not.toBeNull());
  }
});

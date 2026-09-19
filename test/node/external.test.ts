// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { EXTERNAL_PACKAGES } from '../../vite.lib.config';

describe('library externals', () => {
  it.each(['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client'])(
    'keeps %s out of the bundle',
    (id) => {
      expect(EXTERNAL_PACKAGES.test(id)).toBe(true);
    }
  );

  it.each(['reactive', 'react-foo', 'preact', './react'])(
    'treats %s as an ordinary module',
    (id) => {
      expect(EXTERNAL_PACKAGES.test(id)).toBe(false);
    }
  );
});

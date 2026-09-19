import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Testing Library only auto-cleans when test globals are enabled; this project
// keeps explicit imports, so unmount every render after each test here.
afterEach(() => {
  cleanup();
});

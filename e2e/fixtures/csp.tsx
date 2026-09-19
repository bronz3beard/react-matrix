import { createRoot } from 'react-dom/client';
import ReactMatrix, { original, type MatrixTheme } from '../../lib';
import { data } from '../../src/data/risk5x5';

// Test-only page: a palette theme under a strict CSP (see csp.html). With
// `?nonce=none` the matrix renders without the nonce: the negative control that
// proves the policy is really enforced.
const nonce =
  new URLSearchParams(location.search).get('nonce') === 'none' ? undefined : 'e2e-nonce';

const theme: MatrixTheme = {
  ...original,
  name: 'CSP fixture',
  palette: [
    { bg: '#1b5e20', fg: '#ffffff' },
    { bg: '#f9a825', fg: '#000000' },
    { bg: '#ef6c00', fg: '#000000' },
    { bg: '#b71c1c', fg: '#ffffff' },
  ],
};

createRoot(document.getElementById('root')!).render(
  <ReactMatrix data={data} theme={theme} nonce={nonce} />
);

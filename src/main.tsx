import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { data } from './data/risk5x5';
import Gallery from './gallery/Gallery';

// The gallery is the demo site: it shows every design live. The single-matrix
// page (which demonstrates cell selection) stays at ?demo=classic.
const classic = new URLSearchParams(location.search).get('demo') === 'classic';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {classic ? <App data={data} /> : <Gallery data={data} />}
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { data } from './data/risk5x5';
import Gallery from './gallery/Gallery';

// Dark release: the new preset gallery ships behind `?beta=gallery` until it is
// complete; everyone else still sees the current demo page.
const showGallery = new URLSearchParams(location.search).get('beta') === 'gallery';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {showGallery ? <Gallery data={data} /> : <App data={data} />}
  </React.StrictMode>
);

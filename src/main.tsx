import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { data } from '../lib/utils/data';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App data={data} />
  </React.StrictMode>
);

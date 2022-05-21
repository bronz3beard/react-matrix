import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import { data } from "./lib/utils/data";
import App from "./App";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <App data={data} />
  </StrictMode>,
);


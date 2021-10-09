import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { data } from "./lib/utils/data";
import App from "./App";

ReactDOM.render(
  <StrictMode>
    <App data={data} />
  </StrictMode>,
  document.getElementById("root")
);

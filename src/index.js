import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { data } from "./lib/utils/data";
import ReactMatrix from "./ReactMatrix";

ReactDOM.render(
  <StrictMode>
    <ReactMatrix />
  </StrictMode>,
  document.getElementById("root")
);

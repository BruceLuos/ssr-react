import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

ReactDOM.hydrateRoot(
  document.querySelector("#root"),
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

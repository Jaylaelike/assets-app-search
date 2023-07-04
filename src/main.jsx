import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import "./App.css";

import InjectTailwind from "./InjectTailwind";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <InjectTailwind>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </InjectTailwind>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider , QueryClient } from "react-query";

import "./App.css";

import InjectTailwind from "./InjectTailwind";
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <InjectTailwind>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </InjectTailwind>
    </QueryClientProvider>
  </React.StrictMode>
);

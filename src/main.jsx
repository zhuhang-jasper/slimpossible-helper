import React from "react";
import ReactDOM from "react-dom/client";

import { initAnalytics } from "./utils/analytics.js";
import App from "./App.jsx";

import "./index.css";

initAnalytics();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

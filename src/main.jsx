import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Buffer } from "buffer";
import process from "process";
window.global = window;
window.process = process;
window.Buffer = Buffer;

import { Amplify } from "aws-amplify";
import amplifyConfig from "../aws-exports.js";

Amplify.configure(amplifyConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

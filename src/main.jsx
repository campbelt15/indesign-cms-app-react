import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

import { Amplify } from "aws-amplify";
import amplifyConfig from "../aws-exports.js";

// Polyfills requeridos por Amplify Gen 1
import { Buffer } from "buffer";
import process from "process";
window.global = window;
window.process = process;
window.Buffer = Buffer;

Amplify.configure(amplifyConfig);

import { AuthProvider } from "./auth/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);

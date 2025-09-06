import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { Toaster } from "@/components/ui/sonner";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <App />
    <Toaster closeButton richColors />
  </>,
);

postMessage({ payload: "removeLoading" }, "*");

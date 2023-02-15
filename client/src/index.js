import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalContextProvider from "./Contexts/GlobalContext";
import SocketContextProvider from "./Contexts/SocketContext";
import { Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </GlobalContextProvider>
  </React.StrictMode>
);

reportWebVitals();

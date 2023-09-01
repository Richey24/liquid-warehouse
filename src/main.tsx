import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./bootstrap/css/bootstrap.min.css";
import "./assets/layouts/horizontal-light-menu/css/light/plugins.css";
import "./index.css";
import $ from "jquery";
(window as any).$ = (window as any).jQuery = $;
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
     <React.StrictMode>
          <BrowserRouter>
               <App />
               <ToastContainer />
          </BrowserRouter>
     </React.StrictMode>,
);

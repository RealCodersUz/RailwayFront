/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:1111";

// axios.defaults.baseURL = "https://railwayback.up.railway.app";

// axios.defaults.headers.common["Content-Type"] = "application/json";
// let token = localStorage.getItem("token");
// if (token) axios.defaults.headers.common["x-auth-token"] = token;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer theme="colored" />
    </BrowserRouter>
  </React.StrictMode>
);

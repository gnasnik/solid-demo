import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "~/components/root/App";
import "@arco-design/web-react/dist/css/arco.css";


const container = document.getElementById('root')!; 
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

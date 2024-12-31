import React from "react";
import ReactDOM from "react-dom/client";  // For React 18 and later
import App from "./App";  // Import your main app component
import "./index.css";  // Import global styles if you have them

// Create root and render App into it (React 18 and later)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

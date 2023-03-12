import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextWrapper from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextWrapper>
        <ErrorBoundary fallback={<p className="error-message">There was an error</p>}>
          <App />
        </ErrorBoundary>
      </AuthContextWrapper>
    </BrowserRouter>
  </React.StrictMode>
);

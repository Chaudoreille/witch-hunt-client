import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextWrapper from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import SoundManagerContextWrapper from "./context/SoundManagerContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextWrapper>
        <SoundManagerContextWrapper>
          <ErrorBoundary
            fallback={<p className="error-message">There was an error</p>}
          >
            <App />
          </ErrorBoundary>
        </SoundManagerContextWrapper>
      </AuthContextWrapper>
    </BrowserRouter>
  </React.StrictMode>
);

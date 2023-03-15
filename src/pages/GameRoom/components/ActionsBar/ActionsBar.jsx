import React from "react";
import "./ActionsBar.css";

function ActionsBar({ children }) {
  return (
    <nav className="ActionsBar">
      {children}
    </nav>
  );
}

export default ActionsBar;

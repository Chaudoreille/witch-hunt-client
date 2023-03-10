import React from "react";
import "./Button.css";

function Button({ type, variant, action, children }) {
  return (
    <button type={type} className={`Button ${variant}`} onClick={action} >{children}</button>
  );
}

export default Button;
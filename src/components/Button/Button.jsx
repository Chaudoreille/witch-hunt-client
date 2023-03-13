import React from "react";
import "./Button.css";

function Button({ type, className, variant, action, children }) {
  return (
    <button type={type} className={`Button ${variant} ${className}`} onClick={action} >{children}</button>
  );
}

export default Button;
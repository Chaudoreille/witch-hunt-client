import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

function Button({children}) {
  return (
        <>
        <button type="button">{children}</button>
        </>
      
  )
}


export default Button;
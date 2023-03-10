import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

function Button({ children, variant, link }) {
  return (
    <>
      <Link className={variant} to={link}>{children}</Link>
    </>

  )
}


export default Button;
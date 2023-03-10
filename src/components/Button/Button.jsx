import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

function Button({ children, variant, link }) {
  return (
    <>
      <a className={variant} href={link}>{children}</a>
    </>

  )
}


export default Button;
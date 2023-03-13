import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

function ButtonLink({ className, children, variant, link }) {
  return (
    <Link className={`Button ${variant} ${className}`} to={link}>{children}</Link>
  );
}

export default ButtonLink;
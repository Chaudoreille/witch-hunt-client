import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

function ButtonLink({ children, variant, link }) {
  return (
    <Link className={`Button ${variant}`} to={link}>{children}</Link>
  );
}

export default ButtonLink;
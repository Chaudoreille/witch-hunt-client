import React from "react";
import "./Input.css";

function Input({ type, name, action, className, label, value, placeholder, min }) {
  const options = {
    id: name,
    type: type,
    placeholder: placeholder,
    onChange: action,
  };

  if (type === "checkbox") {
    options.checked = value;
  } else {
    options.value = value;
  }

  if (type === "number") {
    options.min = min;
  }

  return (
    <div className={`Input ${className}`}>
      <label htmlFor={name}>{label}</label>
      <input {...options} />
    </div>
  );
}

export default Input;

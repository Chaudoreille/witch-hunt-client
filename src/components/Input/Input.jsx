import React from "react";
import "./Input.css";

function Input({ type, name, action, className, label, value, placeholder }) {
    return (
        <div className={`Input ${className}`}>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={action}
            />
        </div>
    )
}


export default Input;




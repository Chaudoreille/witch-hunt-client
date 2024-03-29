import React from "react";
import "./Toggle.css";

function Toggle({ toggle, optionLeft, optionRight, label, onChangeLeft, onChangeRight }) {

  return (

    <div className="input-toggle Toggle">
      <label>{label}</label>
      <div className="toggle">
        <input
          checked={toggle}
          type="radio"
          id="toggle-left"
          name="toggle"
          onChange={onChangeLeft}
        />
        <label className="radio-button" htmlFor="toggle-left">
          {optionLeft}
        </label>

        <input
          checked={!toggle}
          type="radio"
          id="toggle-right"
          name="toggle"
          onChange={onChangeRight}
        />
        <label className="radio-button" htmlFor="toggle-right">
          {optionRight}
        </label>
      </div>
    </div>
  )

}

export default Toggle;

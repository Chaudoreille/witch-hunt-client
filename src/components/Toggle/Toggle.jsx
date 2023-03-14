import React from "react";
import "./Toggle.css";

function Toggle({ obj, action }) {

  return (

    <div className="input-toggle">
      <label>Visibility</label>
      <div className="visib-toggle">
        <input
          checked={obj.isPublished}
          type="radio"
          id="visib-toggle-public"
          name="visib"
          value={obj.isPublished}
          onChange={(event) => {
            action({ isPublished: event.target.checked });
          }}
        ></input>
        <label className="radio-button" htmlFor="visib-toggle-public">
          Public
        </label>

        <input
          checked={!obj.isPublished}
          type="radio"
          id="visib-toggle-private"
          name="visib"
          value={!obj.isPublished}
          onChange={(event) => {
            action({ isPublished: !event.target.checked });
          }}
        ></input>
        <label className="radio-button" htmlFor="visib-toggle-private">
          Private
        </label>
      </div>
    </div>
  )

}

export default Toggle;

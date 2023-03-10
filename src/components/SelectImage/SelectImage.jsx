import React from "react";
import "./SelectImage.css";
import Button from "../Button/Button";

function FileSelect({
  handleFileSelect,
  cancel,
  submit,
}) {
  return (
    <form className="FileSelect" onSubmit={submit.action}>
      <div>
        <label htmlFor="image">
          Profile Picture
          <input type="file" id="image" onChange={handleFileSelect} />
        </label>
      </div>
      <Button type="submit" action={submit.action} variant="primary" >
        {submit.label || "Submit"}
      </Button>
      {cancel && (
        <Button action={cancel.action} variant="secondary">
          {cancel.label}
        </Button>
      )}
    </form>
  );
}

export default FileSelect;

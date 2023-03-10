import React from "react";
import "./SignupFileSelect.css";

function SignupFileSelect({
  handleFileSelect,
  cancel,
  submit,
}) {
  return (
    <>
      <form className="SignupFileSelect" onSubmit={submit.action}>
        <div>
          <label htmlFor="image">
            Profile Picture
            <input type="file" id="image" onChange={handleFileSelect} />
          </label>
        </div>
        <button type="submit">{submit.label || "Submit"}</button>
        {cancel && (
          <button type="button" onClick={cancel.action}>
            {cancel.label}
          </button>

        )}
      </form>
    </>
  );
}

export default SignupFileSelect;

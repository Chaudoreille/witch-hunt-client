import React from "react";
import "./SignupFileSelect.css";

function SignupFileSelect({
  username,
  handleFileSubmit,
  handleFileSelect,
  handleGoBack,
}) {
  return (
    <>
      <h4>Welcome {username}</h4>
      <div>Select a profile picture: </div>
      <form className="SignupFileSelect" onSubmit={handleFileSubmit}>
        <div>
          <label htmlFor="image">
            Profile Picture
            <input type="file" id="image" onChange={handleFileSelect} />
          </label>
        </div>
        <button type="submit">Create Account</button>
        <button type="button" onClick={handleGoBack}>
          Back
        </button>
      </form>
    </>
  );
}

export default SignupFileSelect;

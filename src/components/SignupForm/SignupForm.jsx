import React from "react";
import "./SignupForm.css";

function SignupForm({ handleChange, handleSubmit, user, errors }) {
  return (
    <form className="SignupForm" onSubmit={handleSubmit}>
      <div className={errors.includes("username") ? "input-error" : ""}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          name="username"
          onChange={handleChange}
          value={user.username}
        />
      </div>
      <div className={errors.includes("email") ? "input-error" : ""}>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="text"
          name="email"
          onChange={handleChange}
          value={user.email}
        />
      </div>
      <div className={errors.includes("password") ? "input-error" : ""}>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          value={user.password}
        />
      </div>
      <div className={errors.includes("confirmation") ? "input-error" : ""}>
        <label htmlFor="password">Password (Repeat):</label>
        <input
          id="confirmation"
          type="password"
          name="password"
          onChange={handleChange}
          value={user.confirmation}
        />
      </div>
      <button>Next</button>
    </form>
  );
}

export default SignupForm;

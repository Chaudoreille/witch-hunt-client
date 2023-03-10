import React from "react";
import "./SignupForm.css";
import Input from "../Input/Input";
import Button from "../Button/Button"
import { Link } from "react-router-dom";

function SignupForm({ handleChange, handleSubmit, user, errors }) {
  return (
    <form className="SignupForm Form" onSubmit={handleSubmit}>

      <Input type="username"
        name="username"
        action={handleChange}
        className={errors.includes("username") ? "input-error" : ""}
        label="Username"
        value={user.username}
        placeholder="A funny username"
      />
      <Input type="email"
        name="email"
        action={handleChange}
        className={errors.includes("email") ? "input-error" : ""}
        label="Email"
        value={user.email}
        placeholder="A real email"
      />
      <Input type="password"
        name="password"
        action={handleChange}
        className={errors.includes("password") ? "input-error" : ""}
        label="Password"
        value={user.password}
        placeholder="A strong password"
      />
      <Input type="password"
        name="confirmation"
        action={handleChange}
        className={errors.includes("confirmation") ? "input-error" : ""}
        label="Repeat password"
        value={user.confirmation}
        placeholder="Your password, again"
      />
      <Button type="submit" variant={"secondary"} >Next</Button>
      <div className="form-small-link">
        <Link to="/login">You already have an account ?</Link>
      </div>
    </form>
  );
}

export default SignupForm;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupFileSelect from "../../components/SignupFileSelect/SignupFileSelect";
import SignupForm from "../../components/SignupForm/SignupForm";
import api from "../../service/service";

const errorsFieldToMessage = {
  username: "Please enter a username!",
  email: "Please enter a valid email address!",
  password: "Please enter a password!",
  confirmation: "Your password and password confirmation need to be identical!",
};

function Signup() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmation: "",
    email: "",
    image: null,
  });
  const [displayForm, setDisplayForm] = useState(true);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function updateForm(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }

  function handleFormSubmit(event) {
    const { username, email, password, confirmation } = user;

    event.preventDefault();
    const errors = [];
    if (!username.length) errors.push("username");
    if (!password.length) errors.push("password");
    if (password !== confirmation) errors.push("confirmation");

    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegExp.test(email)) errors.push("email");
    if (errors.length) {
      setErrors(errors);
      return;
    }
    setDisplayForm(false);
    setErrors([]);
  }

  async function handleFileSubmit(event) {
    event.preventDefault();

    // To upload file, we have to dress up the entered data as FormData
    const form = new FormData();
    form.append("username", user.username);
    form.append("email", user.email);
    form.append("password", user.password);
    if (user.image) form.append("image", user.image);

    const signupResult = await api.signupUser(user);
    if (!signupResult.errors) return navigate("/");
    setDisplayForm(true);
    setErrors(signupResult.errors);
  }

  function handleFileSelect(event) {
    setUser({ ...user, [event.target.id]: event.target.files[0] });
  }

  function handleGoBack() {
    setDisplayForm(true);
    setErrors([]);
  }

  return (
    <div>
      {errors.length > 0 && (
        <div>
          Errors:{" "}
          {errors.map((error) => (
            <li>{errorsFieldToMessage[error]}</li>
          ))}
        </div>
      )}
      {displayForm ? (
        <SignupForm
          handleChange={updateForm}
          handleSubmit={handleFormSubmit}
          user={user}
          errors={errors}
        />
      ) : (
        <SignupFileSelect
          username={user.username}
          image={user.image}
          handleFileSubmit={handleFileSubmit}
          handleFileSelect={handleFileSelect}
          handleGoBack={handleGoBack}
        />
      )}
      <div>
        <Link to="/login">Already have an account?</Link>
      </div>
    </div>
  );
}

export default Signup;

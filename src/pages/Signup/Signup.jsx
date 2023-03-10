import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SelectImage from "../../components/SelectImage/SelectImage";
import SignupForm from "../../components/SignupForm/SignupForm";
import api from "../../service/service";

const errorsFieldToMessage = {
  username: "Please enter a username!",
  email: "Please enter a valid email address!",
  password: "Please enter a password!",
  confirmation: "Your password and password confirmation need to be identical!",
};

/**
 * Signup Page
 * Will display the form for user registration, divided in two parts
 * At first it will show the form for user data, after data is entered
 * the user can switch to next page, showing the option for a profile picture
 * @returns
 */
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
    setUser(userState => ({ ...userState, [event.target.id]: event.target.value }));
  }

  /**
   * Event Handler that will handle the first form submission
   * validates the entered data, and depending on result either
   * displays error messages or switches over to the second form
   * @param {Event} event
   * @returns
   */
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

  /**
   * Event Handler that will handle the second form submission
   * Creates a FormData object with the entered information and
   * uses the api to send that to the backend for user account creation
   * @param {Event} event
   * @returns
   */
  async function handleFileSubmit(event) {
    event.preventDefault();

    // To upload file, we have to dress up the entered data as FormData
    const form = new FormData();
    form.append("username", user.username);
    form.append("email", user.email);
    form.append("password", user.password);
    if (user.image) form.append("image", user.image);

    const signupResult = await api.signup(user);
    if (!signupResult.errors) return navigate("/login");
    setDisplayForm(true);
    setErrors(signupResult.errors);
  }

  /**
   * Event Handler that triggers whenever a file is selected in the file input
   * @param {Event} event
   */
  function handleFileSelect(event) {
    setUser(userState => ({ ...userState, [event.target.id]: event.target.files[0] }));
  }

  /**
   * Event Handler that allows the user to move from the second form back to first one
   */
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
        <>
          <h4>Welcome {user.username}</h4>
          <div>Select a profile picture: </div>
          {user.image && (
            <div>
              <img src={user.image} alt="" />
            </div>
          )}
          <SelectImage
            handleFileSelect={handleFileSelect}
            cancel={{ label: "Back", action: handleGoBack }}
            submit={{ label: "Create Account", action: handleFileSubmit }}
          />
        </>
      )}
      <div>
        <Link to="/login">Already have an account?</Link>
      </div>
    </div>
  );
}

export default Signup;

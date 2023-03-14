import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SelectImage from "../../components/SelectImage/SelectImage";
import SignupForm from "../../components/SignupForm/SignupForm";
import api from "../../service/service";
import "./Signup.css";
import Error from "../../components/ErrorList/ErrorList";



/**
 * Signup Page
 * Will display the form for user registration, divided in two parts
 * At first it will show the form for user data, after data is entered
 * the user can switch to next page, showing the option for a profile picture
 * @returns
 */
function Signup() {
  const [displayForm, setDisplayForm] = useState(true);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmation: "",
    email: "",
    image: null,
  });
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
    event.preventDefault();
    const newErrors = {};
    const { username, email, password, confirmation } = user;

    setErrors({});
    if (!username.length) newErrors.username = { message: "Please enter a username!" };
    if (!password.length) newErrors.password = { message: "Please enter a password!" };
    if (password !== confirmation) newErrors.confirmation = { message: "Your passwords are not identical!" };

    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegExp.test(email)) newErrors.email = { message: "Please enter a valid email address!" };

    if (Object.values(newErrors).length) {
      setErrors(newErrors);
      return;
    } else {
      setDisplayForm(false);
    }
  }

  const displayErrors = () => {
    if (!Object.values(errors).length) return;

    return (
      <Error messages={Object.values(errors).map(error => error.message)} />
    );
  };


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
  function handleImageSelect(image) {
    setUser(userState => ({ ...userState, "image": image }));
  }

  /**
   * Event Handler that allows the user to move from the second form back to first one
   */
  function handleGoBack() {
    setDisplayForm(true);
    setErrors({});
  }



  return (
    <section className="flex-center-section image-select">
      <div className="window-center-grey">
        <img src="images/witch-run_logo.png" id="img-signup" />


        {displayErrors()}
        {displayForm ? (
          <SignupForm
            handleChange={updateForm}
            handleSubmit={handleFormSubmit}
            user={user}
            errors={errors}
          />
        ) : (
          <>
            <h4>Welcome @{user.username}</h4>
            <SelectImage
              updateImage={handleImageSelect}
              cancel={{ label: "Back", action: handleGoBack }}
              submit={{ label: "Create account", action: handleFileSubmit }}
            />
          </>
        )}

      </div>
    </section>
  );
}

export default Signup;

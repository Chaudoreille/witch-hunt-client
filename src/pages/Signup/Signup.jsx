import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SelectImage from "../../components/SelectImage/SelectImage";
import SignupForm from "../../components/SignupForm/SignupForm";
import api from "../../service/service";
import "./Signup.css"


const errorsFieldToMessage = {
  username: "Please enter a username!",
  email: "Please enter a valid email address!",
  password: "Please enter a password!",
  confirmation: "Your passwords are not identical!",
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

  function handleAvatar(event) {
    const newImage = `https://api.dicebear.com/5.x/bottts/svg?seed=${user.email}${event.target.value}`
    setUser(userState => ({ ...userState, image: newImage }));
  }


  return (
    <section className="flex-center-section image-select">

      <div className="window-center-grey">
        <img src="images/witch-run_logo.png" id="img-signup" />

        {errors.length > 0 && (
          <ul>
            {errors.map((error) => (
              <li className="error-message">{errorsFieldToMessage[error]}</li>
            ))}
          </ul>
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

            <h4>Welcome @{user.username}</h4>
            <h3>Choose your favorite avatar</h3>


            <div className="random-avatars" onChange={handleAvatar}>
              <div className="avatar">
                <input
                  type="radio" name="avatar" value="0" className="input-hidden" />
                <label htmlFor="avatar0">
                  <img
                    src={`https://api.dicebear.com/5.x/bottts/svg?seed=${user.email}${Math.random()}
  `}
                    alt="avatar" />
                </label>
              </div>
              <div className="avatar">
                <input
                  type="radio" name="avatar" value="1" className="input-hidden" />
                <label htmlFor="avatar1">
                  <img
                    src={`https://api.dicebear.com/5.x/bottts/svg?seed=${user.email}1
  `}
                    alt="avatar" />
                </label>
              </div>
              <div className="avatar">
                <input
                  type="radio" name="avatar" value="2" className="input-hidden" />
                <label htmlFor="avatar2">
                  <img
                    src={`https://api.dicebear.com/5.x/bottts/svg?seed=${user.email}2
  `}
                    alt="avatar" />
                </label>
              </div>
              <div className="avatar">
                <input
                  type="radio" name="avatar" value="3" className="input-hidden" />
                <label htmlFor="avatar3">
                  <img
                    src={`https://api.dicebear.com/5.x/bottts/svg?seed=${user.email}3
  `}
                    alt="avatar" />
                </label>
              </div>
              <div className="avatar">
                <input
                  type="radio" name="avatar" value="4" className="input-hidden" />
                <label htmlFor="avatar4">
                  <img
                    src={`https://api.dicebear.com/5.x/bottts/svg?seed=${user.email}4
  `}
                    alt="avatar" />
                </label>
              </div>
              <div className="avatar">
                <input
                  type="radio" name="avatar" value="5" className="input-hidden" />
                <label htmlFor="avatar5">
                  <img
                    src={`https://api.dicebear.com/5.x/bottts/svg?seed=${user.email}5
  `}
                    alt="avatar" />
                </label>
              </div>
              <div className="avatar">
                <input
                  type="radio" name="avatar" value="6" className="input-hidden" />
                <label htmlFor="avatar6">
                  <img
                    src={`https://api.dicebear.com/5.x/bottts/svg?seed=${user.email}6
  `}
                    alt="avatar" />
                </label>
              </div>
              <div className="avatar">
                <input
                  type="radio" name="avatar" value="7" className="input-hidden" />
                <label htmlFor="avatar7">
                  <img
                    src={`https://api.dicebear.com/5.x/bottts/svg?seed=${user.email}7
  `}
                    alt="avatar" />
                </label>
              </div>



            </div>



            <h3>or</h3>




            <SelectImage
              handleFileSelect={handleFileSelect}
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

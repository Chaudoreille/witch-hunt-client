import { useState, useContext } from "react";
import api from "../../service/service";
import { AuthContext } from "../../context/AuthContext";
import "./Profile.css";

/**
 * Profile Page
 * Displays the user info
 * @returns
 */
function EditProfileInfo({ setEdit }) {
  const { user, setUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState();

  console.log(user);

  return (
    <div className="EditProfileInfo">
      <div className="text-wrapper">
        <div className="username-wrapper">
          <label>Username</label>
          <span>{user.username}</span>
        </div>
        <div className="email-wrapper">
          <label>Email</label>
          <span>{user.email}</span>
        </div>
      </div>
      <div className="btn-wrapper">
        <button onClick={() => sendForm(true)}>Edit</button>
      </div>
    </div>
  );
}

export default EditProfileInfo;

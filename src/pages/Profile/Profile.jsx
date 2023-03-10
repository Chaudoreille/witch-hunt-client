import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../service/service";
import EditProfileInfo from "./EditProfileInfo";
import SelectImage from "../../components/SelectImage/SelectImage";
import Button from "../../components/Button/Button";
import "./Profile.css";

/**
 * Profile Page
 * Displays the user info
 * @returns
 */
function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const [edit, setEdit] = useState(null);

  function selectedImage(event) {
    setUserInfo({ ...userInfo, image: event.target.files[0] });
  }

  async function submitImage(event) {
    event.preventDefault();

    // To upload file, we have to dress up the entered data as FormData
    const form = new FormData();
    if (userInfo.image) form.append("image", userInfo.image);

    const response = await api.updateProfile(form);

    setUser(response.data);

    // if (!signupResult.errors) return 
    setEdit();
  }

  return (
    <div className="Profile">
      {edit === "image" ? (
        <SelectImage
          handleFileSelect={selectedImage}
          cancel={{
            label: "Cancel",
            action: () => setEdit()
          }}
          submit={{
            label: "Change profile picture",
            action: submitImage
          }}
        />
      ) : (
        <div className="profile-pic-wrapper">
          <div className="image-wrapper">
            <img src={user.image} alt="avatar" />
          </div>
          <Button action={() => setEdit("image")}>Edit</Button>
        </div>
      )}

      {edit === "info" ? (
        <EditProfileInfo setEdit />
      ) : (
        <div className="user-info-wrapper">
          <div className="username-wrapper">
            <label>Username</label>
            <span>{user.username}</span>
          </div>
          <div className="email-wrapper">
            <label>Email</label>
            <span>{user.email}</span>
          </div>
          <Button action={() => setEdit("info")}>Edit</Button>
        </div>
      )}
    </div >
  );
}

export default Profile;

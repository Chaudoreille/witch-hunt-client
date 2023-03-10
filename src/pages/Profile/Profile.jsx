import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../service/service";
import EditProfileInfo from "./EditProfileInfo";
import SelectImage from "../../components/SelectImage/SelectImage";
import Input from "../../components/Input/Input";
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

  function updateInput(event) {
    const field = event.target.name;
    const value = event.target.value;
    setUserInfo(info => ({ ...info, [field]: value }));
  }

  async function submitUser(event) {
    event.preventDefault();

    // To upload file, we have to dress up the entered data as FormData
    const form = new FormData();
    for (key in userInfo) {
      if (userInfo[key]) form.append(key, userInfo[key]);
    }
    const response = await api.updateProfile(form);

    if (response.status === 400) {
      // message: "Invalid email address"
      return;
    }

    if (response.status === 401) {
      // message: "Invalid password"
      return;
    }

    setUser(response.data);
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
            action: submitUser
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
        <form action="">
          <Input
            type="text"
            name="username"
            action={updateInput}
            label="Username"
            value={userInfo.username}
            placeholder="Username"
          />
          <Input
            type="email"
            name="email"
            action={updateInput}
            label="Email"
            value={userInfo.email}
            placeholder="Email"
          />
          <Input
            type="password"
            name="password"
            action={updateInput}
            label="Password"
            value={userInfo.password}
            placeholder="*********"
          />
          <Input
            type="password"
            name="newPassword"
            action={updateInput}
            label="New Password"
            value={userInfo.newPassword}
            placeholder="*********"
          />
          <Input
            type="password"
            name="repeatPassword"
            action={updateInput}
            label="Repeat Password"
            value={userInfo.repeatPassword}
            placeholder="*********"
          />
        </form>
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

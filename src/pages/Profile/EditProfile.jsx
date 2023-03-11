import React, { useState, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import api from "../../service/service";

import SelectImage from "../../components/SelectImage/SelectImage";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Error from "../../components/Error/Error";

import "./Profile.css";


const EditProfile = ({ mode, setMode }) => {
  const { user, setUser } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    username: user.username,
    email: user.email
  });

  const discardChanges = () => {
    setUserData({ username: user.username, email: user.email });
    setMode(null);
    setErrors({});
  };

  const handleChange = (event) => {
    const { id, value } = event.target;

    setUserData(data => ({ ...data, [id]: value }));
  };

  const handleImageChange = (event) => {
    setUserData(data => ({ ...data, image: event.target.files[0] }));
  };

  const validateData = () => {
    // To upload file, we have to dress up the entered data as FormData
    const form = new FormData();

    form.append("password", userData.password);

    if (userData.image) {
      form.append("image", userData.image);
    }

    if (userData.username) {
      form.append("username", userData.username);
    }

    if (userData.email && userData.email !== user.email) {
      form.append("email", userData.email);
    }

    if (userData.newPassword) {
      if (userData.newPassword === userData.repeatPassword) {
        form.append("newPassword", userData.newPassword);
      } else {
        setErrors(err => ({
          ...err,
          newPassword: "Passwords do not match",
          repeatPassword: ""
        }));
        return;
      }
    }

    setErrors({});

    return form;
  };

  const submitUser = async (event) => {
    event.preventDefault();

    const formData = validateData();
    if (!formData) return;

    api.updateProfile(formData)
      .then(response => {
        setUser(response.data);
        setMode(null);
      })
      .catch(error => {
        if (error.response.status === 400) {
          setErrors(err => ({
            ...err,
            email: error.response.data.message,
          }));
        }

        if (error.response.status === 401) {
          setErrors(err => ({
            ...err,
            password: error.response.data.message,
          }));
        }
      });
  };

  if (mode === "image") {
    return (
      <div className="EditProfile">
        <SelectImage handleFileSelect={handleImageChange}
          cancel={{
            label: "Cancel",
            action: discardChanges
          }}
          submit={{
            label: "Save",
            action: submitUser
          }}
        />
      </div>
    );
  }

  const displayErrors = () => {
    if (!Object.keys(errors).length) return;

    return (
      <Error>
        {Object.values(errors).map(message => (
          <p className="error-message">{message}</p>
        ))}
      </Error>
    );
  };

  return (
    <form className='EditProfile' onSubmit={submitUser}>
      {displayErrors()}
      <Input
        type="text" name="username" label="Username" placeholder="Username"
        action={handleChange} value={userData.username}
      />

      <Input
        type="email" name="email" label="Email" placeholder="Email"
        action={handleChange} value={userData.email}
      />

      <Input type="password" name="password" label="Password" placeholder="*********"
        action={handleChange} value={userData.password}
      />

      <Input type="password" name="newPassword" label="New Password" placeholder="*********"
        action={handleChange} value={userData.newPassword}
      />

      <Input type="password" name="repeatPassword" label="Repeat Password" placeholder="*********"
        action={handleChange} value={userData.repeatPassword}
      />

      <div className="btn-container">
        <Button type="submit" variant="primary">Save</Button>
        <Button type="button" variant="secondary" action={discardChanges}>Cancel</Button>
      </div>
    </form>
  );
};

export default EditProfile;
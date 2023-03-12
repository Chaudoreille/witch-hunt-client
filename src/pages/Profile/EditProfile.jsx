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

  const handleChange = (event) => {
    const { id, value } = event.target;

    setUserData(data => ({ ...data, [id]: value }));
  };

  const handleImageChange = (image) => {
    setUserData(data => ({ ...data, "image": image }));
  };

  const discardChanges = () => {
    setUserData({ username: user.username, email: user.email });
    setMode(null);
    setErrors({});
  };

  const validateData = () => {
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    // To upload file, we have to dress up the entered data as FormData
    const form = new FormData();
    const errors = {};

    // clear error state
    setErrors({});

    if (userData.image) {
      form.append("image", userData.image);
    }
    if (userData.username) {
      form.append("username", userData.username);
    }
    if (userData.password) {
      form.append("password", userData.password);
    }
    if (userData.email && userData.email !== user.email) {
      if (!emailRegExp.test(userData.email)) {
        errors.email = { message: "Invalid email address" };
      }
      if (!userData.password) {
        errors.password = { message: "Please enter your password to change your email or password" };
      }
      form.append("email", userData.email);
    }
    if (userData.newPassword) {
      if (userData.newPassword !== userData.repeatPassword) {
        errors.repeatPassword = {};
        errors.newPassword = { message: "Passwords do not match" };
      }
      if (!userData.password) {
        errors.password = { message: "Please enter your password to change your email or password" };
      }
      form.append("newPassword", userData.newPassword);
    }

    if (Object.keys(errors).length) {
      setErrors(() => errors);
      return;
    }
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
          setErrors(err => ({ ...err, email: { message: error.response.data.message } }));
        }

        if (error.response.status === 401) {
          setErrors(err => ({ ...err, password: { message: error.response.data.message } }));
        }
      });
  };

  const displayErrors = () => {
    if (!Object.values(errors).length) return;

    return (
      <Error>
        {Object.values(errors).map(error => (
          error.message && <p className="error-message">{error.message}</p>
        ))}
      </Error>
    );
  };

  if (mode === "image") {
    return (
      <div className="EditProfile">
        <SelectImage updateImage={handleImageChange}
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
  } else {
    return (
      <>
        <h3>User Information</h3>
        <form className='EditProfile' onSubmit={submitUser}>
          {displayErrors()}
          <Input
            type="text" name="username" label="Username" placeholder="Username"
            action={handleChange} value={userData.username}
          />

          <Input
            type="email" name="email" label="Email" placeholder="Email"
            action={handleChange} value={userData.email}
            className={errors.email && "input-error"}
          />

          <Input type="password" name="password" label="Password" placeholder="*********"
            action={handleChange} value={userData.password}
            className={errors.password && "input-error"}
          />

          <Input type="password" name="newPassword" label="New Password" placeholder="*********"
            action={handleChange} value={userData.newPassword}
            className={errors.newPassword && "input-error"}
          />

          <Input type="password" name="repeatPassword" label="Repeat Password" placeholder="*********"
            action={handleChange} value={userData.repeatPassword}
            className={errors.repeatPassword && "input-error"}
          />

          <div className="btn-container">
            <Button type="submit" variant="primary">Save</Button>
            <Button type="button" variant="secondary" action={discardChanges}>Cancel</Button>
          </div>
        </form>
      </>
    );
  }
};

export default EditProfile;
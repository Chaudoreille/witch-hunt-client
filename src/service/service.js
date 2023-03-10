import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: BACKEND_URL,
});

/**
 * Signup - receives an object with the user information as FormData
 * Contacts the signup route on the server and submits the
 * FormData for the user to be created and file to be uploaded
 */
api.signupUser = async function signupUser(userFormData) {
  try {
    const response = await api.post("/auth/signup", userFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) return {};
  } catch (error) {
    if (error.response.data.message === "Invalid email address")
      return { errors: ["email"], messages: [error.response.data.message] };
    return { errors: error.response.data.missingFields };
  }
};

/**
 * login - receives an object with the user information as FormData
 */
api.login = async function (user) {
  return api.post("/auth/login", user);
};

export default api;

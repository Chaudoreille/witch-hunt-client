import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: BACKEND_URL,
});

api.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  request.headers.Authorization = token ? `Bearer ${token}` : null;

  return request;
});

/**
 * Signup - receives an object with the user information as FormData
 * Contacts the signup route on the server and submits the
 * FormData for the user to be created and file to be uploaded
 */
api.signup = async function (userFormData) {
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

/**
 * getUser - gets the currentUSer based on authentication token
 */
api.user = async function () {
  return api.get("/auth/me");
};


// Game Room Routes

api.getRooms = async function () {
  const response = await api.get('/api/game-rooms')
  return response.data;
}

export default api;

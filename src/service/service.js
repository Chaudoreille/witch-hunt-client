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
    return { errors: error.response.data };
  };
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
api.user = function () {
  return api.get("/auth/me");
};

/**
 * invalidEmail - checks if email adress is valid and available
 */
api.invalidEmail = function (email) {
  return api.get(`/auth/valid-email/${email}`)
    .then(() => false)
    .catch(error => {
      return error.response.data;
    });
};

// Game Room Routes

/**
 * Retreives a list of all gamerooms, or a single room if a pin is specified in the query
 * 
 * @returns Array of GameRooms || single GameRoom, if query included a pin
 */
api.getRooms = async function (query) {
  let url = '/api/game-rooms';
  if (query) {
    let count = 0;
    url += '?';
    for (let key in query) {
      if (count > 0) url += '&';
      url += `${key}=${query[key]}`;
      count++;
    }
  }
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    if (error.response) throw Error(error.response.data.message);
    throw Error(error.message);
  }
};

/**
 * Creates a new game room on the server. Returns the created GameRoom
 * @param {GameRoom} room 
 * @returns 
 */
api.createRoom = async function (room) {
  try {
    const response = await api.post('/api/game-rooms', room);
    return response.data;
  } catch (error) {
    if (error.response) throw Error(error.response.data.message);
    throw Error('Error when trying to create gameroom:', error.message);
  }
};

/**
 * Retreives information about the specified room
 * @param {ObjectId} roomId 
 * @returns GameRoom
 */
api.getRoom = async function (roomId) {
  try {
    const response = await api.get(`/api/game-rooms/${roomId}`);
    return response.data;
  } catch (error) {
    if (error.response) throw Error(error.response.data.message);
    throw Error('Error when trying to retreive gameroom data:', error.message);
  }
};

/**
 * Updates a GameRoom, returns updated room
 * @param {ObjectId} roomId 
 * @param {GameRoom} room 
 * @returns GameRoom
 */
api.updateRoom = async function (roomId, room) {
  try {
    const response = await api.patch(`/api/game-rooms/${roomId}`, room);
    return response.data;
  } catch (error) {
    if (error.response) throw Error(error.response.data.message);
    throw Error(error.message);
  }
};

/**
 * Deletes specified GameRoom
 * @param {ObjectId} roomId 
 * @returns true || false
 */
api.deleteRoom = async function (roomId) {
  try {
    const response = await api.delete(`/api/game-rooms/${roomId}`);
    if (response.status === 204) return true;
    return false;
  } catch (error) {
    if (error.response) throw Error(error.response.data.message);
    throw Error('Error when trying to retreive gameroom data:', error.message);
  }
};

/**
 * Retreive game state of a specified game room
 * @param {ObjectId} roomId 
 * @returns Promise that resolves into a GameState
 */
api.getGameState = async function (roomId) {
  try {
    const response = await api.patch(`/api/game-rooms/${roomId}/game-state`);
    return response.data;
  } catch (error) {
    if (error.response) throw Error(error.response.data.message);
    throw Error('Error when trying to retreive game state:', error.message);
  }
};

/**
 * Take an action within a game room.
 * @param {ObjectId} roomId 
 * @param {String} action 
 * @param {ArrayOfStrings} parameters (optional)
 * @returns Promise that resolves into a GameState
 */
api.takeAction = async function (roomId, action, parameters) {
  try {
    const response = await api.patch(`/api/game-rooms/${roomId}/game-state`, { action, parameters });
    return response.data;
  } catch (error) {
    if (error.response) throw Error(error.response.data.message);
    throw Error('Error when trying to submit action:', error.message);
  }
};

/**
 * Update user information
 * @param {userFormData} userData 
 * @returns Promise that resolves to a user object
 */
api.updateProfile = async function (userFormData) {
  return api.patch("/api/profile", userFormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Message routes

api.sendMessage = async function (roomId, message) {
  try {
    const response = await api.post('/api/messages', { content: message, gameId: roomId });
    return response.data;
  } catch (error) {
    if (error.response) throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

api.getMessages = async function (roomId, lastSeen) {
  let url = `/api/messages?game=${roomId}`;
  if (lastSeen) url += `&last=${lastSeen}`;
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    if (error.response) throw Error(error.response.data.message);
    throw Error('Error when trying to retreive Messages:', error.message);
  }
};

export default api;

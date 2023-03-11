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

/**
 * Retreives a list of all gamerooms, or a single room if a pin is specified in the query
 * 
 * @returns Array of GameRooms || single GameRoom, if query included a pin
 */
api.getRooms = async function (query) {
  let url = '/api/game-rooms';
  if (query) {
    let count = 0;
    url += '?'
    for (let key in query) {
      if (count > 0) url += '&'
      url += `${key}=${query[key]}`;
      count++;
    }
  }
  try {
    const response = await api.get(url)
    return response.data;
  } catch (error) {
    if (error.response) throw Error(error.response.data.message);
    throw Error('Error when trying to retreive gameroom data:', error.message);
  }
}

/**
 * Creates a new game room on the server. Returns the created GameRoom
 * @param {GameRoom} room 
 * @returns 
 */
api.createRoom = async function (room) {
  try {
    const response = await api.post('/api/game-rooms', room)
    return response.data;
  } catch (error) {
    if (error.response) throw Error(error.response.data.message);
    throw Error('Error when trying to retreive gameroom data:', error.message);
  }
}

/**
 * Retreives information about the specified room
 * @param {ObjectId} roomId 
 * @returns GameRoom
 */
api.getRoom = async function (roomId) {
  try {
    const response = await api.get(`/api/game-rooms/${roomId}`)
    return response.data;  
  } catch (error) {
    if (error.response) throw Error(error.response.data.message);
    throw Error('Error when trying to retreive gameroom data:', error.message);
  }
}

/**
 * Updates a GameRoom, returns updated room
 * @param {ObjectId} roomId 
 * @param {GameRoom} room 
 * @returns GameRoom
 */
api.updateRoom = async function (roomId, room) {
  try {
    const response = await api.patch(`/api/game-rooms/${roomId}`, room)
    return response.data;
  } catch (error) {
    if (error.response) throw Error(error.response.data.message);
    throw Error('Error when trying to retreive gameroom data:', error.message);
  }
}

/**
 * Deletes specified GameRoom
 * @param {ObjectId} roomId 
 * @returns true || false
 */
api.deleteRoom = async function (roomId) {
  try {
    const response = await api.delete(`/api/game-rooms/${roomId}`)
    if (response.status === 204) return true;
    return false;
  } catch (error) {
    if (error.response) throw Error(error.response.data.message);
    throw Error('Error when trying to retreive gameroom data:', error.message);
  }}

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
}

/**
 * Take an action within a game room.
 * @param {ObjectId} roomId 
 * @param {String} action 
 * @param {ArrayOfStrings} parameters (optional)
 * @returns Promise that resolves into a GameState
 */
api.takeAction = async function (roomId, action, parameters) {
  try {
    const response = await api.patch(`/api/game-rooms/${roomId}/game-state`, {action, parameters});
    return response.data;
  } catch (error) {
    if (error.response) throw Error(error.response.data.message);
    throw Error('Error when trying to submit action:', error.message);
  }
}

export default api;

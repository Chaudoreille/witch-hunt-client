import { useState, useContext } from "react";
import api from "../../service/service";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const { storeToken, authenticateUser } = useContext(AuthContext);
  console.log("rendering login, user:", user);

  // TODO do we actually need to navigate manually after successful login,
  // or will the route protection trigger and move us away from login screen?
  // (was set up but not used in class)
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await api.post("/auth/login", user);

      storeToken(response.data.authToken);
      await authenticateUser();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  }

  function updateUser(inputData) {
    setUser({ ...user, ...inputData });
  }

  return (
    <>
      {errorMessage && (
        <div className="error-message">Error: {errorMessage}</div>
      )}
      <form onSubmit={handleLogin} className="Login">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={user.username}
            onChange={(event) => updateUser({ username: event.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={user.password}
            onChange={(event) => updateUser({ password: event.target.value })}
          />
        </div>
        <button>Login</button>
      </form>
    </>
  );
}

export default Login;

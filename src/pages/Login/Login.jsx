import { useState, useContext } from "react";
import api from "../../service/service";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Input/Input"
import "./Login.css";

/**
 * Login Page
 * Will display the form for a user to sign up
 * @returns
 */
function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const { storeToken, authenticateUser } = useContext(AuthContext);

  // TODO do we actually need to navigate manually after successful login,
  // or will the route protection trigger and move us away from login screen?
  // (was set up but not used in class)
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await api.login(user);

      storeToken(response.data.authToken);
      await authenticateUser();
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message);
    }
  }

  function updateUser(inputData) {
    setUser({ ...user, ...inputData });
  }

  return (
    <section className="flex-center-section">
      <div className="window-center-grey">
        <img src="images/witch-run_logo.png" />
        {errorMessage && (
          <div className="error-message">Error: {errorMessage}</div>
        )}
        <form onSubmit={handleLogin} className="Login Form">
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(event) => updateUser({ email: event.target.value })}
            />
          </div>
          {/* <Input type="email"
          name="email"
          action={(event) => updateUser({ email: event.target.value })}
          className="email"
          label="Email"
          value={user.email}
          placeholder="Your email"

        /> */}
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={(event) => updateUser({ password: event.target.value })}
            />
          </div>
          <button>Login</button>
        </form>
        <div>
          <Link to="/signup">Don't have an account yet?</Link>
        </div>
      </div>
    </section>
  );
}

export default Login;

import { useState, useContext } from "react";
import api from "../../service/service";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Input/Input"
import "./Login.css";
import Button from "../../components/Button/Button";
import Error from "../../components/ErrorList/ErrorList";

/**
 * Login Page
 * Will display the form for a user to sign up
 * @returns
 */
function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { storeToken, authenticateUser } = useContext(AuthContext);

  // TODO do we actually need to navigate manually after successful login,
  // or will the route protection trigger and move us away from login screen?
  // (was set up but not used in class)
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    const newErrors = {};
    setErrors({});

    try {
      const response = await api.login(user);

      storeToken(response.data.authToken);
      await authenticateUser();
    } catch (error) {
      console.error(error);
      newErrors.found = { message: error.response.data.message };
      setErrors(newErrors)
    }
  }

  function updateUser(inputData) {
    setUser({ ...user, ...inputData });
  }



  const displayErrors = () => {
    console.log(errors.found)
    if (!Object.values(errors).length) return;

    return (
      <Error messages={Object.values(errors).map(error => error.message)} />
    );
  };

  return (
    <section className="flex-center-section">
      <div className="window-center-grey">
        <img src="images/witch-run_logo.png" />
        <form onSubmit={handleLogin} className="Login Form">

          {displayErrors()}

          <Input type="email"
            name="email"
            action={(event) => updateUser({ email: event.target.value })}
            className="email"
            label="Email"
            value={user.email}
            placeholder="Your email"

          />
          <Input type="password"
            name="password"
            action={(event) => updateUser({ password: event.target.value })}
            className="password"
            label="Password"
            value={user.password}
            placeholder="Your password"
          />
          <Button type={"submit"} variant={"primary"}>Login</Button>
          <div className="form-small-link">
            <Link to="/signup">You don’t have an account ?</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;

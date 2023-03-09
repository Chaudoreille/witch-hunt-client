import { createContext, useState, useEffect } from "react";
import api from "../service/service";
export const AuthContext = createContext();

function AuthContextWrapper(props) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function storeToken(token) {
    localStorage.setItem("token", token);
    setToken(token);
  }

  function getToken() {
    return localStorage.getItem("token");
  }

  function removeToken() {
    localStorage.removeItem("token");
  }

  async function authenticateUser() {
    const currentToken = getToken();

    setToken(currentToken);

    // if there is no current token set, no need to try to authenticate
    if (!currentToken) {
      setUser(null);
      setIsLoading(false);
      return false;
    }

    try {
      const response = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      if (response.status === 200) {
        setUser(response.data);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setUser(null);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ storeToken, removeToken, user, authenticateUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextWrapper;

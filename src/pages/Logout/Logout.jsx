import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

function Logout() {
  const { removeToken, authenticateUser } = useContext(AuthContext);
  useEffect(() => {
    removeToken();
    authenticateUser();
  }, []);

  return <Navigate to="/" />;
}

export default Logout;

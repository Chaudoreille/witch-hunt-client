import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function Logout() {
  const { removeToken, authenticateUser } = useContext(AuthContext);
  useEffect(() => {
    removeToken();
    authenticateUser();
  }, []);

  return <></>;
}

export default Logout;

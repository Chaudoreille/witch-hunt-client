import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function NonAuthenticatedOnly() {
  const { isLoading, user } = useContext(AuthContext);

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (user) {
    return <Navigate to="/home" />;
  }
  return <Outlet />;
}

export default NonAuthenticatedOnly;

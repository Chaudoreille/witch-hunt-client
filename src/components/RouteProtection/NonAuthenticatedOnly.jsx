import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../Loader/Loader";

function NonAuthenticatedOnly() {
  const { isLoading, user } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to="/home" />;
  }
  return <Outlet />;
}

export default NonAuthenticatedOnly;

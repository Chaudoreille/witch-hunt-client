import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../Loader/Loader";

function AuthenticatedOnly() {
  const { isLoading, user } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

export default AuthenticatedOnly;

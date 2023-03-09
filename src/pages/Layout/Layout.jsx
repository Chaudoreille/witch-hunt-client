import React, { useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Layout.css";

function Layout() {
  const { isLoading, user } = useContext(AuthContext);
  if (isLoading)
    return (
      <>
        <header>
          <nav></nav>
        </header>
        <main>
          <Outlet />
        </main>
      </>
    );

  return (
    <>
      <header>
        <nav>
          <ul>
            {user ? (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/logout">Logout</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Signup</NavLink>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;

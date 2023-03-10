import React, { useContext } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
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
          <NavLink to="/home" className="logo-nav">
            <img src="images/witch-run_logo.png" />
          </NavLink>
          <NavLink to="/profile" className="pp-nav"> {/**ADD link to user profile */}
            <img src="images/avatar.png" />{/*ADD user profile picture*/}
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;

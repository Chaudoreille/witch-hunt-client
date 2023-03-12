import React, { useContext } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Layout.css";
import api from "../../service/service";

function Layout() {
  const { isLoading, user } = useContext(AuthContext);

  console.log(user)
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
            <img src="/images/witch-run_logo.png" />
          </NavLink>
          <NavLink to="/profile" className="pp-nav">
            {" "}
            <img src={user.image} />
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

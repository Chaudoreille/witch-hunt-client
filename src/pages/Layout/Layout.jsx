import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./Layout.css";

function Layout() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
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

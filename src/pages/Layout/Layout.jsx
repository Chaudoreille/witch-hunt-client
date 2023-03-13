import React, { useContext } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ButtonLink from "../../components/Button/ButtonLink";

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
            <img src="/images/witch-run_logo.png" />
          </NavLink>
          <ButtonLink variant="secondary" link="/logout" className="logout">
            <span>Logout</span>
          </ButtonLink>
          <NavLink to="/profile" className="pp-nav">
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

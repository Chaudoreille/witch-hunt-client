import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Layout from "./pages/Layout/Layout";
import Welcome from "./pages/Welcome/Welcome";
import NonAuthenticatedOnly from "./components/RouteProtection/NonAuthenticatedOnly";
import AuthenticatedOnly from "./components/RouteProtection/AuthenticatedOnly";
import Logout from "./pages/Logout/Logout";
import Lobbies from "./pages/Lobbies/Lobbies";
import CreateGame from "./pages/CreateGame/CreateGame";
import JoinPrivateGame from "./pages/JoinPrivateGame/JoinPrivateGame";
import GameRoom from "./pages/GameRoom/GameRoom";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<NonAuthenticatedOnly />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<AuthenticatedOnly />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Lobbies />} />
            <Route path="/games">
              <Route path="create" element={<CreateGame />} />
              <Route path="join" element={<JoinPrivateGame />} />
              <Route path=":roomId" element={<GameRoom />} />
            </Route>

            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

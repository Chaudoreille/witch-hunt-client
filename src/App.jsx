import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import NonAuthenticatedOnly from "./components/RouteProtection/NonAuthenticatedOnly";
import AuthenticatedOnly from "./components/RouteProtection/AuthenticatedOnly";
import Logout from "./pages/Logout/Logout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route element={<NonAuthenticatedOnly />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<AuthenticatedOnly />}>
            <Route path="/" element={<Home />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom"
import React, { useState, useEffect } from 'react';

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoutes from "./utils/PrivateRoutes";
import Dashboards from "./pages/Dashboards";

function App() {

  // Keep track of if user is Logged in or not
  const [loggedIn, setIsLoggedIn] = useState(false);

  // Keep track of the user
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    console.log(user)
    sessionStorage.setItem("user", JSON.stringify(user));
    console.log(loggedIn)
    setUser(user)
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    // handle successful logout
    setUser(null); // set user state to null
    sessionStorage.removeItem("user")
  };

  return (
      <Routes>
        <Route path="/" element={ <LandingPage /> } />
        <Route path="/login" element={ <Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup handleLogin={handleLogin} />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboards user={user} handleLogout={handleLogout} />} />
        </Route>
      </Routes>
  );
}

export default App;

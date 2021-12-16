import { NavigationBar, Account, Trips, Waypoints, Home, Login, Register, Logout, PrivateRoute } from "./components/index";

import { Routes, Route } from "react-router-dom";
import "./assets/css/App.css";
import { useState } from "react";
import isAuth from "./utils/IsAuthContext";



function App() {
  const [authenticated] = useState(false);
  const [user] = useState(false);

  return (
    <isAuth.Provider value={{ authenticated }} >
      <user.Provider value={{ user }} >
        <Routes>
          <Route path="/" element={<NavigationBar />}>
            <Route path='' element={<PrivateRoute />}>
              <Route path='Account' element={<Account />} />
              <Route path='Trips' element={<Trips />} />
              <Route path='Waypoints' element={<Waypoints />} />
            </Route>
            <Route path="Home" element={<Home />} />
            <Route path="Login" element={<Login />} />
            <Route path="Register" element={<Register />} />
            <Route path="Logout" element={<Logout />} />
          </Route >
        </Routes >
      </user.Provider>
    </isAuth.Provider >
  );
}

export default App;

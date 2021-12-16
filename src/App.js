import {
  NavigationBar,
  Account,
  Trips,
  Waypoints,
  Home,
  Login,
  Register,
  Logout,
  PrivateRoute,
} from "./components/index";

import { Routes, Route } from "react-router-dom";
import "./assets/css/App.css";
import { useState } from "react";
import isAuth from "./utils/IsAuthContext";

function App() {
  let [authUser, setAuthUser] = useState();
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<NavigationBar isLoggedIn={isLoggedIn} />}>
        <Route path="" element={<PrivateRoute />}>
          <Route path="Account" element={<Account />} />
          <Route path="Trips" element={<Trips />} />
          <Route path="Waypoints" element={<Waypoints />} />
          <Route
            path="Logout"
            element={
              <Logout setIsLoggedIn={setIsLoggedIn} setAuthUser={setAuthUser} />
            }
          />
        </Route>
        <Route path="Home" element={<Home />} />
        <Route
          path="Login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              authUser={authUser}
              setAuthUser={setAuthUser}
            />
          }
        />
        <Route path="Register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;

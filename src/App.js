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
import { getUserByToken } from "./services/api/userAPI";

function App() {
  let [authUser, setAuthUser] = useState(
    getUserByToken().then(res => { return res.data })
  );

  let [isLoggedIn, setIsLoggedIn] = useState(
    !!authUser
  );

  console.log(sessionStorage.getItem('user'));


  return (
    <Routes>
      <Route path="/" element={<NavigationBar isLoggedIn={isLoggedIn} />}>
        <Route path="" element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
          <Route path="Account" element={<Account authUser={authUser} />} />
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
              setAuthUser={setAuthUser}
            />
          }
        />
        <Route path="Register" element={<Register setIsLoggedIn={setIsLoggedIn} setAuthUser={setAuthUser} />} />
      </Route>
    </Routes>
  );
}

export default App;

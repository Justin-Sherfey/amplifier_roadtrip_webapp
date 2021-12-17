import {
  NavigationBar,
  Account,
  Trips,
  Waypoints,
  Home,
  Login,
  Logout,
  Register,
  PrivateRoute
} from "./components/index";

import { Routes, Route } from "react-router-dom";
import "./assets/css/App.css";
import { useState, useEffect } from "react";
import { getUserByToken } from "./services/api/userAPI";


function App() {
  let [authUser, setAuthUser] = useState(undefined);
  console.log("Rendering App!");

  useEffect(() => {
    sessionStorage.getItem('jwt') ? getUserByToken().then(res => {
      if (res.status === 200) {

        setAuthUser(res.data);
      } else {

        console.log("Invalid or Bad Login Token!");
        sessionStorage.clear();
        setAuthUser(null);
      }
    }) : setAuthUser(null);
  }, [authUser]);

  return (
    <Routes>
      <Route path="/" element={<NavigationBar authUser={authUser} />}>
        <Route path="" element={<PrivateRoute authUser={authUser} />}>
          <Route path="Account" element={<Account authUser={authUser} setAuthUser={setAuthUser} />} />
          <Route path="Trips" element={<Trips />} />
          <Route path="Waypoints" element={<Waypoints />} />
        </Route>
        <Route path="Home" element={<Home />} />
        <Route path="Logout" element={<Logout />} />
        <Route path="Login" element={<Login setAuthUser={setAuthUser} />} />
        <Route path="Register" element={<Register setAuthUser={setAuthUser} />} />
      </Route>
    </Routes>
  );
}

export default App;

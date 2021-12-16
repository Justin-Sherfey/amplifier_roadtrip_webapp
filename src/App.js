import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./assets/css/App.css";
import {
  Account, Home,
  Login, Logout, NavigationBar, PrivateRoute, Register, Trips,
  Waypoints
} from "./components/index";


function App() {
  let [authUser, setAuthUser] = useState(
    JSON.parse(sessionStorage.getItem('user'))
  );

  let [isLoggedIn, setIsLoggedIn] = useState(
    !!authUser
  );
  console.log(sessionStorage.getItem('user'));
  let [selectedTrip, setSelectedTrip] = useState(
    !!authUser ? authUser.trips[0] : null
  );

  return (
    <Routes>
      <Route path="/" element={<NavigationBar isLoggedIn={isLoggedIn} />}>
        <Route path="" element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
          <Route path="Account" element={<Account authUser={authUser} />} />
          <Route path="Trips" element={<Trips />} />
          <Route path="Waypoints" element={<Waypoints selectedTrip={selectedTrip} />} />
          <Route path="Logout" element={<Logout setIsLoggedIn={setIsLoggedIn} setAuthUser={setAuthUser} />} />
        </Route>
        <Route path="Home" element={<Home />} />
        <Route path="Login" element={<Login setIsLoggedIn={setIsLoggedIn} authUser={authUser} setAuthUser={setAuthUser} />} />
        <Route path="Register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;

import { NavigationBar, Account, Footer, Trips, WaypointComponent, Home, Login, Register, PrivateRoute } from "./components/index";
import { Routes, Route } from "react-router-dom";
import "./assets/css/App.css";
import { useState, useEffect } from "react";
import { getUserByToken } from "./api/userAPI";

function App() {
  const [authUser, setAuthUser] = useState(undefined);

  useEffect(() => {
    sessionStorage.getItem('jwt') ? getUserByToken().then(res => {
      if (res.status === 200) {
        setAuthUser(res.data);
      }
    }).catch(e => {
      console.log("Invalid or Bad Login Token!");
      sessionStorage.clear();
      setAuthUser(null);
    }) : setAuthUser(null);
  }, []);

  return (
    <>
      <div className="app">
        <div className="content">
          <Routes >
            <Route path="/" element={<NavigationBar authUser={authUser} setAuthUser={setAuthUser} />}>
              <Route path="" element={<PrivateRoute authUser={authUser} />}>
                <Route path="Account" element={<Account authUser={authUser} setAuthUser={setAuthUser} />} />
                <Route path="Trips" element={<Trips authUser={authUser} />} />
                <Route path="Waypoints" element={<WaypointComponent />} />
              </Route>
              <Route path="Home" element={<Home />} />
              <Route path="Login" element={<Login setAuthUser={setAuthUser} />} />
              <Route path="Register" element={<Register setAuthUser={setAuthUser} />} />
            </Route>
          </Routes>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;

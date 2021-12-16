import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import isAuth from "../../utils/IsAuthContext";

function PrivateRoute() {
    return useContext(isAuth).authenticated ? <Outlet /> : <Navigate to="/Home" />;
}

export default PrivateRoute;
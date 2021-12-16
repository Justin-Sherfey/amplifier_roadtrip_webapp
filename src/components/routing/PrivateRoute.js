import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute(props) {
  return props.isLoggedIn ? <Outlet /> : <Navigate to="/Home" />;
}

export default PrivateRoute;
